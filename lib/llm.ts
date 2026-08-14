import type { GuionSesion } from '@/lib/tipos';
import { getSetting } from '@/lib/db';

// Capa LLM OPCIONAL. La app funciona sin ninguna clave: si no hay proveedor
// configurado (o falla la llamada), se devuelve el guion determinista tal cual.
// Compatible con cualquier API OpenAI-compatible (OpenAI, Groq, LM Studio...)
// y con Ollama (http://localhost:11434/v1).

export interface LLMConfig {
  provider: 'ninguno' | 'openai_compatible' | 'ollama';
  baseUrl: string;
  model: string;
  apiKey: string;
}

export function getLLMConfig(): LLMConfig {
  const provider = (getSetting('llm_provider') ?? 'ninguno') as LLMConfig['provider'];
  return {
    provider,
    baseUrl: getSetting('llm_base_url') ?? 'http://localhost:11434/v1',
    model: getSetting('llm_model') ?? 'llama3.2',
    apiKey: getSetting('llm_api_key') ?? '',
  };
}

export function llmDisponible(): boolean {
  const cfg = getLLMConfig();
  if (cfg.provider === 'ninguno') return false;
  if (cfg.provider === 'openai_compatible' && !cfg.apiKey) return false;
  return true;
}

function promptDeRefino(guion: GuionSesion): string {
  return [
    'Eres un docente de Filosofía de secundaria en Canarias (curso 2026/2027, LOMLOE).',
    'Mejora el siguiente guion de sesión de aula. Mantén la estructura (inicio, desarrollo, cierre), el idioma español y la duración indicada.',
    'Añade una pregunta más de discusión con contenido real y una pequeña actividad de ampliación, sin inventar códigos de criterio de evaluación.',
    'Devuelve SOLO JSON válido con la misma forma del guion de entrada (campo "guion" incluido).',
    'Guion de entrada:',
    JSON.stringify(guion),
  ].join('\n');
}

export async function refinarGuionConLLM(guion: GuionSesion): Promise<GuionSesion> {
  const cfg = getLLMConfig();
  if (!llmDisponible()) return guion;

  const url = cfg.baseUrl.replace(/\/+$/, '') + '/chat/completions';
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (cfg.apiKey) headers['Authorization'] = `Bearer ${cfg.apiKey}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    const res = await fetch(url, {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        model: cfg.model,
        temperature: 0.4,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'Respondes únicamente con JSON válido.' },
          { role: 'user', content: promptDeRefino(guion) },
        ],
      }),
    });
    clearTimeout(timeout);
    if (!res.ok) return guion;
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return guion;
    const parsed = JSON.parse(content) as { guion?: GuionSesion };
    if (parsed.guion && parsed.guion.secuencia && Array.isArray(parsed.guion.secuencia)) {
      return parsed.guion;
    }
    return guion;
  } catch {
    // Fallback determinista ante cualquier error de red/parseo.
    return guion;
  }
}

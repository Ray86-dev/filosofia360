'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { accionGuardarSettings, accionRestaurarBackup, accionResetSeed } from '@/app/actions';

export function AjustesForm({ iniciales }: { iniciales: Record<string, string> }) {
  const router = useRouter();
  const [form, setForm] = useState<Record<string, string>>(iniciales);
  const [pendiente, start] = useTransition();
  const [mensaje, setMensaje] = useState<{ ok: boolean; texto: string } | null>(null);

  function set(clave: string, valor: string) {
    setForm((f) => ({ ...f, [clave]: valor }));
  }

  function guardar() {
    setMensaje(null);
    start(async () => {
      const r = await accionGuardarSettings(form);
      setMensaje({ ok: r.ok, texto: r.ok ? 'Ajustes guardados.' : 'Error.' });
      router.refresh();
    });
  }

  function restaurar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMensaje(null);
      start(async () => {
        const r = await accionRestaurarBackup(String(reader.result ?? ''));
        setMensaje({ ok: r.ok, texto: r.mensaje });
        router.refresh();
      });
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  function reset() {
    if (!window.confirm('Esto borra TODOS los datos locales y restaura el seed de ejemplo. ¿Continuar?')) return;
    setMensaje(null);
    start(async () => {
      const r = await accionResetSeed();
      setMensaje({ ok: r.ok, texto: r.mensaje });
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="mb-3 text-base font-bold text-slate-900">Centro y docente</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Nombre del centro</label>
            <input className="input" value={form.nombre_centro ?? ''} onChange={(e) => set('nombre_centro', e.target.value)} />
          </div>
          <div>
            <label className="label">Docente / departamento</label>
            <input className="input" value={form.nombre_docente ?? ''} onChange={(e) => set('nombre_docente', e.target.value)} />
          </div>
          <div>
            <label className="label">Curso escolar</label>
            <input className="input" value={form.curso_escolar ?? ''} onChange={(e) => set('curso_escolar', e.target.value)} />
          </div>
          <div>
            <label className="label">Zona horaria</label>
            <input className="input" value={form.zona_horaria ?? 'Atlantic/Canary'} onChange={(e) => set('zona_horaria', e.target.value)} />
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="mb-3 text-base font-bold text-slate-900">IA opcional (LLM)</h2>
        <p className="mb-3 text-xs text-slate-500">
          Sin proveedor configurado la app usa plantillas deterministas. Compatible con cualquier API
          OpenAI-compatible y con Ollama local.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Proveedor</label>
            <select className="input" value={form.llm_provider ?? 'ninguno'} onChange={(e) => set('llm_provider', e.target.value)}>
              <option value="ninguno">Ninguno (plantillas deterministas)</option>
              <option value="openai_compatible">OpenAI-compatible (clave API)</option>
              <option value="ollama">Ollama local</option>
            </select>
          </div>
          <div>
            <label className="label">Modelo</label>
            <input className="input" value={form.llm_model ?? ''} onChange={(e) => set('llm_model', e.target.value)} />
          </div>
          <div>
            <label className="label">Base URL</label>
            <input className="input" value={form.llm_base_url ?? ''} onChange={(e) => set('llm_base_url', e.target.value)} />
          </div>
          <div>
            <label className="label">API key</label>
            <input className="input" type="password" value={form.llm_api_key ?? ''} onChange={(e) => set('llm_api_key', e.target.value)} />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button className="btn-primary" disabled={pendiente} onClick={guardar}>Guardar ajustes</button>
        {mensaje && (
          <span className={`text-sm ${mensaje.ok ? 'text-emerald-600' : 'text-red-600'}`}>{mensaje.texto}</span>
        )}
      </div>

      <section className="card">
        <h2 className="mb-3 text-base font-bold text-slate-900">Copia de seguridad (JSON)</h2>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <a className="btn-primary" href="/api/backup">Descargar backup completo</a>
          <label className="btn-secondary cursor-pointer">
            Restaurar backup
            <input type="file" accept="application/json" className="hidden" onChange={restaurar} />
          </label>
          <button className="btn-secondary text-red-600" onClick={reset}>Restablecer seed de ejemplo</button>
        </div>
      </section>
    </div>
  );
}

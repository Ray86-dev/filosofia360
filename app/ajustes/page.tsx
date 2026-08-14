import { getDb } from '@/lib/db';
import { Cabecera } from '@/components/ui';
import { AjustesForm } from '@/components/AjustesForm';

export const dynamic = 'force-dynamic';

const CLAVES = [
  'nombre_centro',
  'nombre_docente',
  'curso_escolar',
  'zona_horaria',
  'llm_provider',
  'llm_base_url',
  'llm_model',
  'llm_api_key',
];

export default function PaginaAjustes() {
  const db = getDb();
  const iniciales: Record<string, string> = {};
  for (const c of CLAVES) {
    const row = db.prepare('SELECT valor FROM settings WHERE clave = ?').get(c) as { valor: string } | undefined;
    iniciales[c] = row?.valor ?? '';
  }

  return (
    <div>
      <Cabecera titulo="Ajustes" subtitulo="Configuración local · datos 100 % en tu equipo" />
      <AjustesForm iniciales={iniciales} />
    </div>
  );
}

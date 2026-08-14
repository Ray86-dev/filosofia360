import { getProgramaciones, getSituaciones, getDb } from '@/lib/db';
import { Cabecera } from '@/components/ui';
import { formatearFechaNumerica } from '@/lib/calendar';

export const dynamic = 'force-dynamic';

function Enlaces({ base }: { base: string }) {
  return (
    <span className="text-xs text-slate-400">
      <a className="underline" href={`${base}md`}>MD</a>{' · '}
      <a className="underline" href={`${base}docx`}>DOCX</a>{' · '}
      <a className="underline" href={`${base}pdf`}>PDF</a>
    </span>
  );
}

export default function PaginaExportar() {
  const pds = getProgramaciones();
  const sas = getSituaciones();
  const db = getDb();
  const sesiones = db
    .prepare('SELECT id, fecha, titulo, grupo_id, estado FROM sesiones ORDER BY fecha DESC')
    .all() as { id: number; fecha: string; titulo: string; grupo_id: number; estado: string }[];
  const grupos = db.prepare('SELECT id, nombre FROM grupos').all() as { id: number; nombre: string }[];
  const nombreGrupo = new Map(grupos.map((g) => [g.id, g.nombre]));

  return (
    <div>
      <Cabecera titulo="Pack export" subtitulo="Descarga cualquier documento en MD, DOCX o PDF · backup JSON completo" />

      <section className="card mb-6">
        <h2 className="mb-2 text-base font-bold text-slate-900">Backup completo</h2>
        <p className="mb-2 text-sm text-slate-500">Todas las tablas en un único archivo JSON restaurable desde Ajustes.</p>
        <a className="btn-primary" href="/api/backup">Descargar backup.json</a>
      </section>

      <section className="card mb-6">
        <h2 className="mb-3 text-base font-bold text-slate-900">Programaciones didácticas ({pds.length})</h2>
        <ul className="divide-y divide-slate-100 text-sm">
          {pds.map((pd) => (
            <li key={pd.id} className="flex items-center justify-between gap-3 py-2">
              <span className="text-slate-700">{pd.titulo}</span>
              <Enlaces base={`/api/export?tipo=pd&id=${pd.id}&formato=`} />
            </li>
          ))}
        </ul>
      </section>

      <section className="card mb-6">
        <h2 className="mb-3 text-base font-bold text-slate-900">Situaciones de aprendizaje ({sas.length})</h2>
        <ul className="divide-y divide-slate-100 text-sm">
          {sas.map((sa) => (
            <li key={sa.id} className="flex items-center justify-between gap-3 py-2">
              <span className="text-slate-700">{sa.titulo}</span>
              <Enlaces base={`/api/export?tipo=sa&id=${sa.id}&formato=`} />
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2 className="mb-3 text-base font-bold text-slate-900">Sesiones generadas ({sesiones.length})</h2>
        {sesiones.length === 0 ? (
          <p className="text-sm text-slate-500">Aún no hay sesiones. Prepara un día o una semana primero.</p>
        ) : (
          <ul className="divide-y divide-slate-100 text-sm">
            {sesiones.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 py-2">
                <span className="text-slate-700">
                  {formatearFechaNumerica(s.fecha)} · {nombreGrupo.get(s.grupo_id) ?? ''} · <span className="text-slate-400">{s.titulo}</span>
                </span>
                <Enlaces base={`/api/export?tipo=sesion&id=${s.id}&formato=`} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

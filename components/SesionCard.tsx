import Link from 'next/link';
import type { SesionAula, Grupo } from '@/lib/tipos';
import { formatearFechaLarga } from '@/lib/calendar';
import { MateriaChip, EstadoChip } from '@/components/ui';
import { BotonRegenerar, BotonMarcar } from '@/components/acciones';

function ExportarEnlaces({ id }: { id: number }) {
  const base = `/api/export?tipo=sesion&id=${id}&formato=`;
  return (
    <span className="inline-flex gap-2 text-xs">
      <a className="font-medium text-mar underline" href={base + 'md'}>MD</a>
      <a className="font-medium text-mar underline" href={base + 'docx'}>DOCX</a>
      <a className="font-medium text-mar underline" href={base + 'pdf'}>PDF</a>
    </span>
  );
}

export function SesionCard({ sesion, grupo }: { sesion: SesionAula; grupo: Grupo | null }) {
  const g = sesion.guion;
  return (
    <article className="card">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <MateriaChip codigo={g.materiaCodigo} />
            <EstadoChip estado={sesion.estado} />
          </div>
          <h3 className="mt-2 text-base font-bold text-slate-900">{g.titulo}</h3>
          <p className="text-xs text-slate-500">
            {grupo?.nombre ?? g.grupo} · {grupo?.aula ?? ''} · {formatearFechaLarga(g.fecha)} · {g.duracionMin} min
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ExportarEnlaces id={sesion.id} />
          <Link className="btn-secondary" href={`/sesion/${sesion.id}`}>Editar</Link>
          <BotonRegenerar sesionId={sesion.id} />
          <BotonMarcar sesionId={sesion.id} estado={sesion.estado === 'impartida' ? 'generada' : 'impartida'} />
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <p className="font-semibold text-slate-700">Objetivo</p>
          <p className="text-slate-600">{g.objetivo}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-semibold text-slate-700">Saberes básicos</p>
            <ul className="list-disc pl-5 text-slate-600">
              {g.saberes.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Criterios de evaluación</p>
            <ul className="list-disc pl-5 text-slate-600">
              {g.criterios.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="mb-2 font-semibold text-slate-700">Desarrollo de la sesión</p>
          <ol className="space-y-3">
            {g.secuencia.map((m, i) => (
              <li key={i} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <p className="font-semibold text-slate-800">
                  {i + 1}. {m.momento === 'inicio' ? 'Inicio' : m.momento === 'cierre' ? 'Cierre' : 'Desarrollo'} — {m.titulo}{' '}
                  <span className="font-normal text-slate-400">({m.duracionMin} min)</span>
                </p>
                <p className="mt-1 text-slate-600">{m.descripcion}</p>
                {m.texto && (
                  <blockquote className="mt-2 rounded border-l-4 border-mar bg-white p-2 text-slate-600 italic">
                    {m.texto}
                  </blockquote>
                )}
                {m.preguntas && m.preguntas.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-slate-600">
                    {m.preguntas.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-semibold text-slate-700">Materiales</p>
            <ul className="list-disc pl-5 text-slate-600">
              {g.materiales.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Evaluación</p>
            <ul className="list-disc pl-5 text-slate-600">
              {g.evaluacion.map((e, i) => (
                <li key={i}>
                  {e.instrumento} — {e.evidencia} <span className="text-slate-400">({e.momento})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="font-semibold text-slate-700">Atención a la diversidad</p>
          <ul className="list-disc pl-5 text-slate-600">
            {g.atencionDiversidad.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-acento/10 p-3">
          <p className="font-semibold text-acento">Tarea para casa</p>
          <p className="text-slate-700">{g.tareaCasa}</p>
        </div>
      </div>
    </article>
  );
}

import Link from 'next/link';
import {
  hoyCanarias,
  lunesDeLaSemana,
  sumarDias,
  formatearFechaLarga,
} from '@/lib/calendar';
import { getCalendario, getSesionesRango, getGrupos, getSlots } from '@/lib/db';
import { Cabecera, MateriaChip, EstadoChip } from '@/components/ui';
import { BotonPrepararSemana } from '@/components/acciones';

export const dynamic = 'force-dynamic';

export default async function PaginaSemana({
  searchParams,
}: {
  searchParams: Promise<{ fecha?: string }>;
}) {
  const params = await searchParams;
  const base = params.fecha && /^\d{4}-\d{2}-\d{2}$/.test(params.fecha) ? params.fecha : hoyCanarias();
  const lunes = lunesDeLaSemana(base);
  const viernes = sumarDias(lunes, 4);
  const dias = [0, 1, 2, 3, 4].map((i) => sumarDias(lunes, i));

  const calendario = new Map(getCalendario().map((c) => [c.fecha, c]));
  const sesiones = getSesionesRango(lunes, viernes);
  const grupos = new Map(getGrupos().map((g) => [g.id, g]));
  const slots = getSlots();

  const sesionesPorFecha = new Map<string, typeof sesiones>();
  for (const s of sesiones) {
    const arr = sesionesPorFecha.get(s.fecha) ?? [];
    arr.push(s);
    sesionesPorFecha.set(s.fecha, arr);
  }

  const anterior = sumarDias(lunes, -7);
  const siguiente = sumarDias(lunes, 7);

  return (
    <div>
      <Cabecera
        titulo="Semana"
        subtitulo={`Del ${formatearFechaLarga(lunes)} al ${formatearFechaLarga(viernes)}`}
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link className="btn-secondary" href={`/semana?fecha=${anterior}`}>← Semana anterior</Link>
        <Link className="btn-secondary" href={`/semana?fecha=${siguiente}`}>Semana siguiente →</Link>
        <BotonPrepararSemana fecha={lunes} />
        <span className="text-xs text-slate-400">
          <a className="underline" href={`/api/export?tipo=semana&fecha=${lunes}&formato=md`}>MD</a>{' · '}
          <a className="underline" href={`/api/export?tipo=semana&fecha=${lunes}&formato=docx`}>DOCX</a>{' · '}
          <a className="underline" href={`/api/export?tipo=semana&fecha=${lunes}&formato=pdf`}>PDF</a>
        </span>
      </div>

      <div className="space-y-6">
        {dias.map((f) => {
          const dia = calendario.get(f);
          const esLectivo = dia?.tipo === 'lectivo';
          const lista = sesionesPorFecha.get(f) ?? [];
          const hoy = f === hoyCanarias();
          return (
            <section key={f} className="card">
              <header className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold capitalize text-slate-900">
                  {formatearFechaLarga(f)}
                  {hoy && <span className="ml-2 rounded bg-mar px-2 py-0.5 text-xs font-semibold text-white">HOY</span>}
                </h2>
                {dia && !esLectivo && (
                  <span className="chip bg-slate-200 text-slate-600">
                    {dia.tipo === 'festivo' ? dia.nombre || 'Festivo' : dia.nombre || 'No lectivo'}
                  </span>
                )}
              </header>

              {!esLectivo ? (
                <p className="text-sm text-slate-500">Día no lectivo.</p>
              ) : lista.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Sin sesiones preparadas. Usa «Preparar toda la semana».
                </p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {lista.map((s) => {
                    const g = grupos.get(s.grupoId);
                    return (
                      <li key={s.id} className="flex flex-wrap items-center gap-3 py-2 text-sm">
                        <MateriaChip codigo={s.guion.materiaCodigo} />
                        <span className="font-medium text-slate-700">{g?.nombre ?? s.guion.grupo}</span>
                        <span className="text-slate-400">{g?.aula ?? ''}</span>
                        <span className="flex-1 truncate text-slate-600">{s.titulo}</span>
                        <EstadoChip estado={s.estado} />
                        <Link className="text-xs font-medium text-mar underline" href={`/sesion/${s.id}`}>
                          Abrir
                        </Link>
                        <span className="text-xs text-slate-400">
                          <a className="underline" href={`/api/export?tipo=sesion&id=${s.id}&formato=md`}>MD</a>{' · '}
                          <a className="underline" href={`/api/export?tipo=sesion&id=${s.id}&formato=docx`}>DOCX</a>{' · '}
                          <a className="underline" href={`/api/export?tipo=sesion&id=${s.id}&formato=pdf`}>PDF</a>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

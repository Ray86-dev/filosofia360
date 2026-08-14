import { getCalendario } from '@/lib/db';
import { Cabecera } from '@/components/ui';
import { diaSemanaISO, parseFecha, MESES } from '@/lib/calendar';
import type { TipoDia } from '@/lib/tipos';

export const dynamic = 'force-dynamic';

const COLOR: Record<TipoDia, string> = {
  lectivo: 'bg-emerald-100 text-emerald-800',
  festivo: 'bg-rose-100 text-rose-800',
  vacaciones: 'bg-slate-200 text-slate-500',
  fin_curso: 'bg-indigo-100 text-indigo-800',
};

const CABECERAS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export default function PaginaCalendario() {
  const dias = getCalendario();
  const porMes = new Map<string, typeof dias>();
  for (const d of dias) {
    const clave = d.fecha.slice(0, 7);
    const arr = porMes.get(clave) ?? [];
    arr.push(d);
    porMes.set(clave, arr);
  }

  const meses = [...porMes.entries()];

  return (
    <div>
      <Cabecera titulo="Calendario 26/27" subtitulo="Calendario escolar editable · Europe/Canary" />

      <div className="mb-4 flex flex-wrap gap-3 text-xs">
        <span className="chip bg-emerald-100 text-emerald-800">Lectivo</span>
        <span className="chip bg-rose-100 text-rose-800">Festivo / fin de semana</span>
        <span className="chip bg-slate-200 text-slate-500">Vacaciones / no lectivo</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {meses.map(([clave, lista]) => {
          const [y, m] = clave.split('-').map(Number);
          const { y: y0, m: m0 } = parseFecha(lista[0].fecha);
          const primerDiaISO = diaSemanaISO(`${y0}-${String(m0).padStart(2, '0')}-01`);
          const celdasVacias = primerDiaISO - 1;
          return (
            <section key={clave} className="card">
              <h2 className="mb-2 font-bold capitalize text-slate-900">{MESES[m - 1]} {y}</h2>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400">
                {CABECERAS.map((c) => (
                  <div key={c}>{c}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: celdasVacias }).map((_, i) => (
                  <div key={`v${i}`} />
                ))}
                {lista.map((d) => (
                  <div
                    key={d.fecha}
                    title={d.nombre || d.tipo}
                    className={`flex aspect-square flex-col items-center justify-center rounded p-0.5 text-[11px] leading-tight ${COLOR[d.tipo]}`}
                  >
                    <span className="font-semibold">{Number(d.fecha.slice(-2))}</span>
                    {d.nombre && d.nombre !== 'Fin de semana' && d.nombre !== 'Periodo no lectivo' && (
                      <span className="line-clamp-2 overflow-hidden text-[8px] opacity-80">{d.nombre}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

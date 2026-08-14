import { getGrupos, getSlots } from '@/lib/db';
import { PERIODOS, RECREO, agruparSlotsPorGrupo, contarHorasSemana, hayConflicto, totalHorasDocente } from '@/lib/horario';
import { Cabecera, MateriaChip, Aviso } from '@/components/ui';
import { materiaDe } from '@/lib/curriculum';

export const dynamic = 'force-dynamic';

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export default function PaginaGrupos() {
  const grupos = getGrupos();
  const slots = getSlots();
  const porGrupo = agruparSlotsPorGrupo(slots, grupos);
  const conflicto = hayConflicto(slots);

  // Celda del horario: clave "dia|inicio" -> grupo
  const celda = new Map<string, number>();
  for (const s of slots) celda.set(`${s.diaSemana}|${s.horaInicio}`, s.grupoId);
  const grupoPorId = new Map(grupos.map((g) => [g.id, g]));

  return (
    <div>
      <Cabecera
        titulo="Grupos y horario"
        subtitulo={`Departamento de Filosofía · ${grupos.length} grupos · ${totalHorasDocente(slots)} h/semana`}
      />

      {conflicto.conflicto && <div className="mb-4"><Aviso>⚠️ {conflicto.detalle}</Aviso></div>}

      <section className="card mb-6 overflow-x-auto">
        <h2 className="mb-3 text-base font-bold text-slate-900">Horario semanal del docente</h2>
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-slate-200 bg-slate-50 px-2 py-1.5 text-left">Hora</th>
              {DIAS.map((d) => (
                <th key={d} className="border border-slate-200 bg-slate-50 px-2 py-1.5 text-left">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERIODOS.map((p) => (
              <tr key={p.n}>
                <td className="border border-slate-200 px-2 py-1 text-xs text-slate-500">
                  {p.n}.ª<br />{p.inicio}–{p.fin}
                </td>
                {[1, 2, 3, 4, 5].map((dia) => {
                  const gid = celda.get(`${dia}|${p.inicio}`);
                  const g = gid != null ? grupoPorId.get(gid) : undefined;
                  return (
                    <td key={dia} className="border border-slate-200 px-2 py-1 align-top">
                      {g ? (
                        <div>
                          <div className="font-semibold text-slate-800">{g.nombre}</div>
                          <div className="text-xs text-slate-500">{materiaDe(g.materiaCodigo).codigo} · {g.aula}</div>
                        </div>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td className="border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-500">Recreo</td>
              <td colSpan={5} className="border border-slate-200 bg-slate-50 px-2 py-1 text-center text-xs text-slate-400">
                {RECREO.inicio}–{RECREO.fin}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {porGrupo.map(({ grupo, slots: s }) => (
          <div key={grupo.id} className="card">
            <div className="mb-2 flex items-center gap-2">
              <MateriaChip codigo={grupo.materiaCodigo} />
              <span className="text-sm text-slate-400">{grupo.aula}</span>
            </div>
            <h3 className="font-bold text-slate-900">{grupo.nombre}</h3>
            <p className="mb-2 text-xs text-slate-500">
              {grupo.curso} · {grupo.alumnos} alumnos · {contarHorasSemana(s, grupo.id)} h/semana
            </p>
            <ul className="space-y-1 text-xs text-slate-600">
              {s.map((h) => (
                <li key={h.id} className="flex justify-between">
                  <span className="capitalize">{DIAS[h.diaSemana - 1]}</span>
                  <span>{h.horaInicio}–{h.horaFin}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

import Link from 'next/link';
import { hoyCanarias, formatearFechaLarga, diaSemanaISO } from '@/lib/calendar';
import { getGrupos, getSlots } from '@/lib/db';
import { resumenDia, proximaFechaConClase } from '@/lib/sesiones';
import { Cabecera, Aviso, MateriaChip } from '@/components/ui';
import { SesionCard } from '@/components/SesionCard';
import { BotonPrepararDia, BotonPrepararSemana } from '@/components/acciones';

export const dynamic = 'force-dynamic';

export default function PaginaHoy() {
  const hoy = hoyCanarias();
  const resumen = resumenDia(hoy);
  const grupos = getGrupos();
  const slots = getSlots();
  const diaSemana = diaSemanaISO(hoy);
  const slotsHoy = new Map<number, string>();
  for (const s of slots) {
    if (s.diaSemana === diaSemana) {
      const hora = `${s.horaInicio}–${s.horaFin}`;
      const actual = slotsHoy.get(s.grupoId);
      slotsHoy.set(s.grupoId, actual ? `${actual}, ${hora}` : hora);
    }
  }
  const sesionesPorGrupo = new Map(resumen.sesiones.map((s) => [s.grupoId, s]));
  const grupoPorId = new Map(grupos.map((g) => [g.id, g]));

  return (
    <div>
      <Cabecera titulo="Hoy" subtitulo={formatearFechaLarga(hoy)} />

      {!resumen.esLectivo ? (
        <div className="space-y-6">
          <Aviso>
            Hoy no es día lectivo: <strong>{resumen.motivoNoLectivo}</strong>. Puedes adelantar la semana completa.
          </Aviso>
          <div className="flex flex-wrap items-center gap-3">
            <BotonPrepararSemana fecha={hoy} />
            <Link className="btn-secondary" href="/semana">Ver la semana</Link>
          </div>

          <section className="card">
            <h2 className="mb-3 text-base font-bold text-slate-900">Próxima clase por grupo</h2>
            <ul className="divide-y divide-slate-100 text-sm">
              {grupos.map((g) => {
                const prox = proximaFechaConClase(g.id, hoy);
                return (
                  <li key={g.id} className="flex items-center justify-between gap-3 py-2">
                    <span className="flex items-center gap-2">
                      <MateriaChip codigo={g.materiaCodigo} />
                      <span className="font-medium text-slate-700">{g.nombre}</span>
                      <span className="text-slate-400">{g.aula}</span>
                    </span>
                    <span className="text-slate-600">
                      {prox ? formatearFechaLarga(prox) : 'Fin de curso'}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <BotonPrepararDia fecha={hoy} lectivo={resumen.esLectivo} />
            <span className="text-sm text-slate-500">
              {resumen.grupos.length} clase{resumen.grupos.length !== 1 ? 's' : ''} programada{resumen.grupos.length !== 1 ? 's' : ''} hoy
            </span>
          </div>

          {resumen.grupos.length === 0 && (
            <Aviso>No hay clases programadas hoy en el horario del departamento.</Aviso>
          )}

          {resumen.grupos.map((g) => {
            const sesion = sesionesPorGrupo.get(g.id);
            return (
              <section key={g.id} className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <MateriaChip codigo={g.materiaCodigo} />
                  <span className="font-semibold text-slate-800">{g.nombre}</span>
                  <span className="text-slate-400">{g.aula}</span>
                  <span className="text-slate-500">{slotsHoy.get(g.id) ?? ''}</span>
                </div>
                {sesion ? (
                  <SesionCard sesion={sesion} grupo={grupoPorId.get(g.id) ?? null} />
                ) : (
                  <div className="card border-dashed text-sm text-slate-500">
                    Sesión sin preparar. Pulsa «Preparar el día» para generar el guion completo.
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

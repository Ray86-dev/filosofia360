import { MATERIAS } from '@/lib/curriculum';
import { getFuentes } from '@/lib/db';
import { Cabecera, MateriaChip, Aviso } from '@/components/ui';

export const dynamic = 'force-dynamic';

export default function PaginaBanco() {
  const fuentes = getFuentes();
  const porMateria = new Map<string, typeof fuentes>();
  for (const f of fuentes) {
    const arr = porMateria.get(f.materiaCodigo) ?? [];
    arr.push(f);
    porMateria.set(f.materiaCodigo, arr);
  }

  return (
    <div>
      <Cabecera
        titulo="Banco curricular"
        subtitulo="Competencias, saberes básicos y criterios · LOMLOE · Decreto 30/2023 de Canarias"
      />

      <div className="mb-6 space-y-3">
        <Aviso>
          <strong>Currículo no negociable.</strong> Filosofía <em>no</em> existe en 1.º ESO. Mapa oficial usado en la app:
          <ul className="mt-2 list-disc pl-5">
            <li><strong>FIL4</strong> — Filosofía · 4.º ESO · Optativa</li>
            <li><strong>FIL1B</strong> — Filosofía · 1.º Bachillerato · Común</li>
            <li><strong>HDF2B</strong> — Historia de la Filosofía · 2.º Bachillerato · Común</li>
            <li><strong>EVCE1</strong> — Educación en Valores Cívicos y Éticos · 1.º ESO · Obligatoria (afín)</li>
            <li><strong>PSI</strong> — Psicología · Bachillerato · Optativa (Decreto 78/2025)</li>
          </ul>
        </Aviso>
        <p className="text-xs text-slate-500">
          Los códigos oficiales de criterio de evaluación no se inventan: aparecen como{' '}
          <code className="rounded bg-slate-100 px-1">pendiente_oficial</code> hasta incorporar el anexo correspondiente
          del Decreto 30/2023.
        </p>
      </div>

      <section className="card mb-6 overflow-x-auto">
        <h2 className="mb-3 text-base font-bold text-slate-900">Catálogo de materias</h2>
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
              <th className="py-1.5 pr-2">Código</th>
              <th className="py-1.5 pr-2">Materia</th>
              <th className="py-1.5 pr-2">Etapa</th>
              <th className="py-1.5 pr-2">Curso</th>
              <th className="py-1.5 pr-2">Carácter</th>
              <th className="py-1.5">h/sem</th>
            </tr>
          </thead>
          <tbody>
            {MATERIAS.map((m) => (
              <tr key={m.codigo} className="border-b border-slate-100">
                <td className="py-1.5 pr-2 font-semibold text-slate-800">{m.codigo}</td>
                <td className="py-1.5 pr-2">{m.nombre}</td>
                <td className="py-1.5 pr-2">{m.etapa}</td>
                <td className="py-1.5 pr-2">{m.curso}</td>
                <td className="py-1.5 pr-2">{m.caracter}</td>
                <td className="py-1.5">{m.horasSemanales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {[...porMateria.entries()].map(([codigo, lista]) => {
        const competencias = lista.filter((f) => f.tipo === 'competencia');
        const criterios = lista.filter((f) => f.tipo === 'criterio');
        const saberes = lista.filter((f) => f.tipo === 'saber');
        return (
          <section key={codigo} className="card mb-6">
            <div className="mb-3"><MateriaChip codigo={codigo as never} /></div>
            <div className="grid gap-5 lg:grid-cols-3">
              <div>
                <h3 className="mb-2 text-sm font-bold text-slate-700">Competencias específicas</h3>
                <ul className="list-disc space-y-1 pl-5 text-xs text-slate-600">
                  {competencias.map((f) => (
                    <li key={f.id}>{f.descripcion}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-bold text-slate-700">Criterios de evaluación</h3>
                <ul className="list-disc space-y-1 pl-5 text-xs text-slate-600">
                  {criterios.map((f) => (
                    <li key={f.id}>
                      <span className="text-slate-400">[{f.bloque}]</span> {f.descripcion}{' '}
                      <span className="text-slate-400">({f.codigo})</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-bold text-slate-700">Saberes básicos</h3>
                <ul className="list-disc space-y-1 pl-5 text-xs text-slate-600">
                  {saberes.map((f) => (
                    <li key={f.id}>
                      <span className="text-slate-400">[{f.bloque}]</span> {f.descripcion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

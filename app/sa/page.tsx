import Link from 'next/link';
import { getSituaciones } from '@/lib/db';
import { Cabecera, MateriaChip } from '@/components/ui';

export const dynamic = 'force-dynamic';

export default function PaginaSA() {
  const sas = getSituaciones();
  const porMateria = new Map<string, typeof sas>();
  for (const sa of sas) {
    const arr = porMateria.get(sa.materiaCodigo) ?? [];
    arr.push(sa);
    porMateria.set(sa.materiaCodigo, arr);
  }

  return (
    <div>
      <Cabecera
        titulo="Situaciones de aprendizaje"
        subtitulo="Generadas desde el banco curricular · una por unidad · Brújula20"
      />
      {[...porMateria.entries()].map(([codigo, lista]) => (
        <section key={codigo} className="mb-8">
          <div className="mb-3"><MateriaChip codigo={codigo as never} /></div>
          <div className="grid gap-3 md:grid-cols-2">
            {lista.map((sa) => (
              <div key={sa.id} className="card">
                <h3 className="font-semibold text-slate-900">{sa.titulo}</h3>
                <p className="mb-2 text-xs text-slate-500">{sa.codigo} · {sa.curso}</p>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <Link className="btn-primary" href={`/sa/${sa.id}`}>Abrir / editar</Link>
                  <span className="text-xs text-slate-400">
                    <a className="underline" href={`/api/export?tipo=sa&id=${sa.id}&formato=md`}>MD</a>{' · '}
                    <a className="underline" href={`/api/export?tipo=sa&id=${sa.id}&formato=docx`}>DOCX</a>{' · '}
                    <a className="underline" href={`/api/export?tipo=sa&id=${sa.id}&formato=pdf`}>PDF</a>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

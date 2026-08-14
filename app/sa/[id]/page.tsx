import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSituacion } from '@/lib/db';
import { Cabecera, MateriaChip } from '@/components/ui';
import { EditorJSON } from '@/components/EditorJSON';
import { saALineas, lineasAMarkdown } from '@/lib/exportar';

export const dynamic = 'force-dynamic';

export default async function PaginaSAEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sa = getSituacion(Number(id));
  if (!sa) notFound();

  const vista = lineasAMarkdown(saALineas(sa));

  return (
    <div>
      <Cabecera titulo={sa.titulo} subtitulo={`${sa.curso} · ${sa.codigo}`} />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <MateriaChip codigo={sa.materiaCodigo} />
        <Link className="btn-secondary" href="/sa">← Volver</Link>
        <span className="text-xs text-slate-400">
          <a className="underline" href={`/api/export?tipo=sa&id=${sa.id}&formato=md`}>MD</a>{' · '}
          <a className="underline" href={`/api/export?tipo=sa&id=${sa.id}&formato=docx`}>DOCX</a>{' · '}
          <a className="underline" href={`/api/export?tipo=sa&id=${sa.id}&formato=pdf`}>PDF</a>
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card">
          <h2 className="mb-3 text-base font-bold text-slate-900">Vista previa</h2>
          <pre className="whitespace-pre-wrap text-sm text-slate-700">{vista}</pre>
        </section>
        <section className="card">
          <h2 className="mb-3 text-base font-bold text-slate-900">Edición (JSON)</h2>
          <EditorJSON id={sa.id} tipo="sa" valor={JSON.stringify(JSON.parse(sa.datos), null, 2)} />
        </section>
      </div>
    </div>
  );
}

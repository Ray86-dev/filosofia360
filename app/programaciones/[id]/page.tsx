import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProgramacion } from '@/lib/db';
import { Cabecera, MateriaChip } from '@/components/ui';
import { EditorJSON } from '@/components/EditorJSON';
import { pdALineas, lineasAMarkdown } from '@/lib/exportar';

export const dynamic = 'force-dynamic';

export default async function PaginaProgramacion({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pd = getProgramacion(Number(id));
  if (!pd) notFound();

  const vista = lineasAMarkdown(pdALineas(pd));

  return (
    <div>
      <Cabecera titulo={pd.titulo} subtitulo={`${pd.curso} · ${pd.codigo}`} />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <MateriaChip codigo={pd.materiaCodigo} />
        <Link className="btn-secondary" href="/programaciones">← Volver</Link>
        <span className="text-xs text-slate-400">
          <a className="underline" href={`/api/export?tipo=pd&id=${pd.id}&formato=md`}>MD</a>{' · '}
          <a className="underline" href={`/api/export?tipo=pd&id=${pd.id}&formato=docx`}>DOCX</a>{' · '}
          <a className="underline" href={`/api/export?tipo=pd&id=${pd.id}&formato=pdf`}>PDF</a>
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card">
          <h2 className="mb-3 text-base font-bold text-slate-900">Vista previa</h2>
          <pre className="whitespace-pre-wrap text-sm text-slate-700">{vista}</pre>
        </section>
        <section className="card">
          <h2 className="mb-3 text-base font-bold text-slate-900">Edición (JSON)</h2>
          <EditorJSON id={pd.id} tipo="pd" valor={JSON.stringify(JSON.parse(pd.datos), null, 2)} />
        </section>
      </div>
    </div>
  );
}

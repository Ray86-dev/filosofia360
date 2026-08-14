import Link from 'next/link';
import { getProgramaciones } from '@/lib/db';
import { Cabecera, MateriaChip } from '@/components/ui';

export const dynamic = 'force-dynamic';

export default function PaginaProgramaciones() {
  const pds = getProgramaciones();
  return (
    <div>
      <Cabecera
        titulo="Programaciones didácticas"
        subtitulo="Plantilla Brújula20 · una programación por materia · curso 2026/2027"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {pds.map((pd) => (
          <div key={pd.id} className="card">
            <div className="mb-2"><MateriaChip codigo={pd.materiaCodigo} /></div>
            <h2 className="font-bold text-slate-900">{pd.titulo}</h2>
            <p className="mb-3 text-xs text-slate-500">{pd.curso} · {pd.etapa} · {pd.codigo}</p>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Link className="btn-primary" href={`/programaciones/${pd.id}`}>Abrir / editar</Link>
              <span className="text-xs text-slate-400">
                <a className="underline" href={`/api/export?tipo=pd&id=${pd.id}&formato=md`}>MD</a>{' · '}
                <a className="underline" href={`/api/export?tipo=pd&id=${pd.id}&formato=docx`}>DOCX</a>{' · '}
                <a className="underline" href={`/api/export?tipo=pd&id=${pd.id}&formato=pdf`}>PDF</a>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSesion, getGrupo } from '@/lib/db';
import { Cabecera } from '@/components/ui';
import { SesionCard } from '@/components/SesionCard';
import { EditorJSON } from '@/components/EditorJSON';

export const dynamic = 'force-dynamic';

export default async function PaginaSesion({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sesion = getSesion(Number(id));
  if (!sesion) notFound();
  const grupo = getGrupo(sesion.grupoId);

  return (
    <div>
      <Cabecera titulo="Sesión de aula" subtitulo={`${sesion.guion.grupo} · ${sesion.fecha}`} />
      <div className="mb-4">
        <Link className="btn-secondary" href="/">← Volver a Hoy</Link>
      </div>

      <div className="space-y-6">
        <SesionCard sesion={sesion} grupo={grupo} />
        <section className="card">
          <h2 className="mb-3 text-base font-bold text-slate-900">Edición (JSON)</h2>
          <EditorJSON id={sesion.id} tipo="sesion" valor={JSON.stringify(sesion.guion, null, 2)} />
        </section>
      </div>
    </div>
  );
}

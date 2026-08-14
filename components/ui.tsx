import type { MateriaCodigo } from '@/lib/tipos';
import { materiaDe } from '@/lib/curriculum';

export function MateriaChip({ codigo }: { codigo: MateriaCodigo }) {
  const m = materiaDe(codigo);
  return (
    <span
      className="chip"
      style={{ backgroundColor: m.color + '1a', color: m.color }}
      title={`${m.nombre} · ${m.curso} · ${m.caracter}`}
    >
      {m.codigo} · {m.nombre}
    </span>
  );
}

export function EstadoChip({ estado }: { estado: 'generada' | 'impartida' | 'editada' }) {
  const mapa = {
    generada: { texto: 'Generada', clase: 'bg-sky-100 text-sky-700' },
    impartida: { texto: 'Impartida', clase: 'bg-emerald-100 text-emerald-700' },
    editada: { texto: 'Editada', clase: 'bg-amber-100 text-amber-700' },
  } as const;
  const c = mapa[estado];
  return <span className={`chip ${c.clase}`}>{c.texto}</span>;
}

export function Cabecera({ titulo, subtitulo }: { titulo: string; subtitulo?: string }) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-bold text-slate-900">{titulo}</h1>
      {subtitulo && <p className="mt-1 text-sm text-slate-500">{subtitulo}</p>}
    </header>
  );
}

export function Aviso({ children }: { children: React.ReactNode }) {
  return <div className="card border-amber-200 bg-amber-50 text-sm text-amber-800">{children}</div>;
}

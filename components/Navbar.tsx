'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ENLACES = [
  { href: '/', label: 'Hoy' },
  { href: '/semana', label: 'Semana' },
  { href: '/grupos', label: 'Grupos y horario' },
  { href: '/programaciones', label: 'Programaciones' },
  { href: '/sa', label: 'Situaciones de aprendizaje' },
  { href: '/banco', label: 'Banco curricular' },
  { href: '/calendario', label: 'Calendario 26/27' },
  { href: '/exportar', label: 'Pack export' },
  { href: '/ajustes', label: 'Ajustes' },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col bg-mar text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <p className="text-lg font-bold leading-tight">Filosofía 360</p>
        <p className="text-xs text-white/70">Docente · Canarias · 2026/2027</p>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {ENLACES.map((e) => {
          const activo = e.href === '/' ? pathname === '/' : pathname.startsWith(e.href);
          return (
            <Link
              key={e.href}
              href={e.href}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                activo ? 'bg-white/15 font-semibold text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}
            >
              {e.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 px-5 py-3 text-[11px] text-white/60">
        100 % local · sin nube · backup JSON
      </div>
    </aside>
  );
}

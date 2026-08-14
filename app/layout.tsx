import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Filosofía 360 — Preparador de clases (Canarias 26/27)',
  description:
    'Preparador local de clases de Filosofía para el curso 2026/2027 en Canarias. LOMLOE, Decreto 30/2023.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="flex min-h-screen">
          <Navbar />
          <main className="min-w-0 flex-1 px-6 py-6 lg:px-10">{children}</main>
        </div>
      </body>
    </html>
  );
}

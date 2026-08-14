'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  accionPrepararDia,
  accionPrepararSemana,
  accionRegenerarSesion,
  accionMarcarSesion,
} from '@/app/actions';

function useAccion() {
  const router = useRouter();
  const [pendiente, start] = useTransition();
  const [mensaje, setMensaje] = useState<{ ok: boolean; texto: string } | null>(null);

  function ejecutar(fn: () => Promise<{ ok: boolean; mensaje?: string; generadas?: number }>) {
    setMensaje(null);
    start(async () => {
      const r = await fn();
      setMensaje({ ok: r.ok, texto: r.mensaje ?? (r.ok ? 'Hecho.' : 'Error.') });
      router.refresh();
    });
  }

  return { pendiente, mensaje, ejecutar };
}

export function BotonPrepararDia({ fecha, lectivo }: { fecha: string; lectivo: boolean }) {
  const { pendiente, mensaje, ejecutar } = useAccion();
  if (!lectivo) return null;
  return (
    <div className="inline-flex items-center gap-3">
      <button className="btn-primary" disabled={pendiente} onClick={() => ejecutar(() => accionPrepararDia(fecha))}>
        {pendiente ? 'Preparando…' : 'Preparar el día'}
      </button>
      {mensaje && <span className="text-sm text-slate-500">{mensaje.texto}</span>}
    </div>
  );
}

export function BotonPrepararSemana({ fecha }: { fecha: string }) {
  const { pendiente, mensaje, ejecutar } = useAccion();
  return (
    <div className="inline-flex items-center gap-3">
      <button className="btn-primary" disabled={pendiente} onClick={() => ejecutar(() => accionPrepararSemana(fecha))}>
        {pendiente ? 'Preparando…' : 'Preparar toda la semana'}
      </button>
      {mensaje && <span className="text-sm text-slate-500">{mensaje.texto}</span>}
    </div>
  );
}

export function BotonRegenerar({ sesionId }: { sesionId: number }) {
  const { pendiente, ejecutar } = useAccion();
  return (
    <button className="btn-secondary" disabled={pendiente} onClick={() => ejecutar(() => accionRegenerarSesion(sesionId))}>
      {pendiente ? '…' : 'Regenerar'}
    </button>
  );
}

export function BotonMarcar({ sesionId, estado }: { sesionId: number; estado: 'generada' | 'impartida' | 'editada' }) {
  const { pendiente, ejecutar } = useAccion();
  const label = estado === 'impartida' ? 'Marcar impartida' : estado === 'generada' ? 'Marcar generada' : 'Marcar editada';
  return (
    <button className="btn-secondary" disabled={pendiente} onClick={() => ejecutar(() => accionMarcarSesion(sesionId, estado))}>
      {label}
    </button>
  );
}

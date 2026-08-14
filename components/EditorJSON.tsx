'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  accionGuardarProgramacion,
  accionGuardarSituacion,
  accionGuardarGuion,
} from '@/app/actions';

type Tipo = 'pd' | 'sa' | 'sesion';

export function EditorJSON({
  id,
  tipo,
  valor,
  altura = 360,
}: {
  id: number;
  tipo: Tipo;
  valor: string;
  altura?: number;
}) {
  const router = useRouter();
  const [texto, setTexto] = useState(valor);
  const [pendiente, start] = useTransition();
  const [mensaje, setMensaje] = useState<string | null>(null);

  function guardar() {
    let parsed: unknown;
    try {
      parsed = JSON.parse(texto);
    } catch (e) {
      setMensaje('JSON inválido: ' + (e instanceof Error ? e.message : 'revisa la sintaxis'));
      return;
    }
    const pretty = JSON.stringify(parsed, null, 2);
    setTexto(pretty);
    setMensaje(null);
    start(async () => {
      const r =
        tipo === 'pd'
          ? await accionGuardarProgramacion(id, pretty)
          : tipo === 'sa'
            ? await accionGuardarSituacion(id, pretty)
            : await accionGuardarGuion(id, pretty);
      setMensaje(r.ok ? 'Guardado correctamente.' : r.mensaje ?? 'Error al guardar.');
      router.refresh();
    });
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-slate-500">Edición en JSON (los cambios se guardan en local)</span>
        <button className="btn-primary" disabled={pendiente} onClick={guardar}>
          {pendiente ? 'Guardando…' : 'Guardar cambios'}
        </button>
      </div>
      <textarea
        className="input h-auto w-full font-mono text-xs leading-relaxed"
        style={{ minHeight: altura }}
        spellCheck={false}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      {mensaje && (
        <p className={`mt-2 text-sm ${mensaje.startsWith('Guardado') ? 'text-emerald-600' : 'text-red-600'}`}>
          {mensaje}
        </p>
      )}
    </div>
  );
}

'use server';

import { revalidatePath } from 'next/cache';
import { getDb, getSesion } from '@/lib/db';
import { prepararFecha, prepararSemana, generarSesion } from '@/lib/sesiones';
import { seedIfEmpty } from '@/lib/seed';
import { importarBackup } from '@/lib/backup';
import type { GuionSesion } from '@/lib/tipos';

function refrescar() {
  revalidatePath('/', 'layout');
}

export async function accionPrepararDia(fecha: string) {
  const resultado = prepararFecha(fecha);
  refrescar();
  return { ok: true, generadas: resultado.generadas.length, saltadas: resultado.saltadas.length, esLectivo: resultado.esLectivo };
}

export async function accionPrepararSemana(fecha: string) {
  const resultados = prepararSemana(fecha);
  const generadas = resultados.reduce((n, r) => n + r.generadas.length, 0);
  refrescar();
  return { ok: true, generadas, dias: resultados.length };
}

export async function accionRegenerarSesion(sesionId: number) {
  const sesion = getSesion(sesionId);
  if (!sesion) return { ok: false, mensaje: 'Sesión no encontrada.' };
  const guion = generarSesion(sesion.grupoId, sesion.fecha);
  if (!guion) return { ok: false, mensaje: 'No se puede regenerar: fecha fuera del periodo lectivo.' };
  const db = getDb();
  db.prepare('UPDATE sesiones SET guion = ?, titulo = ?, estado = ?, actualizada = ? WHERE id = ?').run(
    JSON.stringify(guion),
    guion.titulo,
    'generada',
    new Date().toISOString(),
    sesionId,
  );
  refrescar();
  return { ok: true };
}

export async function accionMarcarSesion(sesionId: number, estado: 'generada' | 'impartida' | 'editada') {
  const db = getDb();
  db.prepare('UPDATE sesiones SET estado = ?, actualizada = ? WHERE id = ?').run(estado, new Date().toISOString(), sesionId);
  refrescar();
  return { ok: true };
}

export async function accionGuardarGuion(sesionId: number, guionJson: string) {
  const db = getDb();
  const sesion = getSesion(sesionId);
  if (!sesion) return { ok: false, mensaje: 'Sesión no encontrada.' };
  try {
    const guion = JSON.parse(guionJson) as GuionSesion;
    if (!guion.secuencia || !Array.isArray(guion.secuencia)) throw new Error('Formato de guion inválido.');
    db.prepare('UPDATE sesiones SET guion = ?, titulo = ?, estado = ?, actualizada = ? WHERE id = ?').run(
      JSON.stringify(guion),
      guion.titulo,
      'editada',
      new Date().toISOString(),
      sesionId,
    );
    refrescar();
    return { ok: true };
  } catch {
    return { ok: false, mensaje: 'JSON inválido.' };
  }
}

export async function accionGuardarProgramacion(id: number, datosJson: string) {
  const db = getDb();
  try {
    const datos = JSON.parse(datosJson) as Record<string, unknown>;
    if (typeof datos !== 'object' || datos === null) throw new Error('inválido');
    db.prepare('UPDATE programaciones SET datos = ?, actualizada = ? WHERE id = ?').run(JSON.stringify(datos), new Date().toISOString(), id);
    refrescar();
    return { ok: true };
  } catch {
    return { ok: false, mensaje: 'JSON inválido.' };
  }
}

export async function accionGuardarSituacion(id: number, datosJson: string) {
  const db = getDb();
  try {
    const datos = JSON.parse(datosJson) as Record<string, unknown>;
    if (typeof datos !== 'object' || datos === null) throw new Error('inválido');
    db.prepare('UPDATE situaciones SET datos = ?, actualizada = ? WHERE id = ?').run(JSON.stringify(datos), new Date().toISOString(), id);
    refrescar();
    return { ok: true };
  } catch {
    return { ok: false, mensaje: 'JSON inválido.' };
  }
}

export async function accionGuardarSettings(cambios: Record<string, string>) {
  const db = getDb();
  const stmt = db.prepare('INSERT INTO settings (clave, valor) VALUES (?, ?) ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor');
  for (const [clave, valor] of Object.entries(cambios)) {
    stmt.run(clave, valor);
  }
  refrescar();
  return { ok: true };
}

export async function accionRestaurarBackup(jsonString: string) {
  try {
    const data = JSON.parse(jsonString);
    const r = importarBackup(data);
    refrescar();
    return r;
  } catch {
    return { ok: false, mensaje: 'No se pudo leer el archivo.' };
  }
}

export async function accionResetSeed() {
  const db = getDb();
  const tablas = ['recursos', 'sesiones', 'situaciones', 'programaciones', 'fuentes', 'calendario_dias', 'horario_slots', 'grupos', 'settings'];
  const limpiar = db.transaction(() => {
    for (const t of tablas) db.prepare(`DELETE FROM ${t}`).run();
  });
  limpiar();
  seedIfEmpty(db);
  refrescar();
  return { ok: true, mensaje: 'Datos de ejemplo restablecidos.' };
}

import { getDb } from '@/lib/db';

// Copia de seguridad local en JSON (todas las tablas). Restauración idempotente
// sobre una base vacía (se vacían las tablas y se reinsertan las filas).

export interface BackupData {
  exportado: string;
  app: string;
  version: number;
  tablas: Record<string, unknown[]>;
}

export function exportarBackup(): BackupData {
  const db = getDb();
  const tablas: Record<string, unknown[]> = {};
  const nombres = [
    'grupos',
    'horario_slots',
    'calendario_dias',
    'programaciones',
    'situaciones',
    'sesiones',
    'recursos',
    'fuentes',
    'settings',
  ];
  for (const t of nombres) {
    tablas[t] = db.prepare(`SELECT * FROM ${t}`).all() as unknown[];
  }
  return {
    exportado: new Date().toISOString(),
    app: 'filosofia360',
    version: 1,
    tablas,
  };
}

export function importarBackup(data: BackupData): { ok: boolean; mensaje: string } {
  if (!data || data.app !== 'filosofia360' || !data.tablas) {
    return { ok: false, mensaje: 'El archivo no parece una copia de seguridad válida.' };
  }
  const db = getDb();
  const orden = [
    'grupos',
    'horario_slots',
    'calendario_dias',
    'programaciones',
    'situaciones',
    'sesiones',
    'recursos',
    'fuentes',
    'settings',
  ];
  const insert = db.transaction(() => {
    for (const t of orden) {
      const filas = (data.tablas[t] ?? []) as Record<string, unknown>[];
      if (filas.length === 0) continue;
      const columnas = Object.keys(filas[0]);
      const sql = `INSERT OR REPLACE INTO ${t} (${columnas.map((c) => `"${c}"`).join(', ')}) VALUES (${columnas.map(() => '?').join(', ')})`;
      const stmt = db.prepare(sql);
      for (const f of filas) {
        stmt.run(...columnas.map((c) => f[c]));
      }
    }
  });
  insert();
  return { ok: true, mensaje: 'Copia de seguridad restaurada.' };
}

import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import type {
  Grupo,
  HorarioSlot,
  CalendarioDia,
  SesionAula,
  GuionSesion,
  FuenteCurricular,
  MateriaCodigo,
  TipoDia,
} from '@/lib/tipos';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'app.db');

let db: Database.Database | null = null;

const DDL = `
CREATE TABLE IF NOT EXISTS grupos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  materia_codigo TEXT NOT NULL,
  curso TEXT NOT NULL,
  nivel TEXT NOT NULL,
  aula TEXT NOT NULL,
  alumnos INTEGER NOT NULL DEFAULT 20
);

CREATE TABLE IF NOT EXISTS horario_slots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  grupo_id INTEGER NOT NULL REFERENCES grupos(id) ON DELETE CASCADE,
  dia_semana INTEGER NOT NULL,
  hora_inicio TEXT NOT NULL,
  hora_fin TEXT NOT NULL,
  materia_codigo TEXT NOT NULL,
  aula TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS calendario_dias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha TEXT NOT NULL UNIQUE,
  tipo TEXT NOT NULL,
  nombre TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS programaciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  materia_codigo TEXT NOT NULL,
  curso TEXT NOT NULL,
  etapa TEXT NOT NULL,
  datos TEXT NOT NULL,
  creada TEXT NOT NULL,
  actualizada TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS situaciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pd_id INTEGER REFERENCES programaciones(id) ON DELETE SET NULL,
  codigo TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  materia_codigo TEXT NOT NULL,
  curso TEXT NOT NULL,
  datos TEXT NOT NULL,
  creada TEXT NOT NULL,
  actualizada TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sesiones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  grupo_id INTEGER NOT NULL REFERENCES grupos(id) ON DELETE CASCADE,
  fecha TEXT NOT NULL,
  sa_id INTEGER REFERENCES situaciones(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  guion TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'generada',
  creada TEXT NOT NULL,
  actualizada TEXT NOT NULL,
  UNIQUE (grupo_id, fecha)
);

CREATE TABLE IF NOT EXISTS recursos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sesion_id INTEGER REFERENCES sesiones(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  nombre TEXT NOT NULL,
  creada TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fuentes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo TEXT NOT NULL,
  materia_codigo TEXT NOT NULL,
  tipo TEXT NOT NULL,
  bloque TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  fuente TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  clave TEXT PRIMARY KEY,
  valor TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_slots_grupo ON horario_slots(grupo_id);
CREATE INDEX IF NOT EXISTS idx_slots_dia ON horario_slots(dia_semana);
CREATE INDEX IF NOT EXISTS idx_calendario_fecha ON calendario_dias(fecha);
CREATE INDEX IF NOT EXISTS idx_sesiones_fecha ON sesiones(fecha);
CREATE INDEX IF NOT EXISTS idx_sesiones_grupo ON sesiones(grupo_id);
`;

export function getDb(): Database.Database {
  if (db) return db;
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(DDL);
  seedIfEmpty(db);
  return db;
}

// El seed se importa de forma diferida para evitar ciclos de importación.
import { seedIfEmpty } from '@/lib/seed';

export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}

// -------------------- Helpers de lectura tipada --------------------

interface GrupoRow {
  id: number;
  codigo: string;
  nombre: string;
  materia_codigo: MateriaCodigo;
  curso: string;
  nivel: string;
  aula: string;
  alumnos: number;
}

interface SlotRow {
  id: number;
  grupo_id: number;
  dia_semana: number;
  hora_inicio: string;
  hora_fin: string;
  materia_codigo: MateriaCodigo;
  aula: string;
}

function grupoFromRow(r: GrupoRow): Grupo {
  return {
    id: r.id,
    codigo: r.codigo,
    nombre: r.nombre,
    materiaCodigo: r.materia_codigo,
    curso: r.curso,
    nivel: r.nivel,
    aula: r.aula,
    alumnos: r.alumnos,
  };
}

function slotFromRow(r: SlotRow): HorarioSlot {
  return {
    id: r.id,
    grupoId: r.grupo_id,
    diaSemana: r.dia_semana,
    horaInicio: r.hora_inicio,
    horaFin: r.hora_fin,
    materiaCodigo: r.materia_codigo,
    aula: r.aula,
  };
}

export function getGrupos(): Grupo[] {
  const rows = getDb().prepare('SELECT * FROM grupos ORDER BY id').all() as GrupoRow[];
  return rows.map(grupoFromRow);
}

export function getGrupo(id: number): Grupo | null {
  const row = getDb().prepare('SELECT * FROM grupos WHERE id = ?').get(id) as GrupoRow | undefined;
  return row ? grupoFromRow(row) : null;
}

export function getSlots(): HorarioSlot[] {
  const rows = getDb().prepare('SELECT * FROM horario_slots ORDER BY dia_semana, hora_inicio').all() as SlotRow[];
  return rows.map(slotFromRow);
}

export function getSlotsDeGrupo(grupoId: number): HorarioSlot[] {
  const rows = getDb().prepare('SELECT * FROM horario_slots WHERE grupo_id = ? ORDER BY dia_semana, hora_inicio').all(grupoId) as SlotRow[];
  return rows.map(slotFromRow);
}

export function getCalendario(): CalendarioDia[] {
  const rows = getDb().prepare('SELECT * FROM calendario_dias ORDER BY fecha').all() as {
    id: number;
    fecha: string;
    tipo: TipoDia;
    nombre: string;
  }[];
  return rows.map((r) => ({ id: r.id, fecha: r.fecha, tipo: r.tipo, nombre: r.nombre }));
}

export function getTipoDia(fecha: string): TipoDia | null {
  const row = getDb().prepare('SELECT tipo FROM calendario_dias WHERE fecha = ?').get(fecha) as { tipo: TipoDia } | undefined;
  return row ? row.tipo : null;
}

export function getFuentes(): FuenteCurricular[] {
  const rows = getDb().prepare('SELECT * FROM fuentes ORDER BY materia_codigo, tipo, bloque').all() as {
    id: number;
    codigo: string;
    materia_codigo: MateriaCodigo;
    tipo: 'saber' | 'criterio' | 'competencia';
    bloque: string;
    descripcion: string;
    fuente: string;
  }[];
  return rows.map((r) => ({
    id: r.id,
    codigo: r.codigo,
    materiaCodigo: r.materia_codigo,
    tipo: r.tipo,
    bloque: r.bloque,
    descripcion: r.descripcion,
    fuente: r.fuente,
  }));
}

export function getSesionesDeFecha(fecha: string): SesionAula[] {
  const rows = getDb()
    .prepare('SELECT * FROM sesiones WHERE fecha = ? ORDER BY id')
    .all(fecha) as {
    id: number;
    grupo_id: number;
    fecha: string;
    sa_id: number | null;
    titulo: string;
    guion: string;
    estado: 'generada' | 'impartida' | 'editada';
    creada: string;
    actualizada: string;
  }[];
  return rows.map((r) => ({
    id: r.id,
    grupoId: r.grupo_id,
    fecha: r.fecha,
    saId: r.sa_id,
    titulo: r.titulo,
    guion: JSON.parse(r.guion) as GuionSesion,
    estado: r.estado,
    creada: r.creada,
    actualizada: r.actualizada,
  }));
}

export function getSesion(id: number): SesionAula | null {
  const row = getDb().prepare('SELECT * FROM sesiones WHERE id = ?').get(id) as
    | {
        id: number;
        grupo_id: number;
        fecha: string;
        sa_id: number | null;
        titulo: string;
        guion: string;
        estado: 'generada' | 'impartida' | 'editada';
        creada: string;
        actualizada: string;
      }
    | undefined;
  if (!row) return null;
  return {
    id: row.id,
    grupoId: row.grupo_id,
    fecha: row.fecha,
    saId: row.sa_id,
    titulo: row.titulo,
    guion: JSON.parse(row.guion) as GuionSesion,
    estado: row.estado,
    creada: row.creada,
    actualizada: row.actualizada,
  };
}

export function getSesionesRango(inicio: string, fin: string): SesionAula[] {
  const rows = getDb()
    .prepare('SELECT * FROM sesiones WHERE fecha BETWEEN ? AND ? ORDER BY fecha, id')
    .all(inicio, fin) as {
    id: number;
    grupo_id: number;
    fecha: string;
    sa_id: number | null;
    titulo: string;
    guion: string;
    estado: 'generada' | 'impartida' | 'editada';
    creada: string;
    actualizada: string;
  }[];
  return rows.map((r) => ({
    id: r.id,
    grupoId: r.grupo_id,
    fecha: r.fecha,
    saId: r.sa_id,
    titulo: r.titulo,
    guion: JSON.parse(r.guion) as GuionSesion,
    estado: r.estado,
    creada: r.creada,
    actualizada: r.actualizada,
  }));
}

export interface ProgramacionRow {
  id: number;
  codigo: string;
  titulo: string;
  materiaCodigo: MateriaCodigo;
  curso: string;
  etapa: string;
  datos: string; // JSON
  creada: string;
  actualizada: string;
}

export function getProgramaciones(): ProgramacionRow[] {
  const rows = getDb().prepare('SELECT * FROM programaciones ORDER BY materia_codigo, id').all() as {
    id: number;
    codigo: string;
    titulo: string;
    materia_codigo: MateriaCodigo;
    curso: string;
    etapa: string;
    datos: string;
    creada: string;
    actualizada: string;
  }[];
  return rows.map((r) => ({
    id: r.id,
    codigo: r.codigo,
    titulo: r.titulo,
    materiaCodigo: r.materia_codigo,
    curso: r.curso,
    etapa: r.etapa,
    datos: r.datos,
    creada: r.creada,
    actualizada: r.actualizada,
  }));
}

export function getProgramacion(id: number): ProgramacionRow | null {
  const row = getDb().prepare('SELECT * FROM programaciones WHERE id = ?').get(id) as
    | {
        id: number;
        codigo: string;
        titulo: string;
        materia_codigo: MateriaCodigo;
        curso: string;
        etapa: string;
        datos: string;
        creada: string;
        actualizada: string;
      }
    | undefined;
  if (!row) return null;
  return {
    id: row.id,
    codigo: row.codigo,
    titulo: row.titulo,
    materiaCodigo: row.materia_codigo,
    curso: row.curso,
    etapa: row.etapa,
    datos: row.datos,
    creada: row.creada,
    actualizada: row.actualizada,
  };
}

export interface SituacionRow {
  id: number;
  pdId: number | null;
  codigo: string;
  titulo: string;
  materiaCodigo: MateriaCodigo;
  curso: string;
  datos: string; // JSON
  creada: string;
  actualizada: string;
}

export function getSituaciones(): SituacionRow[] {
  const rows = getDb().prepare('SELECT * FROM situaciones ORDER BY materia_codigo, id').all() as {
    id: number;
    pd_id: number | null;
    codigo: string;
    titulo: string;
    materia_codigo: MateriaCodigo;
    curso: string;
    datos: string;
    creada: string;
    actualizada: string;
  }[];
  return rows.map((r) => ({
    id: r.id,
    pdId: r.pd_id,
    codigo: r.codigo,
    titulo: r.titulo,
    materiaCodigo: r.materia_codigo,
    curso: r.curso,
    datos: r.datos,
    creada: r.creada,
    actualizada: r.actualizada,
  }));
}

export function getSituacion(id: number): SituacionRow | null {
  const row = getDb().prepare('SELECT * FROM situaciones WHERE id = ?').get(id) as
    | {
        id: number;
        pd_id: number | null;
        codigo: string;
        titulo: string;
        materia_codigo: MateriaCodigo;
        curso: string;
        datos: string;
        creada: string;
        actualizada: string;
      }
    | undefined;
  if (!row) return null;
  return {
    id: row.id,
    pdId: row.pd_id,
    codigo: row.codigo,
    titulo: row.titulo,
    materiaCodigo: row.materia_codigo,
    curso: row.curso,
    datos: row.datos,
    creada: row.creada,
    actualizada: row.actualizada,
  };
}

export function getSetting(clave: string): string | null {
  const row = getDb().prepare('SELECT valor FROM settings WHERE clave = ?').get(clave) as { valor: string } | undefined;
  return row ? row.valor : null;
}

export function setSetting(clave: string, valor: string): void {
  getDb()
    .prepare('INSERT INTO settings (clave, valor) VALUES (?, ?) ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor')
    .run(clave, valor);
}

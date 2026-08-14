import type {
  Grupo,
  GuionSesion,
  MomentoGuion,
  SesionAula,
  Unidad,
  Actividad,
} from '@/lib/tipos';
import { materiaDe, curriculoDe } from '@/lib/curriculum';
import {
  getCalendario,
  getSlots,
  getSlotsDeGrupo,
  getGrupo,
  getGrupos,
  getSesion,
  getSesionesDeFecha,
  getDb,
} from '@/lib/db';
import { INICIO_CURSO, ultimoDiaLectivo } from '@/lib/seed';
import {
  diaSemanaISO,
  esFinDeSemana,
  sumarDias,
  lunesDeLaSemana,
} from '@/lib/calendar';

const DURACION_PERIODO = 55; // minutos

// Fechas lectivas reales de un grupo (cruza calendario del centro con su horario).
export function fechasLectivasDeGrupo(grupoId: number): string[] {
  const grupo = getGrupo(grupoId);
  if (!grupo) return [];
  const slots = getSlotsDeGrupo(grupoId);
  const diasConClase = new Set(slots.map((s) => s.diaSemana));
  const tipoPorFecha = new Map(getCalendario().map((c) => [c.fecha, c.tipo]));
  const fin = ultimoDiaLectivo(grupo.materiaCodigo);
  const fechas: string[] = [];
  let f = INICIO_CURSO;
  while (f <= fin) {
    if (tipoPorFecha.get(f) === 'lectivo' && diasConClase.has(diaSemanaISO(f))) {
      fechas.push(f);
    }
    f = sumarDias(f, 1);
  }
  return fechas;
}

// -------------------- Selección determinista de unidad y actividad --------------------

interface Seleccion {
  unidad: Unidad;
  actividad: Actividad;
  repeticion: number; // cuántas veces se ha usado ya esta actividad (para variar)
}

function seleccionarContenido(grupo: Grupo, fecha: string): Seleccion | null {
  const cur = curriculoDe(grupo.materiaCodigo);
  const fechas = fechasLectivasDeGrupo(grupo.id);
  const idx = fechas.indexOf(fecha);
  if (idx < 0) return null;
  const unidades = cur.unidades;
  const total = fechas.length;
  const sesionesPorUnidad = Math.max(1, Math.ceil(total / unidades.length));
  const unidadIndex = Math.min(unidades.length - 1, Math.floor(idx / sesionesPorUnidad));
  const unidad = unidades[unidadIndex];
  const pos = idx % sesionesPorUnidad;
  const actividad = unidad.actividades[pos % unidad.actividades.length];
  const repeticion = Math.floor(pos / unidad.actividades.length);
  return { unidad, actividad, repeticion };
}

// -------------------- Construcción del guion --------------------

function objetivoDe(unidad: Unidad, actividad: Actividad): string {
  const verbo =
    actividad.tipo === 'lectura'
      ? 'Comprender y comentar'
      : actividad.tipo === 'dialogo'
        ? 'Dialogar y argumentar sobre'
        : actividad.tipo === 'taller'
          ? 'Elaborar y aplicar'
          : actividad.tipo === 'apertura'
            ? 'Introducir'
            : 'Sintetizar y valorar';
  return `${verbo} el tema «${unidad.titulo.toLowerCase()}»: ${actividad.titulo.toLowerCase()}.`;
}

export function construirGuion(grupo: Grupo, fecha: string, seleccion: Seleccion): GuionSesion {
  const materia = materiaDe(grupo.materiaCodigo);
  const { unidad, actividad, repeticion } = seleccion;
  const esRepaso = repeticion > 0;

  const secuencia: MomentoGuion[] = [];

  secuencia.push({
    momento: 'inicio',
    titulo: 'Activación y presentación',
    duracionMin: 8,
    descripcion: esRepaso
      ? `Saludo y recuerdo rápido de lo trabajado en la unidad «${unidad.titulo}». Se replantea el problema de fondo para profundizar.`
      : `Saludo y lluvia de ideas inicial sobre el tema de hoy. Se presenta el objetivo: ${objetivoDe(unidad, actividad)}`,
    preguntas: esRepaso ? [unidad.saberes[0] ?? '¿Qué recordamos de la sesión anterior?'] : undefined,
  });

  secuencia.push({
    momento: 'desarrollo',
    titulo: actividad.titulo + (esRepaso ? ' (profundización)' : ''),
    duracionMin: Math.min(DURACION_PERIODO - 15, actividad.duracionMin + 12),
    descripcion: actividad.descripcion,
    texto: actividad.texto,
    preguntas: actividad.preguntas,
  });

  const preguntaCierre =
    actividad.preguntas && actividad.preguntas.length > 0
      ? actividad.preguntas[actividad.preguntas.length - 1]
      : '¿Qué idea de la sesión te ha hecho pensar más?';

  secuencia.push({
    momento: 'cierre',
    titulo: 'Síntesis y tarea para casa',
    duracionMin: 7,
    descripcion: 'Recapitulación de las ideas principales y resolución de dudas. Se anota la tarea en el cuaderno.',
    preguntas: [preguntaCierre],
  });

  return {
    titulo: `${unidad.numero}. ${unidad.titulo} — ${actividad.titulo}`,
    materia: materia.nombre,
    materiaCodigo: grupo.materiaCodigo,
    grupo: grupo.nombre,
    curso: grupo.curso,
    fecha,
    duracionMin: DURACION_PERIODO,
    objetivo: objetivoDe(unidad, actividad),
    saberes: unidad.saberes,
    criterios: unidad.criterios,
    secuencia,
    materiales: [
      'Cuaderno de clase del alumnado',
      'Pizarra y proyector',
      ...(actividad.texto ? ['Texto de la actividad (fotocopia o proyección)'] : []),
      'Cronómetro o reloj de aula',
    ],
    evaluacion: [
      {
        instrumento: 'Participación en el diálogo',
        evidencia: 'Intervenciones argumentadas durante la sesión',
        momento: 'Durante la sesión',
      },
      {
        instrumento: 'Cuaderno de clase',
        evidencia: `Respuesta escrita a: ${preguntaCierre}`,
        momento: 'Cierre / casa',
      },
    ],
    atencionDiversidad: [
      'Textos con lectura guiada y apoyo de vocabulario.',
      'Trabajo por parejas para quienes necesiten apoyo entre iguales.',
      'Posibilidad de responder oralmente o por escrito según perfil.',
    ],
    tareaCasa: `Responder por escrito en el cuaderno (mínimo 4 líneas): ${preguntaCierre}`,
  };
}

// -------------------- Generación y persistencia --------------------

export function generarSesion(grupoId: number, fecha: string): GuionSesion | null {
  const grupo = getGrupo(grupoId);
  if (!grupo) return null;
  const seleccion = seleccionarContenido(grupo, fecha);
  if (!seleccion) return null;
  return construirGuion(grupo, fecha, seleccion);
}

function saIdPara(grupo: Grupo, fecha: string): number | null {
  const seleccion = seleccionarContenido(grupo, fecha);
  if (!seleccion) return null;
  const codigo = `SA-${grupo.materiaCodigo}-${String(seleccion.unidad.numero).padStart(2, '0')}`;
  const row = getDb().prepare('SELECT id FROM situaciones WHERE codigo = ?').get(codigo) as { id: number } | undefined;
  return row ? row.id : null;
}

function upsertSesion(grupoId: number, fecha: string, guion: GuionSesion, saId: number | null): SesionAula {
  const db = getDb();
  const ahora = new Date().toISOString();
  const existente = db.prepare('SELECT id FROM sesiones WHERE grupo_id = ? AND fecha = ?').get(grupoId, fecha) as { id: number } | undefined;
  if (existente) {
    db.prepare('UPDATE sesiones SET guion = ?, titulo = ?, sa_id = ?, estado = ?, actualizada = ? WHERE id = ?').run(
      JSON.stringify(guion),
      guion.titulo,
      saId,
      'generada',
      ahora,
      existente.id,
    );
    return getSesion(existente.id)!;
  }
  const info = db
    .prepare('INSERT INTO sesiones (grupo_id, fecha, sa_id, titulo, guion, estado, creada, actualizada) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run(grupoId, fecha, saId, guion.titulo, JSON.stringify(guion), 'generada', ahora, ahora);
  return getSesion(Number(info.lastInsertRowid))!;
}

export interface ResultadoPreparacion {
  fecha: string;
  generadas: SesionAula[];
  saltadas: { grupo: string; motivo: string }[];
  esLectivo: boolean;
}

export function gruposConClaseEnFecha(fecha: string): Grupo[] {
  if (esFinDeSemana(fecha)) return [];
  const dia = diaSemanaISO(fecha);
  const grupos = getGrupos();
  const slots = getSlots();
  const ids = new Set(slots.filter((s) => s.diaSemana === dia).map((s) => s.grupoId));
  return grupos.filter((g) => ids.has(g.id));
}

export function prepararFecha(fecha: string): ResultadoPreparacion {
  const db = getDb();
  const tipo = db.prepare('SELECT tipo FROM calendario_dias WHERE fecha = ?').get(fecha) as { tipo: string } | undefined;
  const esLectivo = tipo?.tipo === 'lectivo';
  const resultado: ResultadoPreparacion = { fecha, generadas: [], saltadas: [], esLectivo };

  if (!esLectivo) return resultado;

  const grupos = gruposConClaseEnFecha(fecha);
  for (const g of grupos) {
    const guion = generarSesion(g.id, fecha);
    if (!guion) {
      resultado.saltadas.push({ grupo: g.nombre, motivo: 'Fuera del periodo lectivo del grupo' });
      continue;
    }
    const sesion = upsertSesion(g.id, fecha, guion, saIdPara(g, fecha));
    resultado.generadas.push(sesion);
  }
  return resultado;
}

export function prepararSemana(fecha: string): ResultadoPreparacion[] {
  const lunes = lunesDeLaSemana(fecha);
  return [0, 1, 2, 3, 4].map((i) => prepararFecha(sumarDias(lunes, i)));
}

// Resumen para las pantallas Hoy/Semana.
export function resumenDia(fecha: string): {
  esLectivo: boolean;
  motivoNoLectivo: string;
  sesiones: SesionAula[];
  grupos: Grupo[];
} {
  const db = getDb();
  const cal = db.prepare('SELECT tipo, nombre FROM calendario_dias WHERE fecha = ?').get(fecha) as { tipo: string; nombre: string } | undefined;
  const esLectivo = cal?.tipo === 'lectivo';
  const grupos = gruposConClaseEnFecha(fecha);
  const sesiones = getSesionesDeFecha(fecha);
  return {
    esLectivo,
    motivoNoLectivo: cal
      ? cal.tipo === 'festivo'
        ? cal.nombre || 'Festivo'
        : cal.tipo === 'vacaciones'
          ? cal.nombre || 'Vacaciones'
          : 'Fin de curso'
      : esFinDeSemana(fecha)
        ? 'Fin de semana'
        : 'Fuera del periodo lectivo (vacaciones)',
    sesiones,
    grupos,
  };
}

// Devuelve la siguiente fecha lectiva (>= desde) que tenga clase el grupo.
export function proximaFechaConClase(grupoId: number, desde: string, limite = 60): string | null {
  const fechas = fechasLectivasDeGrupo(grupoId);
  const idx = fechas.findIndex((f) => f >= desde);
  if (idx < 0) return null;
  return fechas[idx];
}

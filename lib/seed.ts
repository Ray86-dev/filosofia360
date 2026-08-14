import type Database from 'better-sqlite3';
import { MATERIAS, CURRICULO } from '@/lib/curriculum';
import type { MateriaCodigo } from '@/lib/tipos';
import { diaSemanaISO, formatFecha, parseFecha, sumarDias, isValidFecha } from '@/lib/calendar';

const CURSO = '2026/2027';
export const INICIO_CURSO = '2026-09-10'; // jueves
export const FIN_CURSO_GENERAL = '2027-06-18'; // viernes
const FIN_CURSO_2BACH = '2027-05-28'; // viernes, antes de la EBAU

// -------------------- Horario del departamento --------------------
// Un único docente. 6 periodos/día. Sin solapamientos.
const PERIODOS = [
  { n: 1, inicio: '08:30', fin: '09:25' },
  { n: 2, inicio: '09:25', fin: '10:20' },
  { n: 3, inicio: '10:50', fin: '11:45' },
  { n: 4, inicio: '11:45', fin: '12:40' },
  { n: 5, inicio: '12:40', fin: '13:35' },
  { n: 6, inicio: '13:35', fin: '14:30' },
];

interface GrupoSeed {
  codigo: string;
  nombre: string;
  materiaCodigo: MateriaCodigo;
  curso: string;
  nivel: string;
  aula: string;
  alumnos: number;
}

const GRUPOS: GrupoSeed[] = [
  { codigo: '1ESOA', nombre: '1.º ESO A', materiaCodigo: 'EVCE1', curso: '1.º ESO', nivel: 'ESO', aula: 'A1.1', alumnos: 26 },
  { codigo: '1ESOB', nombre: '1.º ESO B', materiaCodigo: 'EVCE1', curso: '1.º ESO', nivel: 'ESO', aula: 'A1.2', alumnos: 25 },
  { codigo: '4ESOA', nombre: '4.º ESO A', materiaCodigo: 'FIL4', curso: '4.º ESO', nivel: 'ESO', aula: 'B2.1', alumnos: 24 },
  { codigo: '4ESOB', nombre: '4.º ESO B', materiaCodigo: 'FIL4', curso: '4.º ESO', nivel: 'ESO', aula: 'B2.2', alumnos: 22 },
  { codigo: '1BACA', nombre: '1.º Bach A', materiaCodigo: 'FIL1B', curso: '1.º Bachillerato', nivel: 'Bachillerato', aula: 'B1.1', alumnos: 28 },
  { codigo: '1BACB', nombre: '1.º Bach B', materiaCodigo: 'FIL1B', curso: '1.º Bachillerato', nivel: 'Bachillerato', aula: 'B1.2', alumnos: 26 },
  { codigo: '2BACA', nombre: '2.º Bach A', materiaCodigo: 'HDF2B', curso: '2.º Bachillerato', nivel: 'Bachillerato', aula: 'B1.3', alumnos: 24 },
  { codigo: '2BACB', nombre: '2.º Bach B', materiaCodigo: 'HDF2B', curso: '2.º Bachillerato', nivel: 'Bachillerato', aula: 'B1.4', alumnos: 21 },
  { codigo: 'PSI1', nombre: 'Psicología (Bach)', materiaCodigo: 'PSI', curso: '1.º / 2.º Bachillerato', nivel: 'Bachillerato', aula: 'B0.5', alumnos: 20 },
];

// [codigoGrupo, diaSemana(1-5), periodo(1-6)]
const HORARIO: [string, number, number][] = [
  // Lunes
  ['2BACA', 1, 1], ['2BACB', 1, 2], ['1BACA', 1, 3], ['1BACB', 1, 4], ['4ESOA', 1, 5],
  // Martes
  ['1BACA', 2, 1], ['1BACB', 2, 2], ['4ESOA', 2, 3], ['4ESOB', 2, 4], ['2BACA', 2, 5],
  // Miércoles
  ['4ESOB', 3, 1], ['4ESOA', 3, 2], ['1ESOA', 3, 3], ['1ESOB', 3, 4], ['PSI1', 3, 5], ['PSI1', 3, 6],
  // Jueves
  ['1BACA', 4, 3], ['1BACB', 4, 4], ['4ESOB', 4, 5],
  // Viernes
  ['2BACB', 5, 1], ['2BACA', 5, 2],
];

// -------------------- Calendario del curso 26/27 --------------------

interface RangoVacaciones {
  inicio: string;
  fin: string;
  nombre: string;
}

const VACACIONES: RangoVacaciones[] = [
  { inicio: '2026-12-23', fin: '2027-01-07', nombre: 'Navidad' },
  { inicio: '2027-03-22', fin: '2027-04-02', nombre: 'Semana Santa' },
];

const FESTIVOS: Record<string, string> = {
  '2026-10-12': 'Fiesta Nacional de España',
  '2026-11-01': 'Todos los Santos',
  '2026-12-06': 'Día de la Constitución',
  '2026-12-08': 'Inmaculada Concepción',
  '2026-12-25': 'Navidad',
  '2027-01-01': 'Año Nuevo',
  '2027-01-06': 'Epifanía del Señor (Reyes)',
  '2027-02-15': 'Carnaval (lunes)',
  '2027-02-16': 'Carnaval (martes)',
  '2027-02-17': 'Miércoles de Ceniza (libre disposición)',
  '2027-04-01': 'Jueves Santo',
  '2027-04-02': 'Viernes Santo',
  '2027-05-01': 'Día del Trabajador',
  '2027-05-30': 'Día de Canarias',
};

function enVacaciones(fecha: string): RangoVacaciones | null {
  for (const r of VACACIONES) {
    if (fecha >= r.inicio && fecha <= r.fin) return r;
  }
  return null;
}

export function generarCalendarioCurso(): { fecha: string; tipo: string; nombre: string }[] {
  const dias: { fecha: string; tipo: string; nombre: string }[] = [];
  let f = '2026-09-01';
  const fin = '2027-06-30';
  while (f <= fin) {
    const vac = enVacaciones(f);
    const fest = FESTIVOS[f];
    const iso = diaSemanaISO(f);
    let tipo: string;
    let nombre: string;
    if (vac) {
      tipo = 'vacaciones';
      nombre = vac.nombre;
    } else if (fest) {
      tipo = 'festivo';
      nombre = fest;
    } else if (iso >= 6) {
      tipo = 'festivo';
      nombre = 'Fin de semana';
    } else if (f < INICIO_CURSO || f > FIN_CURSO_GENERAL) {
      tipo = 'vacaciones';
      nombre = 'Periodo no lectivo';
    } else {
      tipo = 'lectivo';
      nombre = '';
    }
    dias.push({ fecha: f, tipo, nombre });
    f = sumarDias(f, 1);
  }
  return dias;
}

// Último día lectivo de un grupo (2.º Bach termina antes por la EBAU).
export function ultimoDiaLectivo(materiaCodigo: MateriaCodigo): string {
  return materiaCodigo === 'HDF2B' ? FIN_CURSO_2BACH : FIN_CURSO_GENERAL;
}

// -------------------- Plantillas de PD y SA --------------------

interface DatosPD {
  identificacion: {
    centro: string;
    docente: string;
    cursoEscolar: string;
    materia: string;
    codigoMateria: string;
    etapa: string;
    curso: string;
    caracter: string;
    horasSemanales: number;
  };
  justificacion: string;
  contextualizacion: string;
  objetivos: string[];
  competencias: string[];
  saberesPorBloque: { bloque: string; saberes: string[] }[];
  criterios: { bloque: string; descripcion: string; codigo: string }[];
  metodologia: string;
  atencionDiversidad: string;
  evaluacion: { instrumentos: string[]; criteriosCalificacion: string };
  temporalizacion: string;
}

interface DatosSA {
  titulo: string;
  descripcion: string;
  fundamentacion: { saberes: string[]; criterios: string[] };
  metodologia: string;
  instrumentos: string[];
  sesionesEstimadas: number;
  productoFinal: string;
}

const CRITERIO_CODIGO = 'pendiente_oficial'; // no inventar códigos de criterio
const FUENTE_BASE = 'Decreto 30/2023 de Canarias; LOMLOE; RD 217/2022 y RD 243/2022';

export function seedIfEmpty(db: Database.Database): void {
  const count = (db.prepare('SELECT COUNT(*) AS c FROM grupos').get() as { c: number }).c;
  if (count > 0) return;

  const insert = db.transaction(() => {
    // Settings
    const insSetting = db.prepare('INSERT INTO settings (clave, valor) VALUES (?, ?)');
    insSetting.run('nombre_centro', 'IES Atlántico');
    insSetting.run('nombre_docente', 'Departamento de Filosofía');
    insSetting.run('curso_escolar', CURSO);
    insSetting.run('zona_horaria', 'Atlantic/Canary');
    insSetting.run('llm_provider', 'ninguno');
    insSetting.run('llm_base_url', 'http://localhost:11434/v1');
    insSetting.run('llm_model', 'llama3.2');
    insSetting.run('llm_api_key', '');

    // Grupos
    const insGrupo = db.prepare(
      'INSERT INTO grupos (codigo, nombre, materia_codigo, curso, nivel, aula, alumnos) VALUES (?, ?, ?, ?, ?, ?, ?)',
    );
    const grupoIdPorCodigo = new Map<string, number>();
    for (const g of GRUPOS) {
      const info = insGrupo.run(g.codigo, g.nombre, g.materiaCodigo, g.curso, g.nivel, g.aula, g.alumnos);
      grupoIdPorCodigo.set(g.codigo, Number(info.lastInsertRowid));
    }

    // Horario
    const insSlot = db.prepare(
      'INSERT INTO horario_slots (grupo_id, dia_semana, hora_inicio, hora_fin, materia_codigo, aula) VALUES (?, ?, ?, ?, ?, ?)',
    );
    for (const [codigo, dia, p] of HORARIO) {
      const grupoId = grupoIdPorCodigo.get(codigo)!;
      const grupo = GRUPOS.find((g) => g.codigo === codigo)!;
      const periodo = PERIODOS.find((x) => x.n === p)!;
      insSlot.run(grupoId, dia, periodo.inicio, periodo.fin, grupo.materiaCodigo, grupo.aula);
    }

    // Calendario
    const insDia = db.prepare('INSERT INTO calendario_dias (fecha, tipo, nombre) VALUES (?, ?, ?)');
    for (const d of generarCalendarioCurso()) {
      insDia.run(d.fecha, d.tipo, d.nombre);
    }

    // Fuentes curriculares (saberes, criterios y competencias de cada materia)
    const insFuente = db.prepare(
      'INSERT INTO fuentes (codigo, materia_codigo, tipo, bloque, descripcion, fuente) VALUES (?, ?, ?, ?, ?, ?)',
    );
    for (const m of MATERIAS) {
      const cur = CURRICULO[m.codigo];
      for (const c of cur.competencias) {
        insFuente.run('pendiente_oficial', m.codigo, 'competencia', 'Competencias específicas', c, FUENTE_BASE);
      }
      for (const b of cur.saberesPorBloque) {
        for (const s of b.saberes) {
          insFuente.run('pendiente_oficial', m.codigo, 'saber', b.bloque, s, FUENTE_BASE);
        }
      }
      for (const cr of cur.criterios) {
        insFuente.run(CRITERIO_CODIGO, m.codigo, 'criterio', cr.bloque, cr.descripcion, FUENTE_BASE);
      }
    }

    // Programaciones didácticas (una por materia)
    const insPD = db.prepare(
      'INSERT INTO programaciones (codigo, titulo, materia_codigo, curso, etapa, datos, creada, actualizada) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    );
    const insSA = db.prepare(
      'INSERT INTO situaciones (pd_id, codigo, titulo, materia_codigo, curso, datos, creada, actualizada) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    );
    const ahora = new Date().toISOString();

    for (const m of MATERIAS) {
      const cur = CURRICULO[m.codigo];
      const pd: DatosPD = {
        identificacion: {
          centro: 'IES Atlántico',
          docente: 'Departamento de Filosofía',
          cursoEscolar: CURSO,
          materia: m.nombre,
          codigoMateria: m.codigo,
          etapa: m.etapa,
          curso: m.curso,
          caracter: m.caracter,
          horasSemanales: m.horasSemanales,
        },
        justificacion:
          'Programación didáctica elaborada conforme al Decreto 30/2023 de Canarias y la normativa básica de la LOMLOE. Persigue el desarrollo de las competencias específicas de la materia mediante situaciones de aprendizaje conectadas con la realidad del alumnado.',
        contextualizacion:
          'Departamento de Filosofía de un IES canario. Grupos heterogéneos con atención a la diversidad; uso de metodologías activas y evaluación competencial.',
        objetivos: cur.competencias,
        competencias: cur.competencias,
        saberesPorBloque: cur.saberesPorBloque,
        criterios: cur.criterios.map((c) => ({ ...c, codigo: CRITERIO_CODIGO })),
        metodologia:
          'Metodología activa y dialógica: aprendizaje cooperativo, diálogo socrático, análisis de textos y casos, aprendizaje basado en problemas y uso del cuaderno de clase como portafolio.',
        atencionDiversidad:
          'Adaptaciones de acceso y de nivel, agrupamientos flexibles, apoyo entre iguales, materiales multinivel y refuerzo de la competencia lingüística. Diseño Universal para el Aprendizaje (DUA).',
        evaluacion: {
          instrumentos: ['Cuaderno de clase', 'Participación en el diálogo', 'Comentario de texto', 'Disertación breve', 'Rúbrica de producto'],
          criteriosCalificacion:
            'Evaluación continua, formativa y competencial. Cada criterio se evalúa mediante al menos un instrumento; la calificación final integra la evolución del alumnado.',
        },
        temporalizacion:
          'La materia se organiza en las situaciones de aprendizaje recogidas en esta programación, distribuidas a lo largo del curso 2026/2027.',
      };
      const pdInfo = insPD.run(
        `PD-${m.codigo}`,
        `Programación de ${m.nombre} (${m.curso})`,
        m.codigo,
        m.curso,
        m.etapa,
        JSON.stringify(pd),
        ahora,
        ahora,
      );
      const pdId = Number(pdInfo.lastInsertRowid);

      // Situaciones de aprendizaje (una por unidad)
      for (const u of cur.unidades) {
        const sa: DatosSA = {
          titulo: `${u.numero}. ${u.titulo}`,
          descripcion: u.descripcion,
          fundamentacion: { saberes: u.saberes, criterios: u.criterios },
          metodologia:
            'Secuencia de actividades de apertura, desarrollo y cierre con diálogo filosófico, trabajo cooperativo y producción de evidencias.',
          instrumentos: ['Participación en el diálogo', 'Cuaderno de clase', 'Producción escrita o producto final'],
          sesionesEstimadas: Math.max(1, Math.round((u.actividades.length * m.horasSemanales) / 2)),
          productoFinal: u.actividades[u.actividades.length - 1]?.titulo ?? 'Reflexión final escrita',
        };
        insSA.run(
          pdId,
          `SA-${m.codigo}-${String(u.numero).padStart(2, '0')}`,
          sa.titulo,
          m.codigo,
          m.curso,
          JSON.stringify(sa),
          ahora,
          ahora,
        );
      }
    }
  });

  insert();
}

// Utilidad: validar una fecha antes de usarla (por si el usuario edita settings).
export function fechaValida(fecha: string): boolean {
  return isValidFecha(fecha);
}

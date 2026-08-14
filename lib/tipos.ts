// Tipos compartidos del dominio (puros, sin dependencias de Node).

export type MateriaCodigo = 'FIL4' | 'FIL1B' | 'HDF2B' | 'EVCE1' | 'PSI';
export type Etapa = 'ESO' | 'Bachillerato';
export type TipoDia = 'lectivo' | 'festivo' | 'vacaciones' | 'fin_curso';

export interface MateriaInfo {
  codigo: MateriaCodigo;
  nombre: string;
  etapa: Etapa;
  curso: string; // "4.º ESO", "1.º Bachillerato"...
  caracter: string; // "Optativa", "Común", "Obligatoria (afín)"
  horasSemanales: number;
  color: string;
}

export interface Grupo {
  id: number;
  codigo: string; // "4ESOA"
  nombre: string; // "4.º ESO A"
  materiaCodigo: MateriaCodigo;
  curso: string;
  nivel: string;
  aula: string;
  alumnos: number;
}

export interface HorarioSlot {
  id: number;
  grupoId: number;
  diaSemana: number; // 1 (lunes) .. 5 (viernes)
  horaInicio: string; // "08:30"
  horaFin: string; // "09:25"
  materiaCodigo: MateriaCodigo;
  aula: string;
}

export interface CalendarioDia {
  id: number;
  fecha: string; // "YYYY-MM-DD"
  tipo: TipoDia;
  nombre: string; // "" para lectivo, "Navidad", "Fiesta Nacional"...
}

export interface FuenteCurricular {
  id: number;
  codigo: string; // "pendiente_oficial" cuando no hay código oficial disponible
  materiaCodigo: MateriaCodigo;
  tipo: 'saber' | 'criterio' | 'competencia';
  bloque: string; // "A", "B", "I. Identidad y libertad"...
  descripcion: string;
  fuente: string; // documento oficial
}

export interface Actividad {
  tipo: 'apertura' | 'lectura' | 'dialogo' | 'taller' | 'analisis' | 'cierre';
  titulo: string;
  duracionMin: number;
  descripcion: string;
  texto?: string; // texto real para leer en el aula
  preguntas?: string[]; // preguntas con contenido real
}

export interface Unidad {
  numero: number;
  titulo: string;
  descripcion: string;
  saberes: string[]; // saberes básicos (redacción propia, sin inventar códigos)
  criterios: string[]; // descripción de criterios de evaluación
  actividades: Actividad[];
}

export interface CurriculoMateria {
  materiaCodigo: MateriaCodigo;
  saberesPorBloque: { bloque: string; saberes: string[] }[];
  competencias: string[];
  criterios: { bloque: string; descripcion: string }[];
  unidades: Unidad[];
}

// -------------------- Guion de sesión --------------------

export interface MomentoGuion {
  momento: 'inicio' | 'desarrollo' | 'cierre';
  titulo: string;
  duracionMin: number;
  descripcion: string;
  texto?: string;
  preguntas?: string[];
}

export interface GuionSesion {
  titulo: string;
  materia: string;
  materiaCodigo: MateriaCodigo;
  grupo: string;
  curso: string;
  fecha: string;
  duracionMin: number;
  objetivo: string;
  saberes: string[];
  criterios: string[];
  secuencia: MomentoGuion[];
  materiales: string[];
  evaluacion: { instrumento: string; evidencia: string; momento: string }[];
  atencionDiversidad: string[];
  tareaCasa: string;
}

export interface SesionAula {
  id: number;
  grupoId: number;
  fecha: string;
  saId: number | null;
  titulo: string;
  guion: GuionSesion; // se serializa a JSON en la BBDD
  estado: 'generada' | 'impartida' | 'editada';
  creada: string;
  actualizada: string;
}

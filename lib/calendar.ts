// Dominio de calendario en Europe/Canary (Atlantic/Canary).
// Todas las funciones trabajan con fechas "YYYY-MM-DD" y son puras
// (no dependen de la zona horaria del servidor).

const ZONA = 'Atlantic/Canary';

export const DIAS_SEMANA = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
];

export const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

export interface FechaParts {
  y: number;
  m: number; // 1..12
  d: number; // 1..31
}

export function parseFecha(fecha: string): FechaParts {
  const [y, m, d] = fecha.split('-').map((n) => parseInt(n, 10));
  return { y, m, d };
}

export function formatFecha(parts: FechaParts): string {
  const mm = String(parts.m).padStart(2, '0');
  const dd = String(parts.d).padStart(2, '0');
  return `${parts.y}-${mm}-${dd}`;
}

export function isValidFecha(fecha: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return false;
  const { y, m, d } = parseFecha(fecha);
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const dias = diasEnMes(y, m);
  return d <= dias;
}

export function diasEnMes(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

// Día de la semana ISO (1 = lunes ... 7 = domingo). Independiente de la zona
// horaria porque usa UTC sobre los componentes de la fecha.
export function diaSemanaISO(fecha: string): number {
  const { y, m, d } = parseFecha(fecha);
  const utc = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 = domingo
  return utc === 0 ? 7 : utc;
}

export function esFinDeSemana(fecha: string): boolean {
  return diaSemanaISO(fecha) >= 6;
}

// Fecha de HOY en Europe/Canary, con independencia de dónde corra el servidor.
export function hoyCanarias(): string {
  return fechaEnZona(new Date(), ZONA);
}

export function fechaEnZona(date: Date, timeZone: string): string {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return fmt.format(date); // en-CA produce "YYYY-MM-DD"
}

export function ahoraCanariasISO(): string {
  return new Date().toLocaleString('sv-SE', { timeZone: ZONA }).replace(' ', 'T');
}

export function sumarDias(fecha: string, n: number): string {
  const { y, m, d } = parseFecha(fecha);
  const base = Date.UTC(y, m - 1, d);
  const next = new Date(base);
  next.setUTCDate(next.getUTCDate() + n);
  return formatFecha({
    y: next.getUTCFullYear(),
    m: next.getUTCMonth() + 1,
    d: next.getUTCDate(),
  });
}

export function lunesDeLaSemana(fecha: string): string {
  const iso = diaSemanaISO(fecha); // 1..7
  return sumarDias(fecha, 1 - iso);
}

export function rangoSemana(fecha: string): { lunes: string; viernes: string; dias: string[] } {
  const lunes = lunesDeLaSemana(fecha);
  const viernes = sumarDias(lunes, 4);
  const dias: string[] = [];
  for (let i = 0; i < 5; i++) dias.push(sumarDias(lunes, i));
  return { lunes, viernes, dias };
}

export function esFestivo(fecha: string, festivos: Set<string>): boolean {
  return festivos.has(fecha);
}

export function esLectivo(
  fecha: string,
  calendario: Map<string, TipoDiaCalendario>,
): boolean {
  return calendario.get(fecha) === 'lectivo';
}

export type TipoDiaCalendario = 'lectivo' | 'festivo' | 'vacaciones' | 'fin_curso';

export function nombreDia(fecha: string): string {
  return DIAS_SEMANA[diaSemanaISO(fecha) % 7];
}

export function nombreDiaCorto(fecha: string): string {
  return nombreDia(fecha).slice(0, 3);
}

export function formatearFechaLarga(fecha: string): string {
  const { y, m, d } = parseFecha(fecha);
  return `${nombreDia(fecha)}, ${d} de ${MESES[m - 1]} de ${y}`;
}

export function formatearFechaCorta(fecha: string): string {
  const { m, d } = parseFecha(fecha);
  return `${d} ${MESES[m - 1].slice(0, 3)}.`;
}

export function formatearFechaNumerica(fecha: string): string {
  const [y, m, d] = fecha.split('-');
  return `${d}/${m}/${y}`;
}

// Devuelve "2026-09-10T08:30:00" en hora local canaria (para etiquetas).
export function fechaHoraCanarias(fecha: string, hora: string): string {
  return `${fecha}T${hora}:00`;
}

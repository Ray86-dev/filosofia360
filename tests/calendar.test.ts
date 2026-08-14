import { describe, it, expect } from 'vitest';
import {
  diaSemanaISO,
  esFinDeSemana,
  lunesDeLaSemana,
  rangoSemana,
  sumarDias,
  parseFecha,
  formatFecha,
  isValidFecha,
  hoyCanarias,
  formatearFechaLarga,
} from '@/lib/calendar';

describe('diaSemanaISO (1=lunes … 7=domingo)', () => {
  it('reconoce el inicio de curso 2026-09-10 como jueves', () => {
    expect(diaSemanaISO('2026-09-10')).toBe(4);
  });
  it('reconoce 2026-12-08 (Inmaculada) como martes', () => {
    expect(diaSemanaISO('2026-12-08')).toBe(2);
  });
  it('reconoce 2027-02-15 (Carnaval) como lunes', () => {
    expect(diaSemanaISO('2027-02-15')).toBe(1);
  });
  it('reconoce 2027-03-28 (Domingo de Resurrección) como domingo', () => {
    expect(diaSemanaISO('2027-03-28')).toBe(7);
  });
});

describe('esFinDeSemana', () => {
  it('viernes no es fin de semana', () => {
    expect(esFinDeSemana('2026-09-11')).toBe(false);
  });
  it('sábado y domingo sí lo son', () => {
    expect(esFinDeSemana('2026-09-12')).toBe(true);
    expect(esFinDeSemana('2026-09-13')).toBe(true);
  });
});

describe('semana', () => {
  it('el lunes de 2026-09-10 es 2026-09-07', () => {
    expect(lunesDeLaSemana('2026-09-10')).toBe('2026-09-07');
  });
  it('rangoSemana devuelve lunes-viernes y 5 días', () => {
    const r = rangoSemana('2026-09-10');
    expect(r.lunes).toBe('2026-09-07');
    expect(r.viernes).toBe('2026-09-11');
    expect(r.dias).toHaveLength(5);
    expect(r.dias[0]).toBe('2026-09-07');
    expect(r.dias[4]).toBe('2026-09-11');
  });
  it('un lunes se devuelve a sí mismo', () => {
    expect(lunesDeLaSemana('2027-02-15')).toBe('2027-02-15');
  });
});

describe('sumarDias y parseo', () => {
  it('cruza el cambio de año', () => {
    expect(sumarDias('2026-12-31', 1)).toBe('2027-01-01');
  });
  it('cruza el cambio de mes', () => {
    expect(sumarDias('2027-01-31', 1)).toBe('2027-02-01');
  });
  it('parseFecha/formatFecha son inversas', () => {
    const p = parseFecha('2026-09-10');
    expect(p).toEqual({ y: 2026, m: 9, d: 10 });
    expect(formatFecha(p)).toBe('2026-09-10');
  });
});

describe('isValidFecha', () => {
  it('acepta fechas reales', () => {
    expect(isValidFecha('2026-09-10')).toBe(true);
    expect(isValidFecha('2024-02-29')).toBe(true); // bisiesto
  });
  it('rechaza fechas imposibles', () => {
    expect(isValidFecha('2026-02-29')).toBe(false); // 2026 no es bisiesto
    expect(isValidFecha('2026-13-01')).toBe(false);
    expect(isValidFecha('hola')).toBe(false);
  });
});

describe('hoyCanarias', () => {
  it('devuelve una fecha válida YYYY-MM-DD', () => {
    expect(isValidFecha(hoyCanarias())).toBe(true);
  });
});

describe('formatearFechaLarga', () => {
  it('formatea en español', () => {
    expect(formatearFechaLarga('2026-09-10')).toContain('10 de septiembre de 2026');
  });
});

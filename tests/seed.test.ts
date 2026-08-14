import { describe, it, expect, beforeAll } from 'vitest';
import { getDb, getGrupos, getCalendario } from '@/lib/db';
import { prepararFecha } from '@/lib/sesiones';

beforeAll(() => {
  getDb(); // crea el esquema y siembra si está vacío
});

describe('seed del departamento', () => {
  it('siembra los 9 grupos del departamento', () => {
    expect(getGrupos()).toHaveLength(9);
  });

  it('nunca coloca Filosofía en 1.º ESO', () => {
    const prohibidas = ['FIL4', 'FIL1B', 'HDF2B'];
    for (const g of getGrupos()) {
      if (prohibidas.includes(g.materiaCodigo)) {
        expect(g.curso).not.toBe('1.º ESO');
      }
    }
  });

  it('genera el calendario con días lectivos y festivos', () => {
    const mapa = new Map(getCalendario().map((c) => [c.fecha, c.tipo]));
    expect(mapa.get('2026-09-10')).toBe('lectivo');
    expect(mapa.get('2026-10-12')).toBe('festivo');
    expect(mapa.get('2026-12-25')).toBe('vacaciones');
  });
});

describe('generación de sesiones', () => {
  it('prepara las 3 clases del jueves 2026-09-10 (1ºBachA, 1ºBachB, 4ºESOB)', () => {
    const r = prepararFecha('2026-09-10');
    expect(r.esLectivo).toBe(true);
    expect(r.generadas).toHaveLength(3);
    for (const s of r.generadas) {
      expect(s.guion.secuencia).toHaveLength(3);
      expect(s.titulo.length).toBeGreaterThan(0);
      expect(s.guion.materiales.length).toBeGreaterThan(0);
    }
  });

  it('no genera sesiones en día festivo (2026-10-12)', () => {
    const r = prepararFecha('2026-10-12');
    expect(r.esLectivo).toBe(false);
    expect(r.generadas).toHaveLength(0);
  });
});

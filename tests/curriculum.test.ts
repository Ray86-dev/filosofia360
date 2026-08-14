import { describe, it, expect } from 'vitest';
import { MATERIAS, CURRICULO } from '@/lib/curriculum';
import { generarCalendarioCurso, ultimoDiaLectivo } from '@/lib/seed';
import type { MateriaCodigo } from '@/lib/tipos';

describe('currículo no negociable', () => {
  it('Filosofía NO existe en 1.º ESO', () => {
    const filosofias = MATERIAS.filter((m) => m.nombre === 'Filosofía');
    for (const m of filosofias) {
      expect(m.curso).not.toBe('1.º ESO');
    }
  });

  it('mapea los códigos oficiales', () => {
    const porCodigo = Object.fromEntries(MATERIAS.map((m) => [m.codigo, m]));
    expect(porCodigo.FIL4.curso).toBe('4.º ESO');
    expect(porCodigo.FIL4.etapa).toBe('ESO');
    expect(porCodigo.FIL1B.curso).toBe('1.º Bachillerato');
    expect(porCodigo.HDF2B.curso).toBe('2.º Bachillerato');
    expect(porCodigo.EVCE1.curso).toBe('1.º ESO');
    expect(porCodigo.PSI.etapa).toBe('Bachillerato');
  });

  it('todas las materias tienen unidades con actividades y contenido', () => {
    for (const m of MATERIAS) {
      const cur = CURRICULO[m.codigo];
      expect(cur.unidades.length).toBeGreaterThan(0);
      for (const u of cur.unidades) {
        expect(u.actividades.length).toBeGreaterThan(0);
        for (const a of u.actividades) {
          expect(a.titulo.length).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe('calendario del curso 26/27', () => {
  const dias = generarCalendarioCurso();
  const mapa = new Map(dias.map((d) => [d.fecha, d]));

  it('el inicio de curso (2026-09-10) es lectivo', () => {
    expect(mapa.get('2026-09-10')?.tipo).toBe('lectivo');
  });
  it('2026-10-12 es festivo (Fiesta Nacional)', () => {
    expect(mapa.get('2026-10-12')?.tipo).toBe('festivo');
  });
  it('2026-12-25 es vacaciones (Navidad)', () => {
    expect(mapa.get('2026-12-25')?.tipo).toBe('vacaciones');
  });
  it('2027-02-15 es festivo (Carnaval)', () => {
    expect(mapa.get('2027-02-15')?.tipo).toBe('festivo');
  });
  it('2.º Bach termina antes que el resto (EBAU)', () => {
    expect(ultimoDiaLectivo('HDF2B')).toBe('2027-05-28');
    expect(ultimoDiaLectivo('FIL4')).toBe('2027-06-18');
  });
});

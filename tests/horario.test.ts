import { describe, it, expect } from 'vitest';
import type { HorarioSlot, Grupo } from '@/lib/tipos';
import {
  slotsDelDia,
  gruposConClase,
  contarHorasSemana,
  hayConflicto,
  totalHorasDocente,
  agruparSlotsPorGrupo,
  PERIODOS,
} from '@/lib/horario';

function slot(id: number, grupoId: number, diaSemana: number, horaInicio: string): HorarioSlot {
  return { id, grupoId, diaSemana, horaInicio, horaFin: '09:25', materiaCodigo: 'FIL4', aula: 'A1' };
}

describe('slotsDelDia', () => {
  const slots = [
    slot(1, 10, 1, '12:40'),
    slot(2, 10, 1, '08:30'),
    slot(3, 11, 2, '08:30'),
  ];
  it('filtra por día y ordena por hora', () => {
    const delLunes = slotsDelDia(slots, 1);
    expect(delLunes.map((s) => s.id)).toEqual([2, 1]);
  });
  it('devuelve vacío si no hay clase ese día', () => {
    expect(slotsDelDia(slots, 5)).toEqual([]);
  });
});

describe('gruposConClase', () => {
  const slots = [slot(1, 10, 1, '08:30'), slot(2, 10, 1, '09:25'), slot(3, 11, 1, '08:30')];
  it('devuelve ids únicos', () => {
    expect(gruposConClase(slots, 1)).toEqual([10, 11]);
  });
});

describe('contarHorasSemana', () => {
  it('cuenta las horas de un grupo', () => {
    const slots = [slot(1, 10, 1, '08:30'), slot(2, 10, 3, '08:30'), slot(3, 11, 1, '09:25')];
    expect(contarHorasSemana(slots, 10)).toBe(2);
    expect(contarHorasSemana(slots, 11)).toBe(1);
  });
});

describe('hayConflicto', () => {
  it('detecta dos clases a la misma hora el mismo día', () => {
    const slots = [slot(1, 10, 1, '08:30'), slot(2, 11, 1, '08:30')];
    expect(hayConflicto(slots).conflicto).toBe(true);
  });
  it('no marca conflicto si las horas difieren', () => {
    const slots = [slot(1, 10, 1, '08:30'), slot(2, 11, 1, '09:25')];
    expect(hayConflicto(slots).conflicto).toBe(false);
  });
});

describe('agruparSlotsPorGrupo y totales', () => {
  const grupos: Grupo[] = [
    { id: 10, codigo: 'G1', nombre: 'G1', materiaCodigo: 'FIL4', curso: '4.º ESO', nivel: 'ESO', aula: 'A1', alumnos: 20 },
    { id: 11, codigo: 'G2', nombre: 'G2', materiaCodigo: 'FIL1B', curso: '1.º Bach', nivel: 'Bachillerato', aula: 'A2', alumnos: 25 },
  ];
  const slots = [slot(1, 10, 1, '08:30'), slot(2, 10, 2, '09:25'), slot(3, 11, 1, '10:50')];
  it('agrupa y ordena por día/hora', () => {
    const agrupado = agruparSlotsPorGrupo(slots, grupos);
    expect(agrupado).toHaveLength(2);
    expect(agrupado[0].slots.map((s) => s.id)).toEqual([1, 2]);
  });
  it('total horas docente = número de slots', () => {
    expect(totalHorasDocente(slots)).toBe(3);
  });
});

describe('PERIODOS', () => {
  it('define 6 periodos con recreo tras la 2.ª', () => {
    expect(PERIODOS).toHaveLength(6);
    expect(PERIODOS[0].inicio).toBe('08:30');
    expect(PERIODOS[5].fin).toBe('14:30');
  });
});

// Dominio de horario: puro, sin dependencias de Node. Opera sobre arrays de
// HorarioSlot para que sea trivialmente testeable.

import type { HorarioSlot, Grupo } from '@/lib/tipos';

export interface Periodo {
  n: number;
  inicio: string;
  fin: string;
}

// Horario tipo de un IES canario: 6 periodos de 55 min con recreo tras la 2.ª.
export const PERIODOS: Periodo[] = [
  { n: 1, inicio: '08:30', fin: '09:25' },
  { n: 2, inicio: '09:25', fin: '10:20' },
  { n: 3, inicio: '10:50', fin: '11:45' },
  { n: 4, inicio: '11:45', fin: '12:40' },
  { n: 5, inicio: '12:40', fin: '13:35' },
  { n: 6, inicio: '13:35', fin: '14:30' },
];

export const RECREO = { inicio: '10:20', fin: '10:50' };

export function slotsDelDia(slots: HorarioSlot[], diaSemana: number): HorarioSlot[] {
  return slots
    .filter((s) => s.diaSemana === diaSemana)
    .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
}

export function gruposConClase(slots: HorarioSlot[], diaSemana: number): number[] {
  return [...new Set(slotsDelDia(slots, diaSemana).map((s) => s.grupoId))];
}

export function contarHorasSemana(slots: HorarioSlot[], grupoId: number): number {
  return slots.filter((s) => s.grupoId === grupoId).length;
}

// Detecta conflictos: mismo grupo o mismo periodo repetido el mismo día.
export function hayConflicto(slots: HorarioSlot[]): { conflicto: boolean; detalle: string } {
  const visto = new Set<string>();
  for (const s of slots) {
    const porDocente = `${s.diaSemana}|${s.horaInicio}`;
    if (visto.has(porDocente)) {
      return { conflicto: true, detalle: `Dos clases a la vez el día ${s.diaSemana} a las ${s.horaInicio}` };
    }
    visto.add(porDocente);
  }
  return { conflicto: false, detalle: '' };
}

export function totalHorasDocente(slots: HorarioSlot[]): number {
  return slots.length;
}

export function agruparSlotsPorGrupo(
  slots: HorarioSlot[],
  grupos: Grupo[],
): { grupo: Grupo; slots: HorarioSlot[] }[] {
  const porGrupo = new Map<number, HorarioSlot[]>();
  for (const s of slots) {
    const arr = porGrupo.get(s.grupoId) ?? [];
    arr.push(s);
    porGrupo.set(s.grupoId, arr);
  }
  return grupos
    .map((g) => ({ grupo: g, slots: (porGrupo.get(g.id) ?? []).sort((a, b) => (a.diaSemana - b.diaSemana) || a.horaInicio.localeCompare(b.horaInicio)) }))
    .filter((x) => x.slots.length > 0);
}

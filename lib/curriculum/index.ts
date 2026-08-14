import type { CurriculoMateria, MateriaCodigo } from '@/lib/tipos';
import { FIL4 } from './fil4';
import { FIL1B } from './fil1b';
import { HDF2B } from './hdf2b';
import { EVCE1 } from './evce1';
import { PSI } from './psi';

export { FIL4, FIL1B, HDF2B, EVCE1, PSI };
export { MATERIAS, MATERIA_POR_CODIGO, materiaDe } from './materias';

export const CURRICULO: Record<MateriaCodigo, CurriculoMateria> = {
  FIL4,
  FIL1B,
  HDF2B,
  EVCE1,
  PSI,
};

export function curriculoDe(codigo: MateriaCodigo): CurriculoMateria {
  return CURRICULO[codigo];
}

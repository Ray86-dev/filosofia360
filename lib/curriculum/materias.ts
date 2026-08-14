import type { MateriaInfo, MateriaCodigo } from '@/lib/tipos';

// Catálogo de materias. Anclado a LOMLOE / RD 217/2022 (ESO), RD 243/2022
// (Bachillerato) y Decreto 30/2023 de Canarias.
// IMPORTANTE: Filosofía NO se imparte en 1.º ESO. Solo:
//   FIL4 = Filosofía, 4.º ESO (optativa)
//   FIL1B = Filosofía, 1.º Bachillerato (común)
//   HDF2B = Historia de la Filosofía, 2.º Bachillerato (común)
//   EVCE1 = Educación en Valores Cívicos y Éticos, 1.º ESO (obligatoria, afín)
//   PSI = Psicología, Bachillerato (optativa)

export const MATERIAS: MateriaInfo[] = [
  {
    codigo: 'FIL4',
    nombre: 'Filosofía',
    etapa: 'ESO',
    curso: '4.º ESO',
    caracter: 'Optativa',
    horasSemanales: 3,
    color: '#0f4c5c',
  },
  {
    codigo: 'FIL1B',
    nombre: 'Filosofía',
    etapa: 'Bachillerato',
    curso: '1.º Bachillerato',
    caracter: 'Común',
    horasSemanales: 3,
    color: '#1d3557',
  },
  {
    codigo: 'HDF2B',
    nombre: 'Historia de la Filosofía',
    etapa: 'Bachillerato',
    curso: '2.º Bachillerato',
    caracter: 'Común',
    horasSemanales: 3,
    color: '#6d597a',
  },
  {
    codigo: 'EVCE1',
    nombre: 'Educación en Valores Cívicos y Éticos',
    etapa: 'ESO',
    curso: '1.º ESO',
    caracter: 'Obligatoria (afín)',
    horasSemanales: 1,
    color: '#2a9d8f',
  },
  {
    codigo: 'PSI',
    nombre: 'Psicología',
    etapa: 'Bachillerato',
    curso: '1.º / 2.º Bachillerato',
    caracter: 'Optativa',
    horasSemanales: 2,
    color: '#b45309',
  },
];

export const MATERIA_POR_CODIGO: Record<MateriaCodigo, MateriaInfo> = Object.fromEntries(
  MATERIAS.map((m) => [m.codigo, m]),
) as Record<MateriaCodigo, MateriaInfo>;

export function materiaDe(codigo: MateriaCodigo): MateriaInfo {
  return MATERIA_POR_CODIGO[codigo];
}

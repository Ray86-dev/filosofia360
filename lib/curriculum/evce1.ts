import type { CurriculoMateria } from '@/lib/tipos';

// Educación en Valores Cívicos y Éticos — 1.º ESO (EVCE1). Obligatoria (afín), 1 h/semana.
// RD 217/2022 y Decreto 30/2023 de Canarias (Anexo 2).

export const EVCE1: CurriculoMateria = {
  materiaCodigo: 'EVCE1',
  competencias: [
    'Reconocer la dignidad propia y ajena como fundamento de los derechos.',
    'Desarrollar hábitos de convivencia, respeto y resolución pacífica de conflictos.',
    'Valorar la igualdad y la diversidad, rechazando la discriminación.',
    'Participar de forma democrática y comprometida en el centro y la comunidad.',
    'Adoptar hábitos de consumo responsable y cuidado del entorno.',
  ],
  saberesPorBloque: [
    {
      bloque: 'I. La dignidad humana',
      saberes: ['La dignidad humana y los derechos humanos.', 'Autoconocimiento y emociones.'],
    },
    {
      bloque: 'II. Convivencia',
      saberes: ['Normas, respeto y resolución de conflictos.', 'Empatía y escucha activa.'],
    },
    {
      bloque: 'III. Igualdad y diversidad',
      saberes: ['Igualdad de género y diversidad.', 'Prevención del acoso y la discriminación.'],
    },
    {
      bloque: 'IV. Democracia y participación',
      saberes: ['Democracia y participación en el centro.', 'El bien común y los deberes.'],
    },
    {
      bloque: 'V. Sostenibilidad',
      saberes: ['Consumo responsable y sostenibilidad.', 'Cuidado de lo común y del entorno.'],
    },
  ],
  criterios: [
    { bloque: 'I', descripcion: 'Reconocer la dignidad humana y gestionar las propias emociones de forma respetuosa.' },
    { bloque: 'II', descripcion: 'Participar en la convivencia respetando normas y resolviendo conflictos de forma pacífica.' },
    { bloque: 'III', descripcion: 'Valorar la igualdad y la diversidad y rechazar toda forma de discriminación.' },
    { bloque: 'IV', descripcion: 'Participar democráticamente y asumir responsabilidades en favor del bien común.' },
    { bloque: 'V', descripcion: 'Adoptar hábitos de consumo responsable y cuidado del entorno.' },
  ],
  unidades: [
    {
      numero: 1,
      titulo: 'La dignidad humana',
      descripcion: 'Qué nos hace valiosos a todas las personas: dignidad, derechos y emociones.',
      saberes: ['La dignidad humana y los derechos humanos.', 'Autoconocimiento y emociones.'],
      criterios: ['Reconocer la dignidad humana y gestionar las propias emociones.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: 'Todos valemos lo mismo',
          duracionMin: 8,
          descripcion: 'Dinámica: ¿qué nos hace valiosos? Se recogen respuestas y se llega al concepto de dignidad.',
        },
        {
          tipo: 'taller',
          titulo: 'El termómetro de las emociones',
          duracionMin: 12,
          descripcion: 'Cada estudiante identifica una emoción del día y su intensidad; se practica nombrar lo que sentimos sin juzgar.',
          preguntas: ['¿Por qué es importante saber poner nombre a lo que sentimos?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Compromiso',
          duracionMin: 5,
          descripcion: 'Cada cual escribe una forma concreta de tratar a alguien con dignidad esta semana.',
        },
      ],
    },
    {
      numero: 2,
      titulo: 'Convivencia y respeto',
      descripcion: 'Normas, empatía y resolución pacífica de conflictos en el aula.',
      saberes: ['Normas, respeto y resolución de conflictos.', 'Empatía y escucha activa.'],
      criterios: ['Participar en la convivencia y resolver conflictos de forma pacífica.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Por qué hay normas?',
          duracionMin: 8,
          descripcion: 'Se imagina un aula sin normas durante un día y se listan las consecuencias.',
        },
        {
          tipo: 'dialogo',
          titulo: 'Ponerse en el lugar del otro',
          duracionMin: 12,
          descripcion: 'Role-play de un conflicto cotidiano (un rumor, una burla) y ensayo de respuestas asertivas.',
          preguntas: ['¿Qué siente cada persona en el conflicto?', '¿Cómo se puede pedir perdón de verdad?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Nuestra norma de oro',
          duracionMin: 5,
          descripcion: 'Se acuerda una norma de convivencia del grupo redactada entre todos.',
        },
      ],
    },
    {
      numero: 3,
      titulo: 'Igualdad y diversidad',
      descripcion: 'La igualdad entre personas, la diversidad como riqueza y la prevención del acoso.',
      saberes: ['Igualdad de género y diversidad.', 'Prevención del acoso y la discriminación.'],
      criterios: ['Valorar la igualdad y la diversidad y rechazar la discriminación.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Todos iguales o todos diferentes?',
          duracionMin: 8,
          descripcion: 'Dinámica "lo que nos une y lo que nos hace únicos".',
        },
        {
          tipo: 'taller',
          titulo: 'Detectar la discriminación',
          duracionMin: 12,
          descripcion: 'Se analizan frases y situaciones (en el aula, en redes) y se decide si discriminan y por qué.',
          preguntas: ['¿Qué diferencia hay entre broma y acoso?', '¿Qué puedes hacer si ves que discriminan a alguien?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Contra el acoso',
          duracionMin: 5,
          descripcion: 'Se escriben tres formas concretas de actuar si presenciamos una situación de acoso.',
        },
      ],
    },
    {
      numero: 4,
      titulo: 'Democracia y participación',
      descripcion: 'Participar, decidir y asumir responsabilidades en el centro y la comunidad.',
      saberes: ['Democracia y participación en el centro.', 'El bien común y los deberes.'],
      criterios: ['Participar democráticamente y asumir responsabilidades por el bien común.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Quién decide aquí?',
          duracionMin: 8,
          descripcion: 'Se mapean los espacios de participación del centro (delegados, asambleas) y se debate su uso.',
        },
        {
          tipo: 'taller',
          titulo: 'Una propuesta para el centro',
          duracionMin: 12,
          descripcion: 'En grupos se redacta una propuesta de mejora real para el centro, con argumentos y destinatario.',
          preguntas: ['¿Qué convierte una queja en una propuesta?', '¿Qué significa pensar en el bien común?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Votación',
          duracionMin: 5,
          descripcion: 'Se vota la propuesta mejor argumentada para presentarla al delegado.',
        },
      ],
    },
    {
      numero: 5,
      titulo: 'Sostenibilidad y consumo responsable',
      descripcion: 'Cuidar lo común y el planeta: consumo responsable y hábitos sostenibles.',
      saberes: ['Consumo responsable y sostenibilidad.', 'Cuidado de lo común y del entorno.'],
      criterios: ['Adoptar hábitos de consumo responsable y cuidado del entorno.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: 'La huella de un móvil',
          duracionMin: 8,
          descripcion: 'Se rastrea el recorrido de un producto cotidiano y su impacto (materiales, transporte, residuos).',
        },
        {
          tipo: 'taller',
          titulo: 'Mi plan sostenible',
          duracionMin: 12,
          descripcion: 'Cada estudiante diseña un plan con tres cambios de hábito concretos para un mes.',
          preguntas: ['¿Qué es lo que más te costaría cambiar y por qué?', '¿Cómo afecta nuestro consumo a otras personas y al planeta?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Compromiso público',
          duracionMin: 5,
          descripcion: 'Se comparte un compromiso y se acuerda revisarlo dentro de un mes.',
        },
      ],
    },
  ],
};

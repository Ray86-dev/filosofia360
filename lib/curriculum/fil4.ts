import type { CurriculoMateria } from '@/lib/tipos';

// Filosofía — 4.º ESO (FIL4). Optativa, 3 h/semana.
// Saberes y criterios redactados a partir del Decreto 30/2023 de Canarias
// (Anexo 3) y el RD 217/2022. Los códigos de criterio quedan como
// "pendiente_oficial" para no inventar identificadores.

export const FIL4: CurriculoMateria = {
  materiaCodigo: 'FIL4',
  competencias: [
    'Identificar problemas filosóficos y formular preguntas fundamentales.',
    'Analizar y valorar críticamente textos, imágenes y argumentos.',
    'Construir y expresar de forma razonada posiciones propias.',
    'Dialogar con respeto, escucha activa y disposición a revisar las propias ideas.',
    'Relacionar la filosofía con la vida cotidiana y con otras áreas del saber.',
  ],
  saberesPorBloque: [
    {
      bloque: 'A. Identidad y libertad',
      saberes: [
        'El paso del mito al logos y el origen de la filosofía.',
        'La pregunta por la identidad personal: ¿quién soy?',
        'Libertad, determinismo y responsabilidad.',
      ],
    },
    {
      bloque: 'B. Conocimiento y realidad',
      saberes: [
        'Percepción, razón y verdad: ¿cómo conocemos?',
        'Apariencia y realidad: el problema de la certeza.',
        'Ciencia, creencia y opinión.',
      ],
    },
    {
      bloque: 'C. Sociedad, política y ética',
      saberes: [
        'El ser humano como ser social: normas, valores y cultura.',
        'Justicia, igualdad y derechos humanos.',
        'La democracia y la participación ciudadana.',
      ],
    },
    {
      bloque: 'D. Estética y creatividad',
      saberes: [
        'La experiencia estética y la pregunta por la belleza.',
        'Arte, expresión y crítica.',
      ],
    },
  ],
  criterios: [
    { bloque: 'A', descripcion: 'Reconocer problemas filosóficos en la propia vida y formular preguntas fundamentales sobre la identidad y la libertad.' },
    { bloque: 'B', descripcion: 'Distinguir entre conocimiento, creencia y opinión, y valorar la actitud crítica y científica ante la realidad.' },
    { bloque: 'C', descripcion: 'Analizar dilemas éticos y políticos, argumentando posiciones propias sobre justicia, igualdad y convivencia.' },
    { bloque: 'D', descripcion: 'Interpretar producciones artísticas y reflexionar sobre la experiencia estética y la creatividad.' },
  ],
  unidades: [
    {
      numero: 1,
      titulo: '¿Qué es la filosofía? Del mito al logos',
      descripcion: 'Origen y sentido del preguntar filosófico: el paso del mito al logos en la Grecia antigua.',
      saberes: ['El paso del mito al logos y el origen de la filosofía.', 'La actitud filosófica: asombro, duda y pregunta.'],
      criterios: ['Reconocer problemas filosóficos en la propia vida y formular preguntas fundamentales.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Para qué sirve preguntar?',
          duracionMin: 10,
          descripcion: 'Lluvia de ideas guiada: ¿qué preguntas nos hacemos en la vida que la ciencia no responde? Se recogen en la pizarra y se agrupan.',
          preguntas: ['¿Qué significa "¿por qué hay algo en lugar de nada?"', '¿Existen preguntas que no tienen una única respuesta correcta?'],
        },
        {
          tipo: 'lectura',
          titulo: 'El mito de la caverna (adaptación)',
          duracionMin: 20,
          descripcion: 'Lectura comentada de una adaptación breve del mito de la caverna de Platón. Después, trabajo en parejas.',
          texto:
            'Imagina unos prisioneros encadenados desde niños en una cueva, de espaldas a la entrada. Solo ven sombras proyectadas en la pared y creen que las sombras son la realidad. Si uno se liberara y saliera, la luz le dolería al principio; poco a poco descubriría el sol y las cosas verdaderas. Si volviera a la cueva para contar lo que ha visto, los demás no le creerían. Platón usa esta imagen para mostrar que la filosofía es el esfuerzo de salir de las apariencias hacia la verdad.',
          preguntas: [
            '¿Qué representan las sombras en tu vida cotidiana?',
            '¿Por qué los demás no creen al prisionero liberado?',
            '¿Conoces alguna "cueva" actual: prejuicios, redes sociales, rumores?',
          ],
        },
        {
          tipo: 'cierre',
          titulo: 'Mi pregunta filosófica',
          duracionMin: 10,
          descripcion: 'Cada estudiante escribe en el cuaderno una pregunta que le parezca auténticamente filosófica y la comparte en voz alta si quiere.',
        },
      ],
    },
    {
      numero: 2,
      titulo: 'La identidad personal',
      descripcion: 'La pregunta por el yo: identidad, autoconocimiento y construcción de la propia vida.',
      saberes: ['La pregunta por la identidad personal: ¿quién soy?', 'Identidad, diferencia y autoconocimiento.'],
      criterios: ['Formular preguntas fundamentales sobre la identidad y la libertad.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Quién soy yo?',
          duracionMin: 10,
          descripcion: 'Cada estudiante escribe diez respuestas a "yo soy...". Se comparan y se clasifican: características físicas, sociales, valores.',
        },
        {
          tipo: 'dialogo',
          titulo: 'El barco de Teseo',
          duracionMin: 20,
          descripcion: 'Diálogo socrático a partir de la paradoja de Teseo aplicada a la identidad personal.',
          texto:
            'El barco de Teseo va cambiando tablón a tablón hasta que no queda ninguno de los originales. ¿Sigue siendo el mismo barco? Ahora aplícalo a ti: tus células se renuevan, tus gustos y recuerdos cambian. ¿Qué hace que sigas siendo tú?',
          preguntas: [
            '¿Eres la misma persona que eras con 8 años? ¿Qué ha cambiado y qué permanece?',
            '¿La identidad la eliges o te la dan los demás?',
          ],
        },
        {
          tipo: 'taller',
          titulo: 'Carta a mi yo futuro',
          duracionMin: 15,
          descripcion: 'Escritura individual: una carta al yo de dentro de diez años describiendo quién se quiere ser. Se guarda en el cuaderno.',
        },
      ],
    },
    {
      numero: 3,
      titulo: 'Realidad y conocimiento',
      descripcion: '¿Cómo conocemos? Sentidos, razón, verdad y el problema de la apariencia.',
      saberes: ['Percepción, razón y verdad.', 'Apariencia y realidad: el problema de la certeza.', 'Ciencia, creencia y opinión.'],
      criterios: ['Distinguir entre conocimiento, creencia y opinión y valorar la actitud crítica y científica.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Te fías de tus sentidos?',
          duracionMin: 10,
          descripcion: 'Se muestran dos ilusiones ópticas sencillas (dibujadas en la pizarra). Debate breve: ¿los sentidos nos engañan?',
        },
        {
          tipo: 'lectura',
          titulo: 'Descartes: la duda metódica',
          duracionMin: 20,
          descripcion: 'Lectura de una adaptación de la primera meditación de Descartes y puesta en común.',
          texto:
            'Descartes decidió dudar de todo aquello de lo que pudiera dudar, aunque solo fuera un poco: los sentidos a veces nos engañan, y quizá todo lo que creemos ver podría ser un sueño. Pero descubrió algo que resiste a toda duda: "pienso, luego existo". A partir de esa primera certeza, la razón puede reconstruir un conocimiento seguro.',
          preguntas: [
            '¿De qué no puedes dudar nunca?',
            '¿Conocimiento y opinión son lo mismo? ¿En qué se diferencian?',
          ],
        },
        {
          tipo: 'taller',
          titulo: 'Creencia, opinión y conocimiento',
          duracionMin: 15,
          descripcion: 'Se reparten afirmaciones (ej.: "el agua hierve a 100 °C al nivel del mar", "mi equipo es el mejor"). Se clasifican en conocimiento, creencia u opinión y se justifica.',
        },
      ],
    },
    {
      numero: 4,
      titulo: 'Sociedad, política y justicia',
      descripcion: 'El ser humano como animal social: normas, justicia, igualdad y democracia.',
      saberes: ['El ser humano como ser social: normas, valores y cultura.', 'Justicia, igualdad y derechos humanos.', 'La democracia y la participación.'],
      criterios: ['Analizar dilemas éticos y políticos, argumentando sobre justicia, igualdad y convivencia.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Por qué hay normas?',
          duracionMin: 10,
          descripcion: 'Debate: ¿qué pasaría si mañana no hubiera ninguna norma en el instituto ni en la ciudad?',
        },
        {
          tipo: 'dialogo',
          titulo: 'El velo de la ignorancia',
          duracionMin: 20,
          descripcion: 'Se plantea el experimento mental de John Rawls y se decide en grupo una regla justa para repartir el patio.',
          texto:
            'Imagina que tienes que decidir las reglas de la sociedad antes de saber quién serás en ella: rico o pobre, sano o enfermo, de una cultura u otra. Rawls dice que, tras ese "velo de ignorancia", elegiríamos reglas justas para todos. ¿Qué reglas elegirías tú para el recreo?',
          preguntas: ['¿Qué es más justo: dar a todos lo mismo o dar más a quien más lo necesita?', '¿Puede ser justa una regla que a ti te perjudica?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Titular de prensa',
          duracionMin: 10,
          descripcion: 'Cada estudiante redacta un titular de prensa que resuma la idea de justicia que defendería.',
        },
      ],
    },
    {
      numero: 5,
      titulo: 'Ética: ¿cómo debemos vivir?',
      descripcion: 'La pregunta por el bien, la libertad y la responsabilidad de nuestras acciones.',
      saberes: ['Libertad, determinismo y responsabilidad.', 'Valores, normas y dilemas morales.'],
      criterios: ['Analizar dilemas éticos y argumentar posiciones propias sobre la acción y la responsabilidad.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: 'El dilema del tranvía',
          duracionMin: 15,
          descripcion: 'Se plantea el dilema del tranvía y se vota, pidiendo justificación en cada ronda de variantes.',
          texto:
            'Un tranvía sin frenos avanza hacia cinco personas. Puedes accionar una palanca y desviarlo a una vía donde hay una sola persona. ¿Lo harías? ¿Y si la única forma de salvarlas fuera empujar a alguien desde un puente?',
        },
        {
          tipo: 'dialogo',
          titulo: '¿Somos libres?',
          duracionMin: 20,
          descripcion: 'Debate estructurado sobre libertad, condicionantes (genes, educación, entorno) y responsabilidad.',
          preguntas: ['Si todo tiene una causa, ¿dónde queda la libertad?', '¿De qué eres responsable aunque no hayas elegido las circunstancias?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Mi norma de vida',
          duracionMin: 10,
          descripcion: 'Escritura breve: una norma que me comprometo a seguir y el porqué.',
        },
      ],
    },
    {
      numero: 6,
      titulo: 'Estética y creatividad',
      descripcion: 'La experiencia de la belleza, el arte como expresión y la crítica.',
      saberes: ['La experiencia estética y la pregunta por la belleza.', 'Arte, expresión y crítica.'],
      criterios: ['Interpretar producciones artísticas y reflexionar sobre la experiencia estética.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Qué es bello?',
          duracionMin: 10,
          descripcion: 'Se proyectan o describen obras muy distintas (un cuadro clásico, un grafiti, un paisaje). ¿Qué nos produce cada una?',
        },
        {
          tipo: 'taller',
          titulo: 'El arte como pregunta',
          duracionMin: 20,
          descripcion: 'En grupos, cada equipo elige una obra (música, imagen o texto) y explica qué pregunta o emoción plantea.',
          preguntas: ['¿El arte tiene que ser bonito para ser arte?', '¿Puede algo feo ser artísticamente valioso?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Crítica breve',
          duracionMin: 10,
          descripcion: 'Cada estudiante escribe una mini-crítica (tres frases) de una obra que le importe.',
        },
      ],
    },
  ],
};

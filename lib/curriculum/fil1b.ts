import type { CurriculoMateria } from '@/lib/tipos';

// Filosofía — 1.º Bachillerato (FIL1B). Común, 3 h/semana.
// A partir del RD 243/2022 y del Decreto 30/2023 de Canarias (Anexo 3).

export const FIL1B: CurriculoMateria = {
  materiaCodigo: 'FIL1B',
  competencias: [
    'Identificar y formular problemas filosóficos con rigor conceptual.',
    'Analizar textos y argumentos filosóficos, identificando tesis y razones.',
    'Construir argumentos propios y evaluarlos críticamente.',
    'Dialogar de forma argumentada, respetuosa y abierta a la revisión.',
    'Relacionar la filosofía con la ciencia, el arte y la vida social.',
  ],
  saberesPorBloque: [
    {
      bloque: 'A. La filosofía y el ser humano',
      saberes: [
        'Naturaleza, cultura y condición humana.',
        'La pregunta por el sentido de la existencia.',
        'El ser humano como ser simbólico y creador.',
      ],
    },
    {
      bloque: 'B. Conocimiento y realidad',
      saberes: [
        'Verdad, justificación y criterios de certeza.',
        'El conocimiento científico y sus límites.',
        'Realidad, apariencia y metafísica.',
      ],
    },
    {
      bloque: 'C. Acción y creación',
      saberes: [
        'La acción humana: libertad, determinación y responsabilidad.',
        'Ética, valores y vida buena.',
        'La experiencia estética y la creatividad.',
      ],
    },
    {
      bloque: 'D. Sociedad y política',
      saberes: [
        'El origen de la sociedad y el poder.',
        'Justicia, legitimidad y Estado de derecho.',
        'Democracia, ciudadanía y derechos humanos.',
      ],
    },
  ],
  criterios: [
    { bloque: 'A', descripcion: 'Reconocer los rasgos de la condición humana y valorar la pregunta por el sentido de la existencia.' },
    { bloque: 'B', descripcion: 'Analizar las condiciones y límites del conocimiento, distinguiendo verdad, justificación y certeza.' },
    { bloque: 'C', descripcion: 'Argumentar sobre la libertad y la responsabilidad, y valorar críticamente posiciones éticas.' },
    { bloque: 'D', descripcion: 'Evaluar concepciones de la sociedad y el poder, y fundamentar posiciones propias sobre la democracia y la justicia.' },
  ],
  unidades: [
    {
      numero: 1,
      titulo: 'La filosofía: definición y métodos',
      descripcion: 'Qué es la filosofía, su origen y sus grandes ramas; la especificidad del preguntar filosófico.',
      saberes: ['Naturaleza de la filosofía y sus ramas.', 'La actitud filosófica: asombro, duda y argumentación.'],
      criterios: ['Reconocer los rasgos de la condición humana y valorar la pregunta por el sentido.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: 'Mapa de preguntas',
          duracionMin: 10,
          descripcion: 'Se construye un mapa con las grandes preguntas (¿qué puedo saber?, ¿qué debo hacer?, ¿qué me cabe esperar?) y se asignan a ramas de la filosofía.',
        },
        {
          tipo: 'lectura',
          titulo: 'La especificidad de la filosofía',
          duracionMin: 20,
          descripcion: 'Lectura y comentario de un texto adaptado sobre la diferencia entre filosofía, ciencia y mito.',
          texto:
            'La ciencia responde preguntas dentro de un método y un objeto delimitados; la filosofía pregunta por los supuestos mismos de esas preguntas: qué es conocer, qué es real, qué es justo. Por eso la filosofía no es una ciencia más, sino la reflexión sobre el sentido y los fundamentos de todo lo demás.',
          preguntas: ['¿Puede la ciencia responder a la pregunta "¿qué debo hacer con mi vida?"?', '¿Qué pregunta te parece hoy imprescindible y ninguna disciplina responde?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Definición propia',
          duracionMin: 10,
          descripcion: 'Cada estudiante redacta su propia definición de filosofía en una frase y la defiende brevemente.',
        },
      ],
    },
    {
      numero: 2,
      titulo: 'El conocimiento: verdad y ciencia',
      descripcion: 'Verdad, justificación, racionalidad y método científico.',
      saberes: ['Verdad, justificación y criterios de certeza.', 'El conocimiento científico y sus límites.'],
      criterios: ['Analizar las condiciones y límites del conocimiento.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Cuándo está justificado creer?',
          duracionMin: 10,
          descripcion: 'Se presentan tres afirmaciones y se pide clasificarlas por grado de justificación.',
        },
        {
          tipo: 'lectura',
          titulo: 'El problema de la inducción',
          duracionMin: 20,
          descripcion: 'Texto adaptado de Hume sobre la inducción y debate.',
          texto:
            'Creemos que el sol saldrá mañana porque siempre ha salido. Pero, ¿qué justifica esa confianza? La experiencia pasada solo nos habla del pasado. Hume mostró que la costumbre, y no la lógica, es la base de nuestras expectativas. La ciencia vive de esa apuesta: prever el futuro a partir de regularidades observadas.',
          preguntas: ['¿Qué diferencia hay entre una ley científica y una costumbre?', '¿Puede la ciencia alcanzar verdades definitivas?'],
        },
        {
          tipo: 'taller',
          titulo: '¿Ciencia o pseudociencia?',
          duracionMin: 15,
          descripcion: 'Se analizan rasgos (falsabilidad, revisión por pares) y se clasifican ejemplos.',
        },
      ],
    },
    {
      numero: 3,
      titulo: 'Realidad y metafísica',
      descripcion: 'La pregunta por lo real: apariencia, sustancia y el problema del cambio.',
      saberes: ['Realidad, apariencia y metafísica.', 'El problema del cambio y la permanencia.'],
      criterios: ['Analizar las condiciones y límites del conocimiento sobre la realidad.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: 'Todo cambia, ¿o no?',
          duracionMin: 10,
          descripcion: 'Debate de arranque: si todo cambia, ¿cómo es posible que reconozcamos las cosas?',
        },
        {
          tipo: 'dialogo',
          titulo: 'Parménides y Heráclito',
          duracionMin: 20,
          descripcion: 'Contraste de las dos tesis clásicas y búsqueda de una síntesis.',
          texto:
            'Heráclito afirma que todo fluye: no te bañas dos veces en el mismo río. Parménides replica que el cambio es ilusorio: lo que es, es; lo que no es, no es. Dos intuiciones opuestas que la filosofía posterior intentará conciliar.',
          preguntas: ['¿Qué permanece en ti mientras cambias?', '¿Es el cambio real o una apariencia de nuestros sentidos?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Mi tesis',
          duracionMin: 10,
          descripcion: 'Redacción de un párrafo defendiendo una posición sobre cambio y permanencia.',
        },
      ],
    },
    {
      numero: 4,
      titulo: 'El ser humano: naturaleza y cultura',
      descripcion: 'Antropología filosófica: qué nos hace humanos, el papel del lenguaje y la cultura.',
      saberes: ['Naturaleza, cultura y condición humana.', 'El ser humano como ser simbólico y creador.'],
      criterios: ['Reconocer los rasgos de la condición humana y valorar la pregunta por el sentido.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Qué nos hace humanos?',
          duracionMin: 10,
          descripcion: 'Lluvia de ideas y contraste con otras especies: lenguaje, técnica, ética, arte.',
        },
        {
          tipo: 'lectura',
          titulo: 'El animal simbólico',
          duracionMin: 20,
          descripcion: 'Texto adaptado de Cassirer sobre el ser humano como animal simbólico.',
          texto:
            'El ser humano no vive solo en un universo físico, sino en un universo simbólico: el lenguaje, el mito, el arte y la religión son los hilos de esa red que él mismo teje. Ya no se enfrenta a la realidad de forma inmediata; la interpreta a través de símbolos que él crea.',
          preguntas: ['Pon un ejemplo de cómo los símbolos cambian tu forma de ver el mundo.', '¿Habría cultura sin lenguaje?'],
        },
        {
          tipo: 'taller',
          titulo: 'Análisis de un símbolo',
          duracionMin: 15,
          descripcion: 'Cada grupo analiza un símbolo social (bandera, emoji, ritual) y su significado compartido.',
        },
      ],
    },
    {
      numero: 5,
      titulo: 'La acción: libertad y responsabilidad',
      descripcion: 'El problema de la libertad, el determinismo y las condiciones de la responsabilidad.',
      saberes: ['La acción humana: libertad, determinación y responsabilidad.', 'Ética, valores y vida buena.'],
      criterios: ['Argumentar sobre la libertad y la responsabilidad y valorar posiciones éticas.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Libre o determinado?',
          duracionMin: 10,
          descripcion: 'Se presenta el experimento mental del neurocientífico que predice decisiones. Debate breve.',
        },
        {
          tipo: 'dialogo',
          titulo: 'Determinismo vs. libertad',
          duracionMin: 20,
          descripcion: 'Se exponen las posiciones (determinismo duro, libertarismo, compatibilismo) y se discute.',
          preguntas: ['Si un juez supiera que un delito estaba "causado", ¿debería castigar igual?', '¿Eres más libre cuantas más opciones tienes?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Posición argumentada',
          duracionMin: 10,
          descripcion: 'Párrafo final defendiendo una postura con al menos dos razones.',
        },
      ],
    },
    {
      numero: 6,
      titulo: 'Ética: teorías sobre la vida buena',
      descripcion: 'Éticas de la virtud, del deber y utilitaristas: cómo orientar la acción.',
      saberes: ['Ética, valores y vida buena.', 'Principales teorías éticas.'],
      criterios: ['Valorar críticamente posiciones éticas y aplicarlas a dilemas.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: 'El caso del médico',
          duracionMin: 10,
          descripcion: 'Dilema: un médico puede salvar a cinco personas usando los órganos de una persona sana sin su consentimiento. Votación y justificación.',
        },
        {
          tipo: 'lectura',
          titulo: 'Tres miradas éticas',
          duracionMin: 20,
          descripcion: 'Presentación de Aristóteles (virtud), Kant (deber) y Mill (utilidad) aplicados al mismo caso.',
          texto:
            'Aristóteles preguntaría qué haría la persona virtuosa y qué vida queremos cultivar. Kant preguntaría si la máxima de nuestra acción podría convertirse en ley universal y si tratamos a las personas como fines, no como medios. Mill calcularía qué acción produce mayor felicidad para el mayor número. Tres preguntas, tres éticas.',
          preguntas: ['¿Qué ética te convence más para el caso del médico?', '¿Puede una acción ser útil pero injusta?'],
        },
        {
          tipo: 'taller',
          titulo: 'Aplicación a un caso real',
          duracionMin: 15,
          descripcion: 'En grupos, aplicar las tres teorías a una noticia reciente.',
        },
      ],
    },
    {
      numero: 7,
      titulo: 'Sociedad y política: el contrato social',
      descripcion: 'Origen y legitimidad del poder: del estado de naturaleza al Estado de derecho.',
      saberes: ['El origen de la sociedad y el poder.', 'Justicia, legitimidad y Estado de derecho.', 'Democracia, ciudadanía y derechos humanos.'],
      criterios: ['Evaluar concepciones de la sociedad y el poder y fundamentar posiciones sobre democracia y justicia.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Por qué obedecemos?',
          duracionMin: 10,
          descripcion: 'Debate: ¿qué hace legítima una ley? ¿Y una que consideramos injusta?',
        },
        {
          tipo: 'dialogo',
          titulo: 'Hobbes, Locke y Rousseau',
          duracionMin: 20,
          descripcion: 'Contraste de los tres contractualistas y sus consecuencias políticas.',
          texto:
            'Hobbes ve el estado de naturaleza como guerra de todos contra todos: hace falta un poder fuerte. Locke lo ve como un estado de libertad que el Estado debe proteger, con derecho a resistir al tirano. Rousseau piensa que el contrato debe expresar la voluntad general para que obedecer sea obedecerse a uno mismo.',
          preguntas: ['¿De qué peligro te protege el Estado? ¿Qué libertad cedes?', '¿Cuándo sería legítima la desobediencia civil?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Mi contrato ideal',
          duracionMin: 10,
          descripcion: 'Redacción de tres cláusulas que cada estudiante incluiría en un contrato social.',
        },
      ],
    },
    {
      numero: 8,
      titulo: 'Estética: arte y experiencia',
      descripcion: 'La experiencia estética, el juicio de gusto y la relación entre arte y verdad.',
      saberes: ['La experiencia estética y la creatividad.', 'Arte, verdad y crítica.'],
      criterios: ['Interpretar obras y reflexionar sobre la experiencia estética y la creatividad.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Gusto o juicio?',
          duracionMin: 10,
          descripcion: 'Debate: "sobre gustos no hay nada escrito", ¿es cierto? ¿Puede argumentarse sobre arte?',
        },
        {
          tipo: 'taller',
          titulo: 'Análisis de una obra',
          duracionMin: 20,
          descripcion: 'Análisis guiado de una obra (pintura, pieza musical o poema) en tres niveles: descripción, interpretación, valoración.',
          preguntas: ['¿Qué distingue una opinión sobre arte de un juicio crítico?', '¿Puede el arte decir verdades que la ciencia no puede?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Juicio crítico',
          duracionMin: 10,
          descripcion: 'Redacción de un juicio crítico breve y argumentado sobre una obra elegida.',
        },
      ],
    },
  ],
};

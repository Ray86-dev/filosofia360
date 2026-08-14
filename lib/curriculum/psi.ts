import type { CurriculoMateria } from '@/lib/tipos';

// Psicología — Bachillerato (PSI). Optativa, 2 h/semana.
// Decreto 78/2025 de Canarias (optativas de Bachillerato).

export const PSI: CurriculoMateria = {
  materiaCodigo: 'PSI',
  competencias: [
    'Comprender la psicología como ciencia y sus principales métodos.',
    'Analizar los procesos cognitivos, emocionales y motivacionales.',
    'Relacionar la psicología con el bienestar y la salud mental.',
    'Aplicar el pensamiento crítico a tópicos y mitos sobre la mente.',
  ],
  saberesPorBloque: [
    {
      bloque: 'I. La psicología como ciencia',
      saberes: ['Objeto y métodos de la psicología.', 'Historia y escuelas principales.'],
    },
    {
      bloque: 'II. Procesos cognitivos',
      saberes: ['Percepción, atención, memoria y aprendizaje.', 'Pensamiento, inteligencia y lenguaje.'],
    },
    {
      bloque: 'III. Emoción y motivación',
      saberes: ['Emociones básicas y su función.', 'Motivación, frustración y logro.'],
    },
    {
      bloque: 'IV. Personalidad y desarrollo',
      saberes: ['Teorías de la personalidad.', 'Desarrollo a lo largo de la vida.'],
    },
    {
      bloque: 'V. Psicología social y salud',
      saberes: ['Influencia social, grupos y prejuicios.', 'Salud mental y bienestar.'],
    },
  ],
  criterios: [
    { bloque: 'I', descripcion: 'Explicar el objeto y los métodos de la psicología como ciencia.' },
    { bloque: 'II', descripcion: 'Analizar los procesos cognitivos y valorar su aplicación.' },
    { bloque: 'III', descripcion: 'Reconocer el papel de las emociones y la motivación en la conducta.' },
    { bloque: 'IV', descripcion: 'Comparar teorías de la personalidad y del desarrollo.' },
    { bloque: 'V', descripcion: 'Valorar críticamente la influencia social y promover el bienestar y la salud mental.' },
  ],
  unidades: [
    {
      numero: 1,
      titulo: 'La psicología como ciencia',
      descripcion: 'Qué estudia la psicología, con qué métodos y qué la distingue del sentido común.',
      saberes: ['Objeto y métodos de la psicología.', 'Historia y escuelas principales.'],
      criterios: ['Explicar el objeto y los métodos de la psicología como ciencia.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: 'Mitos sobre la mente',
          duracionMin: 10,
          descripcion: 'Verdadero/falso sobre mitos populares ("solo usamos el 10 % del cerebro") y contraste con la ciencia.',
        },
        {
          tipo: 'lectura',
          titulo: '¿Qué es la psicología?',
          duracionMin: 15,
          descripcion: 'Texto introductorio sobre objeto, método científico y ámbitos de aplicación.',
          texto:
            'La psicología estudia la conducta y los procesos mentales mediante métodos científicos: observación, experimento, encuesta y estudio de casos. No es adivinación ni sentido común: sus afirmaciones deben ser comprobables y revisables.',
          preguntas: ['¿Qué diferencias hay entre psicología y sentido común?', '¿Por qué es importante que sea una ciencia?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Ramas de la psicología',
          duracionMin: 10,
          descripcion: 'Se relacionan casos concretos con la rama correspondiente (clínica, educativa, social, organizacional).',
        },
      ],
    },
    {
      numero: 2,
      titulo: 'Percepción, memoria y aprendizaje',
      descripcion: 'Cómo percibimos, recordamos y aprendemos; ilusiones y sesgos.',
      saberes: ['Percepción, atención, memoria y aprendizaje.', 'Pensamiento, inteligencia y lenguaje.'],
      criterios: ['Analizar los procesos cognitivos y valorar su aplicación.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: 'Ilusiones y sesgos',
          duracionMin: 10,
          descripcion: 'Se muestran ilusiones perceptivas y se comenta que la percepción es construcción, no copia.',
        },
        {
          tipo: 'taller',
          titulo: 'La curva del olvido',
          duracionMin: 15,
          descripcion: 'Se explica la curva de Ebbinghaus y se proponen técnicas de estudio basadas en la evidencia (repaso espaciado, recuperación).',
          preguntas: ['¿Por qué olvidamos lo que acabamos de estudiar?', '¿Qué técnica de estudio te funciona y por qué?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Mi plan de estudio',
          duracionMin: 10,
          descripcion: 'Cada estudiante rediseña una sesión de estudio con al menos dos técnicas vistas.',
        },
      ],
    },
    {
      numero: 3,
      titulo: 'Emoción y motivación',
      descripcion: 'Las emociones y su función; motivación intrínseca y extrínseca.',
      saberes: ['Emociones básicas y su función.', 'Motivación, frustración y logro.'],
      criterios: ['Reconocer el papel de las emociones y la motivación en la conducta.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Para qué sirven las emociones?',
          duracionMin: 10,
          descripcion: 'Se asocia cada emoción básica con su función adaptativa (miedo → huida, asco → protección...).',
        },
        {
          tipo: 'dialogo',
          titulo: 'Motivación intrínseca',
          duracionMin: 15,
          descripcion: 'Debate: ¿por qué seguimos haciendo algo sin recompensa externa? Se contrasta con la motivación extrínseca.',
          preguntas: ['¿Qué te motiva a estudiar una asignatura que te cuesta?', '¿La recompensa externa puede apagar la motivación interna?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Regulación emocional',
          duracionMin: 10,
          descripcion: 'Se practican dos estrategias de regulación (nombrar, reencuadrar) con ejemplos propios.',
        },
      ],
    },
    {
      numero: 4,
      titulo: 'Personalidad y desarrollo',
      descripcion: 'Teorías de la personalidad y etapas del desarrollo a lo largo de la vida.',
      saberes: ['Teorías de la personalidad.', 'Desarrollo a lo largo de la vida.'],
      criterios: ['Comparar teorías de la personalidad y del desarrollo.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Cómo eres?',
          duracionMin: 10,
          descripcion: 'Autodescripción con rasgos y contraste con las descripciones que harían los demás.',
        },
        {
          tipo: 'lectura',
          titulo: 'Los cinco grandes',
          duracionMin: 15,
          descripcion: 'Texto sobre el modelo de los cinco grandes rasgos (apertura, responsabilidad, extraversión, amabilidad, neuroticismo).',
          texto:
            'El modelo de los cinco grandes describe la personalidad con cinco dimensiones estables: apertura a la experiencia, responsabilidad, extraversión, amabilidad y estabilidad emocional. No hay perfiles "buenos" o "malos": cada rasgo tiene costes y beneficios según el contexto.',
          preguntas: ['¿En qué rasgo te situarías más alto? ¿En cuál más bajo?', '¿La personalidad cambia o es fija?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Desarrollo a lo largo de la vida',
          duracionMin: 10,
          descripcion: 'Se repasan los grandes cambios (infancia, adolescencia, adultez, vejez) y sus tareas vitales.',
        },
      ],
    },
    {
      numero: 5,
      titulo: 'Psicología social: influencia y grupos',
      descripcion: 'Conformidad, obediencia, prejuicios y pensamiento de grupo.',
      saberes: ['Influencia social, grupos y prejuicios.', 'Salud mental y bienestar.'],
      criterios: ['Valorar críticamente la influencia social y promover el bienestar.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Hasta dónde obedecemos?',
          duracionMin: 10,
          descripcion: 'Se presenta el experimento de Milgram (con contexto ético) y se debate su significado.',
        },
        {
          tipo: 'dialogo',
          titulo: 'Conformidad y grupos',
          duracionMin: 15,
          descripcion: 'Se analiza el experimento de Asch y situaciones cotidianas de conformidad.',
          preguntas: ['¿Cuándo te has callado por no ir contra el grupo?', '¿Qué puede protegerte del pensamiento de grupo?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Contra los prejuicios',
          duracionMin: 10,
          descripcion: 'Se proponen tres estrategias para reducir prejuicios en el aula.',
        },
      ],
    },
    {
      numero: 6,
      titulo: 'Salud mental y bienestar',
      descripcion: 'Bienestar, estrés, ansiedad y hábitos de cuidado; cuándo pedir ayuda.',
      saberes: ['Salud mental y bienestar.', 'Estrés, ansiedad y afrontamiento.'],
      criterios: ['Valorar críticamente la influencia social y promover el bienestar y la salud mental.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Qué es estar bien?',
          duracionMin: 10,
          descripcion: 'Se construye una definición de bienestar más allá de la ausencia de enfermedad.',
        },
        {
          tipo: 'taller',
          titulo: 'Caja de herramientas',
          duracionMin: 15,
          descripcion: 'Se elabora un repertorio de estrategias de afrontamiento (sueño, ejercicio, apoyo social, ayuda profesional).',
          preguntas: ['¿Qué señales indican que necesitamos pedir ayuda?', '¿A quién acudirías en el centro o en casa?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Romper el estigma',
          duracionMin: 10,
          descripcion: 'Debate breve sobre el estigma en salud mental y cómo hablar de ello con respeto.',
        },
      ],
    },
  ],
};

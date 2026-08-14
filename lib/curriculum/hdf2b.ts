import type { CurriculoMateria } from '@/lib/tipos';

// Historia de la Filosofía — 2.º Bachillerato (HDF2B). Común, 3 h/semana.
// Decreto 30/2023 de Canarias (Anexo 4) y RD 243/2022. Los autores responden
// al itinerario habitual de la materia en Canarias (presocráticos → Ortega).

export const HDF2B: CurriculoMateria = {
  materiaCodigo: 'HDF2B',
  competencias: [
    'Situar autores y corrientes en su contexto histórico y filosófico.',
    'Comprender y comentar textos filosóficos, identificando tesis y argumentos.',
    'Comparar posiciones filosóficas y valorar su vigencia actual.',
    'Elaborar disertaciones argumentadas sobre problemas filosóficos.',
  ],
  saberesPorBloque: [
    {
      bloque: 'Antigua y medieval',
      saberes: [
        'Del mito al logos: los presocráticos.',
        'Sócrates, los sofistas y Platón.',
        'Aristóteles: metafísica, ética y política.',
        'Helenismo y filosofía medieval: Agustín y Tomás de Aquino.',
      ],
    },
    {
      bloque: 'Moderna',
      saberes: [
        'Renacimiento y revolución científica.',
        'Racionalismo: Descartes.',
        'Empirismo: Hume.',
        'Ilustración: Kant.',
      ],
    },
    {
      bloque: 'Contemporánea',
      saberes: [
        'Marx y la crítica de la economía política.',
        'Nietzsche y la crítica de la cultura occidental.',
        'Ortega y la filosofía española del siglo XX.',
      ],
    },
  ],
  criterios: [
    { bloque: 'Antigua y medieval', descripcion: 'Explicar las principales posiciones de la filosofía antigua y medieval y comentar sus textos.' },
    { bloque: 'Moderna', descripcion: 'Analizar el giro moderno y comparar racionalismo, empirismo e Ilustración.' },
    { bloque: 'Contemporánea', descripcion: 'Valorar las propuestas de Marx, Nietzsche y Ortega y su vigencia.' },
  ],
  unidades: [
    {
      numero: 1,
      titulo: 'Los orígenes: de los presocráticos a Sócrates',
      descripcion: 'El paso del mito al logos y la búsqueda del principio (arché) de todas las cosas.',
      saberes: ['Del mito al logos: los presocráticos.', 'Sócrates y el giro antropológico.'],
      criterios: ['Explicar las posiciones de la filosofía antigua y comentar sus textos.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Todo viene de algo?',
          duracionMin: 10,
          descripcion: 'Debate de arranque: si todo cambia, ¿hay algo que permanezca? Los presocráticos buscaron el arché.',
        },
        {
          tipo: 'lectura',
          titulo: 'Tales, Anaximandro y Heráclito',
          duracionMin: 20,
          descripcion: 'Fragmentos breves comentados: el agua, lo ápeiron y el logos.',
          texto:
            'Tales afirmó que el principio de todo es el agua; Anaximandro, que es lo indeterminado (ápeiron); Heráclito, que todo fluye gobernado por el logos. Por primera vez se busca una explicación racional y no mítica de la naturaleza.',
          preguntas: ['¿Qué ganamos al explicar el mundo sin recurrir a los dioses?', '¿Sigue vigente la idea de un principio común a todo?'],
        },
        {
          tipo: 'dialogo',
          titulo: 'El método socrático',
          duracionMin: 15,
          descripcion: 'Se practica la ironía y la mayéutica con una pregunta cotidiana ("¿qué es la valentía?").',
        },
      ],
    },
    {
      numero: 2,
      titulo: 'Platón: la teoría de las Ideas',
      descripcion: 'Dualismo ontológico y epistemológico, el mito de la caverna y la República.',
      saberes: ['Sócrates, los sofistas y Platón.', 'La teoría de las Ideas y la ciudad justa.'],
      criterios: ['Explicar la teoría de las Ideas y comentar el mito de la caverna.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: 'Dos mundos',
          duracionMin: 10,
          descripcion: 'Se dibuja la línea de la República: opinión/conocimiento, visible/inteligible.',
        },
        {
          tipo: 'lectura',
          titulo: 'El mito de la caverna',
          duracionMin: 25,
          descripcion: 'Comentario de texto guiado del mito de la caverna (República, VII).',
          texto:
            'En la caverna, los prisioneros toman las sombras por realidad. Quien sale descubre el sol, que representa la Idea del Bien, causa de todo lo que es y de todo lo que se conoce. La educación es el arte de volver el alma hacia la luz.',
          preguntas: ['¿Qué relación hay entre el Bien y las demás Ideas?', '¿Por qué el filósofo debe "volver a la caverna"?'],
        },
        {
          tipo: 'cierre',
          titulo: '¿Qué sombras nos atan hoy?',
          duracionMin: 10,
          descripcion: 'Aplicación actual del mito por escrito.',
        },
      ],
    },
    {
      numero: 3,
      titulo: 'Aristóteles: sustancia, virtud y política',
      descripcion: 'Hilemorfismo, las cuatro causas, la ética de la virtud y el animal político.',
      saberes: ['Aristóteles: metafísica, ética y política.'],
      criterios: ['Explicar la filosofía aristotélica y compararla con Platón.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿De qué está hecha una mesa?',
          duracionMin: 10,
          descripcion: 'Con la mesa se introducen materia, forma y las cuatro causas.',
        },
        {
          tipo: 'lectura',
          titulo: 'Virtud y término medio',
          duracionMin: 20,
          descripcion: 'Texto adaptado de la Ética a Nicómaco sobre el término medio.',
          texto:
            'La virtud es un hábito que se adquiere practicándolo y que consiste en el término medio entre dos excesos: la valentía entre la cobardía y la temeridad. La felicidad (eudaimonía) es la actividad del alma conforme a la virtud.',
          preguntas: ['¿Se puede enseñar la virtud?', '¿Qué término medio propondrías para el uso del móvil?'],
        },
        {
          tipo: 'taller',
          titulo: 'Comparar Platón y Aristóteles',
          duracionMin: 15,
          descripcion: 'Cuadro comparativo: teoría del conocimiento, ética y política.',
        },
      ],
    },
    {
      numero: 4,
      titulo: 'Helenismo y filosofía medieval',
      descripcion: 'Estoicos, epicúreos y escépticos; Agustín y Tomás de Aquino: fe y razón.',
      saberes: ['Helenismo: estoicismo, epicureísmo y escepticismo.', 'Agustín y Tomás de Aquino.'],
      criterios: ['Explicar la filosofía medieval y la relación fe-razón.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Cómo vivir bien?',
          duracionMin: 10,
          descripcion: 'Tres recetas antiguas: controlar lo que depende de ti (estoicos), buscar el placer sereno (epicúreos), suspender el juicio (escépticos).',
        },
        {
          tipo: 'lectura',
          titulo: 'Tomás de Aquino y las cinco vías',
          duracionMin: 20,
          descripcion: 'Síntesis de las cinco vías y de la relación entre fe y razón.',
          texto:
            'Para Tomás de Aquino, fe y razón no se contradicen: la razón puede demostrar algunas verdades (como la existencia de Dios) y la fe añade otras que la superan. Sus cinco vías parten de la experiencia —el movimiento, las causas, la contingencia— para concluir en un primer motor inmóvil.',
          preguntas: ['¿Por qué se llama "motor inmóvil"?', '¿Qué límites reconoce Tomás a la razón?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Actualidad estoica',
          duracionMin: 10,
          descripcion: 'Reflexión: ¿qué ideas estoicas aparecen hoy en la psicología o el "mindfulness"?',
        },
      ],
    },
    {
      numero: 5,
      titulo: 'Descartes: el racionalismo',
      descripcion: 'La duda metódica, el cogito y el dualismo mente-cuerpo.',
      saberes: ['Renacimiento y revolución científica.', 'Racionalismo: Descartes.'],
      criterios: ['Analizar el giro moderno y el racionalismo cartesiano.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: 'Dudar de todo',
          duracionMin: 10,
          descripcion: '¿De qué podemos estar absolutamente seguros? Se enumeran candidatos y se someten a duda.',
        },
        {
          tipo: 'lectura',
          titulo: 'El cogito',
          duracionMin: 25,
          descripcion: 'Comentario de la segunda meditación: "pienso, luego existo".',
          texto:
            'Aunque un genio maligno me engañara en todo, para ser engañado tengo que existir. La primera certeza es el cogito: mientras pienso, existo. Descartes convierte la razón en el fundamento del conocimiento y separa radicalmente la mente (res cogitans) del cuerpo (res extensa).',
          preguntas: ['¿Es el cogito una inferencia o una intuición?', '¿Qué problemas plantea el dualismo mente-cuerpo?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Fundamentos',
          duracionMin: 10,
          descripcion: 'Resumen por escrito de la cadena: duda → cogito → Dios → mundo.',
        },
      ],
    },
    {
      numero: 6,
      titulo: 'Hume: el empirismo',
      descripcion: 'Impresiones e ideas, crítica de la causalidad y escepticismo moderado.',
      saberes: ['Empirismo: Hume.', 'La crítica de la sustancia y de la causalidad.'],
      criterios: ['Comparar racionalismo y empirismo.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿De dónde vienen las ideas?',
          duracionMin: 10,
          descripcion: 'Contraste con Descartes: ¿hay ideas innatas o todo procede de la experiencia?',
        },
        {
          tipo: 'lectura',
          titulo: 'La crítica de la causalidad',
          duracionMin: 20,
          descripcion: 'Texto adaptado del Tratado sobre la costumbre y la conexión necesaria.',
          texto:
            'Vemos que una bola choca con otra y que la segunda se mueve, pero no vemos ninguna "conexión necesaria" entre ambos hechos. Llamamos causa a lo que la costumbre nos ha enseñado a asociar. La necesidad causal está en la mente, no en las cosas.',
          preguntas: ['Si la causalidad es costumbre, ¿se hunde la ciencia?', '¿Qué le respondería un racionalista a Hume?'],
        },
        {
          tipo: 'taller',
          titulo: 'Racionalismo vs. empirismo',
          duracionMin: 15,
          descripcion: 'Debate por equipos defendiendo cada postura ante un tribunal.',
        },
      ],
    },
    {
      numero: 7,
      titulo: 'Kant: la Ilustración y la razón práctica',
      descripcion: 'El giro copernicano, el imperativo categórico y la autonomía moral.',
      saberes: ['Ilustración: Kant.', 'El imperativo categórico y la autonomía.'],
      criterios: ['Analizar la Ilustración kantiana y su ética formal.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: 'Sapere aude',
          duracionMin: 10,
          descripcion: 'Lectura de la definición de Ilustración: "atrévete a pensar por ti mismo".',
        },
        {
          tipo: 'lectura',
          titulo: 'El imperativo categórico',
          duracionMin: 20,
          descripcion: 'Explicación de las formulaciones y aplicación a un caso.',
          texto:
            '"Obra solo según aquella máxima que puedas querer que se convierta en ley universal" y "trata a la humanidad siempre como un fin y nunca solo como un medio". La moralidad no depende de las consecuencias, sino de la forma universalizable de la acción y del respeto a la dignidad.',
          preguntas: ['¿Puede una mentira piadosa superar el imperativo categórico?', '¿Qué significa tratar a alguien como fin?'],
        },
        {
          tipo: 'taller',
          titulo: 'Test de universalización',
          duracionMin: 15,
          descripcion: 'Se someten tres máximas cotidianas al test kantiano.',
        },
      ],
    },
    {
      numero: 8,
      titulo: 'Marx: alienación y materialismo histórico',
      descripcion: 'Trabajo, alienación, lucha de clases y crítica de la economía política.',
      saberes: ['Marx y la crítica de la economía política.', 'Alienación e ideología.'],
      criterios: ['Valorar la propuesta de Marx y su vigencia.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿El trabajo nos realiza o nos aliena?',
          duracionMin: 10,
          descripcion: 'Debate a partir de la propia experiencia con el trabajo y el estudio.',
        },
        {
          tipo: 'lectura',
          titulo: 'La alienación del trabajo',
          duracionMin: 20,
          descripcion: 'Texto adaptado de los Manuscritos de 1844.',
          texto:
            'El trabajador se aliena cuando el producto de su trabajo no le pertenece, cuando la actividad misma le es ajena y cuando se siente libre solo en las funciones animales. Para Marx, la superación de la alienación exige transformar las relaciones de producción.',
          preguntas: ['¿Qué formas de alienación reconoces en el trabajo actual?', '¿Qué papel juega la ideología según Marx?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Vigencia de Marx',
          duracionMin: 10,
          descripcion: 'Escritura breve sobre qué ideas de Marx siguen siendo útiles hoy.',
        },
      ],
    },
    {
      numero: 9,
      titulo: 'Nietzsche: la crítica de la cultura occidental',
      descripcion: 'Apolo y Dioniso, la muerte de Dios, el nihilismo y el superhombre.',
      saberes: ['Nietzsche y la crítica de la cultura occidental.', 'Nihilismo, eterno retorno y voluntad de poder.'],
      criterios: ['Valorar la propuesta de Nietzsche y su vigencia.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: '¿Qué pasaría si "Dios ha muerto"?',
          duracionMin: 10,
          descripcion: 'Debate sobre el sentido de la frase y sus consecuencias para los valores.',
        },
        {
          tipo: 'lectura',
          titulo: 'El eterno retorno',
          duracionMin: 20,
          descripcion: 'Texto adaptado de La gaya ciencia sobre el eterno retorno.',
          texto:
            '"¿Qué dirías si un demonio te anunciara que esta vida, tal como la vives, tendrás que vivirla una y otra vez eternamente?" La pregunta de Nietzsche es una prueba de afirmación: amar la vida de modo que desees su eterna repetición.',
          preguntas: ['¿Qué vida soportaría repetirse eternamente?', '¿Qué relación hay entre nihilismo y superhombre?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Valores en crisis',
          duracionMin: 10,
          descripcion: 'Reflexión: ¿vivimos una crisis de valores? ¿Cómo la afronta Nietzsche?',
        },
      ],
    },
    {
      numero: 10,
      titulo: 'Ortega y la filosofía española',
      descripcion: 'La razón vital, "yo soy yo y mi circunstancia" y la perspectiva.',
      saberes: ['Ortega y la filosofía española del siglo XX.', 'Raciovitalismo y perspectivismo.'],
      criterios: ['Valorar la propuesta de Ortega y su vigencia.'],
      actividades: [
        {
          tipo: 'apertura',
          titulo: 'Yo y mis circunstancias',
          duracionMin: 10,
          descripcion: '¿Qué circunstancias (lugar, época, familia) te constituyen?',
        },
        {
          tipo: 'lectura',
          titulo: 'La razón vital',
          duracionMin: 20,
          descripcion: 'Texto adaptado de El tema de nuestro tiempo sobre la razón vital.',
          texto:
            '"Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo." La vida es la realidad radical, y la razón debe ser razón vital: un pensar que da cuenta de la vida concreta, desde una perspectiva siempre situada. Cada persona ve el mundo desde su punto de vista, y la verdad se compone de perspectivas.',
          preguntas: ['¿Por qué la vida es la "realidad radical"?', '¿Qué significa que la verdad sea perspectivista?'],
        },
        {
          tipo: 'cierre',
          titulo: 'Mi circunstancia',
          duracionMin: 10,
          descripcion: 'Redacción: ¿qué significa para ti salvar tus circunstancias?',
        },
      ],
    },
  ],
};

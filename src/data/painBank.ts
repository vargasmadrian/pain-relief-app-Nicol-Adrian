export interface PainNugget {
  id: string;
  level: number;
  regions: string[]; // 'all', 'lumbar', 'cervical', 'hombro', 'cadera', 'tunel'
  title: string;
  shortIdea: string;
  bookQuote: string;
  bookSource: string;
  iconName?: string; // We map this later dynamically or default it
}

export const PAIN_BANK: PainNugget[] = [
  // ==========================================
  // NIVEL 1: Conceptos Básicos (Protección vs Daño)
  // ==========================================
  {
    id: 'n1-1',
    level: 1,
    regions: ['all'],
    title: 'La Mente Manda',
    shortIdea: 'Tu cerebro decide cuándo sientes dolor basándose en todo lo que percibe, no solo en tu cuerpo.',
    bookQuote: '«El cuerpo le avisa al cerebro cuándo está en peligro, pero no cuándo tiene dolor. (...) Hay muchos jefes en el cuerpo, pero consideramos que el cerebro es el jefe fundamental. Evalúa todo y crea dolor si decide que necesitas protección.»',
    bookSource: 'Nugget 3: The Brain is Boss'
  },
  {
    id: 'n1-2',
    level: 1,
    regions: ['all'],
    title: 'Defensor, no ofensor',
    shortIdea: 'El dolor no es tu enemigo; es el sistema de defensa más avanzado que existe.',
    bookQuote: '«El dolor te cuida, te mantiene alejado de los problemas. Aunque se siente desagradable, te ayuda a sanar. El dolor es un defensor, no un ofensor. Pero es una defensa tan buena que el cerebro puede generar demasiado.»',
    bookSource: 'Nugget 2: Pain is a defender not an offender'
  },
  {
    id: 'n1-3',
    level: 1,
    regions: ['lumbar'],
    title: 'El dolor no siempre es daño',
    shortIdea: 'Que duela tu espalda agudamente no significa que tus tejidos estén destruidos o rotos.',
    bookQuote: '«El dolor de espalda es como el acné: casi todos tendrán un episodio en su vida. Pero asombrosamente, en más del 90% de los casos analizados médicamente, ¡no hay absolutamente ningún daño estructural grave!»',
    bookSource: 'Nugget 8: Back pain is like pimples'
  },

  // ==========================================
  // NIVEL 2: La Falsa Alarma (Nociceptores)
  // ==========================================
  {
    id: 'n2-1',
    level: 2,
    regions: ['all'],
    title: 'Sensores de Peligro',
    shortIdea: 'Tus nervios no envían dolor; solo avisan si hay peligro. El dolor lo crea tu cerebro.',
    bookQuote: '«No existen las "terminaciones del dolor". Existen sensores que envían mensajes de peligro hacia el cerebro. (...) Es el cerebro quien decide si una dosis de dolor será útil para hacerte proteger la zona.»',
    bookSource: 'Nugget 19: Lucky us - no pain endings'
  },
  {
    id: 'n2-2',
    level: 2,
    regions: ['all'],
    title: 'El alivio llega primero',
    shortIdea: 'El dolor suele desaparecer mucho antes de que el tejido termine de repararse.',
    bookQuote: '«Corta tu mano y dolerá mucho. Al tercer día ya no notarás nada, pero la herida no habrá sanado por completo aún. Dejamos de sentirlo mucho antes de que termine de sanar, una vez que el cerebro sabe que estamos a salvo.»',
    bookSource: 'Nugget 16: We stop feeling it way before we stop healing it'
  },

  // ==========================================
  // NIVEL 3: Sistema Nervioso y Curación
  // ==========================================
  {
    id: 'n3-1',
    level: 3,
    regions: ['all'],
    title: 'Las cortadas sanan rápido',
    shortIdea: 'Incluso los esguinces y desgarros sanan rápidamente y de forma automática.',
    bookQuote: '«Ves cómo una herida en la piel sana rápido mágicamente. Los esguinces y tirones musculares también sanan muy velozmente, aunque no puedas verlos por estar dentro. ¡Recuerda el inmenso poder de curación de tu cuerpo!»',
    bookSource: 'Nugget 17: Cuts heal fast'
  },
  {
    id: 'n3-2',
    level: 3,
    regions: ['all'],
    title: 'Nervios como Mariposas',
    shortIdea: 'Tu sensibilidad actual no es definitiva; tus sensores se renuevan en pocos días.',
    bookQuote: '«Los sensores solo viven un par de días, como las mariposas. Por lo tanto, tu sensibilidad se ajusta continuamente a tu entorno. Si estás muy sensible ahora, tranquilo, pueden cambiar muy rápido hacia la normalidad.»',
    bookSource: 'Nugget 6: Sensors are like butterflies'
  },

  // ==========================================
  // NIVEL 4: Contexto químico e Inflamación
  // ==========================================
  {
    id: 'n4-1',
    level: 4,
    regions: ['all'],
    title: 'Tejidos "Ácidos"',
    shortIdea: 'Estar inmovil mucho tiempo acumula ácidos locales que los nervios registran como peligro.',
    bookQuote: '«Si no te mueves en horas, tus tejidos se secan y se hacen levemente ácidos. Esto excita a los sensores y envían peligro al cerebro, causando dolor postural. Riega el ácido con movimiento. ¡Tu siguiente posición es tu mejor posición!»',
    bookSource: 'Nugget 21: Acid tissues'
  },
  {
    id: 'n4-2',
    level: 4,
    regions: ['hombro', 'cadera', 'lumbar'],
    title: 'Dadores de vida',
    shortIdea: 'La hinchazón y las señales de alerta inician el proceso de regeneración.',
    bookQuote: '«Además de protegernos, nuestros detectores de peligro inician la regeneración. En el corazón, ¡estimulan la creación de nuevas venas! No le temas a las respuestas de tu cuerpo; inician la vida y la sanación.»',
    bookSource: 'Nugget 18: Danger detectors - the great givers of life'
  },

  // ==========================================
  // NIVEL 5: Pensamientos y Neuroplasticidad
  // ==========================================
  {
    id: 'n5-1',
    level: 5,
    regions: ['all'],
    title: 'Los pensamientos son electricidad',
    shortIdea: 'Tus miedos y creencias sobre el dolor se convierten físicamente en impulsos nerviosos reales.',
    bookQuote: '«El cerebro mezcla señales de peligro con recuerdos y expectativas. Tus pensamientos hacen "electricidad" real en las neuronas, amplificando o apagando la señal igual que la lesión física.»',
    bookSource: 'Nugget 10: Thoughts and beliefs are nerve impulses too'
  },
  {
    id: 'n5-2',
    level: 5,
    regions: ['all'],
    title: 'Nuevas neuronas vitalicias',
    shortIdea: 'Tu cerebro puede recablearse para dejar de doler a cualquier edad.',
    bookQuote: '«Crecemos nuevas neuronas hasta nuestro último aliento. El ejercicio, la diversión y el aprendizaje aceleran este crecimiento. Usa esta bioplasticidad a tu favor para desaprender el dolo crónico.»',
    bookSource: 'Nugget 7: New neurones until you drop'
  },

  // ==========================================
  // NIVEL 6: Sensibilización Central
  // ==========================================
  {
    id: 'n6-1',
    level: 6,
    regions: ['all'],
    title: 'Luces de detección extra-sensibles',
    shortIdea: 'El dolor continuo pone al sistema nervioso "histérico" ante toques leves.',
    bookQuote: '«Cuando el dolor persiste, el cerebro actúa como las luces de un garaje que antes se encendían solo si pasaba un auto, pero ahora se encienden con solo una polilla. El sistema se ha sensibilizado (Sensibilización Central).»',
    bookSource: 'Nugget 30: Sensitive sensor lights'
  },
  {
    id: 'n6-2',
    level: 6,
    regions: ['tunel', 'cervical'],
    title: 'Mapas Borrosos',
    shortIdea: 'A veces duele toda la mano porque el "mapa" de tu cuerpo en el cerebro se desenfocó.',
    bookQuote: '«Las neuronas encargadas de tu dedo índice o cuello empiezan a activarse conectándose a las de zonas adyacentes. El dolor se esparce o se siente raro porque tu "mapa cerebral" está temporalmente manchado.»',
    bookSource: 'Nugget 14: Astrocytes... (neurotags smudging)'
  },

  // ==========================================
  // NIVEL 7: Sistemas Homeostáticos y Estrés
  // ==========================================
  {
    id: 'n7-1',
    level: 7,
    regions: ['all'],
    title: 'Estrés y Defensa',
    shortIdea: 'Preocuparse, la ansiedad y el estrés disparan el mismo sistema de alerta que el daño físico.',
    bookQuote: '«Quienes experimentan un oler repulsivo retiran más rápido la mano del peligro. Si tu cerebro está bajo estrés emocional, bajará el umbral, requiriendo mucha menos estimulación para generarte mucho más dolor.»',
    bookSource: 'Nugget 12: Who farted?'
  },
  {
    id: 'n7-2',
    level: 7,
    regions: ['all'],
    title: 'Descansar y Digerir',
    shortIdea: 'Pausar el estrés activa tus sistemas de relajación, los analgésicos naturales más fuertes.',
    bookQuote: '«Las hormonas del estrés potencian la reacción inflamatoria. Buscar Seguridad (SIMs) con relajación o amigos enciende tu sistema de "descansar y digerir", llenando tus venas de la farmacia analgésica de tu propio cerebro.»',
    bookSource: 'Nugget 38: Rest and digest / 47: Hug drug'
  },

  // ==========================================
  // NIVEL 8: Distracción y Modulación del dolor
  // ==========================================
  {
    id: 'n8-1',
    level: 8,
    regions: ['all'],
    title: 'La Distracción es Analgésica',
    shortIdea: 'Cuando estás inmerso en algo que te gusta, bloquear el dolor no cuesta esfuerzo.',
    bookQuote: '«Hacer actividades atrapantes obliga al cerebro a ocuparse en procesar cosas placenteras y le resta energía de procesamiento a la creación de dolor, causando verdadera reducción analgésica (modulación descendente).»',
    bookSource: 'Nugget 44: Distraction'
  },
  {
    id: 'n8-2',
    level: 8,
    regions: ['cervical', 'hombro'],
    title: 'La música apaga el dolor',
    shortIdea: 'Actividades multisensoriales que disfrutas apagan físicamente parte del circuito de dolor.',
    bookQuote: '«Cuando la música golpea, no sientes dolor (aludiendo a Bob Marley). Tu cerebro libera dopamina y endorfinas que cierran las "puertas" espinales, bajando temporalmente los niveles del dolor.»',
    bookSource: 'Nugget 59: When the music hits'
  },

  // ==========================================
  // NIVEL 9: Movimiento es Curación
  // ==========================================
  {
    id: 'n9-1',
    level: 9,
    regions: ['all'],
    title: 'El Movimiento es Loción',
    shortIdea: 'Moverse lubrica tus nervios y le dice al cerebro: "es seguro hacerlo".',
    bookQuote: '«Tus articulaciones y nervios necesitan movimiento suave para auto-lubricarse y nutrirse. El movimiento seguro reduce lentamente la protección por dolor (twin peaks model). Motion is lotion.»',
    bookSource: 'Nugget 63: Motion is lotion'
  },
  {
    id: 'n9-2',
    level: 9,
    regions: ['lumbar', 'cervical', 'cadera'],
    title: 'Seguro, aunque adolorido',
    shortIdea: 'Se puede sentir dolor residual al moverse sin que signifique que te estés lastimando de nuevo.',
    bookQuote: '«A medida que retomas la actividad normal, puedes sentir dolor muscular o tensión porque los músculos no estaban usados (DOMS) y los nervios siguen exagerando. ¡No hay lesión nueva! Estás adolorido pero a salvo.»',
    bookSource: 'Nugget 61: You can be sore but safe'
  },

  // ==========================================
  // NIVEL 10: Autogestión y Confianza Total
  // ==========================================
  {
    id: 'n10-1',
    level: 10,
    regions: ['all'],
    title: 'Recaídas sin pánico',
    shortIdea: 'Los "flare-ups" (brotes de dolor) son normales y bajan más rápido si no temes.',
    bookQuote: '«Si tienes un brote de dolor, recuerda la sensibilización. ¡No entres en pánico! Una recaída casi nunca es un daño nuevo, es solo un sistema sobreprotector que saltó y bajará en unos días.»',
    bookSource: 'Nugget 62: Don\'t flare up - but don\'t freak out if you do!'
  },
  {
    id: 'n10-2',
    level: 10,
    regions: ['all'],
    title: 'Tu farmacia interna',
    shortIdea: 'Posees analgésicos 50 veces más potentes que cualquier pastilla comercial.',
    bookQuote: '«A través del reentrenamiento del cerebro, el aprendizaje y el movimiento, tienes el poder de secretar opioides endógenos en tu interior. Eres por lejos más fuerte y poderoso que ninguna pastilla médica. »',
    bookSource: 'Nugget 41: You are more powerful than pills'
  }
];

export interface TherapyExercise {
  region: string;
  level: number;
  instruction: string;
  animationProps: {
    duration: string;
    keyframesLeft: string;
    keyframesRight?: string; // used for symmetrical left/right parts like shoulders
  };
}

export const getTherapyExercise = (region: string, level: number): TherapyExercise => {
  const defaultExercise: TherapyExercise = {
    region,
    level,
    instruction: "Sigue el movimiento de la manera más suave posible.",
    animationProps: { duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(10deg) }' }
  };

  // ==========================================
  // CERVICAL (Cuello) - Vista Frontal
  // ==========================================
  if (region === 'cervical') {
    const data: { [key: number]: any } = {
      1: { instruction: "Micro-rotación. Mueve la cabeza apenitas. Piensa en seguridad.", duration: '6s', keyframesLeft: '0%, 100% { transform: rotate(-5deg) } 50% { transform: rotate(5deg) }' },
      2: { instruction: "Lentamente mira de izquierda a derecha. Siente cómo se lubrican tus vértebras.", duration: '6s', keyframesLeft: '0%, 100% { transform: rotate(-10deg) } 50% { transform: rotate(10deg) }' },
      3: { instruction: "No luches con la tensión. Gira gentilmente, sabiendo que no hay daño allí.", duration: '5s', keyframesLeft: '0%, 100% { transform: rotate(-15deg) } 50% { transform: rotate(15deg) }' },
      4: { instruction: "Aumentamos el rango levemente. El movimiento constante drena el ácido acumulado.", duration: '5s', keyframesLeft: '0%, 100% { transform: rotate(-20deg) } 50% { transform: rotate(20deg) }' },
      5: { instruction: "Oscilación segura. Siente confianza al mover músculos del cuello laterales.", duration: '4.5s', keyframesLeft: '0%, 100% { transform: rotate(-25deg) } 50% { transform: rotate(25deg) }' },
      6: { instruction: "Sensibilización bajando. Rotación más amplia. Tus tejidos disfrutan el oxígeno.", duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(-30deg) } 50% { transform: rotate(30deg) }' },
      7: { instruction: "Mantenemos ritmo moderado relajando los hombros. No estás en peligro.", duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(-35deg) } 50% { transform: rotate(35deg) }' },
      8: { instruction: "Disfruta el movimiento, como si siguieras la letra de tu música favorita.", duration: '3.5s', keyframesLeft: '0%, 100% { transform: rotate(-40deg) } 50% { transform: rotate(40deg) }' },
      9: { instruction: "Giramos con confianza plena. Tu cerebro de a poco olvida esa sobreprotección.", duration: '3s', keyframesLeft: '0%, 100% { transform: rotate(-45deg) } 50% { transform: rotate(45deg) }' },
      10: { instruction: "Rotación activa completa. Hazle saber a tu cuello que ha sanado al 100%.", duration: '3s', keyframesLeft: '0%, 100% { transform: rotate(-50deg) } 50% { transform: rotate(50deg) }' },
    };
    if (data[level]) {
      return { ...defaultExercise, instruction: data[level].instruction, animationProps: { duration: data[level].duration, keyframesLeft: data[level].keyframesLeft } };
    }
  }

  // ==========================================
  // HOMBRO (Brazos) - Vista Frontal
  // ==========================================
  if (region === 'hombro') {
    const d: { [key: number]: any } = {
      1: { instruction: "Pequeñas elevaciones isométricas (10°). Solo actívalos.", duration: '5s', angle: 10 },
      2: { instruction: "Levanta sutilmente hacia afuera (20°). Apagamos la alarma.", duration: '5s', angle: 20 },
      3: { instruction: "Estiramiento lateral bajo (30°). Recuerda: dolor no es daño.", duration: '4.5s', angle: 30 },
      4: { instruction: "Bombeo circulatorio (45°). Sangre fresca entra al maguito rotador.", duration: '4s', angle: 45 },
      5: { instruction: "Llegamos a la altura media (60°). Confía en que tus hombros son fuertes.", duration: '4s', angle: 60 },
      6: { instruction: "Avanzamos un poco más (75°). Alerta de peligro desactivándose.", duration: '4s', angle: 75 },
      7: { instruction: "Brazos paralelos al piso (90°). Gran logro estructural, respira.", duration: '3.5s', angle: 90 },
      8: { instruction: "Trata de sobrepasar tu hombro (110°). Siente agradable estiramiento.", duration: '3.5s', angle: 110 },
      9: { instruction: "Movimiento de Mariposa (135°). Movimiento rítmico, fluidos corporales puros.", duration: '3s', angle: 135 },
      10: { instruction: "Extensión total al cielo (160°). Festeja tu movilidad sin miedo.", duration: '3s', angle: 160 },
    };
    if (d[level]) {
      return { 
        ...defaultExercise, instruction: d[level].instruction, 
        animationProps: { 
          duration: d[level].duration, 
          keyframesLeft: `0%, 100% { transform: rotate(0) } 50% { transform: rotate(${d[level].angle}deg) }`,
          keyframesRight: `0%, 100% { transform: rotate(0) } 50% { transform: rotate(-${d[level].angle}deg) }`
        } 
      };
    }
  }

  // ==========================================
  // LUMBAR (Espalda Baja) - Vista Lateral
  // ==========================================
  if (region === 'lumbar') {
    const d: { [key: number]: any } = {
      1: { instruction: "Inclinación puramente mental (-3°). Acompaña con respiración lenta.", duration: '6s', angle: -3 },
      2: { instruction: "Mini-inclinación pélvica (-8°). Tu espalda no está rota.", duration: '6s', angle: -8 },
      3: { instruction: "Baja la cabeza un poco (-15°). Tus discos sanan solos y velozmente.", duration: '5s', angle: -15 },
      4: { instruction: "Pequeño estiramiento activo (-25°). Hidratamos evitando la acidez estática.", duration: '5s', angle: -25 },
      5: { instruction: "Inclinación natural (-35°). Tus nuevos nervios se sienten a salvo.", duration: '4.5s', angle: -35 },
      6: { instruction: "Hasta las rodillas (-45°). Tu cerebro redibuja tu mapa borroso.", duration: '4.5s', angle: -45 },
      7: { instruction: "Largo alcance seguro (-55°). Fluye y no entres en modo lucha/huida.", duration: '4s', angle: -55 },
      8: { instruction: "Busca la espinilla profunda (-65°). Piensa en un atardecer para desviar.", duration: '4s', angle: -65 },
      9: { instruction: "Tocando tus tobillos (-75°). El movimiento ahora es loción analgésica.", duration: '3.5s', angle: -75 },
      10: { instruction: "Apunta directo hacia tus pies (-85°). Una recaída no es fractura.", duration: '3.5s', angle: -85 },
    };
    if (d[level]) {
       return { ...defaultExercise, instruction: d[level].instruction, animationProps: { duration: d[level].duration, keyframesLeft: `0%, 100% { transform: rotate(0) } 50% { transform: rotate(${d[level].angle}deg) }` }};
    }
  }

  // ==========================================
  // CADERA (Pelvis y Cuadril) - Vista Lateral
  // ==========================================
  if (region === 'cadera') {
    const d: { [key: number]: any } = {
      1: { instruction: "Micro-oscilación pélvica (-5°). Despiertos tus glúteos.", duration: '6s', angle: -5 },
      2: { instruction: "Peso lateral disimulado (-10°). El dolor es un falso guardián ahora.", duration: '5s', angle: -10 },
      3: { instruction: "Bisagra de cadera suave (-15°). Tus cartílagos están intactos y fuertes.", duration: '5s', angle: -15 },
      4: { instruction: "Inclinación en bloque (-25°). Quítale acidez de las ingles.", duration: '4.5s', angle: -25 },
      5: { instruction: "Abre rango rítmico (-35°). Las creencias de rotura son ilusiones.", duration: '4s', angle: -35 },
      6: { instruction: "Cede caderas y cae (-45°). Tu ciático goza de estos estiramientos.", duration: '4s', angle: -45 },
      7: { instruction: "Rotación profunda (-55°). El descanso activo potencia tu farmacia opiácea.", duration: '4s', angle: -55 },
      8: { instruction: "Rebote consciente (-65°). La música relajada de fondo te ayudará.", duration: '3.5s', angle: -65 },
      9: { instruction: "Alcance completo a talones (-75°). Eres fuerte y capaz de cargar y moverte.", duration: '3.5s', angle: -75 },
      10: { instruction: "Máxima flexión pélvica (-85°). Domina tus caderas sin anticipar daño.", duration: '3s', angle: -85 },
    };
    if (d[level]) {
       return { ...defaultExercise, instruction: d[level].instruction, animationProps: { duration: d[level].duration, keyframesLeft: `0%, 100% { transform: rotate(0) } 50% { transform: rotate(${d[level].angle}deg) }` }};
    }
  }

  // ==========================================
  // TÚNEL CARPIANO (Manos/Muñeca) - Vista Hand
  // ==========================================
  if (region === 'tunel') {
    const d: { [key: number]: any } = {
      1: { instruction: "Micro Nerve-Glide (±5°). Sube y baja de forma casi imperceptible.", duration: '4s', angle: 5 },
      2: { instruction: "Aleteo basal (±10°). Sensación extraña no es daño real, tranquilo.", duration: '4s', angle: 10 },
      3: { instruction: "Lento pero más largo (±15°). Terminaciones renovándose a velocidad luz.", duration: '4s', angle: 15 },
      4: { instruction: "Avanzamos a ±20°. Tu antebrazo fluye sin causar presión al nervio.", duration: '3.5s', angle: 20 },
      5: { instruction: "Expande el mapa de tu mano (±25°). Pensar positivo baja físicamente los picos eléctricos.", duration: '3.5s', angle: 25 },
      6: { instruction: "Acelera levemente (±30°). Entrenas a tu cerebro de que ligamentos están estables.", duration: '3s', angle: 30 },
      7: { instruction: "Deslizamiento asertivo (±35°). Suelta tus hombros y mandíbula para no sumar tensión.", duration: '3s', angle: 35 },
      8: { instruction: "Gran alcance alto y bajo (±40°). La distracción externa ahora es medicina.", duration: '2.5s', angle: 40 },
      9: { instruction: "Ritmo continuo fluido (±45°). Sientete a salvo. Tu tejido carpal reboza de salud.", duration: '2.5s', angle: 45 },
      10: { instruction: "Libertad rotacional (±55°). Flexión acelerada celebrando el recableado sin límite.", duration: '2s', angle: 55 },
    };
    if (d[level]) {
       return { ...defaultExercise, instruction: d[level].instruction, animationProps: { duration: d[level].duration, keyframesLeft: `0%, 100% { transform: rotate(0) } 25% { transform: rotate(-${d[level].angle}deg) } 75% { transform: rotate(${d[level].angle}deg) }` }};
    }
  }

  return defaultExercise;
};

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
    instruction: "Sigue el movimiento de manera muy suave y relajada.",
    animationProps: { duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(10deg) }' }
  };

  // ==========================================
  // CERVICAL (Cuello) - Vista Frontal
  // ==========================================
  if (region === 'cervical') {
    const data: { [key: number]: any } = {
      1: { instruction: "Pequeño giro. Mueve la cabeza apenitas. Piensa que estás a salvo.", duration: '6s', keyframesLeft: '0%, 100% { transform: rotate(-5deg) } 50% { transform: rotate(5deg) }' },
      2: { instruction: "Lentamente mira de izquierda a derecha. Siente cómo se relaja el cuello.", duration: '6s', keyframesLeft: '0%, 100% { transform: rotate(-10deg) } 50% { transform: rotate(10deg) }' },
      3: { instruction: "No pelees contra la tensión. Gira despacito, sabiendo que no hay daño.", duration: '5s', keyframesLeft: '0%, 100% { transform: rotate(-15deg) } 50% { transform: rotate(15deg) }' },
      4: { instruction: "Aumentamos el movimiento poquito a poco. Moverse quita la rigidez.", duration: '5s', keyframesLeft: '0%, 100% { transform: rotate(-20deg) } 50% { transform: rotate(20deg) }' },
      5: { instruction: "Movimiento seguro y constante. Es normal si sientes algo raro, es solo costumbre.", duration: '4.5s', keyframesLeft: '0%, 100% { transform: rotate(-25deg) } 50% { transform: rotate(25deg) }' },
      6: { instruction: "Tu cuerpo se acostumbra. Un movimiento más amplio lleva oxígeno a la zona.", duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(-30deg) } 50% { transform: rotate(30deg) }' },
      7: { instruction: "Llevamos un ritmo normal, recuerda bajar los hombros para relajarte.", duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(-35deg) } 50% { transform: rotate(35deg) }' },
      8: { instruction: "Disfruta el movimiento. Piensa en algo agradable, como tararear una canción.", duration: '3.5s', keyframesLeft: '0%, 100% { transform: rotate(-40deg) } 50% { transform: rotate(40deg) }' },
      9: { instruction: "Giramos con más confianza. Tu cerebro de a poco olvida esa sobreprotección.", duration: '3s', keyframesLeft: '0%, 100% { transform: rotate(-45deg) } 50% { transform: rotate(45deg) }' },
      10: { instruction: "Giro libre y natural. Hazle saber a tu cuello y cerebro que ya estás bien.", duration: '3s', keyframesLeft: '0%, 100% { transform: rotate(-50deg) } 50% { transform: rotate(50deg) }' },
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
      1: { instruction: "Pequeño intento de levantar los brazos. Solo actívalos, sin hacer fuerza.", duration: '5s', angle: 10 },
      2: { instruction: "Levanta muy poquito hacia afuera. Le estamos diciendo al cerebro que confíe.", duration: '5s', angle: 20 },
      3: { instruction: "Alcemos un poquito más. Recuerda: sentir estiramiento no significa romperse.", duration: '4.5s', angle: 30 },
      4: { instruction: "Movimiento continuo y relajado. Entra sangre fresca a los músculos.", duration: '4s', angle: 45 },
      5: { instruction: "Llegamos casi a la mitad. Confía en que tus hombros son muy fuertes.", duration: '4s', angle: 60 },
      6: { instruction: "Avanzamos otro poquito. Esa señal falsa de peligro se está apagando.", duration: '4s', angle: 75 },
      7: { instruction: "Brazos a la altura de los hombros. Gran logro, respira profundo y calmado.", duration: '3.5s', angle: 90 },
      8: { instruction: "Intenta pasarlos más arriba. Conéctate con una sensación agradable de estirar.", duration: '3.5s', angle: 110 },
      9: { instruction: "Movimiento amplio de alas. Levanta y baja con ritmo y confianza.", duration: '3s', angle: 135 },
      10: { instruction: "Apunta directo al cielo. Celebra que te puedes mover sin aquel miedo.", duration: '3s', angle: 160 },
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
      1: { instruction: "Apenas agacha la cabeza y regresa. Piensa en respirar profundo, no hay prisa.", duration: '6s', angle: -3 },
      2: { instruction: "Empieza a inclinarte milimétricamente. Tu espalda no está dañada ni rota.", duration: '6s', angle: -8 },
      3: { instruction: "Baja un poco más. Cualquier molestia vieja es solo una alarma sensible.", duration: '5s', angle: -15 },
      4: { instruction: "Pequeñas dobladas de espalda. Nos movemos lento para quitar la rigidez.", duration: '5s', angle: -25 },
      5: { instruction: "Inclínate buscando tus rodillas. Tu cuerpo se da cuenta de que está seguro.", duration: '4.5s', angle: -35 },
      6: { instruction: "Llegando a las rodillas. Tu cerebro vuelve a tener confianza en esta zona.", duration: '4.5s', angle: -45 },
      7: { instruction: "Baja más largo y seguro. Déjate llevar suavemente sin ponerte tenso.", duration: '4s', angle: -55 },
      8: { instruction: "Busca la mitad de la pierna. Imagina un lugar tranquilo para relajarte.", duration: '4s', angle: -65 },
      9: { instruction: "Llegando hasta los tobillos. Moverse ahora es como una crema que alivia.", duration: '3.5s', angle: -75 },
      10: { instruction: "Apunta directo hacia tus pies. Un tirón no significa volver a lastimarse.", duration: '3.5s', angle: -85 },
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
      1: { instruction: "Mueve apenitas la cintura. Despertemos los músculos con mucho cuidado.", duration: '6s', angle: -5 },
      2: { instruction: "Pequeño peso hacia adelante. Ese dolor asustadizo es solo una falsa alarma.", duration: '5s', angle: -10 },
      3: { instruction: "Dóblate un poquito desde la cintura. Tus huesos están intactos y aguantan.", duration: '5s', angle: -15 },
      4: { instruction: "Nos inclinamos de a partes. Esto ayuda a soltar la pesadez por estar sentado.", duration: '4.5s', angle: -25 },
      5: { instruction: "Abre y cierra suavemente. Creer que estás frágil es una simple ilusión.", duration: '4s', angle: -35 },
      6: { instruction: "Déjate caer más relajado. Ese tirón en la pierna agradece ser estirado.", duration: '4s', angle: -45 },
      7: { instruction: "Dobla mucho más la postura. Moverse suave soltará medicinas de tu propio cuerpo.", duration: '4s', angle: -55 },
      8: { instruction: "Sube y baja sin miedo. Poner música alegre en el fondo te servirá muchísimo.", duration: '3.5s', angle: -65 },
      9: { instruction: "Baja todo tu cuerpo hasta abajo. Eres capaz de cargar peso y mover cosas.", duration: '3.5s', angle: -75 },
      10: { instruction: "Dobla tu cintura por completo. Hazte dueño del movimiento libre de miedos.", duration: '3s', angle: -85 },
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
      1: { instruction: "Mini movimiento. Sube y baja los dedos casi sin que se note. Muy relajado.", duration: '4s', angle: 5 },
      2: { instruction: "Mueve la mano un poquito. Sentirse raro es muy normal al volver a empezar.", duration: '4s', angle: 10 },
      3: { instruction: "Hagámoslo un poquitín más largo. Tu muñeca va recordando lo lindo de moverse.", duration: '4s', angle: 15 },
      4: { instruction: "Avanzamos levantando más. Hazlo rítmico, como si aleteara un ave pequeña.", duration: '3.5s', angle: 20 },
      5: { instruction: "Abre más el rango. Estar positivo apaga directamente esas corrientes eléctricas de molestia.", duration: '3.5s', angle: 25 },
      6: { instruction: "Mueve con más entusiasmo. Le recuerdas al cuerpo que no vas a lastimar nada.", duration: '3s', angle: 30 },
      7: { instruction: "Hazlo de manera más directa y segura. Cuidado con tensionar los hombros y el cuello.", duration: '3s', angle: 35 },
      8: { instruction: "Dobla la mano hacia arriba y abajo. Mirar algo bonito mientras lo haces corta el dolor.", duration: '2.5s', angle: 40 },
      9: { instruction: "Movimiento continuo y fluido. Sientete a salvo. Tu mano es una máquina perfecta.", duration: '2.5s', angle: 45 },
      10: { instruction: "Movimiento libre y total. Flexiona arriba y abajo feliz de haber perdido el temor.", duration: '2s', angle: 55 },
    };
    if (d[level]) {
       return { ...defaultExercise, instruction: d[level].instruction, animationProps: { duration: d[level].duration, keyframesLeft: `0%, 100% { transform: rotate(0) } 25% { transform: rotate(-${d[level].angle}deg) } 75% { transform: rotate(${d[level].angle}deg) }` }};
    }
  }

  return defaultExercise;
};

export type AnimationTarget = 'head' | 'arms' | 'torso' | 'hand';

export interface TherapyExercise {
  region: string;
  level: number;
  instruction: string;
  animationProps: {
    duration: string;
    keyframesLeft: string;
    keyframesRight?: string;
    target: AnimationTarget;
  };
}

interface ExerciseEntry {
  id?: string;
  instruction: string;
  duration: string;
  target: AnimationTarget;
  keyframesLeft: string;
  keyframesRight?: string;
}

export const getTherapyExercise = (
  region: string,
  level: number,
  painLevel: number = 5,
  painfulMovement: string = 'none'
): TherapyExercise => {

  // Chest expand for breathing — applied to torso group
  const BREATHE = {
    duration: '7s',
    keyframesLeft: '0%, 100% { transform: scale(1) translateY(0) } 50% { transform: scale(1.04) translateY(-3px) }',
    target: 'torso' as AnimationTarget,
  };

  // Mild adjacent sway, applied to torso (chest/back)
  const ADJ_TORSO = {
    duration: '5s',
    keyframesLeft: '0%, 100% { transform: rotate(-2deg) } 50% { transform: rotate(2deg) }',
    target: 'torso' as AnimationTarget,
  };
  // Mild adjacent sway, applied to head (neck wiggle adjacent to shoulder work)
  const ADJ_HEAD = {
    duration: '5s',
    keyframesLeft: '0%, 100% { transform: rotate(-4deg) } 50% { transform: rotate(4deg) }',
    target: 'head' as AnimationTarget,
  };
  // Adjacent symmetric arms (shoulder rolls, etc)
  const ADJ_ARMS = {
    duration: '5s',
    keyframesLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-12deg) }',
    keyframesRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(12deg) }',
    target: 'arms' as AnimationTarget,
  };

  // Compound — gentle whole-torso engagement
  const COMPOUND = {
    duration: '4s',
    keyframesLeft: '0%, 100% { transform: rotate(-3deg) translateY(0) } 50% { transform: rotate(8deg) translateY(5px) }',
    target: 'torso' as AnimationTarget,
  };

  const REGION_DB: Record<string, Record<string, ExerciseEntry[]>> = {
    cervical: {
      RESPIRACION: [
        { instruction: 'Respira profundo e infla el abdomen. Relaja los hombros.', ...BREATHE },
        { instruction: 'Suelta el aire lentamente. Siente cómo baja la tensión.', ...BREATHE },
        { instruction: 'Otra respiración profunda. Estás a salvo, tu cuello está bien.', ...BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Mueve suavemente los hombros. Ayuda a liberar tu cuello.', ...ADJ_ARMS },
        { instruction: 'Intenta sacar pecho y relajar. Quitamos peso de las cervicales.', ...ADJ_TORSO },
        { instruction: 'Haz pequeños círculos con la espalda alta. Todo se conecta.', ...ADJ_TORSO },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Baja la barbilla. Estira sin forzar.', duration: '5s', target: 'head',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(20deg) }' },
        { id: 'extension', instruction: 'Mira hacia arriba suavemente. Confía en el movimiento.', duration: '5s', target: 'head',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-20deg) }' },
        { id: 'lateral',   instruction: 'Oreja al hombro. Siente el alivio en los lados.', duration: '6s', target: 'head',
          keyframesLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-15deg) } 75% { transform: rotate(15deg) }' },
        { id: 'rotacion',  instruction: 'Mira por encima de tu hombro. Moverse es seguro.', duration: '6s', target: 'head',
          keyframesLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-25deg) } 75% { transform: rotate(25deg) }' },
      ],
      COMPUESTOS: [
        { instruction: 'Mira hacia todas las direcciones mientras caminas.', ...COMPOUND },
        { instruction: 'Simula alcanzar un objeto arriba de ti.', ...COMPOUND },
        { instruction: 'Giros amplios de cuerpo completo.', ...COMPOUND },
      ],
    },
    hombro: {
      RESPIRACION: [
        { instruction: 'Inhala profundamente hacia tu caja torácica.', ...BREATHE },
        { instruction: 'Exhala soltando el peso de los brazos.', ...BREATHE },
        { instruction: 'Relaja la mandíbula al respirar. Esto calma el hombro.', ...BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Mueve solo el cuello a un lado. El nervio de tu brazo nace aquí.', ...ADJ_HEAD },
        { instruction: 'Mueve el otro lado del cuello suavemente.', ...ADJ_HEAD },
        { instruction: 'Saca el pecho y junta los omóplatos. Mejora tu base.', ...ADJ_TORSO },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Levanta el brazo al frente cómodamente.', duration: '5s', target: 'arms',
          keyframesLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(60deg) }',
          keyframesRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-60deg) }' },
        { id: 'abduccion', instruction: 'Levanta el brazo a los lados. Estás ganando movilidad.', duration: '5s', target: 'arms',
          keyframesLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-45deg) }',
          keyframesRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(45deg) }' },
        { id: 'rotacion',  instruction: 'Lleva la mano al hombro contrario y vuelve. Tu hombro es fuerte.', duration: '5s', target: 'arms',
          keyframesLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(35deg) }',
          keyframesRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-35deg) }' },
        { id: 'extra',     instruction: 'Levanta ambos brazos como alas grandes. Fluye.', duration: '4s', target: 'arms',
          keyframesLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-90deg) }',
          keyframesRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(90deg) }' },
      ],
      COMPUESTOS: [
        { instruction: 'Empuja la pared con ambas manos firme y seguro.', ...COMPOUND },
        { instruction: 'Postura de plancha suave. Cargas tu propio peso sin temor.', ...COMPOUND },
        { instruction: 'Levanta cajas ligeras del piso al armario.', ...COMPOUND },
      ],
    },
    lumbar: {
      RESPIRACION: [
        { instruction: 'Respira hacia tu panza. Relaja completamente todo el abdomen.', ...BREATHE },
        { instruction: 'Al soltar el aire, deja ir toda preocupación lumbar.', ...BREATHE },
        { instruction: 'Inhala sintiendo cómo se expande tu zona baja. Estás limpio de daños.', ...BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Aprieta y suelta glúteos. Protegen tu espalda.', ...ADJ_TORSO },
        { instruction: 'Activa un poco tus piernas. La raíz del soporte.', ...ADJ_TORSO },
        { instruction: 'Mueve sutilmente tu pecho adelante. Libera la presión.', ...ADJ_TORSO },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Agáchate un poco al piso. Tus discos son una maravilla natural resistente.', duration: '5s', target: 'torso',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-30deg) }' },
        { id: 'extension', instruction: 'Estírate hacia atrás suavemente. La espalda soporta curvas.', duration: '5s', target: 'torso',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(15deg) }' },
        { id: 'lateral',   instruction: 'Inclinación a un lado. Abre tus costillas con confianza.', duration: '5s', target: 'torso',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(15deg) }' },
        { id: 'rotacion',  instruction: 'Giro de torso. Los rotadores espinales disfrutan este estirón.', duration: '6s', target: 'torso',
          keyframesLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-12deg) } 75% { transform: rotate(12deg) }' },
      ],
      COMPUESTOS: [
        { instruction: 'Sentadilla fluida. Tus rodillas y espalda trabajan en equipo perfecto.', ...COMPOUND },
        { instruction: 'Peso muerto ligero. Crees poder cargar cajas porque ¡así es!',
          duration: '5s', target: 'torso',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) translateY(0) } 50% { transform: rotate(-22deg) translateY(4px) }' },
        { instruction: 'Estirada global de cuerpo buscando el cielo.', ...COMPOUND },
      ],
    },
    cadera: {
      RESPIRACION: [
        { instruction: 'Respiración pélvica profunda.', ...BREATHE },
        { instruction: 'Al exhalar, suelta tu pelvis por completo.', ...BREATHE },
        { instruction: 'Lleva aire oxigenado hacia las venas de tus ingles.', ...BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Mueve rodillas despacio. Tus piernas cargan tu cadera.', ...ADJ_TORSO },
        { instruction: 'Activa tu espalda baja sin mover la cadera.', ...ADJ_TORSO },
        { instruction: 'Despierta los tobillos. Mejor soporte, menor carga.', ...ADJ_TORSO },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Lleva rodilla al pecho (imaginación). La cadera flexiona sin dolor.', duration: '5s', target: 'torso',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-22deg) }' },
        { id: 'extension', instruction: 'Pierna atrás. Tus glúteos despiertan y ayudan al fémur.', duration: '5s', target: 'torso',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(14deg) }' },
        { id: 'rotacion',  instruction: 'Rota la pierna hacia afuera tranquilamente.', duration: '6s', target: 'torso',
          keyframesLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-10deg) } 75% { transform: rotate(10deg) }' },
        { id: 'extra',     instruction: 'Abre ambas piernas sutilmente. Eres móvil.', duration: '5s', target: 'torso',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-15deg) }' },
      ],
      COMPUESTOS: [
        { instruction: 'Sentadilla asistida tocando silla.', ...COMPOUND },
        { instruction: 'Desplante estático relajado. El cuerpo asimila carga viva.', ...COMPOUND },
        { instruction: 'Caminata simulada rápida levantando cadera.', ...COMPOUND },
      ],
    },
    tunel: {
      RESPIRACION: [
        { instruction: 'Respira para calmar las corrientes nerviosas.', duration: '7s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: scale(1) } 50% { transform: scale(1.03) }' },
        { instruction: 'Relaja cuello y hombro. Todo baja hasta los dedos.', duration: '7s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: scale(1) } 50% { transform: scale(1.03) }' },
        { instruction: 'Inspira positividad, exhala la anticipación.', duration: '7s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: scale(1) } 50% { transform: scale(1.03) }' },
      ],
      ALEDANAS: [
        { instruction: 'Mueve el codo despacio. El nervio mediano pasa por aquí.', duration: '5s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(-4deg) } 50% { transform: rotate(4deg) }' },
        { instruction: 'Abre y cierra el hombro.', duration: '5s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(-4deg) } 50% { transform: rotate(4deg) }' },
        { instruction: 'Extiende todo tu brazo recto.', duration: '5s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(-4deg) } 50% { transform: rotate(4deg) }' },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Dobla muñeca abajo como un cisne.', duration: '4s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-30deg) }' },
        { id: 'extension', instruction: 'Doblala arriba, posición de alto.', duration: '4s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(30deg) }' },
        { id: 'rotacion',  instruction: 'Abre botellas invisibles. Tus ligamentos están seguros.', duration: '6s', target: 'hand',
          keyframesLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-20deg) } 75% { transform: rotate(20deg) }' },
        { id: 'extra',     instruction: 'Aleteo lateral rápido y libre de miedos.', duration: '3s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(-15deg) } 50% { transform: rotate(15deg) }' },
      ],
      COMPUESTOS: [
        { instruction: 'Toma aire mientras levantas una pesita ligera (o un vaso de agua).', duration: '5s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(20deg) }' },
        { instruction: 'Empuja la pared con ambas manos, usando toda la cadena.', duration: '5s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(20deg) }' },
        { instruction: 'Estiramiento integral de todo el brazo rotando el torso.', duration: '5s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(20deg) }' },
      ],
    },
  };

  const matriz = REGION_DB[region] || REGION_DB['lumbar'];

  // Move painful movement to the END of specifics
  let sortedEspecificos = [...matriz.ESPECIFICOS];
  if (painfulMovement !== 'none') {
    const pIndex = sortedEspecificos.findIndex(e => e.id === painfulMovement);
    if (pIndex !== -1) {
      const pElement = sortedEspecificos.splice(pIndex, 1)[0];
      sortedEspecificos.push(pElement);
    }
  }

  let sessionProgression: ExerciseEntry[] = [];

  if (painLevel >= 6) {
    sessionProgression = [
      ...matriz.RESPIRACION.slice(0, 3),
      ...matriz.ALEDANAS.slice(0, 3),
      ...sortedEspecificos.slice(0, 4),
    ];
  } else {
    sessionProgression = [
      ...matriz.ALEDANAS.slice(0, 3),
      ...sortedEspecificos.slice(0, 4),
      ...matriz.COMPUESTOS.slice(0, 3),
    ];
  }

  const realIndex = Math.min(Math.max(level - 1, 0), sessionProgression.length - 1);
  const selectedEx = sessionProgression[realIndex] || matriz.RESPIRACION[0];

  return {
    region,
    level,
    instruction: selectedEx.instruction,
    animationProps: {
      duration: selectedEx.duration,
      keyframesLeft: selectedEx.keyframesLeft,
      keyframesRight: selectedEx.keyframesRight,
      target: selectedEx.target,
    },
  };
};

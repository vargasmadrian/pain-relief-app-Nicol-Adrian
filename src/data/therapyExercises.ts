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

// =====================================================================
// MOTION PRESETS — each preset matches a specific kind of body action
// so different instructions produce visibly different movements.
// =====================================================================

// Breathing — torso scales (no rotation, so head doesn't swing)
const BREATHE: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '6s',
  target: 'torso',
  keyframesLeft: '0%, 100% { transform: scale(1) translateY(0) } 50% { transform: scale(1.06) translateY(-5px) }',
};

// Chest puff (sacar pecho) — wider, slight back lift, no body rotation
const CHEST_PUFF: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '4s',
  target: 'torso',
  keyframesLeft: '0%, 100% { transform: scale(1) translateY(0) } 50% { transform: scaleX(1.08) scaleY(1.04) translateY(-4px) }',
};

// Reach up — body stretches taller
const REACH_UP: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '4s',
  target: 'torso',
  keyframesLeft: '0%, 100% { transform: scaleY(1) translateY(0) } 50% { transform: scaleY(1.07) translateY(-7px) }',
};

// Forward lean — small bow at hips
const FORWARD_LEAN: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '4s',
  target: 'torso',
  keyframesLeft: '0%, 100% { transform: rotate(0deg) translateY(0) } 50% { transform: rotate(8deg) translateY(4px) }',
};

// Trunk twist — small spinal rotation (kept tight so head doesn't fly)
const TRUNK_TWIST: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '5s',
  target: 'torso',
  keyframesLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-6deg) } 75% { transform: rotate(6deg) }',
};

// Pelvic tilt — subtle anterior/posterior pelvis motion
const PELVIC_TILT: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '4s',
  target: 'torso',
  keyframesLeft: '0%, 100% { transform: rotate(0deg) translateY(0) } 50% { transform: rotate(-3deg) translateY(2px) }',
};

// Glute squeeze — almost imperceptible upward lift
const GLUTE_SQUEEZE: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '3s',
  target: 'torso',
  keyframesLeft: '0%, 100% { transform: translateY(0) } 50% { transform: translateY(-3px) }',
};

// Leg activation — gentle weight-shift left/right
const LEG_ACTIVATE: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '4s',
  target: 'torso',
  keyframesLeft: '0%, 50%, 100% { transform: translateX(0) } 25% { transform: translateX(-4px) } 75% { transform: translateX(4px) }',
};

// Walk in place
const WALK: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '1.6s',
  target: 'torso',
  keyframesLeft: '0%, 100% { transform: translateY(0) } 50% { transform: translateY(-4px) }',
};

// Squat
const SQUAT: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '4s',
  target: 'torso',
  keyframesLeft: '0%, 100% { transform: rotate(0deg) translateY(0) } 50% { transform: rotate(-10deg) translateY(12px) }',
};

// Lift load (deadlift / lift box)
const LIFT_LOAD: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '5s',
  target: 'torso',
  keyframesLeft: '0%, 100% { transform: rotate(0deg) translateY(0) } 50% { transform: rotate(-25deg) translateY(7px) }',
};

// Shoulder rolls — both arms make small contralateral arcs
const SHOULDER_ROLL: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft' | 'keyframesRight'> = {
  duration: '4s',
  target: 'arms',
  keyframesLeft:  '0%, 100% { transform: rotate(0deg) translateY(0) } 25% { transform: rotate(-15deg) translateY(-3px) } 50% { transform: rotate(0deg) } 75% { transform: rotate(8deg) translateY(2px) }',
  keyframesRight: '0%, 100% { transform: rotate(0deg) translateY(0) } 25% { transform: rotate(15deg) translateY(-3px) } 50% { transform: rotate(0deg) } 75% { transform: rotate(-8deg) translateY(2px) }',
};

// Arms overhead — reach to ceiling
const ARMS_OVERHEAD: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft' | 'keyframesRight'> = {
  duration: '4s',
  target: 'arms',
  keyframesLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-90deg) }',
  keyframesRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(90deg) }',
};

// Push forward (wall push) — both arms extend in front
const PUSH_FORWARD: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft' | 'keyframesRight'> = {
  duration: '4s',
  target: 'arms',
  keyframesLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(70deg) }',
  keyframesRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-70deg) }',
};

// Neck side-tilt
const NECK_TILT: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '5s',
  target: 'head',
  keyframesLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-15deg) } 75% { transform: rotate(15deg) }',
};

// Hand presets (tunel)
const HAND_BREATHE: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '6s',
  target: 'hand',
  keyframesLeft: '0%, 100% { transform: scale(1) } 50% { transform: scale(1.08) }',
};
const HAND_FLAP: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '4s',
  target: 'hand',
  keyframesLeft: '0%, 100% { transform: rotate(-10deg) } 50% { transform: rotate(10deg) }',
};
const HAND_EXTEND_OUT: Pick<ExerciseEntry, 'duration' | 'target' | 'keyframesLeft'> = {
  duration: '4s',
  target: 'hand',
  keyframesLeft: '0%, 100% { transform: translateX(0) } 50% { transform: translateX(8px) }',
};

export const getTherapyExercise = (
  region: string,
  level: number,
  painLevel: number = 5,
  painfulMovement: string = 'none',
): TherapyExercise => {

  const REGION_DB: Record<string, Record<string, ExerciseEntry[]>> = {
    cervical: {
      RESPIRACION: [
        { instruction: 'Respira profundo e infla el abdomen. Relaja los hombros.', ...BREATHE },
        { instruction: 'Suelta el aire lentamente. Siente cómo baja la tensión.', ...BREATHE },
        { instruction: 'Otra respiración profunda. Estás a salvo, tu cuello está bien.', ...BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Mueve suavemente los hombros. Ayuda a liberar tu cuello.', ...SHOULDER_ROLL },
        { instruction: 'Saca pecho y relaja. Quitamos peso de las cervicales.', ...CHEST_PUFF },
        { instruction: 'Pequeños círculos con la espalda alta. Todo se conecta.', ...TRUNK_TWIST },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Baja la barbilla. Estira sin forzar.',
          duration: '4s', target: 'head',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(22deg) }' },
        { id: 'extension', instruction: 'Mira hacia arriba suavemente. Confía en el movimiento.',
          duration: '4s', target: 'head',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-22deg) }' },
        { id: 'lateral',   instruction: 'Oreja al hombro. Siente el alivio en los lados.',
          duration: '5s', target: 'head',
          keyframesLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-22deg) } 75% { transform: rotate(22deg) }' },
        { id: 'rotacion',  instruction: 'Mira por encima de tu hombro. Moverse es seguro.',
          duration: '5s', target: 'head',
          keyframesLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-30deg) } 75% { transform: rotate(30deg) }' },
      ],
      COMPUESTOS: [
        { instruction: 'Mira hacia todas las direcciones mientras caminas.',
          duration: '5s', target: 'head',
          keyframesLeft: '0%, 25%, 50%, 75%, 100% { transform: rotate(0deg) } 12% { transform: rotate(-25deg) } 37% { transform: rotate(15deg) } 62% { transform: rotate(25deg) } 87% { transform: rotate(-15deg) }' },
        { instruction: 'Simula alcanzar un objeto arriba de ti.', ...ARMS_OVERHEAD },
        { instruction: 'Giros amplios de cuerpo completo.', ...TRUNK_TWIST },
      ],
    },

    hombro: {
      RESPIRACION: [
        { instruction: 'Inhala profundamente hacia tu caja torácica.', ...BREATHE },
        { instruction: 'Exhala soltando el peso de los brazos.', ...BREATHE },
        { instruction: 'Relaja la mandíbula al respirar. Esto calma el hombro.', ...BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Mueve solo el cuello a un lado. El nervio de tu brazo nace aquí.', ...NECK_TILT },
        { instruction: 'Mueve el otro lado del cuello suavemente.', ...NECK_TILT },
        { instruction: 'Saca pecho y junta los omóplatos. Mejora tu base.', ...CHEST_PUFF },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Levanta el brazo al frente cómodamente.',
          duration: '4s', target: 'arms',
          keyframesLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(60deg) }',
          keyframesRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-60deg) }' },
        { id: 'abduccion', instruction: 'Levanta el brazo a los lados. Estás ganando movilidad.',
          duration: '4s', target: 'arms',
          keyframesLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-50deg) }',
          keyframesRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(50deg) }' },
        { id: 'rotacion',  instruction: 'Lleva la mano al hombro contrario y vuelve. Tu hombro es fuerte.',
          duration: '4s', target: 'arms',
          keyframesLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(40deg) }',
          keyframesRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-40deg) }' },
        { id: 'extra',     instruction: 'Levanta ambos brazos como alas grandes. Fluye.',
          duration: '3s', target: 'arms',
          keyframesLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-90deg) }',
          keyframesRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(90deg) }' },
      ],
      COMPUESTOS: [
        { instruction: 'Empuja la pared con ambas manos firme y seguro.', ...PUSH_FORWARD },
        { instruction: 'Postura de plancha suave. Cargas tu propio peso sin temor.', ...FORWARD_LEAN },
        { instruction: 'Levanta cajas ligeras del piso al armario.', ...LIFT_LOAD },
      ],
    },

    lumbar: {
      RESPIRACION: [
        { instruction: 'Respira hacia tu panza. Relaja completamente todo el abdomen.', ...BREATHE },
        { instruction: 'Al soltar el aire, deja ir toda preocupación lumbar.', ...BREATHE },
        { instruction: 'Inhala sintiendo cómo se expande tu zona baja. Estás limpio de daños.', ...BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Aprieta y suelta glúteos. Protegen tu espalda.', ...GLUTE_SQUEEZE },
        { instruction: 'Activa un poco tus piernas. La raíz del soporte.', ...LEG_ACTIVATE },
        { instruction: 'Mueve sutilmente tu pecho adelante. Libera la presión.', ...PELVIC_TILT },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Agáchate un poco al piso. Tus discos son una maravilla natural resistente.',
          duration: '4s', target: 'torso',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-30deg) }' },
        { id: 'extension', instruction: 'Estírate hacia atrás suavemente. La espalda soporta curvas.',
          duration: '4s', target: 'torso',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(20deg) }' },
        { id: 'lateral',   instruction: 'Inclinación a un lado. Abre tus costillas con confianza.',
          duration: '4s', target: 'torso',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(20deg) }' },
        { id: 'rotacion',  instruction: 'Giro de torso. Los rotadores espinales disfrutan este estirón.',
          duration: '5s', target: 'torso',
          keyframesLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-15deg) } 75% { transform: rotate(15deg) }' },
      ],
      COMPUESTOS: [
        { instruction: 'Sentadilla fluida. Tus rodillas y espalda trabajan en equipo perfecto.', ...SQUAT },
        { instruction: 'Peso muerto ligero. Crees poder cargar cajas porque ¡así es!', ...LIFT_LOAD },
        { instruction: 'Estirada global de cuerpo buscando el cielo.', ...REACH_UP },
      ],
    },

    cadera: {
      RESPIRACION: [
        { instruction: 'Respiración pélvica profunda.', ...BREATHE },
        { instruction: 'Al exhalar, suelta tu pelvis por completo.', ...BREATHE },
        { instruction: 'Lleva aire oxigenado hacia las venas de tus ingles.', ...BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Mueve rodillas despacio. Tus piernas cargan tu cadera.', ...LEG_ACTIVATE },
        { instruction: 'Activa tu espalda baja sin mover la cadera.', ...PELVIC_TILT },
        { instruction: 'Despierta los tobillos. Mejor soporte, menor carga.', ...WALK },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Lleva rodilla al pecho (imaginación). La cadera flexiona sin dolor.',
          duration: '4s', target: 'torso',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-25deg) }' },
        { id: 'extension', instruction: 'Pierna atrás. Tus glúteos despiertan y ayudan al fémur.',
          duration: '4s', target: 'torso',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(18deg) }' },
        { id: 'rotacion',  instruction: 'Rota la pierna hacia afuera tranquilamente.',
          duration: '5s', target: 'torso',
          keyframesLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-12deg) } 75% { transform: rotate(12deg) }' },
        { id: 'extra',     instruction: 'Abre ambas piernas sutilmente. Eres móvil.',
          duration: '4s', target: 'torso',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) translateY(0) } 50% { transform: rotate(0deg) translateY(6px) }' },
      ],
      COMPUESTOS: [
        { instruction: 'Sentadilla asistida tocando silla.', ...SQUAT },
        { instruction: 'Desplante estático relajado. El cuerpo asimila carga viva.', ...FORWARD_LEAN },
        { instruction: 'Caminata simulada rápida levantando cadera.', ...WALK },
      ],
    },

    tunel: {
      RESPIRACION: [
        { instruction: 'Respira para calmar las corrientes nerviosas.', ...HAND_BREATHE },
        { instruction: 'Relaja cuello y hombro. Todo baja hasta los dedos.', ...HAND_BREATHE },
        { instruction: 'Inspira positividad, exhala la anticipación.', ...HAND_BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Mueve el codo despacio. El nervio mediano pasa por aquí.', ...HAND_FLAP },
        { instruction: 'Abre y cierra el hombro.',
          duration: '5s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(-6deg) translateX(0) } 50% { transform: rotate(6deg) translateX(4px) }' },
        { instruction: 'Extiende todo tu brazo recto.', ...HAND_EXTEND_OUT },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Dobla muñeca abajo como un cisne.',
          duration: '4s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-30deg) }' },
        { id: 'extension', instruction: 'Doblala arriba, posición de alto.',
          duration: '4s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(30deg) }' },
        { id: 'rotacion',  instruction: 'Abre botellas invisibles. Tus ligamentos están seguros.',
          duration: '5s', target: 'hand',
          keyframesLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-25deg) } 75% { transform: rotate(25deg) }' },
        { id: 'extra',     instruction: 'Aleteo lateral rápido y libre de miedos.',
          duration: '2s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(-18deg) } 50% { transform: rotate(18deg) }' },
      ],
      COMPUESTOS: [
        { instruction: 'Toma aire mientras levantas una pesita ligera (o un vaso de agua).',
          duration: '4s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: rotate(0deg) translateY(0) } 50% { transform: rotate(15deg) translateY(-8px) }' },
        { instruction: 'Empuja la pared con ambas manos, usando toda la cadena.',
          duration: '4s', target: 'hand',
          keyframesLeft: '0%, 100% { transform: translateX(0) } 50% { transform: translateX(12px) }' },
        { instruction: 'Estiramiento integral de todo el brazo rotando el torso.',
          duration: '5s', target: 'hand',
          keyframesLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-15deg) } 75% { transform: rotate(15deg) }' },
      ],
    },
  };

  const matriz = REGION_DB[region] || REGION_DB['lumbar'];

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

export type ExerciseProp = 'wall' | 'box' | 'ceiling' | 'chair' | 'weight';

export type JointName =
  | 'body'        // whole-figure transform (translate/scale, e.g. walking bounce, breathing)
  | 'spine'       // upper body around hip
  | 'head'        // head around neck
  | 'shoulderLeft' | 'shoulderRight'
  | 'elbowLeft'   | 'elbowRight'
  | 'hipLeft'     | 'hipRight'
  | 'kneeLeft'    | 'kneeRight'
  | 'hand';       // tunel only

export type Pose = Partial<Record<JointName, string>>;

export interface TherapyExercise {
  region: string;
  level: number;
  instruction: string;
  animationProps: {
    duration: string;
    poses: Pose;
    prop?: ExerciseProp;
  };
}

interface ExerciseEntry {
  id?: string;
  instruction: string;
  duration: string;
  poses: Pose;
  prop?: ExerciseProp;
}

// ============================================================
// MOTION PRESETS — keyframes are CSS @keyframes bodies (without
// the @keyframes wrapper). They get injected per-joint at runtime.
// ============================================================

// Breathing (subtle chest expand on whole body)
const BREATHE_BELLY: ExerciseEntry['poses'] = {
  body: '0%, 100% { transform: scale(1) translateY(0) } 50% { transform: scaleY(1.06) translateY(-5px) }',
};
const BREATHE_CHEST: ExerciseEntry['poses'] = {
  body: '0%, 100% { transform: scale(1) translateY(0) } 50% { transform: scaleX(1.07) scaleY(1.03) translateY(-3px) }',
};
const BREATHE_RELEASE: ExerciseEntry['poses'] = {
  body: '0% { transform: scale(1.05) translateY(-4px) } 35% { transform: scale(1) translateY(0) } 100% { transform: scale(1.05) translateY(-4px) }',
};

// Shoulder rolls — both shoulders trace small circles
const SHOULDER_ROLL: Pose = {
  shoulderLeft:  '0%, 100% { transform: rotate(0deg) translateY(0) } 25% { transform: rotate(-12deg) translateY(-3px) } 75% { transform: rotate(8deg) translateY(2px) }',
  shoulderRight: '0%, 100% { transform: rotate(0deg) translateY(0) } 25% { transform: rotate(12deg) translateY(-3px) } 75% { transform: rotate(-8deg) translateY(2px) }',
};

// Chest puff (scapular retraction): scale chest wider, no rotation
const CHEST_PUFF: Pose = {
  body: '0%, 100% { transform: scaleX(1) scaleY(1) translateY(0) } 50% { transform: scaleX(1.07) scaleY(1.03) translateY(-2px) }',
  shoulderLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(8deg) }',
  shoulderRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-8deg) }',
};

// Reach up (arms straight overhead)
const REACH_UP: Pose = {
  shoulderLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(155deg) }',
  shoulderRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-155deg) }',
  elbowLeft:     '0%, 100% { transform: rotate(0deg) }',
  elbowRight:    '0%, 100% { transform: rotate(0deg) }',
  body:          '0%, 100% { transform: translateY(0) scaleY(1) } 50% { transform: translateY(-4px) scaleY(1.03) }',
};

// Arms overhead (cervical "alcanzar arriba")
const ARMS_OVERHEAD: Pose = {
  shoulderLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(150deg) }',
  shoulderRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-150deg) }',
};

// Push wall (corner push): shoulders abduct, elbows flex/extend in cycle
const PUSH_WALL: Pose = {
  shoulderLeft:  '0% { transform: rotate(60deg) } 50% { transform: rotate(75deg) } 100% { transform: rotate(60deg) }',
  shoulderRight: '0% { transform: rotate(-60deg) } 50% { transform: rotate(-75deg) } 100% { transform: rotate(-60deg) }',
  elbowLeft:     '0% { transform: rotate(-90deg) } 50% { transform: rotate(-15deg) } 100% { transform: rotate(-90deg) }',
  elbowRight:    '0% { transform: rotate(90deg) } 50% { transform: rotate(15deg) } 100% { transform: rotate(90deg) }',
};

// Arm support / press out — arms extend forward as if supporting weight
const ARM_SUPPORT: Pose = {
  body:          '0%, 100% { transform: translateY(0) } 50% { transform: translateY(8px) }',
  spine:         '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(10deg) }',
  shoulderLeft:  '0%, 100% { transform: rotate(60deg) } 50% { transform: rotate(85deg) }',
  shoulderRight: '0%, 100% { transform: rotate(-60deg) } 50% { transform: rotate(-85deg) }',
  elbowLeft:     '0%, 100% { transform: rotate(-50deg) } 50% { transform: rotate(-10deg) }',
  elbowRight:    '0%, 100% { transform: rotate(50deg) } 50% { transform: rotate(10deg) }',
};

// Lunge (side view): front leg forward bent, back leg extended back
const LUNGE: Pose = {
  body:      '0%, 100% { transform: translateY(0) } 50% { transform: translateY(8px) }',
  spine:     '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-5deg) }',
  hipLeft:   '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(40deg) }',
  kneeLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-60deg) }',
  hipRight:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-22deg) }',
};

// Lift box (front view, hombro): squat down with arms hanging, then stand and bring arms to chest
const LIFT_BOX_FRONT: Pose = {
  body:          '0% { transform: translateY(20px) } 50% { transform: translateY(0) } 100% { transform: translateY(20px) }',
  spine:         '0% { transform: rotate(15deg) } 50% { transform: rotate(0deg) } 100% { transform: rotate(15deg) }',
  shoulderLeft:  '0% { transform: rotate(0deg) } 50% { transform: rotate(15deg) } 100% { transform: rotate(0deg) }',
  shoulderRight: '0% { transform: rotate(0deg) } 50% { transform: rotate(-15deg) } 100% { transform: rotate(0deg) }',
  elbowLeft:     '0% { transform: rotate(0deg) } 50% { transform: rotate(-95deg) } 100% { transform: rotate(0deg) }',
  elbowRight:    '0% { transform: rotate(0deg) } 50% { transform: rotate(95deg) } 100% { transform: rotate(0deg) }',
};

// Lift box / deadlift (side view, lumbar): hinge at hip, slight knee bend
const LIFT_BOX_SIDE: Pose = {
  spine:         '0% { transform: rotate(-32deg) translateY(8px) } 50% { transform: rotate(-5deg) translateY(0) } 100% { transform: rotate(-32deg) translateY(8px) }',
  kneeLeft:      '0% { transform: rotate(15deg) } 50% { transform: rotate(0deg) } 100% { transform: rotate(15deg) }',
  kneeRight:     '0% { transform: rotate(-15deg) } 50% { transform: rotate(0deg) } 100% { transform: rotate(-15deg) }',
  shoulderLeft:  '0% { transform: rotate(-50deg) } 50% { transform: rotate(0deg) } 100% { transform: rotate(-50deg) }',
};

// Squat (side view): body lowers, hip + knee both flex visibly
const SQUAT_SIDE: Pose = {
  body:      '0%, 100% { transform: translateY(0) } 50% { transform: translateY(15px) }',
  spine:     '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-12deg) }',
  hipLeft:   '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(35deg) }',
  kneeLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-50deg) }',
  hipRight:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(35deg) }',
  kneeRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-50deg) }',
};

// Squat with chair (cadera): smaller sit, hands forward
// Squat with chair (side view, cadera): smaller sit, hands forward toward chair
const SQUAT_CHAIR: Pose = {
  body:          '0%, 100% { transform: translateY(0) } 50% { transform: translateY(12px) }',
  spine:         '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-15deg) }',
  hipLeft:       '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(30deg) }',
  kneeLeft:      '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-45deg) }',
  hipRight:      '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(30deg) }',
  kneeRight:     '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-45deg) }',
  shoulderLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-60deg) }',
};

// Trunk twist (gentle spine rotation, kept tight so head doesn't fly)
const TRUNK_TWIST: Pose = {
  spine: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-7deg) } 75% { transform: rotate(7deg) }',
};

// Pelvic tilt — visible anterior/posterior pelvic motion
const PELVIC_TILT: Pose = {
  spine: '0%, 100% { transform: rotate(0deg) translateY(0) } 50% { transform: rotate(-7deg) translateY(3px) }',
};

// Glute squeeze — slight lift + tiny posterior pelvic tilt
const GLUTE_SQUEEZE: Pose = {
  body:  '0%, 100% { transform: translateY(0) } 50% { transform: translateY(-5px) }',
  spine: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(3deg) }',
};

// Leg activation (alternate hip flex, side view: positive = forward swing)
const LEG_ACTIVATE: Pose = {
  hipLeft:  '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(20deg) }',
  kneeLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-25deg) }',
  hipRight: '0%, 50%, 100% { transform: rotate(0deg) } 75% { transform: rotate(20deg) }',
  kneeRight:'0%, 50%, 100% { transform: rotate(0deg) } 75% { transform: rotate(-25deg) }',
};

// Walk (alternating step, side view)
const WALK: Pose = {
  body:     '0%, 100% { transform: translateY(0) } 50% { transform: translateY(-3px) }',
  hipLeft:  '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(20deg) }',
  hipRight: '0%, 50%, 100% { transform: rotate(0deg) } 75% { transform: rotate(20deg) }',
};

// High-knee march (side view, knees come up high in front)
const HIGH_KNEE: Pose = {
  body:      '0%, 50%, 100% { transform: translateY(0) } 25%, 75% { transform: translateY(-4px) }',
  hipLeft:   '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(50deg) }',
  kneeLeft:  '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-60deg) }',
  hipRight:  '0%, 50%, 100% { transform: rotate(0deg) } 75% { transform: rotate(50deg) }',
  kneeRight: '0%, 50%, 100% { transform: rotate(0deg) } 75% { transform: rotate(-60deg) }',
};

// Open both legs (side view: front leg forward, back leg back)
const LEGS_OPEN: Pose = {
  hipLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(20deg) }',
  hipRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-20deg) }',
};

// Knee-to-chest (cadera flex, side view: positive hip rotation = forward, negative knee = flex)
const KNEE_TO_CHEST: Pose = {
  hipLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(70deg) }',
  kneeLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-80deg) }',
};

// Leg back (hip extension, side view: negative = backward)
const LEG_BACK: Pose = {
  hipLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-30deg) }',
};

// Hip swing forward/back (side view): clear front leg motion
const HIP_SWING: Pose = {
  hipLeft:  '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(25deg) } 75% { transform: rotate(-20deg) }',
};

// Lumbar flexion (side view, forward bend = negative spine rotation)
const LUMBAR_FLEX: Pose = {
  spine:         '0%, 100% { transform: rotate(0deg) translateY(0) } 50% { transform: rotate(-35deg) translateY(8px) }',
  shoulderLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-25deg) }',
};
const LUMBAR_EXT: Pose = {
  spine: '0%, 100% { transform: rotate(0deg) translateY(0) } 50% { transform: rotate(22deg) }',
};
const LUMBAR_LATERAL: Pose = {
  spine: '0%, 50%, 100% { transform: rotate(0deg) translateX(0) } 25% { transform: rotate(-10deg) translateX(-7px) } 75% { transform: rotate(10deg) translateX(7px) }',
};
// Lumbar rotation — spine + arm swing for visible twist (instead of artificial scaleX)
const LUMBAR_ROT: Pose = {
  spine:        '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-8deg) } 75% { transform: rotate(8deg) }',
  shoulderLeft: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(25deg) } 75% { transform: rotate(-25deg) }',
};

// Cervical specifics (head only)
const HEAD_FLEX:    Pose = { head: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(22deg) }' };
const HEAD_EXT:     Pose = { head: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-22deg) }' };
const HEAD_LATERAL: Pose = { head: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-22deg) } 75% { transform: rotate(22deg) }' };
const HEAD_ROT:     Pose = { head: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-30deg) } 75% { transform: rotate(30deg) }' };
// Head looking around while body bobs (suggests walking)
const HEAD_LOOK_AROUND: Pose = {
  body: '0%, 50%, 100% { transform: translateY(0) } 25%, 75% { transform: translateY(-4px) }',
  head: '0%, 25%, 50%, 75%, 100% { transform: rotate(0deg) } 12% { transform: rotate(-25deg) } 37% { transform: rotate(15deg) } 62% { transform: rotate(25deg) } 87% { transform: rotate(-15deg) }',
};

// Hombro specifics (arms only)
const ARM_FLEXION: Pose = {
  shoulderLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(135deg) }',
  shoulderRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-135deg) }',
};
const ARM_ABDUCTION: Pose = {
  shoulderLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(90deg) }',
  shoulderRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-90deg) }',
};
const ARM_CROSS_BODY: Pose = {
  shoulderLeft:  '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(70deg) }',
  shoulderRight: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-70deg) }',
  elbowLeft:     '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-110deg) }',
  elbowRight:    '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(110deg) }',
};
const ARM_WINGS: Pose = {
  shoulderLeft:  '0%, 100% { transform: rotate(15deg) } 50% { transform: rotate(110deg) }',
  shoulderRight: '0%, 100% { transform: rotate(-15deg) } 50% { transform: rotate(-110deg) }',
};

// Cervical body twist (with arm participation)
const BODY_TWIST: Pose = {
  spine: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-8deg) } 75% { transform: rotate(8deg) }',
  shoulderLeft:  '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(60deg) } 75% { transform: rotate(-30deg) }',
  shoulderRight: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(30deg) } 75% { transform: rotate(-60deg) }',
};

// Hombro aledañas
const NECK_TILT_LEFT:  Pose = { head: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-18deg) }' };
const NECK_TILT_RIGHT: Pose = { head: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(18deg) }' };

// Hand presets (tunel)
const HAND_BREATHE_PULSE:   Pose = { hand: '0%, 100% { transform: scale(1) } 50% { transform: scale(1.09) }' };
const HAND_BREATHE_DRIFT:   Pose = { hand: '0%, 100% { transform: scale(1) translateX(0) } 50% { transform: scale(1.05) translateX(-5px) }' };
const HAND_BREATHE_RELEASE: Pose = { hand: '0% { transform: scale(1.08) } 35% { transform: scale(1) } 100% { transform: scale(1.08) }' };
const HAND_FLAP:        Pose = { hand: '0%, 100% { transform: rotate(-10deg) } 50% { transform: rotate(10deg) }' };
const HAND_SWAY:        Pose = { hand: '0%, 100% { transform: rotate(-6deg) translateX(0) } 50% { transform: rotate(6deg) translateX(4px) }' };
const HAND_EXTEND:      Pose = { hand: '0%, 100% { transform: translateX(0) } 50% { transform: translateX(18px) }' };
const HAND_FLEX_DOWN:   Pose = { hand: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-30deg) }' };
const HAND_FLEX_UP:     Pose = { hand: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(30deg) }' };
const HAND_TURN:        Pose = { hand: '0%, 50%, 100% { transform: rotate(0deg) } 25% { transform: rotate(-25deg) } 75% { transform: rotate(25deg) }' };
const HAND_FLUTTER:     Pose = { hand: '0%, 100% { transform: rotate(-18deg) } 50% { transform: rotate(18deg) }' };
const HAND_LIFT:        Pose = { hand: '0%, 100% { transform: rotate(0deg) translateY(0) } 50% { transform: rotate(15deg) translateY(-8px) }' };

export const getTherapyExercise = (
  region: string,
  level: number,
  painLevel: number = 5,
  painfulMovement: string = 'none',
): TherapyExercise => {

  const REGION_DB: Record<string, Record<string, ExerciseEntry[]>> = {
    cervical: {
      RESPIRACION: [
        { instruction: 'Respira profundo e infla el abdomen. Relaja los hombros.',  duration: '6s', poses: BREATHE_BELLY },
        { instruction: 'Suelta el aire lentamente. Siente cómo baja la tensión.',   duration: '7s', poses: BREATHE_RELEASE },
        { instruction: 'Otra respiración profunda. Estás a salvo, tu cuello está bien.', duration: '5s', poses: BREATHE_CHEST },
      ],
      ALEDANAS: [
        { instruction: 'Mueve suavemente los hombros. Ayuda a liberar tu cuello.', duration: '4s', poses: SHOULDER_ROLL },
        { instruction: 'Saca pecho y relaja. Quitamos peso de las cervicales.',    duration: '4s', poses: CHEST_PUFF },
        { instruction: 'Mueve la espalda alta de un lado al otro suavemente. Todo se conecta.',  duration: '5s', poses: TRUNK_TWIST },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Baja la barbilla. Estira sin forzar.',                    duration: '4s', poses: HEAD_FLEX },
        { id: 'extension', instruction: 'Mira hacia arriba suavemente. Confía en el movimiento.', duration: '4s', poses: HEAD_EXT },
        { id: 'lateral',   instruction: 'Oreja al hombro. Siente el alivio en los lados.',         duration: '5s', poses: HEAD_LATERAL },
        { id: 'rotacion',  instruction: 'Mira por encima de tu hombro. Moverse es seguro.',        duration: '5s', poses: HEAD_ROT },
      ],
      COMPUESTOS: [
        { instruction: 'Mira hacia todas las direcciones mientras caminas.', duration: '5s', poses: HEAD_LOOK_AROUND },
        { instruction: 'Simula alcanzar un objeto arriba de ti.',            duration: '4s', poses: ARMS_OVERHEAD },
        { instruction: 'Giros amplios de cuerpo completo.',                  duration: '5s', poses: BODY_TWIST },
      ],
    },

    hombro: {
      RESPIRACION: [
        { instruction: 'Inhala profundamente hacia tu caja torácica.', duration: '5s', poses: BREATHE_CHEST },
        { instruction: 'Exhala lentamente. Tu sistema baja la tensión.',       duration: '7s', poses: BREATHE_RELEASE },
        { instruction: 'Inhala lento y profundo. Calmas todo el sistema nervioso.', duration: '6s', poses: BREATHE_BELLY },
      ],
      ALEDANAS: [
        { instruction: 'Mueve el cuello hacia la izquierda. El nervio de tu brazo nace aquí.', duration: '4s', poses: NECK_TILT_LEFT },
        { instruction: 'Ahora hacia la derecha, suavemente.',                                  duration: '4s', poses: NECK_TILT_RIGHT },
        { instruction: 'Saca pecho y junta los omóplatos. Mejora tu base.',                    duration: '4s', poses: CHEST_PUFF },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Levanta los brazos al frente y hacia arriba, como si saludaras a lo lejos.', duration: '4s', poses: ARM_FLEXION },
        { id: 'abduccion', instruction: 'Levanta el brazo a los lados. Estás ganando movilidad.',        duration: '4s', poses: ARM_ABDUCTION },
        { id: 'rotacion',  instruction: 'Lleva la mano al hombro contrario y vuelve. Tu hombro es fuerte.', duration: '4s', poses: ARM_CROSS_BODY },
        { id: 'extra',     instruction: 'Levanta ambos brazos como alas grandes. Fluye.',                duration: '1.6s', poses: ARM_WINGS },
      ],
      COMPUESTOS: [
        { instruction: 'Empuja la pared con ambas manos firme y seguro.',          duration: '3s', poses: PUSH_WALL, prop: 'wall' },
        { instruction: 'Apóyate firme con ambos brazos al frente. Cargas tu propio peso sin temor.', duration: '4s', poses: ARM_SUPPORT },
        { instruction: 'Levanta cajas ligeras del piso al armario.',                 duration: '5s', poses: LIFT_BOX_FRONT, prop: 'box' },
      ],
    },

    lumbar: {
      RESPIRACION: [
        { instruction: 'Respira hacia tu panza. Relaja completamente todo el abdomen.', duration: '6s', poses: BREATHE_BELLY },
        { instruction: 'Al soltar el aire, deja ir toda preocupación lumbar.',          duration: '7s', poses: BREATHE_RELEASE },
        { instruction: 'Inhala sintiendo cómo se expande tu zona baja. Estás limpio de daños.', duration: '5s', poses: BREATHE_CHEST },
      ],
      ALEDANAS: [
        { instruction: 'Aprieta y suelta glúteos. Protegen tu espalda.',           duration: '3s', poses: GLUTE_SQUEEZE },
        { instruction: 'Activa un poco tus piernas. La raíz del soporte.',         duration: '4s', poses: LEG_ACTIVATE },
        { instruction: 'Mueve sutilmente tu pecho adelante. Libera la presión.',   duration: '4s', poses: PELVIC_TILT },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Agáchate un poco al piso. Tus discos son una maravilla natural resistente.', duration: '4s', poses: LUMBAR_FLEX },
        { id: 'extension', instruction: 'Estírate hacia atrás suavemente. La espalda soporta curvas.',                duration: '4s', poses: LUMBAR_EXT },
        { id: 'lateral',   instruction: 'Mueve la espalda baja a un lado y al otro. Abre tus costillas con confianza.', duration: '4s', poses: LUMBAR_LATERAL },
        { id: 'rotacion',  instruction: 'Giro de torso. Los rotadores espinales disfrutan este estirón.',             duration: '5s', poses: LUMBAR_ROT },
      ],
      COMPUESTOS: [
        { instruction: 'Sentadilla fluida. Tus rodillas y espalda trabajan en equipo perfecto.', duration: '4s', poses: SQUAT_SIDE },
        { instruction: 'Peso muerto ligero. Crees poder cargar cajas porque ¡así es!',           duration: '5s', poses: LIFT_BOX_SIDE, prop: 'box' },
        { instruction: 'Estirada global de cuerpo buscando el cielo.',                           duration: '4s', poses: REACH_UP },
      ],
    },

    cadera: {
      RESPIRACION: [
        { instruction: 'Respiración pélvica profunda.',                              duration: '6s', poses: BREATHE_BELLY },
        { instruction: 'Al exhalar, suelta tu pelvis por completo.',                 duration: '7s', poses: BREATHE_RELEASE },
        { instruction: 'Lleva aire oxigenado hacia las venas de tus ingles.',        duration: '5s', poses: BREATHE_CHEST },
      ],
      ALEDANAS: [
        { instruction: 'Mueve rodillas despacio. Tus piernas cargan tu cadera.',     duration: '4s', poses: LEG_ACTIVATE },
        { instruction: 'Mueve sutilmente la pelvis adelante y atrás. La cadera permanece estable.', duration: '4s', poses: PELVIC_TILT },
        { instruction: 'Camina suave en el lugar. Despiertas piernas y tobillos.',   duration: '1.6s', poses: WALK },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Lleva rodilla al pecho (imaginación). La cadera flexiona sin dolor.', duration: '4s', poses: KNEE_TO_CHEST },
        { id: 'extension', instruction: 'Pierna atrás. Tus glúteos despiertan y ayudan al fémur.',             duration: '4s', poses: LEG_BACK },
        { id: 'rotacion',  instruction: 'Lleva la pierna adelante y atrás suavemente, activando la cadera.', duration: '5s', poses: HIP_SWING },
        { id: 'extra',     instruction: 'Extiende una pierna adelante y otra atrás. Movilizas toda la cadera.', duration: '4s', poses: LEGS_OPEN },
      ],
      COMPUESTOS: [
        { instruction: 'Sentadilla asistida tocando silla.',                         duration: '4s', poses: SQUAT_CHAIR, prop: 'chair' },
        { instruction: 'Desplante estático: una pierna adelante flexionada, otra atrás. El cuerpo asimila carga viva.', duration: '4s', poses: LUNGE },
        { instruction: 'Caminata simulada rápida levantando cadera.',                duration: '1.1s', poses: HIGH_KNEE },
      ],
    },

    tunel: {
      RESPIRACION: [
        { instruction: 'Respira para calmar las corrientes nerviosas.',         duration: '5s', poses: HAND_BREATHE_PULSE },
        { instruction: 'Relaja cuello y hombro. Todo baja hasta los dedos.',    duration: '6s', poses: HAND_BREATHE_DRIFT },
        { instruction: 'Inspira positividad, exhala la anticipación.',          duration: '7s', poses: HAND_BREATHE_RELEASE },
      ],
      ALEDANAS: [
        { instruction: 'Mueve la muñeca de un lado al otro. Estás liberando el nervio mediano que sube por el codo.', duration: '4s', poses: HAND_FLAP },
        { instruction: 'Mece la muñeca al frente y al lado. El movimiento sube hasta hombro y codo.', duration: '5s', poses: HAND_SWAY },
        { instruction: 'Estira la muñeca hacia adelante como si extendieras todo el brazo.', duration: '4s', poses: HAND_EXTEND },
      ],
      ESPECIFICOS: [
        { id: 'flexion',   instruction: 'Dobla muñeca abajo como un cisne.',                                  duration: '4s', poses: HAND_FLEX_DOWN },
        { id: 'extension', instruction: 'Doblala arriba, posición de alto.',                                  duration: '4s', poses: HAND_FLEX_UP },
        { id: 'rotacion',  instruction: 'Abre botellas invisibles. Tus ligamentos están seguros.',            duration: '5s', poses: HAND_TURN },
        { id: 'extra',     instruction: 'Aleteo lateral rápido y libre de miedos.',                           duration: '2s', poses: HAND_FLUTTER },
      ],
      COMPUESTOS: [
        { instruction: 'Toma aire mientras levantas una pesita ligera (o un vaso de agua).', duration: '4s', poses: HAND_LIFT, prop: 'weight' },
        { instruction: 'Empuja la pared con tu mano (imagina la otra haciendo lo mismo). Activas toda la cadena del brazo.', duration: '4s', poses: HAND_EXTEND, prop: 'wall' },
        { instruction: 'Rota la muñeca despacio mientras imaginas tu torso girando. Estiras toda la cadena.', duration: '5s', poses: HAND_TURN },
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
      poses: selectedEx.poses,
      prop: selectedEx.prop,
    },
  };
};

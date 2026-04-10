export interface TherapyExercise {
  region: string;
  level: number;
  instruction: string;
  animationProps: {
    duration: string;
    keyframesLeft: string;
    keyframesRight?: string;
  };
}

export const getTherapyExercise = (
  region: string, 
  level: number, 
  painLevel: number = 5, 
  painfulMovement: string = 'none'
): TherapyExercise => {

  const BREATHE = { duration: '7s', keyframesLeft: '0%, 100% { transform: scale(1) translateY(0) } 50% { transform: scale(1.02) translateY(-2px) }' };
  const ADJACENT = { duration: '5s', keyframesLeft: '0%, 100% { transform: rotate(-2deg) } 50% { transform: rotate(2deg) }' };
  const COMPOUND = { duration: '3s', keyframesLeft: '0%, 100% { transform: rotate(-10deg) translateY(0) } 50% { transform: rotate(25deg) translateY(10px) }' };

  // MATRICES POR CATEGORÍA
  const REGION_DB: Record<string, any> = {
    cervical: {
      RESPIRACION: [
        { instruction: 'Respira profundo e infla el abdomen. Relaja los hombros.', ...BREATHE },
        { instruction: 'Suelta el aire lentamente. Siente cómo baja la tensión.', ...BREATHE },
        { instruction: 'Otra respiración profunda. Estás a salvo, tu cuello está bien.', ...BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Mueve suavemente los hombros. Ayuda a liberar tu cuello.', ...ADJACENT },
        { instruction: 'Intenta sacar pecho y relajar. Quitamos peso de las cervicales.', ...ADJACENT },
        { instruction: 'Haz pequeños círculos con la espalda alta. Todo se conecta.', ...ADJACENT },
      ],
      ESPECIFICOS: [
        { id: 'flexion', instruction: 'Baja la barbilla. Estira sin forzar.', duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(20deg) }' },
        { id: 'extension', instruction: 'Mira hacia arriba suavemente. Confía en el movimiento.', duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-20deg) }' },
        { id: 'lateral', instruction: 'Oreja al hombro. Siente el alivio en los lados.', duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(-15deg) } 50% { transform: rotate(15deg) }' },
        { id: 'rotacion', instruction: 'Mira por encima de tu hombro. Moverse es seguro.', duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(-25deg) } 50% { transform: rotate(25deg) }' }
      ],
      COMPUESTOS: [
        { instruction: 'Mira hacia todas las direcciones mientras caminas.', ...COMPOUND },
        { instruction: 'Simula alcanzar un objeto arriba de ti.', ...COMPOUND },
        { instruction: 'Giros amplios de cuerpo completo.', ...COMPOUND },
      ]
    },
    hombro: {
      RESPIRACION: [
        { instruction: 'Inhala profundamente hacia tu caja torácica.', ...BREATHE },
        { instruction: 'Exhala soltando el peso de los brazos.', ...BREATHE },
        { instruction: 'Relaja la mandíbula al respirar. Esto calma el hombro.', ...BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Mueve solo el cuello a un lado. El nervio de tu brazo nace aquí.', ...ADJACENT },
        { instruction: 'Mueve el otro lado del cuello suavemente.', ...ADJACENT },
        { instruction: 'Saca el pecho y junta los omóplatos. Mejora tu base.', ...ADJACENT },
      ],
      ESPECIFICOS: [
        { id: 'flexion', instruction: 'Levanta el brazo al frente cómodamente.', duration: '4s', angle: 60, keyframesLeft: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(60deg) }', keyframesRight: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(-60deg) }' },
        { id: 'abduccion', instruction: 'Levanta el brazo a los lados. Estás ganando movilidad.', duration: '4s', angle: 45, keyframesLeft: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(45deg) }', keyframesRight: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(-45deg) }' },
        { id: 'rotacion', instruction: 'Simula tocarte la espalda. Tu hombro es fuerte.', duration: '4s', angle: 30, keyframesLeft: '0%, 100% { transform: scaleX(-1) rotate(0) } 50% { transform: scaleX(-1) rotate(30deg) }' },
        { id: 'extra', instruction: 'Levanta ambos brazos como alas grandes. Fluye.', duration: '3s', angle: 90, keyframesLeft: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(90deg) }', keyframesRight: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(-90deg) }' }
      ],
      COMPUESTOS: [
        { instruction: 'Empuja la pared con ambas manos firme y seguro.', ...COMPOUND },
        { instruction: 'Postura de plancha suave. Cargas tu propio peso sin temor.', ...COMPOUND },
        { instruction: 'Levanta cajas ligeras del piso al armario.', ...COMPOUND },
      ]
    },
    lumbar: {
      RESPIRACION: [
        { instruction: 'Respira hacia tu panza. Relaja completamente todo el abdomen.', ...BREATHE },
        { instruction: 'Al soltar el aire, deja ir toda preocupación lumbar.', ...BREATHE },
        { instruction: 'Inhala sintiendo cómo se expande tu zona baja. Estás limpio de daños.', ...BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Aprieta y suelta glúteos. Protegen tu espalda.', ...ADJACENT },
        { instruction: 'Activa un poco tus piernas. La raíz del soporte.', ...ADJACENT },
        { instruction: 'Mueve sutilmente tu pecho adelante. Libera la presión.', ...ADJACENT },
      ],
      ESPECIFICOS: [
        { id: 'flexion', instruction: 'Agáchate un poco al piso. Tus discos son una maravilla natural resistente.', duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(-35deg) }' },
        { id: 'extension', instruction: 'Estírate hacia atrás suavemente. La espalda soporta curvas.', duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(15deg) }' },
        { id: 'lateral', instruction: 'Inclinación a un lado. Abre tus costillas con confianza.', duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(20deg) }' },
        { id: 'rotacion', instruction: 'Giro de torso. Los rotadores espinales disfrutan este estirón.', duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(-15deg) } 50% { transform: rotate(15deg) }' }
      ],
      COMPUESTOS: [
        { instruction: 'Sentadilla fluida. Tus rodillas y espalda trabajan en equipo perfecto.', ...COMPOUND },
        { instruction: 'Peso muerto ligero. Crees poder cargar cajas porque ¡así es!', duration: '3s', keyframesLeft: '0%, 100% { transform: rotate(0) translateY(0) } 50% { transform: rotate(-60deg) translateY(15px) }' },
        { instruction: 'Estirada global de cuerpo buscando el cielo.', ...COMPOUND },
      ]
    },
    cadera: {
      RESPIRACION: [
        { instruction: 'Respiración pélvica profunda.', ...BREATHE },
        { instruction: 'Al exhalar, suelta tu pelvis por completo.', ...BREATHE },
        { instruction: 'Lleva aire oxigenado hacia las venas de tus ingles.', ...BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Mueve rodillas despacio. Tus piernas cargan tu cadera.', ...ADJACENT },
        { instruction: 'Activa tu espalda baja sin mover la cadera.', ...ADJACENT },
        { instruction: 'Despierta los tobillos. Mejor soporte, menor carga.', ...ADJACENT },
      ],
      ESPECIFICOS: [
        { id: 'flexion', instruction: 'Lleva rodilla al pecho (imaginación). La cadera flexiona sin dolor.', duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(-30deg) }' },
        { id: 'extension', instruction: 'Pierna atrás. Tus glúteos despiertan y ayudan al fémur.', duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(20deg) }' },
        { id: 'rotacion', instruction: 'Rota la pierna hacia afuera tranquilamente.', duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(-10deg) } 50% { transform: rotate(10deg) }' },
        { id: 'extra', instruction: 'Abre ambas piernas sutilmente. Eres móvil.', duration: '4s', keyframesLeft: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(-25deg) }' }
      ],
      COMPUESTOS: [
        { instruction: 'Sentadilla asistida tocando silla.', ...COMPOUND },
        { instruction: 'Desplante estático relajado. El cuerpo asimila carga viva.', ...COMPOUND },
        { instruction: 'Caminata simulada rápida levantando cadera.', ...COMPOUND },
      ]
    },
    tunel: {
      RESPIRACION: [
        { instruction: 'Respira para calmar las corrientes nerviosas.', ...BREATHE },
        { instruction: 'Relaja cuello y hombro. Todo baja hasta los dedos.', ...BREATHE },
        { instruction: 'Inspira positividad, exhala la anticipación.', ...BREATHE },
      ],
      ALEDANAS: [
        { instruction: 'Mueve el codo despacio. El nervio mediano pasa por aquí.', ...ADJACENT },
        { instruction: 'Abre y cierra el hombro.', ...ADJACENT },
        { instruction: 'Extiende todo tu brazo recto.', ...ADJACENT },
      ],
      ESPECIFICOS: [
        { id: 'flexion', instruction: 'Dobla muñeca abajo como un cisne.', duration: '3s', keyframesLeft: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(-30deg) }' },
        { id: 'extension', instruction: 'Doblala arriba, posición de alto.', duration: '3s', keyframesLeft: '0%, 100% { transform: rotate(0) } 50% { transform: rotate(30deg) }' },
        { id: 'rotacion', instruction: 'Abre botellas invisibles. Tus ligamentos están seguros.', duration: '3s', keyframesLeft: '0%, 100% { transform: rotate(-20deg) } 50% { transform: rotate(20deg) }' },
        { id: 'extra', instruction: 'Aleteo lateral rápido y libre de miedos.', duration: '2s', keyframesLeft: '0%, 100% { transform: rotate(-15deg) } 50% { transform: rotate(15deg) }' }
      ],
      COMPUESTOS: [
        { instruction: 'Toma aire mientras levantas una pesita ligera (o un vaso de agua).', ...COMPOUND },
        { instruction: 'Empuja la pared con ambas manos, usando toda la cadena.', ...COMPOUND },
        { instruction: 'Estiramiento integral de todo el brazo rotando el torso.', ...COMPOUND }
      ]
    }
  };

  const matriz = REGION_DB[region] || REGION_DB['lumbar'];
  
  // 1. SORTEO DE ESPECIFICOS BASADO EN DOLOR PREVIO
  let sortedEspecificos = [...matriz.ESPECIFICOS];
  if (painfulMovement !== 'none') {
    const pIndex = sortedEspecificos.findIndex(e => e.id === painfulMovement);
    if (pIndex !== -1) {
      const pElement = sortedEspecificos.splice(pIndex, 1)[0];
      sortedEspecificos.push(pElement); // Mover el que duele al FINAL de específicos
    }
  }

  // 2. CONSTRUCCIÓN DEL ARRAY DE 10 NIVELES (Según intensidad inicial)
  let sessionProgression: any[] = [];
  
  if (painLevel >= 6) {
    // DOLOR AGUDO: 3 Respiración -> 3 Aledañas -> 4 Específicos
    sessionProgression = [
      ...matriz.RESPIRACION.slice(0, 3),
      ...matriz.ALEDANAS.slice(0, 3),
      ...sortedEspecificos.slice(0, 4)
    ];
  } else {
    // DOLOR LEVE: 3 Aledañas -> 4 Específicos -> 3 Compuestos
    sessionProgression = [
      ...matriz.ALEDANAS.slice(0, 3),
      ...sortedEspecificos.slice(0, 4),
      ...matriz.COMPUESTOS.slice(0, 3)
    ];
  }

  // Fallback si algo falló y no hay 10
  const realIndex = Math.min(Math.max(level - 1, 0), sessionProgression.length - 1);
  const selectedEx = sessionProgression[realIndex] || matriz.RESPIRACION[0];

  return {
    region,
    level,
    instruction: selectedEx.instruction,
    animationProps: {
      duration: selectedEx.duration || '4s',
      keyframesLeft: selectedEx.keyframesLeft || '',
      keyframesRight: selectedEx.keyframesRight || ''
    }
  };
};

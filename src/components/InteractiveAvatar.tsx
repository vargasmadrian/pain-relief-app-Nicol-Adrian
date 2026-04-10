import { getTherapyExercise } from '../data/therapyExercises';

// ==========================================
// CSS PURO PARA SVG (RENDERIZADO DINÁMICO)
// ==========================================
const DynamicStyles = ({ keyframesLeft, keyframesRight, duration }: { keyframesLeft: string, keyframesRight?: string, duration: string }) => {
  return (
    <style>{`
      /* Animaciones Generales Idle */
      .idle-rot-fast { animation: rot-fast 4s infinite ease-in-out; }
      .idle-scale { animation: scale-bounce 4s infinite ease-in-out; }
      @keyframes rot-fast { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
      @keyframes scale-bounce { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.02); } }

      /* Animación Terapéutica Inyectada */
      .active-therapy-left { animation: therapy-anim-left ${duration} infinite ease-in-out; }
      @keyframes therapy-anim-left { ${keyframesLeft} }
      
      ${keyframesRight ? `
        .active-therapy-right { animation: therapy-anim-right ${duration} infinite ease-in-out; }
        @keyframes therapy-anim-right { ${keyframesRight} }
      ` : ''}

      /* Regla sagrada para forzar matriz de SVG en todos los navs */
      .matriz-svg { transform-box: view-box; }
    `}</style>
  );
};

// Variables de Color 
const skin = "#fcd5ce";
const skinDark = "#eabcc3"; 
const tshirt = "#7c3aed";
const pants = "#1e293b";
const pantsDark = "#0f172a";
const shoes = "#f8fafc";


// ==========================
// FRONT AVATAR (Vista Frontal)
// ==========================
const FrontAvatar = ({ variant, isActive }: { variant: string, isActive: boolean }) => {
  const isCervical = variant === 'cervical';
  const isHombro = variant === 'hombro';
  
  const headClass = (isActive && isCervical) ? `active-therapy-left` : 'idle-rot-fast';
  const torsoClass = 'idle-scale';
  const leftArmClass = (isActive && isHombro) ? `active-therapy-left` : 'idle-rot-fast';
  const rightArmClass = (isActive && isHombro) ? `active-therapy-right` : 'idle-rot-fast';

  return (
    <svg width="220" height="350" viewBox="0 0 200 350" style={{ zIndex: 1, overflow: 'visible' }}>
      <g id="legs">
        <line x1="85" y1="240" x2="85" y2="310" stroke={pants} strokeWidth="20" strokeLinecap="round" />
        <rect x="70" y="305" width="25" height="15" rx="5" fill={shoes} />
        <line x1="115" y1="240" x2="115" y2="310" stroke={pants} strokeWidth="20" strokeLinecap="round" />
        <rect x="105" y="305" width="25" height="15" rx="5" fill={shoes} />
      </g>

      <g className={`${torsoClass} matriz-svg`} style={{ transformOrigin: '100px 240px' }}>
        <path d="M75 130 L125 130 L120 230 L80 230 Z" fill={tshirt} stroke={tshirt} strokeWidth="20" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="100" cy="160" r="15" fill="rgba(255,255,255,0.1)" />

        <g className={`${headClass} matriz-svg`} style={{ transformOrigin: '100px 120px' }}>
          <line x1="100" y1="130" x2="100" y2="100" stroke={skin} strokeWidth="20" strokeLinecap="round" />
          <circle cx="100" cy="65" r="45" fill={skin} />
          <path d="M55 65 C55 10 145 10 145 65 Z" fill="#f59e0b" />
          <circle cx="85" cy="65" r="6" fill="#1e293b" />
          <circle cx="115" cy="65" r="6" fill="#1e293b" />
          <circle cx="87" cy="63" r="2" fill="white" />
          <circle cx="117" cy="63" r="2" fill="white" />
          <path d="M85 80 Q100 95 115 80" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="70" cy="72" r="5" fill="rgba(255,0,0,0.15)" />
          <circle cx="130" cy="72" r="5" fill="rgba(255,0,0,0.15)" />
        </g>

        <g className={`${leftArmClass} matriz-svg`} style={{ transformOrigin: '70px 130px' }}>
          <line x1="70" y1="130" x2="55" y2="210" stroke={skin} strokeWidth="18" strokeLinecap="round" />
          <line x1="70" y1="130" x2="65" y2="160" stroke={tshirt} strokeWidth="20" strokeLinecap="round" />
          <circle cx="55" cy="210" r="10" fill={skin} />
        </g>

        <g className={`${rightArmClass} matriz-svg`} style={{ transformOrigin: '130px 130px' }}>
          <line x1="130" y1="130" x2="145" y2="210" stroke={skin} strokeWidth="18" strokeLinecap="round" />
          <line x1="130" y1="130" x2="135" y2="160" stroke={tshirt} strokeWidth="20" strokeLinecap="round" />
          <circle cx="145" cy="210" r="10" fill={skin} />
        </g>
      </g>
    </svg>
  );
};


// ==========================
// SIDE AVATAR (Vista Lateral)
// ==========================
const SideAvatar = ({ variant, isActive }: { variant: string, isActive: boolean }) => {
  const isLumbar = variant === 'lumbar' || variant === 'cadera';
  const lumbarClass = (isActive && isLumbar) ? `active-therapy-left` : 'idle-rot-fast';
  const torsoClass = isLumbar ? lumbarClass : 'idle-scale';

  return (
    <svg width="220" height="350" viewBox="0 0 200 350" style={{ zIndex: 1, overflow: 'visible' }}>
      <g id="leg-back">
        <line x1="100" y1="240" x2="105" y2="310" stroke={pantsDark} strokeWidth="18" strokeLinecap="round" />
        <rect x="92" y="305" width="28" height="15" rx="5" fill={shoes} />
      </g>
      <g id="leg-front">
        <line x1="95" y1="240" x2="85" y2="310" stroke={pants} strokeWidth="20" strokeLinecap="round" />
        <rect x="75" y="305" width="28" height="15" rx="5" fill={shoes} />
      </g>

      <g className={`${torsoClass} matriz-svg`} style={{ transformOrigin: '100px 240px' }}>
        <line x1="100" y1="230" x2="100" y2="130" stroke={tshirt} strokeWidth="35" strokeLinecap="round" />

        <g className={`matriz-svg`} style={{ transformOrigin: '100px 120px' }}>
          <line x1="100" y1="130" x2="100" y2="100" stroke={skin} strokeWidth="15" strokeLinecap="round" />
          <circle cx="100" cy="65" r="40" fill={skin} />
          <circle cx="80" cy="60" r="5" fill="#1e293b" />
          <circle cx="78" cy="58" r="2" fill="white" />
          <path d="M 65 72 Q 75 82 85 70" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="70" cy="68" r="5" fill="rgba(255,0,0,0.15)" />
          <circle cx="110" cy="65" r="7" fill={skinDark} />
          <path d="M 90 25 A 40 40 0 0 1 140 65" stroke="#f59e0b" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M 110 25 Q 70 20 60 45" stroke="#f59e0b" strokeWidth="12" fill="none" strokeLinecap="round" />
        </g>

        <g className={`matriz-svg`} style={{ transformOrigin: '100px 130px' }}>
          <line x1="100" y1="130" x2="100" y2="210" stroke={skin} strokeWidth="16" strokeLinecap="round" />
          <line x1="100" y1="130" x2="100" y2="170" stroke={tshirt} strokeWidth="22" strokeLinecap="round" />
          <circle cx="100" cy="210" r="8" fill={skin} />
        </g>
      </g>
    </svg>
  );
};


// ==========================
// HAND AVATAR (Túnel Carpiano)
// ==========================
const HandAvatar = ({ variant, isActive }: { variant: string, isActive: boolean }) => {
  const handClass = (isActive && variant === 'tunel') ? `active-therapy-left` : 'idle-rot-fast';

  return (
    <svg width="220" height="350" viewBox="0 0 200 350" style={{ zIndex: 1, overflow: 'visible' }}>
      <line x1="-30" y1="180" x2="40" y2="180" stroke={tshirt} strokeWidth="55" strokeLinecap="round" />
      <line x1="20" y1="180" x2="100" y2="180" stroke={skin} strokeWidth="40" strokeLinecap="round" />

      <g className={`${handClass} matriz-svg`} style={{ transformOrigin: '100px 180px' }}>
        <line x1="100" y1="180" x2="160" y2="180" stroke={skin} strokeWidth="36" strokeLinecap="round" />
        <circle cx="160" cy="172" r="6" fill={skinDark} />
        <circle cx="160" cy="188" r="6" fill={skinDark} />
        <line x1="110" y1="180" x2="135" y2="145" stroke={skin} strokeWidth="14" strokeLinecap="round" />
        <circle cx="135" cy="145" r="7" fill={skin} />
        <circle cx="100" cy="180" r="18" fill="rgba(0,0,0,0.03)" />
      </g>
    </svg>
  );
};


// ==========================
// CONTROLADOR CENTRAL
// ==========================
export default function InteractiveAvatar({ 
  selectedZone = '', 
  isTherapyMode = false,
  level = 1,
}: any) {
  
  const isHandView = selectedZone === 'tunel';
  const isSideView = selectedZone === 'lumbar' || selectedZone === 'cadera';
  
  let currentVariant = 'idle';
  if (isTherapyMode) {
    const validVariants = ['cervical', 'hombro', 'lumbar', 'cadera', 'tunel'];
    currentVariant = validVariants.includes(selectedZone) ? selectedZone : 'idle';
  }

  const exercise = getTherapyExercise(selectedZone, level);
  const isActive = isTherapyMode && currentVariant !== 'idle';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <DynamicStyles 
        keyframesLeft={exercise.animationProps.keyframesLeft}
        keyframesRight={exercise.animationProps.keyframesRight}
        duration={exercise.animationProps.duration} 
      />
      {isHandView ? (
        <HandAvatar variant={currentVariant} isActive={isActive} />
      ) : isSideView ? (
        <SideAvatar variant={currentVariant} isActive={isActive} />
      ) : (
        <FrontAvatar variant={currentVariant} isActive={isActive} />
      )}
    </div>
  );
}

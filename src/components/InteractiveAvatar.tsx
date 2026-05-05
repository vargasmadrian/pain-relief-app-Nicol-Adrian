import { getTherapyExercise } from '../data/therapyExercises';
import type { AnimationTarget } from '../data/therapyExercises';

// ==========================================
// CSS PURO PARA SVG (RENDERIZADO DINÁMICO)
// ==========================================
const DynamicStyles = ({ keyframesLeft, keyframesRight, duration }: { keyframesLeft: string, keyframesRight?: string, duration: string }) => {
  return (
    <style>{`
      .idle-rot-fast { animation: rot-fast 4s infinite ease-in-out; }
      .idle-scale { animation: scale-bounce 4s infinite ease-in-out; }
      @keyframes rot-fast { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
      @keyframes scale-bounce { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.04); } }

      .active-therapy-left { animation: therapy-anim-left ${duration} infinite ease-in-out; }
      @keyframes therapy-anim-left { ${keyframesLeft} }

      ${keyframesRight ? `
        .active-therapy-right { animation: therapy-anim-right ${duration} infinite ease-in-out; }
        @keyframes therapy-anim-right { ${keyframesRight} }
      ` : ''}

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
const hair = "#4a2e1e";
const hairShade = "#3d2817";
const eyeColor = "#1e293b";

// ==========================
// CABEZA FRONTAL (más natural)
// ==========================
const FrontHead = () => (
  <>
    <line x1="100" y1="130" x2="100" y2="100" stroke={skin} strokeWidth="22" strokeLinecap="round" />

    <ellipse cx="58" cy="68" rx="4" ry="7" fill={skinDark} />
    <ellipse cx="142" cy="68" rx="4" ry="7" fill={skinDark} />

    <ellipse cx="100" cy="63" rx="42" ry="46" fill={skin} />

    <path
      d="M 60 60 Q 60 18 100 16 Q 140 18 140 60 Q 138 47 124 46 Q 110 48 100 56 Q 90 48 76 46 Q 62 47 60 60 Z"
      fill={hair}
    />
    <path
      d="M 60 60 Q 70 35 100 32 Q 100 50 100 56 Q 90 48 76 46 Q 62 47 60 60 Z"
      fill={hairShade}
      opacity="0.5"
    />

    <path d="M 78 56 Q 85 53 92 57" stroke={hairShade} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M 108 57 Q 115 53 122 56" stroke={hairShade} strokeWidth="2.5" fill="none" strokeLinecap="round" />

    <ellipse cx="85" cy="68" rx="4" ry="5" fill={eyeColor} />
    <ellipse cx="115" cy="68" rx="4" ry="5" fill={eyeColor} />
    <circle cx="86.5" cy="66" r="1.4" fill="white" />
    <circle cx="116.5" cy="66" r="1.4" fill="white" />

    <path d="M 100 73 Q 102 81 99 84" stroke={skinDark} strokeWidth="1.5" fill="none" strokeLinecap="round" />

    <path d="M 88 90 Q 100 96 112 90" stroke={eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />

    <ellipse cx="73" cy="80" rx="6" ry="3" fill="rgba(244, 114, 114, 0.18)" />
    <ellipse cx="127" cy="80" rx="6" ry="3" fill="rgba(244, 114, 114, 0.18)" />
  </>
);

// ==========================
// CABEZA LATERAL (perfil mirando a la izquierda)
// ==========================
const SideHead = () => (
  <>
    <line x1="100" y1="130" x2="100" y2="100" stroke={skin} strokeWidth="18" strokeLinecap="round" />

    <ellipse cx="100" cy="63" rx="40" ry="44" fill={skin} />

    <ellipse cx="118" cy="65" rx="4.5" ry="7" fill={skinDark} />
    <ellipse cx="118" cy="65" rx="2" ry="3.5" fill={skin} />

    <path
      d="M 62 56 Q 56 18 105 15 Q 145 22 140 60 Q 138 48 130 48 Q 120 50 110 56 Q 100 58 88 54 Q 72 50 64 55 Z"
      fill={hair}
    />

    <path d="M 73 55 Q 80 52 88 56" stroke={hairShade} strokeWidth="2.5" fill="none" strokeLinecap="round" />

    <ellipse cx="80" cy="62" rx="3.5" ry="4.5" fill={eyeColor} />
    <circle cx="78" cy="60" r="1.3" fill="white" />

    <path d="M 65 65 Q 56 71 65 78" stroke={skinDark} strokeWidth="2" fill="none" strokeLinecap="round" />

    <path d="M 67 88 Q 75 92 84 87" stroke={eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />

    <ellipse cx="74" cy="78" rx="5" ry="2.5" fill="rgba(244, 114, 114, 0.18)" />
  </>
);

// Helper: returns the class to apply based on state and which part this is
const classFor = (
  part: AnimationTarget,
  inTherapy: boolean,
  isAnimating: boolean,
  target: AnimationTarget,
  side: 'left' | 'right' = 'left'
): string => {
  if (!inTherapy) {
    return part === 'torso' ? 'idle-scale' : 'idle-rot-fast';
  }
  if (!isAnimating) return ''; // paused: static
  if (part !== target) return '';
  return side === 'right' ? 'active-therapy-right' : 'active-therapy-left';
};

// ==========================
// FRONT AVATAR (Vista Frontal)
// ==========================
const FrontAvatar = ({ inTherapy, isAnimating, target }: { inTherapy: boolean, isAnimating: boolean, target: AnimationTarget }) => {
  const headClass     = classFor('head',  inTherapy, isAnimating, target);
  const torsoClass    = classFor('torso', inTherapy, isAnimating, target);
  const leftArmClass  = classFor('arms',  inTherapy, isAnimating, target, 'left');
  const rightArmClass = classFor('arms',  inTherapy, isAnimating, target, 'right');

  return (
    <svg
      viewBox="-40 0 280 340"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
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
          <FrontHead />
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
const SideAvatar = ({ inTherapy, isAnimating }: { inTherapy: boolean, isAnimating: boolean }) => {
  // Side view collapses head/arms into the torso group, so any target except 'arms'
  // animates the torso group. The standalone arm/head are visual-only here.
  const torsoClass = !inTherapy
    ? 'idle-scale'
    : (isAnimating ? 'active-therapy-left' : '');

  return (
    <svg
      viewBox="-40 0 280 340"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
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

        <g className="matriz-svg" style={{ transformOrigin: '100px 120px' }}>
          <SideHead />
        </g>

        <g className="matriz-svg" style={{ transformOrigin: '100px 130px' }}>
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
const HandAvatar = ({ inTherapy, isAnimating }: { inTherapy: boolean, isAnimating: boolean }) => {
  const handClass = !inTherapy
    ? 'idle-rot-fast'
    : (isAnimating ? 'active-therapy-left' : '');

  return (
    <svg
      viewBox="-50 80 290 200"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
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
  isPlaying = false,
  level = 1,
  painLevel = 5,
}: {
  selectedZone?: string;
  isTherapyMode?: boolean;
  isPlaying?: boolean;
  level?: number;
  painLevel?: number;
}) {

  const isHandView = selectedZone === 'tunel';
  const isSideView = selectedZone === 'lumbar' || selectedZone === 'cadera';

  let currentVariant = 'idle';
  if (isTherapyMode) {
    const validVariants = ['cervical', 'hombro', 'lumbar', 'cadera', 'tunel'];
    currentVariant = validVariants.includes(selectedZone) ? selectedZone : 'idle';
  }

  const exercise = getTherapyExercise(selectedZone, level, painLevel);
  const inTherapy = isTherapyMode && currentVariant !== 'idle';
  const isAnimating = inTherapy && isPlaying;
  const target = exercise.animationProps.target;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <DynamicStyles
        keyframesLeft={exercise.animationProps.keyframesLeft}
        keyframesRight={exercise.animationProps.keyframesRight}
        duration={exercise.animationProps.duration}
      />
      {isHandView ? (
        <HandAvatar inTherapy={inTherapy} isAnimating={isAnimating} />
      ) : isSideView ? (
        <SideAvatar inTherapy={inTherapy} isAnimating={isAnimating} />
      ) : (
        <FrontAvatar inTherapy={inTherapy} isAnimating={isAnimating} target={target} />
      )}
    </div>
  );
}

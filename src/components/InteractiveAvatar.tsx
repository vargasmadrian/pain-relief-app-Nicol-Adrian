import { getTherapyExercise } from '../data/therapyExercises';
import type { Pose, JointName, ExerciseProp } from '../data/therapyExercises';

// =====================================================================
// COLORS
// =====================================================================
const skin = "#fcd5ce";
const skinDark = "#eabcc3";
const tshirt = "#7c3aed";
const tshirtDark = "#5b21b6";
const pants = "#1e293b";
const pantsDark = "#0f172a";
const shoes = "#f8fafc";
const hair = "#4a2e1e";
const hairShade = "#3d2817";
const eyeColor = "#1e293b";
const propFill = "#475569";
const propStroke = "#94a3b8";

// =====================================================================
// JOINT PIVOTS (in viewBox coords)
// =====================================================================
const PIVOTS: Record<JointName, string> = {
  body:          '100px 240px',
  spine:         '100px 240px',
  head:          '100px 130px',
  shoulderLeft:  '75px 132px',
  shoulderRight: '125px 132px',
  elbowLeft:     '65px 175px',
  elbowRight:    '135px 175px',
  hipLeft:       '87px 240px',
  hipRight:      '113px 240px',
  kneeLeft:      '85px 275px',
  kneeRight:     '115px 275px',
  hand:          '100px 180px',
};

// =====================================================================
// DYNAMIC STYLES — emit one @keyframes per joint that has a pose entry
// =====================================================================
const DynamicStyles = ({ poses, duration }: { poses: Pose, duration: string }) => {
  const ruleEntries = (Object.entries(poses) as [JointName, string][]).filter(([, kf]) => !!kf);
  const rules = ruleEntries
    .map(([joint, kf]) => `
      .pose-${joint} { animation: pose-${joint} ${duration} infinite ease-in-out; }
      @keyframes pose-${joint} { ${kf} }
    `)
    .join('');

  return (
    <style>{`
      .matriz-svg { transform-box: view-box; }

      /* Idle: gentle whole-body breathing only */
      .idle-body { animation: idle-breathe 5s infinite ease-in-out; }
      @keyframes idle-breathe {
        0%, 100% { transform: scale(1) translateY(0); }
        50% { transform: scaleY(1.02) translateY(-2px); }
      }
      .idle-head { animation: idle-head 6s infinite ease-in-out; }
      @keyframes idle-head {
        0%, 100% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
      }

      ${rules}
    `}</style>
  );
};

// =====================================================================
// HELPERS
// =====================================================================
const cls = (
  joint: JointName,
  poses: Pose,
  inTherapy: boolean,
  isAnimating: boolean,
): string => {
  if (!inTherapy) {
    if (joint === 'body') return 'idle-body';
    if (joint === 'head') return 'idle-head';
    return '';
  }
  if (!isAnimating) return '';
  return poses[joint] ? `pose-${joint}` : '';
};

// =====================================================================
// HEAD GRAPHICS
// =====================================================================
const FrontHead = () => (
  <>
    <line x1="100" y1="130" x2="100" y2="100" stroke={skin} strokeWidth="22" strokeLinecap="round" />
    <ellipse cx="58" cy="68" rx="4" ry="7" fill={skinDark} />
    <ellipse cx="142" cy="68" rx="4" ry="7" fill={skinDark} />
    <ellipse cx="100" cy="63" rx="42" ry="46" fill={skin} />
    <path d="M 60 60 Q 60 18 100 16 Q 140 18 140 60 Q 138 47 124 46 Q 110 48 100 56 Q 90 48 76 46 Q 62 47 60 60 Z" fill={hair} />
    <path d="M 60 60 Q 70 35 100 32 Q 100 50 100 56 Q 90 48 76 46 Q 62 47 60 60 Z" fill={hairShade} opacity="0.5" />
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

const SideHead = () => (
  <>
    <line x1="100" y1="130" x2="100" y2="100" stroke={skin} strokeWidth="18" strokeLinecap="round" />
    <ellipse cx="100" cy="63" rx="40" ry="44" fill={skin} />
    <ellipse cx="118" cy="65" rx="4.5" ry="7" fill={skinDark} />
    <ellipse cx="118" cy="65" rx="2" ry="3.5" fill={skin} />
    <path d="M 62 56 Q 56 18 105 15 Q 145 22 140 60 Q 138 48 130 48 Q 120 50 110 56 Q 100 58 88 54 Q 72 50 64 55 Z" fill={hair} />
    <path d="M 73 55 Q 80 52 88 56" stroke={hairShade} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <ellipse cx="80" cy="62" rx="3.5" ry="4.5" fill={eyeColor} />
    <circle cx="78" cy="60" r="1.3" fill="white" />
    <path d="M 65 65 Q 56 71 65 78" stroke={skinDark} strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 67 88 Q 75 92 84 87" stroke={eyeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <ellipse cx="74" cy="78" rx="5" ry="2.5" fill="rgba(244, 114, 114, 0.18)" />
  </>
);

// =====================================================================
// PROPS (objects the avatar interacts with)
// =====================================================================
const FrontProps = ({ prop }: { prop?: ExerciseProp }) => {
  if (prop === 'wall') {
    return (
      <g>
        <rect x="-18" y="80" width="12" height="180" rx="2" fill={propFill} stroke={propStroke} strokeWidth="1.5" />
        {[120, 160, 200, 240].map(y => <line key={`l${y}`} x1="-18" y1={y} x2="-6" y2={y} stroke={propStroke} strokeWidth="0.8" />)}
        <rect x="206" y="80" width="12" height="180" rx="2" fill={propFill} stroke={propStroke} strokeWidth="1.5" />
        {[120, 160, 200, 240].map(y => <line key={`r${y}`} x1="206" y1={y} x2="218" y2={y} stroke={propStroke} strokeWidth="0.8" />)}
      </g>
    );
  }
  if (prop === 'box') {
    return (
      <g>
        <rect x="60" y="295" width="80" height="35" rx="3" fill="#a16207" stroke="#854d0e" strokeWidth="2" />
        <line x1="60" y1="312" x2="140" y2="312" stroke="#854d0e" strokeWidth="1.5" />
        <line x1="100" y1="295" x2="100" y2="330" stroke="#854d0e" strokeWidth="1.5" />
      </g>
    );
  }
  if (prop === 'chair') {
    return (
      <g>
        <rect x="135" y="270" width="60" height="6" rx="1" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
        <line x1="138" y1="276" x2="138" y2="320" stroke="#475569" strokeWidth="3" />
        <line x1="192" y1="276" x2="192" y2="320" stroke="#475569" strokeWidth="3" />
        <line x1="195" y1="270" x2="195" y2="220" stroke="#475569" strokeWidth="3" />
      </g>
    );
  }
  return null;
};

const HandProps = ({ prop }: { prop?: ExerciseProp }) => {
  if (prop === 'wall') {
    return (
      <g>
        <rect x="170" y="100" width="14" height="170" rx="2" fill={propFill} stroke={propStroke} strokeWidth="1.5" />
        {[135, 170, 205, 240].map(y => <line key={`hw${y}`} x1="170" y1={y} x2="184" y2={y} stroke={propStroke} strokeWidth="0.8" />)}
      </g>
    );
  }
  if (prop === 'weight') {
    return (
      <g>
        <rect x="150" y="138" width="22" height="14" rx="2" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="148" y="135" width="4" height="20" fill="#334155" />
        <rect x="170" y="135" width="4" height="20" fill="#334155" />
      </g>
    );
  }
  return null;
};

// =====================================================================
// FRONT AVATAR (articulated)
// =====================================================================
const FrontAvatar = ({
  poses, inTherapy, isAnimating, prop,
}: { poses: Pose, inTherapy: boolean, isAnimating: boolean, prop?: ExerciseProp }) => {

  const C = (j: JointName) => cls(j, poses, inTherapy, isAnimating);

  return (
    <svg
      viewBox="-40 0 280 340"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      {inTherapy && <FrontProps prop={prop} />}

      <g className={`${C('body')} matriz-svg`} style={{ transformOrigin: PIVOTS.body }}>
        {/* LEGS — outside the spine group so they stay planted */}
        <g className={`${C('hipLeft')} matriz-svg`} style={{ transformOrigin: PIVOTS.hipLeft }}>
          <line x1="87" y1="240" x2="85" y2="275" stroke={pants} strokeWidth="20" strokeLinecap="round" />
          <g className={`${C('kneeLeft')} matriz-svg`} style={{ transformOrigin: PIVOTS.kneeLeft }}>
            <line x1="85" y1="275" x2="83" y2="310" stroke={pants} strokeWidth="20" strokeLinecap="round" />
            <rect x="70" y="305" width="25" height="15" rx="5" fill={shoes} />
          </g>
        </g>
        <g className={`${C('hipRight')} matriz-svg`} style={{ transformOrigin: PIVOTS.hipRight }}>
          <line x1="113" y1="240" x2="115" y2="275" stroke={pants} strokeWidth="20" strokeLinecap="round" />
          <g className={`${C('kneeRight')} matriz-svg`} style={{ transformOrigin: PIVOTS.kneeRight }}>
            <line x1="115" y1="275" x2="117" y2="310" stroke={pants} strokeWidth="20" strokeLinecap="round" />
            <rect x="105" y="305" width="25" height="15" rx="5" fill={shoes} />
          </g>
        </g>

        {/* SPINE GROUP — torso + head + arms (rotates from hip for forward bend) */}
        <g className={`${C('spine')} matriz-svg`} style={{ transformOrigin: PIVOTS.spine }}>
          {/* Torso */}
          <path d="M75 130 L125 130 L120 230 L80 230 Z" fill={tshirt} stroke={tshirt} strokeWidth="20" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="100" cy="160" r="15" fill="rgba(255,255,255,0.1)" />

          {/* Head */}
          <g className={`${C('head')} matriz-svg`} style={{ transformOrigin: PIVOTS.head }}>
            <FrontHead />
          </g>

          {/* Left arm chain */}
          <g className={`${C('shoulderLeft')} matriz-svg`} style={{ transformOrigin: PIVOTS.shoulderLeft }}>
            <line x1="75" y1="132" x2="65" y2="175" stroke={tshirt} strokeWidth="20" strokeLinecap="round" />
            <line x1="75" y1="132" x2="65" y2="175" stroke={skin} strokeWidth="14" strokeLinecap="round" />
            <line x1="75" y1="132" x2="68" y2="160" stroke={tshirtDark} strokeWidth="20" strokeLinecap="round" opacity="0.6" />
            <g className={`${C('elbowLeft')} matriz-svg`} style={{ transformOrigin: PIVOTS.elbowLeft }}>
              <line x1="65" y1="175" x2="55" y2="210" stroke={skin} strokeWidth="13" strokeLinecap="round" />
              <circle cx="55" cy="210" r="9" fill={skin} />
            </g>
          </g>

          {/* Right arm chain */}
          <g className={`${C('shoulderRight')} matriz-svg`} style={{ transformOrigin: PIVOTS.shoulderRight }}>
            <line x1="125" y1="132" x2="135" y2="175" stroke={tshirt} strokeWidth="20" strokeLinecap="round" />
            <line x1="125" y1="132" x2="135" y2="175" stroke={skin} strokeWidth="14" strokeLinecap="round" />
            <line x1="125" y1="132" x2="132" y2="160" stroke={tshirtDark} strokeWidth="20" strokeLinecap="round" opacity="0.6" />
            <g className={`${C('elbowRight')} matriz-svg`} style={{ transformOrigin: PIVOTS.elbowRight }}>
              <line x1="135" y1="175" x2="145" y2="210" stroke={skin} strokeWidth="13" strokeLinecap="round" />
              <circle cx="145" cy="210" r="9" fill={skin} />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

// =====================================================================
// SIDE AVATAR (articulated profile)
// =====================================================================
const SideAvatar = ({
  poses, inTherapy, isAnimating,
}: { poses: Pose, inTherapy: boolean, isAnimating: boolean }) => {

  const C = (j: JointName) => cls(j, poses, inTherapy, isAnimating);

  return (
    <svg
      viewBox="-40 0 280 340"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <g className={`${C('body')} matriz-svg`} style={{ transformOrigin: PIVOTS.body }}>
        {/* Back leg (slightly behind, darker pants) */}
        <g className={`${C('hipRight')} matriz-svg`} style={{ transformOrigin: '105px 240px' }}>
          <line x1="105" y1="240" x2="110" y2="275" stroke={pantsDark} strokeWidth="18" strokeLinecap="round" />
          <g className={`${C('kneeRight')} matriz-svg`} style={{ transformOrigin: '110px 275px' }}>
            <line x1="110" y1="275" x2="115" y2="310" stroke={pantsDark} strokeWidth="18" strokeLinecap="round" />
            <rect x="103" y="305" width="28" height="15" rx="5" fill={shoes} />
          </g>
        </g>
        {/* Front leg */}
        <g className={`${C('hipLeft')} matriz-svg`} style={{ transformOrigin: '95px 240px' }}>
          <line x1="95" y1="240" x2="85" y2="275" stroke={pants} strokeWidth="20" strokeLinecap="round" />
          <g className={`${C('kneeLeft')} matriz-svg`} style={{ transformOrigin: '85px 275px' }}>
            <line x1="85" y1="275" x2="80" y2="310" stroke={pants} strokeWidth="20" strokeLinecap="round" />
            <rect x="70" y="305" width="28" height="15" rx="5" fill={shoes} />
          </g>
        </g>

        {/* Spine + head + visible arm */}
        <g className={`${C('spine')} matriz-svg`} style={{ transformOrigin: PIVOTS.spine }}>
          <line x1="100" y1="230" x2="100" y2="130" stroke={tshirt} strokeWidth="35" strokeLinecap="round" />

          <g className={`${C('head')} matriz-svg`} style={{ transformOrigin: PIVOTS.head }}>
            <SideHead />
          </g>

          {/* Visible arm (front-side) */}
          <g className={`${C('shoulderLeft')} matriz-svg`} style={{ transformOrigin: '100px 132px' }}>
            <line x1="100" y1="132" x2="95" y2="175" stroke={tshirt} strokeWidth="22" strokeLinecap="round" />
            <line x1="100" y1="132" x2="95" y2="175" stroke={skin} strokeWidth="14" strokeLinecap="round" />
            <g className={`${C('elbowLeft')} matriz-svg`} style={{ transformOrigin: '95px 175px' }}>
              <line x1="95" y1="175" x2="90" y2="210" stroke={skin} strokeWidth="13" strokeLinecap="round" />
              <circle cx="90" cy="210" r="8" fill={skin} />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

// =====================================================================
// HAND AVATAR
// =====================================================================
const HandAvatar = ({
  poses, inTherapy, isAnimating, prop,
}: { poses: Pose, inTherapy: boolean, isAnimating: boolean, prop?: ExerciseProp }) => {

  const handClass = !inTherapy
    ? ''
    : (isAnimating && poses.hand ? 'pose-hand' : '');

  return (
    <svg
      viewBox="-50 80 290 200"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      {inTherapy && <HandProps prop={prop} />}
      <line x1="-30" y1="180" x2="40" y2="180" stroke={tshirt} strokeWidth="55" strokeLinecap="round" />
      <line x1="20" y1="180" x2="100" y2="180" stroke={skin} strokeWidth="40" strokeLinecap="round" />

      <g className={`${handClass} matriz-svg`} style={{ transformOrigin: PIVOTS.hand }}>
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

// =====================================================================
// CONTROLLER
// =====================================================================
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
  const poses: Pose = inTherapy ? exercise.animationProps.poses : {};
  const prop = exercise.animationProps.prop;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <DynamicStyles poses={poses} duration={exercise.animationProps.duration} />
      {isHandView ? (
        <HandAvatar poses={poses} inTherapy={inTherapy} isAnimating={isAnimating} prop={prop} />
      ) : isSideView ? (
        <SideAvatar poses={poses} inTherapy={inTherapy} isAnimating={isAnimating} />
      ) : (
        <FrontAvatar poses={poses} inTherapy={inTherapy} isAnimating={isAnimating} prop={prop} />
      )}
    </div>
  );
}

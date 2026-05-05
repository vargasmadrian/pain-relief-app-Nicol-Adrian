import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Pause, CheckCircle, ArrowLeft } from 'lucide-react';
import InteractiveAvatar from '../components/InteractiveAvatar';
import { getTherapyExercise } from '../data/therapyExercises';

export default function TherapySession() {
  const navigate = useNavigate();
  const { region, level } = useParams();
  
  const [painLevel, setPainLevel] = useState<number>(5);
  const [area, setArea] = useState<string>(region || 'lumbar');
  
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0); // in seconds
  const [totalTime, setTotalTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 1. Cargar datos de la sesión guardados en el Local/Session Storage
    const savedLevel = sessionStorage.getItem('painLevel');
    const pLevel = savedLevel ? parseInt(savedLevel, 10) : 5;
    setPainLevel(pLevel);

    const savedArea = sessionStorage.getItem('painLocation');
    if (savedArea) setArea(savedArea);

    // 2. Lógica de DOSIFICACIÓN inteligente según Explain Pain
    // Si el dolor es > 5 (Alto), la sesión debe ser CORTA (Ej. 3 min / 180s) para no disparar amenazas.
    // Si el dolor es <= 5 (Bajo/Medio), la sesión puede ser NORMAL (Ej. 7 min / 420s) para expandir capacidad.
    const sessionTime = pLevel > 5 ? 180 : 420;
    
    // Testing mode overrides:
    // const sessionTime = 10; 
    
    setTimeRemaining(sessionTime);
    setTotalTime(sessionTime);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getProgressPercent = () => {
    if (totalTime === 0) return 0;
    return ((totalTime - timeRemaining) / totalTime) * 100;
  };

  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [hospitalLockout, setHospitalLockout] = useState(false);

  const handleGlobalFinish = () => {
    if (quizAnswer === null) return;
    if (quizAnswer === 3) {
      setHospitalLockout(true);
      return;
    }

    const currentUnlocked = parseInt(sessionStorage.getItem('unlockedLevel') || '1');
    const thisLevel = parseInt(level || '1');
    if (thisLevel >= currentUnlocked && thisLevel < 10) {
      sessionStorage.setItem('unlockedLevel', (thisLevel + 1).toString());
    }
    navigate('/levels');
  };

  if (hospitalLockout) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-container">
        <div className="glass-panel" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(255, 60, 60, 0.15)', border: '1px solid var(--danger)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
             <h3 style={{ color: 'var(--danger)', margin: '0 0 1rem 0' }}>Atención Médica Requerida</h3>
             <p style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>
               Elegiste la opción de dolor extremo. Por seguridad de tu integridad física interrrumpimos la terapia. Es indispensable acudir a urgencias para descartar daño agudo severo.
             </p>
          </div>
          <button className="btn-secondary" onClick={() => navigate('/')} style={{ marginTop: '2rem', width: '100%' }}>
            Volver al inicio
          </button>
        </div>
      </motion.div>
    );
  }

  if (isFinished) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-container">
        <div className="glass-panel" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle size={48} color="var(--success)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ marginBottom: '0.5rem' }}>¡Nivel completado!</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>
            Para evaluar tu progreso neuro-físico, responde lo siguiente basándote en lo que acabas de hacer:
          </p>

          <div style={{ width: '100%', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
             <p style={{ textAlign: 'center', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
               ¿Cómo sentiste tus músculos y articulaciones en este nivel?
             </p>

             <button 
                onClick={() => setQuizAnswer(1)}
                className="btn-secondary"
                style={{ background: quizAnswer === 1 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)', textAlign: 'left', padding: '1rem' }}
             >
               <strong>A)</strong> Sentí tensión y rareza, pero entiendo que no significa daño tisular.
             </button>

             <button 
                onClick={() => setQuizAnswer(2)}
                className="btn-secondary"
                style={{ background: quizAnswer === 2 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)', textAlign: 'left', padding: '1rem' }}
             >
               <strong>B)</strong> Muy normal, casi no sentí ninguna limitación o alarma física.
             </button>

             <button 
                onClick={() => setQuizAnswer(3)}
                className="btn-secondary"
                style={{ background: quizAnswer === 3 ? 'var(--danger)' : 'rgba(255,255,255,0.05)', textAlign: 'left', padding: '1rem' }}
             >
               <strong>C)</strong> Sentí un dolor extremo de 10/10 completamente insoportable.
             </button>
          </div>

          <button 
            onClick={handleGlobalFinish} 
            disabled={quizAnswer === null}
            style={{ width: '100%', opacity: quizAnswer === null ? 0.5 : 1 }}
          >
            Guardar y Continuar
          </button>
        </div>
      </motion.div>
    );
  }

  const numericLevel = parseInt(level || '1');
  const sessionExercise = getTherapyExercise(area, numericLevel, painLevel);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="page-container"
    >
      <div className="glass-panel" style={{ padding: '1rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* HEADER MOOVI */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <button className="btn-secondary" onClick={() => navigate(-1)} style={{ padding: '0.5rem', border: 'none', background: 'transparent' }}>
            <ArrowLeft size={24} />
          </button>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <h3 style={{ textTransform: 'capitalize', margin: 0, fontSize: '1.2rem' }}>Nivel {level} - {area}</h3>
            <span style={{ color: 'var(--accent-primary)', fontSize: '0.8rem' }}>
              {painLevel > 5 ? 'Sesión suave' : 'Sesión activa'}
            </span>
          </div>
          <div style={{ width: 40 }} /> {/* Spacer */}
        </div>

        {/* --- AVATAR INTERACTIVO --- */}
        <div className="avatar-container" style={{ margin: '0 auto 0.5rem', height: '220px', width: '100%' }}>
          <InteractiveAvatar
            selectedZone={area}
            level={numericLevel}
            painLevel={painLevel}
            isTherapyMode={true}
            isPlaying={isActive}
          />
        </div>

        {/* FEEDBACK CLÍNICO (INSTRUCCIÓN) */}
        <div style={{ textAlign: 'center', marginBottom: '0.5rem', padding: '0 0.5rem' }}>
           <p style={{ 
               color: 'white', 
               fontSize: '0.95rem', 
               backgroundColor: 'rgba(255,255,255,0.05)', 
               padding: '0.75rem', 
               borderRadius: '12px',
               border: '1px solid rgba(255,255,255,0.1)',
               margin: 0
           }}>
             {sessionExercise.instruction}
           </p>
        </div>

        {/* CONTROLES Y TIMER */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginTop: 'auto', marginBottom: 'auto' }}>
          
          <div style={{ position: 'relative', width: '110px', height: '110px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Progress circle */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle 
                cx="55" cy="55" r="50" 
                fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6"
              />
              <circle 
                cx="55" cy="55" r="50" 
                fill="none" stroke="var(--accent-primary)" strokeWidth="6"
                strokeDasharray="314"
                strokeDashoffset={314 - (314 * getProgressPercent()) / 100}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
                strokeLinecap="round"
              />
            </svg>
            
            <div style={{ fontSize: '1.8rem', fontWeight: 300, color: 'white', zIndex: 1, fontFamily: 'monospace' }}>
              {formatTime(timeRemaining)}
            </div>
          </div>

          <button 
            onClick={toggleTimer}
            className={isActive ? 'btn-secondary' : 'btn-primary'}
            style={{ 
              width: '64px', height: '64px', borderRadius: '50%',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              padding: 0, boxShadow: isActive ? 'none' : '0 4px 14px 0 var(--accent-glow)'
            }}
          >
            {isActive ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '4px' }} />}
          </button>
        </div>

        <button 
           onClick={() => { setIsFinished(true); setTimeRemaining(0); setIsActive(false); }}
           className="btn-secondary"
           style={{ margin: '0.5rem auto 0', background: 'transparent', border: 'none', opacity: 0.6, fontSize: '0.8rem', textDecoration: 'underline' }}
        >
          Saltar sesión (Pruebas)
        </button>

      </div>
    </motion.div>
  );
}

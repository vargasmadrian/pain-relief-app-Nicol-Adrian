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
  const [finalPain, setFinalPain] = useState(painLevel);

  useEffect(() => {
    // 1. Cargar datos de la sesión guardados en el Local/Session Storage
    const savedLevel = sessionStorage.getItem('painLevel');
    const pLevel = savedLevel ? parseInt(savedLevel, 10) : 5;
    setPainLevel(pLevel);
    setFinalPain(pLevel);

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

  const handleGlobalFinish = () => {
    const currentUnlocked = parseInt(sessionStorage.getItem('unlockedLevel') || '1');
    const thisLevel = parseInt(level || '1');
    if (thisLevel >= currentUnlocked && thisLevel < 10) {
      sessionStorage.setItem('unlockedLevel', (thisLevel + 1).toString());
    }
    navigate('/levels');
  };

  if (isFinished) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-container">
        <div className="glass-panel" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle size={64} color="var(--success)" style={{ marginBottom: '1.5rem' }} />
          <h2>¡Excelente trabajo!</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
            El movimiento suave le ha dicho a tu cerebro que esta zona es segura.
          </p>

          <div style={{ width: '100%', marginBottom: '2rem' }}>
             <p style={{ textAlign: 'center', color: 'white' }}>¿Cómo te sientes ahora? (EVA)</p>
             <input 
                type="range" 
                min="1" 
                max="10" 
                value={finalPain}
                onChange={(e) => setFinalPain(parseInt(e.target.value))}
                className="pain-slider"
                style={{ 
                  background: `linear-gradient(to right, var(--success) 0%, var(--warning) 50%, var(--danger) 100%)`,
                  marginTop: '1rem'
                }}
              />
              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {finalPain} / 10
              </div>
          </div>

          <button onClick={handleGlobalFinish} style={{ width: '100%' }}>
            Finalizar Sesión
          </button>
        </div>
      </motion.div>
    );
  }

  const numericLevel = parseInt(level || '1');
  const sessionExercise = getTherapyExercise(area, numericLevel);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="page-container"
    >
      <div className="glass-panel" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <button className="btn-secondary" onClick={() => navigate(-1)} style={{ alignSelf: 'flex-start', padding: '0.5rem', marginBottom: '1rem', border: 'none' }}>
            <ArrowLeft size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <h2 style={{ textTransform: 'capitalize' }}>Nivel {level} - {area}</h2>
          <p style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>
            {painLevel > 5 ? 'Sesión suave y reducida. Imita a "Moovi" sin excederte.' : 'Sesión activa. Sigue el ritmo del entrenador virtual.'}
          </p>
        </div>

        {/* --- AVATAR INTERACTIVO --- */}
        <div className="avatar-container" style={{ margin: '0 auto 1.5rem', height: '320px', width: '100%' }}>
          <InteractiveAvatar 
            selectedZone={area} 
            level={parseInt(level || '1')}
            isTherapyMode={true}
          />
        </div>

        {/* FEEDBACK CLÍNICO (INSTRUCCIÓN) */}
        <div style={{ textAlign: 'center', marginBottom: '1rem', padding: '0 1rem' }}>
           <p style={{ 
               color: 'white', 
               fontSize: '1.2rem', 
               backgroundColor: 'rgba(255,255,255,0.05)', 
               padding: '1rem', 
               borderRadius: '12px',
               border: '1px solid rgba(255,255,255,0.1)'
           }}>
             {sessionExercise.instruction}
           </p>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          
          <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Progress circle */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle 
                cx="100" cy="100" r="90" 
                fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"
              />
              <circle 
                cx="100" cy="100" r="90" 
                fill="none" stroke="var(--accent-primary)" strokeWidth="8"
                strokeDasharray="565"
                strokeDashoffset={565 - (565 * getProgressPercent()) / 100}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
                strokeLinecap="round"
              />
            </svg>
            
            <div style={{ fontSize: '3rem', fontWeight: 300, color: 'white', zIndex: 1, fontFamily: 'monospace' }}>
              {formatTime(timeRemaining)}
            </div>
          </div>

          <button 
            onClick={toggleTimer}
            className={isActive ? 'btn-secondary' : ''}
            style={{ 
              marginTop: '3rem', 
              width: '80px', height: '80px', borderRadius: '50%',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              padding: 0
            }}
          >
            {isActive ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
          </button>
          
          <button 
             onClick={() => { setIsFinished(true); setTimeRemaining(0); setIsActive(false); }}
             className="btn-secondary"
             style={{ marginTop: '1.5rem', background: 'transparent', border: 'none', opacity: 0.7, textDecoration: 'underline' }}
          >
            Saltar sesión (Pruebas)
          </button>
        </div>

      </div>
    </motion.div>
  );
}

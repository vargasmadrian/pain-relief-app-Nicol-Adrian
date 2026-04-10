import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Lock, Unlock, ArrowLeft, AlertCircle } from 'lucide-react';

const REGION_MOVEMENTS: Record<string, { id: string, name: string }[]> = {
  lumbar: [
    { id: 'flexion', name: 'Al agacharme hacia el piso' },
    { id: 'extension', name: 'Al estirarme hacia atrás' },
    { id: 'lateral', name: 'Al inclinarme a los lados' },
    { id: 'rotacion', name: 'Al rotar o girar el tronco' }
  ],
  cervical: [
    { id: 'flexion', name: 'Al bajar barbilla al pecho' },
    { id: 'extension', name: 'Al mirar hacia el techo' },
    { id: 'lateral', name: 'Al acercar la oreja al hombro' },
    { id: 'rotacion', name: 'Al mirar por encima del hombro' }
  ],
  hombro: [
    { id: 'flexion', name: 'Al levantar el brazo al frente' },
    { id: 'abduccion', name: 'Al levantar el brazo a un lado' },
    { id: 'rotacion', name: 'Al intentar rascarme la espalda' }
  ],
  cadera: [
    { id: 'flexion', name: 'Al llevar la rodilla al pecho' },
    { id: 'extension', name: 'Al patear o caminar largo' },
    { id: 'rotacion', name: 'Al cruzar o separar las piernas' }
  ],
  tunel: [
    { id: 'flexion', name: 'Al doblar la muñeca abajo' },
    { id: 'extension', name: 'Al empujar / postura de freno' },
    { id: 'rotacion', name: 'Al desenroscar botellas' }
  ]
};

export default function LevelSelect() {
  const navigate = useNavigate();
  const currentLevel = parseInt(sessionStorage.getItem('unlockedLevel') || '1');
  const region = sessionStorage.getItem('painLocation') || 'lumbar';
  
  const [showSurvey, setShowSurvey] = useState(false);

  useEffect(() => {
    const hasSurvey = sessionStorage.getItem(`survey_${region}`);
    if (!hasSurvey) {
      setShowSurvey(true);
    }
  }, [region]);

  const handleSurveyAnswer = (movementId: string) => {
    sessionStorage.setItem(`survey_${region}`, movementId);
    setShowSurvey(false);
  };

  const levels = Array.from({ length: 10 }, (_, i) => i + 1);
  const regionObj = REGION_MOVEMENTS[region] || REGION_MOVEMENTS['lumbar'];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="page-container"
    >
      <div className="glass-panel" style={{ padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        <button className="btn-secondary" onClick={() => navigate('/')} style={{ alignSelf: 'flex-start', padding: '0.5rem', marginBottom: '1rem', border: 'none' }}>
            <ArrowLeft size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <Map size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ textTransform: 'capitalize' }}>Ruta Clínica</h1>
          <p style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Zona: {region}</p>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {levels.map(level => {
            const isUnlocked = level <= currentLevel;
            const isNext = level === currentLevel;

            return (
              <button
                key={level}
                onClick={() => isUnlocked && navigate(`/education/${region}/${level}`)}
                className={isUnlocked ? '' : 'btn-secondary'}
                disabled={!isUnlocked}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.2rem',
                  background: isNext ? 'var(--accent-primary)' : isUnlocked ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.2)',
                  opacity: isUnlocked ? 1 : 0.6,
                  textAlign: 'left'
                }}
              >
                <div>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: isNext ? 'white' : isUnlocked ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    Nivel {level}
                  </span>
                  <div style={{ fontSize: '0.8rem', color: isNext ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)' }}>
                    {isUnlocked ? 'Terapia y Movilidad' : 'Bloqueado'}
                  </div>
                </div>
                {isUnlocked ? <Unlock size={24} color={isNext ? 'white' : 'var(--accent-primary)'} /> : <Lock size={24} />}
              </button>
            )
          })}
        </div>

        {/* ENCUESTA PREVIA (MODAL) */}
        <AnimatePresence>
          {showSurvey && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(8px)',
                zIndex: 100, display: 'flex', flexDirection: 'column',
                padding: '2rem', justifyContent: 'center', alignItems: 'center'
              }}
            >
              <AlertCircle size={64} color="var(--warning)" style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Personalizando Terapia</h2>
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Para fabricar tus 10 niveles y tratarte efectivamente, ¿qué movimiento específico te asusta o te duele más realizar?
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                {regionObj.map((mov) => (
                  <button 
                     key={mov.id} 
                     className="btn-secondary"
                     onClick={() => handleSurveyAnswer(mov.id)}
                     style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'center', padding: '1.2rem' }}
                  >
                    {mov.name}
                  </button>
                ))}
                <button 
                   className="btn-secondary"
                   onClick={() => handleSurveyAnswer('none')}
                   style={{ background: 'transparent', textAlign: 'center', marginTop: '1rem', border: 'none', textDecoration: 'underline' }}
                >
                  Ninguno en especial / No estoy seguro
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}

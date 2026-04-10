import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Lock, Unlock, ArrowLeft } from 'lucide-react';

export default function LevelSelect() {
  const navigate = useNavigate();
  // En una app real, leeriamos esto desde localStorage para persistencia
  const currentLevel = parseInt(sessionStorage.getItem('unlockedLevel') || '1');
  const region = sessionStorage.getItem('painLocation') || 'lumbar';

  // 10 Niveles de terapia
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="page-container"
    >
      <div className="glass-panel" style={{ padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <button className="btn-secondary" onClick={() => navigate('/')} style={{ alignSelf: 'flex-start', padding: '0.5rem', marginBottom: '1rem', border: 'none' }}>
            <ArrowLeft size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Map size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ textTransform: 'capitalize' }}>Ruta de Recuperación</h1>
          <p style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Zona: {region}</p>
          <p>La educación física y mental es la clave para la bioplasticidad de tus nervios.</p>
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
                    {isUnlocked ? 'Conceptos y Movilidad' : 'Bloqueado'}
                  </div>
                </div>
                {isUnlocked ? <Unlock size={24} color={isNext ? 'white' : 'var(--accent-primary)'} /> : <Lock size={24} />}
              </button>
            )
          })}
        </div>

      </div>
    </motion.div>
  );
}

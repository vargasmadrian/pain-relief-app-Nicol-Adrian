import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveAvatar from '../components/InteractiveAvatar';
import { Activity, ArrowRight } from 'lucide-react';

const BODY_PARTS = [
  { id: 'lumbar', name: 'Lumbar' },
  { id: 'cervical', name: 'Cervical' },
  { id: 'hombro', name: 'Hombro' },
  { id: 'cadera', name: 'Cadera' },
  { id: 'tunel', name: 'Muñeca' }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [painLevel, setPainLevel] = useState(5);
  const [selectedPart, setSelectedPart] = useState('');

  // Calculate color based on pain level: 1 = green, 5 = yellow, 10 = red
  const getPainColor = (level: number) => {
    if (level <= 3) return 'var(--success)';
    if (level <= 6) return 'var(--warning)';
    return 'var(--danger)';
  };

  const handleContinue = () => {
    if (!selectedPart) return;
    // Store in localStorage or state management in real app
    sessionStorage.setItem('painLevel', painLevel.toString());
    sessionStorage.setItem('painLocation', selectedPart);
    // Initialize save state if missing
    if (!sessionStorage.getItem('unlockedLevel')) sessionStorage.setItem('unlockedLevel', '1');
    navigate('/levels');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="page-container"
    >
      <div className="glass-panel" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="avatar-area" style={{ height: '350px' }}>
          <InteractiveAvatar selectedZone={selectedPart} painLevel={painLevel} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Activity size={28} color="var(--accent-primary)" />
          <h1 style={{ marginBottom: 0 }}>MoovIA</h1>
        </div>
        
        <h2 style={{ marginBottom: '0.5rem' }}>¿Dónde sientes molestia hoy?</h2>
        <p>Selecciona la zona para personalizar tu terapia.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
          {BODY_PARTS.map(part => (
            <button
              key={part.id}
              onClick={() => setSelectedPart(part.id)}
              className={selectedPart === part.id ? '' : 'btn-secondary'}
              style={{
                background: selectedPart === part.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                boxShadow: selectedPart === part.id ? '0 4px 14px 0 var(--accent-glow)' : 'none',
              }}
            >
              {part.name}
            </button>
          ))}
        </div>

        {selectedPart && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: '2rem' }}
          >
            <h2>¿Qué tanto te molesta?</h2>
            <p>Escala del 1 al 10 (EVA)</p>
            
            <div style={{ margin: '2rem 0', position: 'relative' }}>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={painLevel}
                onChange={(e) => setPainLevel(parseInt(e.target.value))}
                className="pain-slider"
                style={{ 
                  background: `linear-gradient(to right, var(--success) 0%, var(--warning) 50%, var(--danger) 100%)`,
                  color: getPainColor(painLevel) 
                }}
              />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '1rem',
                color: 'var(--text-secondary)',
                fontWeight: 500
              }}>
                <span>Leve (1)</span>
                <span style={{ 
                  color: getPainColor(painLevel), 
                  fontSize: '1.5rem', 
                  fontWeight: 700 
                }}>
                  {painLevel}
                </span>
                <span>Insoportable (10)</span>
              </div>
            </div>
          </motion.div>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            disabled={!selectedPart} 
            onClick={handleContinue}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', justifyContent: 'center' }}
          >
            Continuar
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

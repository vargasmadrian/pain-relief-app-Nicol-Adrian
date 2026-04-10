import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Brain, AlertTriangle, RefreshCcw, Heart, Info, BookOpen } from 'lucide-react';
import { PAIN_BANK, type PainNugget } from '../data/painBank';

const getIcon = (id: string, color: string) => {
  // Simple icon mapping fallback
  if (id.includes('n1-')) return <Brain size={40} color={color} />;
  if (id.includes('n2-')) return <AlertTriangle size={40} color={color} />;
  if (id.includes('n3-') || id.includes('n9-')) return <Heart size={40} color={color} />;
  if (id.includes('n4-')) return <RefreshCcw size={40} color={color} />;
  return <Info size={40} color={color} />;
};

export default function Education() {
  const navigate = useNavigate();
  const { region, level } = useParams();
  
  const [nuggets, setNuggets] = useState<PainNugget[]>([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const lvl = parseInt(level || '1');
    const rgn = region || 'all';

    // Filter nuggets for this level and region (or 'all')
    const filtered = PAIN_BANK.filter(n => 
      n.level === lvl && (n.regions.includes('all') || n.regions.includes(rgn))
    );

    // Si por casualidad el nivel está vacío (ej. desarrollamos mas info despues), fallback:
    if (filtered.length === 0) {
      setNuggets([
        {
          id: 'fallback', level: lvl, regions: ['all'],
          title: `Nivel ${lvl}`,
          shortIdea: 'Continuemos avanzando con la rutina terapéutica.',
          bookQuote: '«El movimiento seguro es la clave principal de la recuperación a largo plazo.»',
          bookSource: 'Explain Pain'
        }
      ]);
    } else {
      setNuggets(filtered);
    }
  }, [region, level]);

  const nextStep = () => {
    if (step < nuggets.length - 1) {
      setStep(step + 1);
    } else {
      navigate(`/therapy/${region}/${level}`);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigate('/levels');
    }
  };

  if (nuggets.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="page-container"
    >
      <div className="glass-panel" style={{ padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          {nuggets.map((_, i) => (
            <div 
              key={i} 
              style={{
                height: '4px',
                flex: 1,
                margin: '0 4px',
                borderRadius: '2px',
                background: i <= step ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '1.2rem',
                borderRadius: '2rem',
                marginBottom: '1rem',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.1)'
              }}>
                {getIcon(nuggets[step].id, 'var(--accent-primary)')}
              </div>
              
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'white', lineHeight: 1.2, textAlign: 'center' }}>
                {nuggets[step].title}
              </h2>
              
              <p style={{ 
                fontSize: '1.15rem', 
                fontWeight: 500,
                lineHeight: 1.5, 
                color: 'var(--text-primary)', 
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                {nuggets[step].shortIdea}
              </p>

              <div style={{
                background: 'rgba(0, 0, 0, 0.2)',
                borderLeft: '4px solid var(--accent-primary)',
                padding: '1.2rem',
                borderRadius: '0 12px 12px 0',
                width: '100%',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', opacity: 0.6 }}>
                  <BookOpen size={16} color="var(--accent-primary)" />
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-primary)' }}>Extracto Clínico</span>
                </div>
                
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                  marginBottom: '0.8rem'
                }}>
                  {nuggets[step].bookQuote}
                </p>
                
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-hover)', fontWeight: 600 }}>
                  — {nuggets[step].bookSource}
                </span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <button className="btn-secondary" onClick={prevStep} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8em 1.2em' }}>
            <ArrowLeft size={18} />
            {step === 0 ? 'Niveles' : 'Atrás'}
          </button>
          <button onClick={nextStep} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8em 1.2em', flex: 1, marginLeft: '1rem', justifyContent: 'center' }}>
            {step === nuggets.length - 1 ? 'Iniciar Terapia' : 'Siguiente'}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

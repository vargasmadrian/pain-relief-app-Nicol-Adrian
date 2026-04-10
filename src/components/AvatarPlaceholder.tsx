import { motion } from 'framer-motion';

export default function AvatarPlaceholder() {
  return (
    <div style={{
      width: '100%', height: '100%', 
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
        Placeholder
      </motion.div>
    </div>
  );
}

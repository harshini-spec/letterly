import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const floatingItems = [
  { emoji: '💌', delay: 0, x: '10%', y: '20%', size: 32 },
  { emoji: '🌸', delay: 0.5, x: '80%', y: '15%', size: 28 },
  { emoji: '✨', delay: 1, x: '15%', y: '70%', size: 24 },
  { emoji: '🕊️', delay: 1.5, x: '85%', y: '65%', size: 30 },
  { emoji: '🌹', delay: 0.8, x: '70%', y: '80%', size: 26 },
  { emoji: '💐', delay: 1.2, x: '25%', y: '85%', size: 28 },
  { emoji: '🦋', delay: 0.3, x: '90%', y: '40%', size: 24 },
  { emoji: '🍃', delay: 1.8, x: '5%', y: '45%', size: 22 },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{ background: 'linear-gradient(160deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)' }}>

      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{ left: item.x, top: item.y, fontSize: item.size }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.6, 0.4, 0.6],
            y: [20, -10, 0, -10],
          }}
          transition={{
            delay: item.delay,
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <motion.div
        className="text-center max-w-2xl z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        >
          <span className="text-6xl">💌</span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-semibold mb-4 tracking-tight"
          style={{ color: 'var(--text-primary)', fontFamily: "'Cormorant Garamond', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Letterly
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-2 font-light"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Beautiful digital letters for the people you love
        </motion.p>

        <motion.p
          className="text-sm md:text-base mb-10"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          Write, decorate, and share heartfelt letters with stunning themes,
          cute decorations, and virtual gifts.
        </motion.p>

        <motion.button
          onClick={() => navigate('/create')}
          className="px-8 py-4 rounded-full text-white font-medium text-base md:text-lg cursor-pointer"
          style={{
            background: `linear-gradient(135deg, var(--accent), var(--accent-dark))`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(0,0,0,0.18)' }}
          whileTap={{ scale: 0.97 }}
        >
          Write a Letter
        </motion.button>

        <motion.div
          className="mt-16 flex items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          {[
            { label: 'Beautiful Themes', icon: '🎨' },
            { label: 'Virtual Gifts', icon: '🎁' },
            { label: 'Magic Envelope', icon: '✉️' },
          ].map((feature) => (
            <div key={feature.label} className="text-center">
              <div className="text-2xl mb-1">{feature.icon}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {feature.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 text-xs"
        style={{ color: 'var(--text-muted)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Made with love
      </motion.div>
    </div>
  )
}

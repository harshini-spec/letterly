import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const floatingItems = [
  { emoji: '✉️', delay: 0.5, x: '8%', y: '25%', size: 20 },
  { emoji: '🌸', delay: 1.2, x: '88%', y: '18%', size: 18 },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
      style={{ background: 'linear-gradient(170deg, #fdf8f4 0%, #f5ede4 40%, #faf5ef 100%)' }}
    >
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{ left: item.x, top: item.y, fontSize: item.size }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0.12, 0.2] }}
          transition={{
            delay: item.delay,
            duration: 6,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <motion.div
        className="text-center max-w-xl z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-4xl md:text-[3.5rem] font-semibold leading-tight tracking-tight"
          style={{ color: '#2a2220', fontFamily: "'Cormorant Garamond', serif" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Write something{' '}
          <span style={{ color: '#b85c6a', fontStyle: 'italic' }}>they&rsquo;ll never forget</span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg mt-5 mb-10 font-light tracking-wide"
          style={{ color: '#8a7d76' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          Write. Decorate. Send love.
        </motion.p>

        <motion.button
          onClick={() => navigate('/create')}
          className="px-10 py-4 rounded-full text-white font-semibold text-base md:text-lg cursor-pointer border-0"
          style={{
            background: '#b8444e',
            boxShadow: '0 6px 24px rgba(184, 68, 78, 0.35), 0 2px 8px rgba(0,0,0,0.08)',
            letterSpacing: '0.02em',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          whileHover={{ scale: 1.04, boxShadow: '0 10px 32px rgba(184, 68, 78, 0.4), 0 4px 12px rgba(0,0,0,0.1)' }}
          whileTap={{ scale: 0.97 }}
        >
          Start Your Letter
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute bottom-8 text-[11px] tracking-widest uppercase"
        style={{ color: '#c4b8b0' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Letterly
      </motion.div>
    </div>
  )
}

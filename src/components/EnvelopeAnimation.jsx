import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EnvelopeAnimation({ recipientName, onOpen }) {
  const [isOpening, setIsOpening] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  const handleClick = () => {
    if (isOpening || isOpened) return
    setIsOpening(true)
    setTimeout(() => {
      setIsOpened(true)
      setTimeout(() => onOpen?.(), 600)
    }, 1200)
  }

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-50 px-4"
          style={{ background: 'linear-gradient(160deg, var(--bg-primary), var(--bg-secondary))' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FloatingPetals />

          <motion.p
            className="text-sm mb-8 tracking-widest uppercase"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            You have a letter
          </motion.p>

          <motion.div
            className="cursor-pointer select-none"
            onClick={handleClick}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            whileHover={!isOpening ? { scale: 1.05 } : {}}
            whileTap={!isOpening ? { scale: 0.98 } : {}}
          >
            <div className="relative" style={{ width: 280, height: 200 }}>
              {/* Envelope body */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(145deg, #fdf6f0, #f5ebe0)',
                  border: '2px solid var(--border)',
                  boxShadow: 'var(--shadow-medium)',
                }}
              />

              {/* Envelope bottom fold (V shape) */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: '60%',
                  background: 'linear-gradient(to bottom, transparent 0%, #f5ebe0 100%)',
                  clipPath: 'polygon(0 0, 50% 70%, 100% 0, 100% 100%, 0 100%)',
                  borderRadius: '0 0 12px 12px',
                  zIndex: 2,
                }}
              />

              {/* Letter peeking out */}
              <motion.div
                className="absolute left-4 right-4 rounded-t-lg"
                style={{
                  background: 'white',
                  border: '1px solid var(--border)',
                  top: isOpening ? -60 : 20,
                  height: 140,
                  zIndex: isOpening ? 5 : 1,
                }}
                animate={isOpening ? { top: -80, scale: 1.02 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="p-4">
                  <div className="w-20 h-1.5 rounded-full mb-2" style={{ background: 'var(--border)' }} />
                  <div className="w-32 h-1.5 rounded-full mb-2" style={{ background: 'var(--border)' }} />
                  <div className="w-24 h-1.5 rounded-full" style={{ background: 'var(--border)' }} />
                </div>
              </motion.div>

              {/* Envelope flap (triangle) */}
              <motion.div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: '55%',
                  background: 'linear-gradient(180deg, #fdf6f0, #f0e4d8)',
                  clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                  borderRadius: '12px 12px 0 0',
                  transformOrigin: 'top center',
                  zIndex: 3,
                  borderTop: '2px solid var(--border)',
                }}
                animate={isOpening ? { rotateX: 180, opacity: 0 } : {}}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />

              {/* Wax seal */}
              <motion.div
                className="absolute flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
                  left: '50%',
                  top: '45%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 4,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
                animate={isOpening ? { scale: 0, opacity: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <span className="text-white text-lg">♥</span>
              </motion.div>
            </div>
          </motion.div>

          {recipientName && (
            <motion.p
              className="mt-6 text-xl"
              style={{ fontFamily: "'Caveat', cursive", color: 'var(--text-secondary)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              For {recipientName}
            </motion.p>
          )}

          {!isOpening && (
            <motion.p
              className="mt-4 text-xs"
              style={{ color: 'var(--text-muted)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0.4, 0.7] }}
              transition={{ delay: 1, duration: 2, repeat: Infinity }}
            >
              Tap to open
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function FloatingPetals() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    emoji: ['🌸', '🩷', '✨', '🪻', '🌷', '💮'][i % 6],
    startX: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 6 + Math.random() * 4,
    size: 14 + Math.random() * 12,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.startX}%`,
            top: '-5%',
            fontSize: petal.size,
            opacity: 0.4,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(petal.id) * 60],
            rotate: [0, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {petal.emoji}
        </motion.div>
      ))}
    </div>
  )
}

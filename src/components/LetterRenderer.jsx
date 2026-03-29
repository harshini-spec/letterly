import { motion } from 'framer-motion'
import { fonts } from '../data/themes'

export default function LetterRenderer({ letter, className = '' }) {
  const fontConfig = fonts.find((f) => f.id === letter.font) || fonts[0]

  return (
    <motion.div
      className={`relative mx-auto max-w-2xl ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative rounded-2xl p-8 md:p-12 min-h-[400px]"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-medium)',
        }}
      >
        {/* Decorations */}
        {letter.decorations?.map((dec, i) => (
          <div
            key={i}
            className={`absolute pointer-events-none select-none animate-${dec.animation || 'float'}`}
            style={{
              left: `${dec.x}%`,
              top: `${dec.y}%`,
              fontSize: (dec.scale || 1) * 28,
              transform: `rotate(${dec.rotation || 0}deg)`,
              zIndex: 1,
            }}
          >
            {dec.emoji}
          </div>
        ))}

        {/* Letter header */}
        {letter.recipientName && (
          <motion.p
            className="text-lg mb-6"
            style={{
              fontFamily: fontConfig.family,
              color: 'var(--text-secondary)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Dear {letter.recipientName},
          </motion.p>
        )}

        {/* Letter content */}
        <motion.div
          className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap relative z-10"
          style={{
            fontFamily: fontConfig.family,
            color: 'var(--text-primary)',
            lineHeight: 1.8,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {letter.content}
        </motion.div>

        {/* Sender sign-off */}
        {letter.senderName && (
          <motion.div
            className="mt-10 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p
              className="text-base"
              style={{
                fontFamily: fontConfig.family,
                color: 'var(--text-secondary)',
              }}
            >
              With love,
            </p>
            <p
              className="text-xl mt-1"
              style={{
                fontFamily: "'Caveat', cursive",
                color: 'var(--accent-dark)',
              }}
            >
              {letter.senderName}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

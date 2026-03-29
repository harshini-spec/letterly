import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reactions = [
  { id: 'hearts', emoji: '❤️', label: 'Love', particles: ['❤️', '💕', '💗', '💖', '💘'] },
  { id: 'smile', emoji: '😊', label: 'Smile', particles: ['😊', '😄', '🥰', '☺️', '😍'] },
  { id: 'tears', emoji: '🥹', label: 'Touched', particles: ['🥹', '😢', '💧', '🥺', '💙'] },
  { id: 'hug', emoji: '🤗', label: 'Hug', particles: ['🤗', '🫂', '💛', '🧸', '🌟'] },
  { id: 'clap', emoji: '👏', label: 'Amazing', particles: ['👏', '🎉', '✨', '🌟', '💫'] },
]

export default function ReactionBar({ onReply }) {
  const [selected, setSelected] = useState(null)
  const [particles, setParticles] = useState([])

  const handleReaction = (reaction) => {
    setSelected(reaction.id)

    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      emoji: reaction.particles[i % reaction.particles.length],
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
    }))
    setParticles(newParticles)

    setTimeout(() => setParticles([]), 3000)
  }

  return (
    <div className="mt-12 text-center relative">
      {/* Particle explosion */}
      <AnimatePresence>
        {particles.length > 0 && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute text-2xl"
                style={{ left: `${p.x}%`, bottom: '30%' }}
                initial={{ opacity: 1, y: 0, scale: 0 }}
                animate={{
                  opacity: [1, 1, 0],
                  y: -300 - Math.random() * 300,
                  x: (Math.random() - 0.5) * 200,
                  scale: [0, 1.2, 0.8],
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 + Math.random(), delay: p.delay, ease: 'easeOut' }}
              >
                {p.emoji}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
        How did this letter make you feel?
      </p>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        {reactions.map((reaction) => (
          <motion.button
            key={reaction.id}
            onClick={() => handleReaction(reaction)}
            className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl cursor-pointer border-0"
            style={{
              background: selected === reaction.id ? 'var(--accent-light)' : 'var(--bg-secondary)',
              border: selected === reaction.id
                ? '2px solid var(--accent)'
                : '2px solid transparent',
            }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">{reaction.emoji}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {reaction.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Reply CTA */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={onReply}
          className="px-6 py-3 rounded-full text-sm font-medium cursor-pointer"
          style={{
            background: 'transparent',
            color: 'var(--accent-dark)',
            border: '2px solid var(--accent)',
          }}
          whileHover={{
            scale: 1.05,
            background: 'var(--accent-light)',
          }}
          whileTap={{ scale: 0.97 }}
        >
          Write a Reply ✍️
        </motion.button>
      </motion.div>
    </div>
  )
}

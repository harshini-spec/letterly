import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { giftFlowers, giftPlushies, giftChocolates, chocolateBoxStyles } from '../data/decorations'

function GiftBox({ label, emoji, onUnwrap, isUnwrapped, children }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <AnimatePresence mode="wait">
        {!isUnwrapped ? (
          <motion.button
            key="wrapped"
            onClick={onUnwrap}
            className="relative cursor-pointer border-0 bg-transparent p-0"
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div
              className="w-28 h-28 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--accent-light), var(--bg-secondary))',
                border: '2px solid var(--border)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <span className="text-4xl">🎁</span>
              {/* Ribbon */}
              <div
                className="absolute top-0 left-1/2 w-3 h-full -translate-x-1/2"
                style={{ background: 'var(--accent)', opacity: 0.4 }}
              />
              <div
                className="absolute top-1/2 left-0 w-full h-3 -translate-y-1/2"
                style={{ background: 'var(--accent)', opacity: 0.4 }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              Tap to unwrap
            </p>
          </motion.button>
        ) : (
          <motion.div
            key="unwrapped"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <p className="text-sm mt-2 font-medium" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
    </motion.div>
  )
}

function BouquetReveal({ bouquet }) {
  const flowers = bouquet.flowers.map(
    (fId) => giftFlowers.find((f) => f.id === fId) || giftFlowers[0]
  )

  return (
    <div
      className="w-32 h-36 rounded-2xl flex flex-col items-center justify-end pb-2 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to top, var(--bg-secondary), var(--bg-card))',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <div className="flex flex-wrap justify-center gap-0.5 mb-1">
        {flowers.map((f, i) => (
          <motion.span
            key={i}
            className="text-xl"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, type: 'spring' }}
          >
            {f.emoji}
          </motion.span>
        ))}
      </div>
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
        🎀
      </div>
    </div>
  )
}

function PlushieReveal({ plushie }) {
  const p = giftPlushies.find((pl) => pl.id === plushie.type) || giftPlushies[0]

  return (
    <motion.div
      className="w-28 h-28 rounded-2xl flex items-center justify-center"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-soft)',
      }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="text-5xl">{p.emoji}</span>
    </motion.div>
  )
}

function ChocolateBoxReveal({ chocolateBox }) {
  const style = chocolateBoxStyles.find((s) => s.id === chocolateBox.style) || chocolateBoxStyles[0]
  const chocs = chocolateBox.chocolates.map(
    (cId) => giftChocolates.find((c) => c.id === cId) || giftChocolates[0]
  )

  return (
    <div
      className="rounded-2xl p-3 relative"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <motion.div
        className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full"
        style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)' }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {style.name}
      </motion.div>
      <div className="flex flex-wrap gap-1.5 justify-center mt-2" style={{ maxWidth: 120 }}>
        {chocs.map((c, i) => (
          <motion.div
            key={i}
            className="w-7 h-7 rounded-md flex items-center justify-center text-sm"
            style={{
              background: c.color,
              border: '1px solid var(--border)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + i * 0.08, type: 'spring' }}
            title={c.name}
          >
            {c.emoji === '🍫' ? '' : c.emoji}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function GiftUnboxing({ gifts }) {
  const [unwrapped, setUnwrapped] = useState({})

  if (!gifts) return null

  const hasGifts = gifts.bouquet || gifts.plushie || gifts.chocolateBox
  if (!hasGifts) return null

  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <p
        className="text-center text-sm mb-6"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}
      >
        You also received some gifts ✨
      </p>

      <div className="flex items-start justify-center gap-6 flex-wrap">
        {gifts.bouquet && (
          <GiftBox
            label="Bouquet"
            emoji="💐"
            isUnwrapped={unwrapped.bouquet}
            onUnwrap={() => setUnwrapped((prev) => ({ ...prev, bouquet: true }))}
          >
            <BouquetReveal bouquet={gifts.bouquet} />
          </GiftBox>
        )}

        {gifts.plushie && (
          <GiftBox
            label={gifts.plushie.name || 'Plushie'}
            emoji="🧸"
            isUnwrapped={unwrapped.plushie}
            onUnwrap={() => setUnwrapped((prev) => ({ ...prev, plushie: true }))}
          >
            <PlushieReveal plushie={gifts.plushie} />
          </GiftBox>
        )}

        {gifts.chocolateBox && (
          <GiftBox
            label="Chocolates"
            emoji="🍫"
            isUnwrapped={unwrapped.chocolateBox}
            onUnwrap={() => setUnwrapped((prev) => ({ ...prev, chocolateBox: true }))}
          >
            <ChocolateBoxReveal chocolateBox={gifts.chocolateBox} />
          </GiftBox>
        )}
      </div>
    </motion.div>
  )
}

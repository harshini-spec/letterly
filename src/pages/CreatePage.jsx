import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { themes, fonts } from '../data/themes'
import {
  decorationCategories,
  giftFlowers,
  giftPlushies,
  giftChocolates,
  chocolateBoxStyles,
} from '../data/decorations'
import { encodeLetter, saveDraft, loadDraft, clearDraft, createDefaultLetter } from '../utils/letterData'

const TABS = [
  { id: 'write', label: 'Write', icon: '✍️' },
  { id: 'style', label: 'Style', icon: '🎨' },
  { id: 'decorate', label: 'Decorate', icon: '✨' },
  { id: 'gifts', label: 'Gifts', icon: '🎁' },
]

export default function CreatePage() {
  const navigate = useNavigate()
  const [letter, setLetter] = useState(() => loadDraft() || createDefaultLetter())
  const [activeTab, setActiveTab] = useState('write')
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareLink, setShareLink] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', letter.theme)
  }, [letter.theme])

  useEffect(() => {
    const timer = setTimeout(() => saveDraft(letter), 500)
    return () => clearTimeout(timer)
  }, [letter])

  const update = useCallback((key, value) => {
    setLetter((prev) => ({ ...prev, [key]: value }))
  }, [])

  const updateGifts = useCallback((key, value) => {
    setLetter((prev) => ({
      ...prev,
      gifts: { ...prev.gifts, [key]: value },
    }))
  }, [])

  const addDecoration = useCallback((item) => {
    setLetter((prev) => ({
      ...prev,
      decorations: [
        ...prev.decorations,
        {
          emoji: item.emoji,
          animation: item.animation,
          x: 10 + Math.random() * 70,
          y: 10 + Math.random() * 70,
          scale: 1,
          rotation: Math.random() * 30 - 15,
        },
      ],
    }))
  }, [])

  const removeDecoration = useCallback((index) => {
    setLetter((prev) => ({
      ...prev,
      decorations: prev.decorations.filter((_, i) => i !== index),
    }))
  }, [])

  const handleShare = () => {
    const encoded = encodeLetter(letter)
    const link = `${window.location.origin}/letter/${encoded}`
    setShareLink(link)
    setShowShareModal(true)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const input = document.createElement('textarea')
      input.value = shareLink
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, var(--bg-primary), var(--bg-secondary))' }}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-40 glass px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <button
          onClick={() => navigate('/')}
          className="text-sm cursor-pointer bg-transparent border-0 flex items-center gap-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          ← Back
        </button>
        <h1
          className="text-lg font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--text-primary)' }}
        >
          Letterly
        </h1>
        <motion.button
          onClick={handleShare}
          className="px-4 py-2 rounded-full text-xs font-medium cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
            color: 'white',
            border: 'none',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Share ✉️
        </motion.button>
      </div>

      {/* Tab bar */}
      <div
        className="sticky top-[52px] z-30 glass px-4 py-2 flex items-center gap-2 overflow-x-auto"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        {TABS.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer border-0"
            style={{
              background: activeTab === tab.id ? 'var(--accent-light)' : 'transparent',
              color: activeTab === tab.id ? 'var(--accent-dark)' : 'var(--text-muted)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {tab.icon} {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Content area */}
      <div className="px-4 py-6 max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'write' && (
            <WriteTab key="write" letter={letter} update={update} />
          )}
          {activeTab === 'style' && (
            <StyleTab key="style" letter={letter} update={update} />
          )}
          {activeTab === 'decorate' && (
            <DecorateTab
              key="decorate"
              letter={letter}
              addDecoration={addDecoration}
              removeDecoration={removeDecoration}
            />
          )}
          {activeTab === 'gifts' && (
            <GiftsTab key="gifts" letter={letter} updateGifts={updateGifts} />
          )}
        </AnimatePresence>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <ShareModal
            link={shareLink}
            copied={copied}
            onCopy={handleCopy}
            onClose={() => setShowShareModal(false)}
            onNewLetter={() => {
              clearDraft()
              setLetter(createDefaultLetter())
              setShowShareModal(false)
              setActiveTab('write')
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ────── Write Tab ────── */
function WriteTab({ letter, update }) {
  const fontConfig = fonts.find((f) => f.id === letter.font) || fonts[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <label className="text-xs block mb-1.5" style={{ color: 'var(--text-muted)' }}>
            Your name
          </label>
          <input
            type="text"
            value={letter.senderName}
            onChange={(e) => update('senderName', e.target.value)}
            placeholder="From..."
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-ui)',
            }}
          />
        </div>
        <div>
          <label className="text-xs block mb-1.5" style={{ color: 'var(--text-muted)' }}>
            Recipient&apos;s name
          </label>
          <input
            type="text"
            value={letter.recipientName}
            onChange={(e) => update('recipientName', e.target.value)}
            placeholder="To..."
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-ui)',
            }}
          />
        </div>
      </div>

      {/* Letter preview area with decorations */}
      <div
        className="relative rounded-2xl p-6 md:p-8 min-h-[400px]"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        {letter.decorations.map((dec, i) => (
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

        {letter.recipientName && (
          <p
            className="text-base mb-4"
            style={{ fontFamily: fontConfig.family, color: 'var(--text-secondary)' }}
          >
            Dear {letter.recipientName},
          </p>
        )}

        <textarea
          value={letter.content}
          onChange={(e) => update('content', e.target.value)}
          placeholder="Write your heart out..."
          className="w-full min-h-[300px] bg-transparent border-0 outline-none resize-none text-lg leading-relaxed relative z-10"
          style={{
            fontFamily: fontConfig.family,
            color: 'var(--text-primary)',
            lineHeight: 1.8,
          }}
        />

        {letter.senderName && (
          <div className="text-right mt-4">
            <p className="text-sm" style={{ fontFamily: fontConfig.family, color: 'var(--text-secondary)' }}>
              With love,
            </p>
            <p
              className="text-lg mt-1"
              style={{ fontFamily: "'Caveat', cursive", color: 'var(--accent-dark)' }}
            >
              {letter.senderName}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ────── Style Tab ────── */
function StyleTab({ letter, update }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {/* Theme picker */}
      <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
        Choose a Theme
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {themes.map((theme) => (
          <motion.button
            key={theme.id}
            onClick={() => update('theme', theme.id)}
            className="p-4 rounded-xl text-left cursor-pointer"
            style={{
              background: theme.preview.bg,
              border: letter.theme === theme.id
                ? `2px solid ${theme.preview.accent}`
                : '2px solid transparent',
              boxShadow: letter.theme === theme.id ? 'var(--shadow-soft)' : 'none',
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="w-6 h-6 rounded-full mb-2"
              style={{ background: theme.preview.accent }}
            />
            <p className="text-sm font-medium" style={{ color: '#3d2f2a' }}>
              {theme.name}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#7a6b63' }}>
              {theme.vibe} · {theme.target}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Font picker */}
      <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
        Choose a Font
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {fonts.map((font) => (
          <motion.button
            key={font.id}
            onClick={() => update('font', font.id)}
            className="p-4 rounded-xl cursor-pointer"
            style={{
              background: 'var(--bg-card)',
              border: letter.font === font.id
                ? '2px solid var(--accent)'
                : '2px solid var(--border)',
              boxShadow: letter.font === font.id ? 'var(--shadow-soft)' : 'none',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="text-2xl mb-1" style={{ fontFamily: font.family, color: 'var(--text-primary)' }}>
              {font.preview}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {font.name}
            </p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

/* ────── Decorate Tab ────── */
function DecorateTab({ letter, addDecoration, removeDecoration }) {
  const [activeCategory, setActiveCategory] = useState(decorationCategories[0].id)
  const category = decorationCategories.find((c) => c.id === activeCategory)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {/* Category tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {decorationCategories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap cursor-pointer border-0"
            style={{
              background: activeCategory === cat.id ? 'var(--accent-light)' : 'var(--bg-card)',
              color: activeCategory === cat.id ? 'var(--accent-dark)' : 'var(--text-muted)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat.icon} {cat.name}
          </motion.button>
        ))}
      </div>

      {/* Sticker grid */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {category?.items.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => addDecoration(item)}
            className="p-3 rounded-xl cursor-pointer border-0 flex flex-col items-center"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
              {item.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Active decorations */}
      {letter.decorations.length > 0 && (
        <div>
          <h4 className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            Added decorations (tap to remove)
          </h4>
          <div className="flex flex-wrap gap-2">
            {letter.decorations.map((dec, i) => (
              <motion.button
                key={i}
                onClick={() => removeDecoration(i)}
                className="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer border-0"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                whileHover={{ scale: 1.1, background: '#fee' }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-lg">{dec.emoji}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

/* ────── Gifts Tab ────── */
function GiftsTab({ letter, updateGifts }) {
  const [giftSection, setGiftSection] = useState('bouquet')

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
        Add virtual gifts alongside your letter
      </p>

      {/* Gift type tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'bouquet', label: '💐 Bouquet', active: !!letter.gifts?.bouquet },
          { id: 'plushie', label: '🧸 Plushie', active: !!letter.gifts?.plushie },
          { id: 'chocolate', label: '🍫 Chocolates', active: !!letter.gifts?.chocolateBox },
        ].map((gt) => (
          <motion.button
            key={gt.id}
            onClick={() => setGiftSection(gt.id)}
            className="px-3 py-2 rounded-xl text-xs cursor-pointer border-0 relative"
            style={{
              background: giftSection === gt.id ? 'var(--accent-light)' : 'var(--bg-card)',
              color: giftSection === gt.id ? 'var(--accent-dark)' : 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {gt.label}
            {gt.active && (
              <span
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {giftSection === 'bouquet' && (
          <BouquetBuilder
            key="bouquet"
            bouquet={letter.gifts?.bouquet}
            onChange={(b) => updateGifts('bouquet', b)}
          />
        )}
        {giftSection === 'plushie' && (
          <PlushiePicker
            key="plushie"
            plushie={letter.gifts?.plushie}
            onChange={(p) => updateGifts('plushie', p)}
          />
        )}
        {giftSection === 'chocolate' && (
          <ChocolateBuilder
            key="chocolate"
            chocolateBox={letter.gifts?.chocolateBox}
            onChange={(c) => updateGifts('chocolateBox', c)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ────── Bouquet Builder ────── */
function BouquetBuilder({ bouquet, onChange }) {
  const flowers = bouquet?.flowers || []
  const wrapping = bouquet?.wrapping || 'pink'

  const toggleFlower = (id) => {
    const newFlowers = flowers.includes(id)
      ? flowers.filter((f) => f !== id)
      : [...flowers, id]
    onChange(newFlowers.length > 0 ? { flowers: newFlowers, wrapping } : null)
  }

  const wrappingColors = [
    { id: 'pink', color: '#fdb0c0' },
    { id: 'cream', color: '#f5ebe0' },
    { id: 'lavender', color: '#c8b6e2' },
    { id: 'sage', color: '#b7c9a8' },
    { id: 'gold', color: '#f0d8a8' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <h4 className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
        Pick flowers for your bouquet
      </h4>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {giftFlowers.map((flower) => (
          <motion.button
            key={flower.id}
            onClick={() => toggleFlower(flower.id)}
            className="p-3 rounded-xl cursor-pointer border-0 flex flex-col items-center"
            style={{
              background: flowers.includes(flower.id) ? 'var(--accent-light)' : 'var(--bg-card)',
              border: flowers.includes(flower.id)
                ? '2px solid var(--accent)'
                : '1px solid var(--border)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">{flower.emoji}</span>
            <span className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
              {flower.name}
            </span>
          </motion.button>
        ))}
      </div>

      {flowers.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            Wrapping paper
          </h4>
          <div className="flex gap-2">
            {wrappingColors.map((w) => (
              <motion.button
                key={w.id}
                onClick={() => onChange({ flowers, wrapping: w.id })}
                className="w-8 h-8 rounded-full cursor-pointer border-0"
                style={{
                  background: w.color,
                  border: wrapping === w.id ? '3px solid var(--accent-dark)' : '2px solid var(--border)',
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {flowers.length > 0 && (
        <div
          className="rounded-xl p-4 text-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            Your bouquet preview
          </p>
          <div className="flex flex-wrap justify-center gap-1">
            {flowers.map((fId, i) => {
              const f = giftFlowers.find((fl) => fl.id === fId)
              return (
                <motion.span
                  key={i}
                  className="text-3xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {f?.emoji}
                </motion.span>
              )
            })}
          </div>
          <div className="text-sm mt-1">🎀</div>
        </div>
      )}
    </motion.div>
  )
}

/* ────── Plushie Picker ────── */
function PlushiePicker({ plushie, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <h4 className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
        Pick a cute plushie
      </h4>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {giftPlushies.map((p) => (
          <motion.button
            key={p.id}
            onClick={() =>
              onChange(plushie?.type === p.id ? null : { type: p.id, name: p.name })
            }
            className="p-3 rounded-xl cursor-pointer border-0 flex flex-col items-center"
            style={{
              background: plushie?.type === p.id ? 'var(--accent-light)' : 'var(--bg-card)',
              border: plushie?.type === p.id
                ? '2px solid var(--accent)'
                : '1px solid var(--border)',
            }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-3xl">{p.emoji}</span>
            <span className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
              {p.name}
            </span>
          </motion.button>
        ))}
      </div>

      {plushie && (
        <motion.div
          className="rounded-xl p-4 text-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <motion.span
            className="text-6xl inline-block"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {giftPlushies.find((p) => p.id === plushie.type)?.emoji}
          </motion.span>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            {plushie.name}
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

/* ────── Chocolate Builder ────── */
function ChocolateBuilder({ chocolateBox, onChange }) {
  const boxStyle = chocolateBox?.style || 'heart'
  const chocolates = chocolateBox?.chocolates || []
  const styleConfig = chocolateBoxStyles.find((s) => s.id === boxStyle) || chocolateBoxStyles[0]

  const addChocolate = (id) => {
    if (chocolates.length >= styleConfig.slots) return
    const newChocs = [...chocolates, id]
    onChange({ style: boxStyle, chocolates: newChocs })
  }

  const removeChocolate = (index) => {
    const newChocs = chocolates.filter((_, i) => i !== index)
    onChange(newChocs.length > 0 ? { style: boxStyle, chocolates: newChocs } : null)
  }

  const changeBoxStyle = (styleId) => {
    const newStyle = chocolateBoxStyles.find((s) => s.id === styleId)
    const trimmed = chocolates.slice(0, newStyle.slots)
    onChange(trimmed.length > 0 ? { style: styleId, chocolates: trimmed } : { style: styleId, chocolates: [] })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <h4 className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
        Choose box style
      </h4>
      <div className="flex gap-2 mb-4">
        {chocolateBoxStyles.map((s) => (
          <motion.button
            key={s.id}
            onClick={() => changeBoxStyle(s.id)}
            className="px-3 py-2 rounded-xl text-xs cursor-pointer border-0"
            style={{
              background: boxStyle === s.id ? 'var(--accent-light)' : 'var(--bg-card)',
              color: boxStyle === s.id ? 'var(--accent-dark)' : 'var(--text-muted)',
              border: boxStyle === s.id ? '2px solid var(--accent)' : '1px solid var(--border)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {s.name} ({s.slots} slots)
          </motion.button>
        ))}
      </div>

      <h4 className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
        Add chocolates ({chocolates.length}/{styleConfig.slots})
      </h4>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {giftChocolates.map((c) => (
          <motion.button
            key={c.id}
            onClick={() => addChocolate(c.id)}
            disabled={chocolates.length >= styleConfig.slots}
            className="p-2 rounded-xl cursor-pointer border-0 flex flex-col items-center disabled:opacity-40"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            whileHover={{ scale: chocolates.length < styleConfig.slots ? 1.08 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="w-8 h-8 rounded-md"
              style={{ background: c.color, border: '1px solid var(--border)' }}
            />
            <span className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
              {c.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Box preview */}
      {chocolates.length > 0 && (
        <div
          className="rounded-xl p-4"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <p className="text-xs text-center mb-3" style={{ color: 'var(--text-muted)' }}>
            Your {styleConfig.name} (tap to remove)
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {chocolates.map((cId, i) => {
              const c = giftChocolates.find((ch) => ch.id === cId)
              return (
                <motion.button
                  key={i}
                  onClick={() => removeChocolate(i)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 flex items-center justify-center"
                  style={{ background: c?.color, border: '1px solid var(--border)' }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  title={c?.name}
                >
                  {c?.emoji === '🍫' ? '' : <span className="text-sm">{c?.emoji}</span>}
                </motion.button>
              )
            })}
            {Array.from({ length: styleConfig.slots - chocolates.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-10 h-10 rounded-lg"
                style={{ background: 'var(--bg-secondary)', border: '1px dashed var(--border)' }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

/* ────── Share Modal ────── */
function ShareModal({ link, copied, onCopy, onClose, onNewLetter }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <motion.div
        className="relative rounded-2xl p-6 max-w-md w-full"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-medium)',
        }}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="text-center mb-4">
          <span className="text-4xl">✉️</span>
          <h2
            className="text-xl font-semibold mt-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--text-primary)' }}
          >
            Your letter is ready!
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Share this link with your special someone
          </p>
        </div>

        <div
          className="rounded-xl p-3 mb-4 break-all text-xs"
          style={{
            background: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
          }}
        >
          {link}
        </div>

        <div className="flex gap-2">
          <motion.button
            onClick={onCopy}
            className="flex-1 py-3 rounded-xl font-medium text-sm cursor-pointer border-0"
            style={{
              background: copied
                ? 'linear-gradient(135deg, #7da47a, #5a7f58)'
                : 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
              color: 'white',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {copied ? '✓ Copied!' : 'Copy Link'}
          </motion.button>
        </div>

        <button
          onClick={onNewLetter}
          className="w-full mt-3 py-2 text-xs cursor-pointer bg-transparent border-0"
          style={{ color: 'var(--text-muted)' }}
        >
          Write a new letter
        </button>
      </motion.div>
    </motion.div>
  )
}

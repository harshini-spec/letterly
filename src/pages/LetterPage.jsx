import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import EnvelopeAnimation from '../components/EnvelopeAnimation'
import LetterRenderer from '../components/LetterRenderer'
import GiftUnboxing from '../components/GiftUnboxing'
import ReactionBar from '../components/ReactionBar'
import { decodeLetter } from '../utils/letterData'

export default function LetterPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [letter, setLetter] = useState(null)
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const decoded = decodeLetter(id)
    if (decoded) {
      setLetter(decoded)
      document.documentElement.setAttribute('data-theme', decoded.theme || 'vintage-romance')
    } else {
      setError(true)
    }
  }, [id])

  const handleReply = () => {
    navigate('/create')
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: 'var(--bg-primary)' }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-5xl mb-4 block">📭</span>
          <h1
            className="text-2xl font-semibold mb-2"
            style={{ color: 'var(--text-primary)', fontFamily: "'Cormorant Garamond', serif" }}
          >
            Letter not found
          </h1>
          <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
            This link may be broken or expired.
          </p>
          <motion.button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-full text-sm font-medium cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
              color: 'white',
              border: 'none',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Write your own letter
          </motion.button>
        </motion.div>
      </div>
    )
  }

  if (!letter) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg-primary)' }}
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: 'var(--text-muted)' }}
        >
          Loading...
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, var(--bg-primary), var(--bg-secondary))' }}
    >
      {!envelopeOpen && (
        <EnvelopeAnimation
          recipientName={letter.recipientName}
          onOpen={() => setEnvelopeOpen(true)}
        />
      )}

      {envelopeOpen && (
        <motion.div
          className="px-4 py-12 md:py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <LetterRenderer letter={letter} />
          <div className="max-w-2xl mx-auto">
            <GiftUnboxing gifts={letter.gifts} />
            <ReactionBar onReply={handleReply} />
          </div>

          <div className="text-center mt-16 pb-8">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Made with{' '}
              <span style={{ color: 'var(--accent)' }}>♥</span>{' '}
              on Letterly
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

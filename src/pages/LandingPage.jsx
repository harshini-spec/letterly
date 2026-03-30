import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

const hearts = [
  { emoji: '♥', x: -55, y: -80, delay: 3.0, duration: 2.5, size: 22, color: '#e85d75' },
  { emoji: '♥', x: 60, y: -100, delay: 3.2, duration: 2.8, size: 16, color: '#f4a0b0' },
  { emoji: '♥', x: -30, y: -120, delay: 3.5, duration: 2.6, size: 26, color: '#d94060' },
  { emoji: '♥', x: 40, y: -70, delay: 3.1, duration: 2.4, size: 13, color: '#f4a0b0' },
  { emoji: '♥', x: -65, y: -60, delay: 3.8, duration: 2.3, size: 14, color: '#e85d75' },
  { emoji: '♥', x: 70, y: -110, delay: 3.4, duration: 2.7, size: 18, color: '#f4a0b0' },
  { emoji: '♥', x: 10, y: -130, delay: 3.6, duration: 2.9, size: 28, color: '#d94060' },
  { emoji: '♥', x: -45, y: -105, delay: 3.3, duration: 2.5, size: 12, color: '#f4a0b0' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen" style={{ background: '#fdf8f4' }}>
      {/* ─── Navbar ─── */}
      <nav
        className="sticky top-0 z-50 w-full flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-20 py-4 md:py-5"
        style={{
          background: 'rgba(253,248,244,0.9)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        <span
          className="text-xl md:text-2xl font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220' }}
        >
          Letterly
        </span>

        <div />
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="w-full h-[calc(100vh-64px)] flex items-center px-6 sm:px-10 md:px-12 lg:px-20">
        <div className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-6 lg:gap-8">
          {/* Left — Text */}
          <motion.div
            className="flex-1 min-w-0 max-w-xl text-center items-center flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1
              className="text-[2.4rem] sm:text-[3rem] md:text-[3.4rem] lg:text-[4rem] leading-[1.08] font-medium"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220', fontStyle: 'italic' }}
            >
              Write something they&rsquo;ll never forget
            </h1>

            <p
              className="mt-8 md:mt-10 text-[14px] md:text-[16px] leading-[1.8] max-w-[420px] mx-auto"
              style={{ color: '#7a6e66' }}
            >
              Rediscover the art of thoughtful communication with
              beautifully crafted digital letters that feel as personal
              as pen and paper.
            </p>

            <div className="mt-10 md:mt-14">
              <motion.button
                onClick={() => navigate('/create')}
                className="px-12 sm:px-16 md:px-20 py-5 sm:py-6 md:py-7 rounded-full text-[17px] sm:text-[20px] md:text-[22px] cursor-pointer border-0 tracking-[0.02em]"
                style={{
                  background: '#a8434b',
                  color: '#f5eeea',
                  boxShadow: '0 6px 28px rgba(168,67,75,0.3)',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 36px rgba(168,67,75,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                Send your first letter
              </motion.button>
            </div>
          </motion.div>

          {/* Right — Animated Envelope */}
          <motion.div
            className="flex-1 min-w-0 flex justify-center md:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          >
            <div className="relative" style={{ width: '100%', maxWidth: 440 }}>
              {/* Floating hearts — burst upward when letter opens */}
              {hearts.map((h, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none select-none"
                  style={{
                    zIndex: 20,
                    left: '50%',
                    top: '25%',
                    color: h.color,
                    fontSize: h.size,
                  }}
                  initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [0, h.y * 0.4, h.y],
                    x: [0, h.x * 0.5, h.x],
                    scale: [0, 1.2, 0.8],
                    rotate: [0, h.x > 0 ? 15 : -15, 0],
                  }}
                  transition={{
                    duration: h.duration,
                    delay: h.delay,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: 'easeOut',
                  }}
                >
                  {h.emoji}
                </motion.div>
              ))}

              {/* SVG Envelope */}
              <svg
                viewBox="0 0 400 320"
                className="w-full h-auto"
                style={{ overflow: 'visible', filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.10))' }}
              >
                {/* Back flap — hinges from bottom of triangle */}
                <motion.g
                  style={{ transformOrigin: '200px 130px' }}
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: [0, 0, 180, 180, 0] }}
                  transition={{
                    duration: 5.5,
                    delay: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut',
                    times: [0, 0.06, 0.22, 0.78, 0.94],
                  }}
                >
                  <polygon
                    points="45,130 200,20 355,130"
                    fill="#e8a0a8"
                  />
                  <polygon
                    points="45,130 200,20 355,130"
                    fill="url(#flapShade)"
                  />
                </motion.g>

                {/* Letter paper — slides up */}
                <motion.g
                  initial={{ y: 0 }}
                  animate={{ y: [0, 0, -110, -110, 0] }}
                  transition={{
                    duration: 5.5,
                    delay: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut',
                    times: [0, 0.10, 0.32, 0.68, 0.90],
                  }}
                >
                  <rect x="75" y="85" width="250" height="190" rx="6" fill="#fff" />
                  <rect x="100" y="120" width="90" height="7" rx="3.5" fill="#f0e0d8" />
                  <rect x="100" y="140" width="150" height="7" rx="3.5" fill="#f0e0d8" />
                  <rect x="100" y="160" width="120" height="7" rx="3.5" fill="#f0e0d8" />
                  <rect x="100" y="180" width="70" height="7" rx="3.5" fill="#f0e0d8" />
                </motion.g>

                {/* Envelope body — rectangle */}
                <rect x="45" y="130" width="310" height="175" rx="8" fill="#e8889a" />

                {/* Inner shadow at top */}
                <rect x="45" y="130" width="310" height="20" rx="0" fill="rgba(0,0,0,0.04)" />

                {/* Front V fold — triangle overlay */}
                <polygon
                  points="45,130 200,260 355,130"
                  fill="#f0a0ad"
                />

                {/* Bottom fold */}
                <polygon
                  points="45,305 200,260 355,305"
                  fill="#e08898"
                />

                {/* Fold edge lines */}
                <line x1="45" y1="130" x2="200" y2="260" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />
                <line x1="355" y1="130" x2="200" y2="260" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" />

                {/* Heart on front of envelope */}
                <motion.g
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '200px 220px' }}
                >
                  <path
                    d="M200,235 C200,235 180,210 185,200 C190,190 200,195 200,205 C200,195 210,190 215,200 C220,210 200,235 200,235Z"
                    fill="#d94060"
                  />
                </motion.g>

                <defs>
                  <linearGradient id="flapShade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(0,0,0,0.06)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-20">
        <div style={{ height: 1, background: '#e8ddd5' }} />
      </div>

      {/* ─── Features Section ─── */}
      <section
        id="features"
        className="w-full min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 lg:px-20 py-20 md:py-28"
      >
        <div className="w-full max-w-5xl mx-auto">
          <motion.div className="text-center mb-16 md:mb-24" {...fadeUp}>
            <p
              className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: '#a8434b' }}
            >
              The Process
            </p>
            <h2
              className="text-[1.8rem] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3.2rem] font-medium leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220', fontStyle: 'italic' }}
            >
              The slow art of digital writing
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
            {[
              {
                icon: '✍️',
                title: 'Write',
                description: 'A distraction-free interface designed to let your thoughts flow like ink on vellum.',
              },
              {
                icon: '🎨',
                title: 'Decorate',
                description: 'Select from artisanal digital textures, hand-curated typefaces, and virtual wax seals.',
              },
              {
                icon: '✉️',
                title: 'Send',
                description: 'Deliver an experience that arrives with a notification but lingers like a physical keepsake.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="text-center flex flex-col items-center"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.15 }}
              >
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                >
                  <span className="text-lg md:text-xl">{feature.icon}</span>
                </div>

                <h3
                  className="text-lg md:text-xl lg:text-2xl font-medium mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220', fontStyle: 'italic' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-[13px] md:text-[14px] leading-[1.7] max-w-[260px]"
                  style={{ color: '#7a6e66' }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-20">
        <div style={{ height: 1, background: '#e8ddd5' }} />
      </div>

      {/* ─── Final CTA Section ─── */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span
              className="inline-block px-4 md:px-5 py-2 rounded-full text-[10px] md:text-[11px] font-semibold tracking-[0.15em] uppercase"
              style={{ background: '#f3e8e4', color: '#a8434b' }}
            >
              Join the correspondence
            </span>
          </motion.div>

          <motion.h2
            className="text-[2rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.8rem] font-medium leading-[1.1] mt-6 md:mt-8 mb-10 md:mb-12"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220', fontStyle: 'italic' }}
            {...fadeUp}
          >
            Your words deserve a beautiful home.
          </motion.h2>

          <motion.div {...fadeUp}>
            <motion.button
              onClick={() => navigate('/create')}
              className="px-10 md:px-12 py-4 md:py-5 rounded-full text-[12px] md:text-[13px] font-semibold cursor-pointer border-0 uppercase tracking-[0.1em]"
              style={{
                background: '#a8434b',
                color: '#fff',
                boxShadow: '0 6px 24px rgba(168,67,75,0.3)',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(168,67,75,0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              Send into the world
            </motion.button>
          </motion.div>

          <motion.p
            className="mt-8 md:mt-10 text-[12px] md:text-[13px]"
            style={{ color: '#b5a99f', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}
            {...fadeUp}
          >
            Start your journey with a single thought. No credit card required.
          </motion.p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="w-full px-5 sm:px-8 md:px-12 lg:px-20 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid #e8ddd5' }}
      >
        <span
          className="text-base font-medium"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220' }}
        >
          Letterly
        </span>

        <div className="flex items-center gap-6 md:gap-8">
          {['Privacy', 'Terms', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[11px] md:text-[12px] no-underline"
              style={{ color: '#8a7d76' }}
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

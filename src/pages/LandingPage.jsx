import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

const hearts = [
  { emoji: '💌', x: -60, y: -90, delay: 2.2, duration: 3, size: 20 },
  { emoji: '♥', x: 70, y: -110, delay: 2.8, duration: 3.5, size: 16 },
  { emoji: '💕', x: -40, y: -130, delay: 3.4, duration: 2.8, size: 18 },
  { emoji: '♥', x: 50, y: -80, delay: 4.0, duration: 3.2, size: 14 },
  { emoji: '✨', x: -70, y: -100, delay: 3.0, duration: 3, size: 15 },
  { emoji: '💗', x: 80, y: -120, delay: 2.5, duration: 3.4, size: 17 },
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

        <motion.button
          onClick={() => navigate('/create')}
          className="px-5 md:px-7 py-2.5 md:py-3 rounded-full text-[12px] md:text-[13px] font-semibold cursor-pointer border-0 uppercase tracking-[0.04em]"
          style={{ background: '#a8434b', color: '#fff' }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Get Started
        </motion.button>
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

            <div className="flex items-center justify-center gap-8 md:gap-10 mt-10 md:mt-14 flex-wrap">
              <motion.button
                onClick={() => navigate('/create')}
                className="px-10 sm:px-14 md:px-16 py-5 md:py-6 rounded-full text-[15px] sm:text-[17px] md:text-[19px] cursor-pointer border-0 tracking-[0.02em]"
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

              <motion.button
                className="text-[14px] md:text-[16px] cursor-pointer bg-transparent border-0 flex items-center gap-3 tracking-[0.02em]"
                style={{ color: '#5a504a', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                whileHover={{ x: 4 }}
              >
                <span style={{ textDecoration: 'underline', textUnderlineOffset: '5px' }}>
                  View the gallery
                </span>
                <span className="text-lg">&rarr;</span>
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
            <div className="relative" style={{ width: '100%', maxWidth: 420 }}>
              {/* Floating hearts — positioned around the envelope */}
              {hearts.map((h, i) => (
                <motion.span
                  key={i}
                  className="absolute pointer-events-none select-none"
                  style={{
                    fontSize: h.size,
                    zIndex: 20,
                    left: '50%',
                    top: '30%',
                  }}
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  animate={{
                    opacity: [0, 0.85, 0.85, 0],
                    y: [0, h.y * 0.6, h.y * 1.2],
                    x: [0, h.x * 0.6, h.x],
                    scale: [0.4, 1, 0.7],
                  }}
                  transition={{
                    duration: h.duration,
                    delay: h.delay,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: 'easeOut',
                  }}
                >
                  {h.emoji}
                </motion.span>
              ))}

              {/* SVG Envelope with animation */}
              <svg
                viewBox="0 0 400 300"
                className="w-full h-auto"
                style={{ overflow: 'visible' }}
              >
                {/* Back flap — triangle behind envelope, flips open */}
                <motion.g
                  style={{ transformOrigin: '200px 120px' }}
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: [0, 0, 180, 180, 0] }}
                  transition={{
                    duration: 5,
                    delay: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut',
                    times: [0, 0.08, 0.25, 0.75, 0.92],
                  }}
                >
                  <polygon
                    points="40,120 200,10 360,120"
                    fill="#d8cfc0"
                    stroke="#c8bfb0"
                    strokeWidth="0.5"
                  />
                </motion.g>

                {/* Letter paper — slides up */}
                <motion.g
                  initial={{ y: 0 }}
                  animate={{ y: [0, 0, -100, -100, 0] }}
                  transition={{
                    duration: 5,
                    delay: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut',
                    times: [0, 0.12, 0.35, 0.65, 0.88],
                  }}
                >
                  <rect x="70" y="80" width="260" height="180" rx="4" fill="#fff" />
                  <rect x="95" y="110" width="100" height="6" rx="3" fill="#e8e0d6" />
                  <rect x="95" y="128" width="160" height="6" rx="3" fill="#e8e0d6" />
                  <rect x="95" y="146" width="130" height="6" rx="3" fill="#e8e0d6" />
                  <rect x="95" y="164" width="80" height="6" rx="3" fill="#e8e0d6" />
                </motion.g>

                {/* Envelope body — front, always on top */}
                <rect x="40" y="120" width="320" height="170" rx="8" fill="#f0e8dc" />

                {/* Front V fold */}
                <polygon
                  points="40,120 200,240 360,120"
                  fill="#e8dfcf"
                  stroke="#ddd4c4"
                  strokeWidth="0.5"
                />

                {/* Bottom fold shading */}
                <polygon
                  points="40,290 200,240 360,290"
                  fill="#e4dacb"
                />

                {/* Side fold lines */}
                <line x1="40" y1="120" x2="40" y2="290" stroke="#d8cfc0" strokeWidth="0.5" />
                <line x1="360" y1="120" x2="360" y2="290" stroke="#d8cfc0" strokeWidth="0.5" />

                {/* Wax seal */}
                <motion.g
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '200px 210px' }}
                >
                  <circle cx="200" cy="210" r="16" fill="url(#sealGradient)" />
                  <text x="200" y="216" textAnchor="middle" fill="#f5e0d0" fontSize="14">&#9829;</text>
                </motion.g>

                <defs>
                  <radialGradient id="sealGradient" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#c45a5a" />
                    <stop offset="100%" stopColor="#8b2e2e" />
                  </radialGradient>
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

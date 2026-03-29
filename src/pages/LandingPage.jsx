import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#fdf8f4' }}>
      {/* ─── Navbar ─── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: 'rgba(253,248,244,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #ece4db' }}
      >
        <span
          className="text-lg font-medium tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220' }}
        >
          Letterly
        </span>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'About'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[13px] font-medium tracking-wide uppercase no-underline"
              style={{ color: '#6b5e56', letterSpacing: '0.08em' }}
            >
              {link}
            </a>
          ))}
        </div>

        <motion.button
          onClick={() => navigate('/create')}
          className="px-5 py-2 rounded-full text-[13px] font-semibold cursor-pointer border-0"
          style={{ background: '#a8434b', color: '#fff' }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Start your letter
        </motion.button>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left */}
          <motion.div className="flex-1 max-w-xl" {...fadeUp}>
            <h1
              className="text-[2.6rem] md:text-[3.6rem] lg:text-[4.2rem] leading-[1.1] font-medium"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220', fontStyle: 'italic' }}
            >
              Write something they&rsquo;ll never forget
            </h1>

            <p
              className="mt-6 text-[15px] md:text-base leading-relaxed max-w-md"
              style={{ color: '#7a6e66' }}
            >
              Rediscover the art of thoughtful communication with
              beautifully crafted digital letters that feel as personal
              as pen and paper.
            </p>

            <div className="flex items-center gap-4 mt-10 flex-wrap">
              <motion.button
                onClick={() => navigate('/create')}
                className="px-7 py-3.5 rounded-full text-sm font-semibold cursor-pointer border-0"
                style={{
                  background: '#a8434b',
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(168,67,75,0.25)',
                  letterSpacing: '0.01em',
                }}
                whileHover={{ scale: 1.04, boxShadow: '0 6px 24px rgba(168,67,75,0.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                Send your first letter
              </motion.button>

              <motion.button
                className="px-7 py-3.5 rounded-full text-sm font-medium cursor-pointer"
                style={{
                  background: 'transparent',
                  color: '#5a504a',
                  border: '1.5px solid #c9bdb4',
                }}
                whileHover={{ scale: 1.04, background: '#f5ede4' }}
                whileTap={{ scale: 0.97 }}
              >
                See the gallery &darr;
              </motion.button>
            </div>
          </motion.div>

          {/* Right — Hero Image */}
          <motion.div
            className="flex-1 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          >
            <div
              className="relative rounded-2xl overflow-hidden w-full max-w-md aspect-[4/3]"
              style={{ background: '#3d5c52' }}
            >
              {/* Envelope illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Envelope body */}
                  <div
                    className="w-48 h-32 md:w-56 md:h-36 rounded-lg relative"
                    style={{
                      background: 'linear-gradient(145deg, #f8f3ed, #ede4d8)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[55%]"
                      style={{
                        clipPath: 'polygon(0 0, 50% 70%, 100% 0)',
                        background: 'linear-gradient(180deg, #f0e8dc, #e8ddd0)',
                      }}
                    />
                    <div
                      className="absolute top-[38%] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: '#a8434b' }}
                    >
                      <span className="text-white text-sm">♥</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coffee cup accent */}
              <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8">
                <div
                  className="w-14 h-12 md:w-16 md:h-14 rounded-b-xl rounded-t-md flex items-center justify-center"
                  style={{ background: '#f8f3ed', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                >
                  <span className="text-xl">☕</span>
                </div>
              </div>

              {/* Subtle leaf accent */}
              <div className="absolute top-6 left-6 opacity-40">
                <span className="text-2xl">🌿</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ height: 1, background: '#e8ddd5' }} />
      </div>

      {/* ─── Features Section ─── */}
      <section id="features" className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <p
              className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-4"
              style={{ color: '#a8434b' }}
            >
              Our Features
            </p>
            <h2
              className="text-3xl md:text-[2.8rem] font-medium leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220', fontStyle: 'italic' }}
            >
              The slow art of digital writing
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: '✍️',
                title: 'Write',
                description: 'A distraction-free interface designed to let your thoughts flow like ink on velum.',
              },
              {
                icon: '✨',
                title: 'Decorate',
                description: 'Select from curated digital textures, hand-cut illustrations, and ethereal accents.',
              },
              {
                icon: '✉️',
                title: 'Send',
                description: 'Deliver an experience that arrives with a notification but begins like a physical keepsake.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="text-center px-4"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.12 }}
              >
                <div className="text-3xl mb-5">{feature.icon}</div>
                <h3
                  className="text-xl md:text-2xl font-medium mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220', fontStyle: 'italic' }}
                >
                  {feature.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: '#7a6e66' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ height: 1, background: '#e8ddd5' }} />
      </div>

      {/* ─── Final CTA Section ─── */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-5"
            style={{ color: '#a8434b' }}
            {...fadeUp}
          >
            Start the correspondence
          </motion.p>

          <motion.h2
            className="text-3xl md:text-[3rem] lg:text-[3.5rem] font-medium leading-tight mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220', fontStyle: 'italic' }}
            {...fadeUp}
          >
            Your words deserve a beautiful home.
          </motion.h2>

          <motion.button
            onClick={() => navigate('/create')}
            className="px-8 py-4 rounded-full text-sm font-semibold cursor-pointer border-0"
            style={{
              background: '#a8434b',
              color: '#fff',
              boxShadow: '0 4px 16px rgba(168,67,75,0.25)',
              letterSpacing: '0.01em',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 6px 24px rgba(168,67,75,0.35)' }}
            whileTap={{ scale: 0.97 }}
            {...fadeUp}
          >
            Send into the world
          </motion.button>

          <motion.p
            className="mt-8 text-xs"
            style={{ color: '#b5a99f' }}
            {...fadeUp}
          >
            Start your journey with a single thought. No cards and no stamps required.
          </motion.p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 lg:px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid #e8ddd5' }}
      >
        <span
          className="text-sm font-medium"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220' }}
        >
          Letterly
        </span>

        <div className="flex items-center gap-6">
          {['Privacy', 'Terms', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[12px] no-underline"
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

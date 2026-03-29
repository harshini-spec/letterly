import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#fdf8f4' }}>
      {/* ─── Navbar ─── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-8 md:px-16 lg:px-24 py-5"
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

        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Pricing', 'About'].map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[13px] font-medium tracking-[0.06em] uppercase no-underline"
              style={{
                color: '#6b5e56',
                textDecoration: i === 0 ? 'underline' : 'none',
                textUnderlineOffset: '4px',
                textDecorationColor: '#a8434b',
              }}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <span
            className="hidden md:inline text-[13px] font-medium cursor-pointer"
            style={{ color: '#5a504a' }}
          >
            Login
          </span>
          <motion.button
            onClick={() => navigate('/create')}
            className="px-6 py-2.5 rounded-full text-[13px] font-semibold cursor-pointer border-0 uppercase tracking-[0.04em]"
            style={{ background: '#a8434b', color: '#fff' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      {/* ─── Hero Section ─── Full viewport height */}
      <section className="min-h-[calc(100vh-72px)] flex items-center px-8 md:px-16 lg:px-24 py-16 md:py-0">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Left — Text content */}
          <motion.div
            className="flex-1 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1
              className="text-[2.8rem] md:text-[3.8rem] lg:text-[4.5rem] leading-[1.05] font-medium"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220', fontStyle: 'italic' }}
            >
              Write something they&rsquo;ll never forget
            </h1>

            <p
              className="mt-8 md:mt-10 text-[15px] md:text-[16px] leading-[1.7] max-w-[420px]"
              style={{ color: '#7a6e66' }}
            >
              Rediscover the art of thoughtful communication with
              beautifully crafted digital letters that feel as personal
              as pen and paper.
            </p>

            <div className="flex items-center gap-6 mt-12 md:mt-14 flex-wrap">
              <motion.button
                onClick={() => navigate('/create')}
                className="px-8 py-4 rounded-full text-[13px] font-semibold cursor-pointer border-0 uppercase tracking-[0.08em]"
                style={{
                  background: '#a8434b',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(168,67,75,0.3)',
                }}
                whileHover={{ scale: 1.04, boxShadow: '0 6px 28px rgba(168,67,75,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                Send your first letter
              </motion.button>

              <motion.button
                className="text-[13px] font-medium cursor-pointer bg-transparent border-0 flex items-center gap-2 uppercase tracking-[0.06em]"
                style={{ color: '#5a504a' }}
                whileHover={{ x: 4 }}
              >
                <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  View the gallery
                </span>
                <span>&rarr;</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right — Hero Image */}
          <motion.div
            className="flex-1 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
          >
            <div
              className="relative w-full max-w-[480px] lg:max-w-[520px] aspect-[4/3.2] rounded-lg overflow-hidden"
              style={{
                background: '#4a6b60',
                boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                border: '6px solid #fff',
              }}
            >
              {/* Envelope */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom: '10%', paddingRight: '10%' }}>
                <div className="relative">
                  <div
                    className="w-52 h-36 md:w-64 md:h-44 rounded-md relative"
                    style={{
                      background: 'linear-gradient(150deg, #f5f0ea, #e8dfcf)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                    }}
                  >
                    {/* Open flap */}
                    <div
                      className="absolute -top-8 md:-top-10 left-0 right-0 h-[50%]"
                      style={{
                        clipPath: 'polygon(0 100%, 50% 0%, 100% 100%)',
                        background: 'linear-gradient(180deg, #ede5d8, #e4dacb)',
                      }}
                    />
                    {/* Letter peeking out */}
                    <div
                      className="absolute -top-4 md:-top-5 left-3 right-3 h-12 md:h-14 rounded-t-sm"
                      style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                    >
                      <div className="p-3 space-y-1.5">
                        <div className="w-16 h-1 rounded-full" style={{ background: '#e0d8cf' }} />
                        <div className="w-24 h-1 rounded-full" style={{ background: '#e0d8cf' }} />
                      </div>
                    </div>
                    {/* Bottom fold V */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[50%]"
                      style={{
                        clipPath: 'polygon(0 0, 50% 80%, 100% 0, 100% 100%, 0 100%)',
                        background: 'linear-gradient(to bottom, transparent, #ede5d8)',
                        borderRadius: '0 0 6px 6px',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Coffee cup */}
              <div className="absolute bottom-8 right-8 md:bottom-10 md:right-10">
                <div className="relative">
                  <div
                    className="w-16 h-12 md:w-20 md:h-14 rounded-b-2xl rounded-t-sm"
                    style={{
                      background: '#fff',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                    }}
                  >
                    <div
                      className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 md:w-12 h-6 md:h-7 rounded-b-xl"
                      style={{ background: '#3a2218' }}
                    />
                  </div>
                  {/* Saucer */}
                  <div
                    className="w-20 md:w-24 h-2 rounded-full mx-auto -mt-0.5"
                    style={{ background: '#f0ebe5', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div style={{ height: 1, background: '#e8ddd5' }} />
      </div>

      {/* ─── Features Section ─── Full viewport */}
      <section id="features" className="min-h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div className="text-center mb-20 md:mb-28" {...fadeUp}>
            <p
              className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: '#a8434b' }}
            >
              The Process
            </p>
            <h2
              className="text-[2rem] md:text-[2.8rem] lg:text-[3.2rem] font-medium leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220', fontStyle: 'italic' }}
            >
              The slow art of digital writing
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
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
                {/* Icon circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-7"
                  style={{
                    background: '#fff',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                >
                  <span className="text-xl" style={{ color: '#7a4a4e' }}>{feature.icon}</span>
                </div>

                <h3
                  className="text-xl md:text-2xl font-medium mb-4"
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
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div style={{ height: 1, background: '#e8ddd5' }} />
      </div>

      {/* ─── Final CTA Section ─── Full viewport */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Pill label */}
          <motion.div {...fadeUp}>
            <span
              className="inline-block px-5 py-2 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase"
              style={{ background: '#f3e8e4', color: '#a8434b' }}
            >
              Join the correspondence
            </span>
          </motion.div>

          <motion.h2
            className="text-[2.4rem] md:text-[3.2rem] lg:text-[3.8rem] font-medium leading-[1.1] mt-8 mb-12"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220', fontStyle: 'italic' }}
            {...fadeUp}
          >
            Your words deserve a beautiful home.
          </motion.h2>

          <motion.div {...fadeUp}>
            <motion.button
              onClick={() => navigate('/create')}
              className="px-12 py-5 rounded-full text-[13px] font-semibold cursor-pointer border-0 uppercase tracking-[0.1em]"
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
            className="mt-10 text-[13px]"
            style={{ color: '#b5a99f', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}
            {...fadeUp}
          >
            Start your journey with a single thought. No credit card required.
          </motion.p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-8 md:px-16 lg:px-24 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid #e8ddd5' }}
      >
        <span
          className="text-base font-medium"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2a2220' }}
        >
          Letterly
        </span>

        <div className="flex items-center gap-8">
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

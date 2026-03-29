import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

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
            <div
              className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[600px] rounded-2xl overflow-visible relative"
              style={{
                aspectRatio: '16 / 10',
                background: 'linear-gradient(145deg, #5a7d6f, #4a6b60)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)',
                border: '6px solid #fff',
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Floating hearts */}
                {hearts.map((h, i) => (
                  <motion.span
                    key={i}
                    className="absolute pointer-events-none select-none"
                    style={{ fontSize: h.size, zIndex: 10 }}
                    initial={{ opacity: 0, y: 0, x: 0 }}
                    animate={{
                      opacity: [0, 0.9, 0.9, 0],
                      y: [0, h.y * 0.5, h.y],
                      x: [0, h.x * 0.5, h.x],
                      scale: [0.5, 1.1, 0.8],
                    }}
                    transition={{
                      duration: h.duration,
                      delay: h.delay,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: 'easeOut',
                    }}
                  >
                    {h.emoji}
                  </motion.span>
                ))}

                {/* Envelope body */}
                <div className="relative" style={{ marginTop: '6%' }}>
                  <div
                    className="w-52 h-36 sm:w-60 sm:h-40 md:w-72 md:h-48 lg:w-80 lg:h-56 rounded-lg relative"
                    style={{
                      background: 'linear-gradient(150deg, #f5f0ea, #e8dfcf)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                    }}
                  >
                    {/* Envelope flap — opens after delay */}
                    <motion.div
                      className="absolute left-0 right-0"
                      style={{
                        top: 0,
                        height: '55%',
                        clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                        background: 'linear-gradient(180deg, #e4dacb, #ddd2c2)',
                        transformOrigin: 'top center',
                      }}
                      initial={{ rotateX: 0, zIndex: 4 }}
                      animate={{
                        rotateX: [0, 0, 180, 180, 0],
                        zIndex: [4, 4, 1, 1, 4],
                      }}
                      transition={{
                        duration: 5,
                        delay: 1.2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: 'easeInOut',
                        times: [0, 0.1, 0.3, 0.7, 0.9],
                      }}
                    />

                    {/* Letter peeking out */}
                    <motion.div
                      className="absolute left-3 right-3 sm:left-4 sm:right-4 rounded-t-sm overflow-hidden"
                      style={{
                        background: '#fff',
                        boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
                        height: '55%',
                      }}
                      initial={{ top: '10%', zIndex: 2 }}
                      animate={{
                        top: ['10%', '10%', '-30%', '-30%', '10%'],
                        zIndex: [2, 2, 5, 5, 2],
                      }}
                      transition={{
                        duration: 5,
                        delay: 1.2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: 'easeInOut',
                        times: [0, 0.1, 0.35, 0.65, 0.9],
                      }}
                    >
                      <div className="p-3 sm:p-4 space-y-2">
                        <div className="w-14 sm:w-20 h-1 sm:h-1.5 rounded-full" style={{ background: '#e0d8cf' }} />
                        <div className="w-20 sm:w-28 h-1 sm:h-1.5 rounded-full" style={{ background: '#e0d8cf' }} />
                        <div className="w-16 sm:w-24 h-1 sm:h-1.5 rounded-full" style={{ background: '#e0d8cf' }} />
                      </div>
                    </motion.div>

                    {/* Bottom V fold */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[50%]"
                      style={{
                        clipPath: 'polygon(0 0, 50% 80%, 100% 0, 100% 100%, 0 100%)',
                        background: 'linear-gradient(to bottom, transparent, #ede5d8)',
                        borderRadius: '0 0 8px 8px',
                        zIndex: 3,
                      }}
                    />

                    {/* Wax seal */}
                    <motion.div
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle at 35% 35%, #c45a5a, #8b2e2e)',
                        boxShadow: '0 3px 10px rgba(139,46,46,0.4)',
                        zIndex: 4,
                      }}
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <span className="text-[10px] sm:text-[12px]" style={{ color: '#f5e0d0' }}>♥</span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Coffee cup */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">
                <motion.div
                  className="relative"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div
                    className="w-14 h-10 sm:w-16 sm:h-12 md:w-18 md:h-14 rounded-b-xl rounded-t-sm"
                    style={{ background: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
                  >
                    <div
                      className="absolute top-1 left-1/2 -translate-x-1/2 w-8 sm:w-10 md:w-12 h-5 sm:h-6 md:h-7 rounded-b-lg"
                      style={{ background: '#3a2218' }}
                    />
                  </div>
                  {/* Steam */}
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1"
                    animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="w-0.5 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.5)' }} />
                    <div className="w-0.5 h-4 rounded-full mt-1" style={{ background: 'rgba(255,255,255,0.4)' }} />
                    <div className="w-0.5 h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.5)' }} />
                  </motion.div>
                  <div
                    className="w-16 sm:w-18 md:w-22 h-1.5 rounded-full mx-auto"
                    style={{ background: '#f0ebe5', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}
                  />
                </motion.div>
              </div>
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

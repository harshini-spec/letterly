import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import CreatePage from './pages/CreatePage'
import LetterPage from './pages/LetterPage'

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/letter/:id" element={<LetterPage />} />
      </Routes>
    </AnimatePresence>
  )
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import HowItWorks from './howitworks.tsx'
import TechVerseApp from './decode.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/decode" element={<TechVerseApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

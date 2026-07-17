import { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import { ResumeModalProvider } from './context/ResumeModalContext';
import { SoundProvider } from './context/SoundContext';

// Lazy-load the heavy Three.js particle field

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <SoundProvider>
      <ResumeModalProvider>
        {/* ── Custom Cursor ── */}
      <CustomCursor />

      {/* ── Loading Screen ── */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* ── Main Portfolio (rendered behind loader, revealed after) ── */}
      <div
        className="min-h-screen w-full relative"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        {/* ── Global Noise Overlay ── */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />

        {/* ── Navigation ── */}
        <Navbar />

        {/* ── Main Content ── */}
        <main className="relative z-10">
          <Hero />

          {/* Section Divider */}
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <div className="section-divider" />
          </div>

          <About />

          {/* Section Divider */}
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <div className="section-divider" />
          </div>

          <Projects />

          {/* Section Divider */}
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <div className="section-divider" />
          </div>

          <Experience />

          {/* Section Divider */}
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <div className="section-divider" />
          </div>

          <Contact />
        </main>

        {/* ── Footer ── */}
        <Footer />

        {/* ── Resume Modal ── */}
        <ResumeModal />
      </div>
      </ResumeModalProvider>
    </SoundProvider>
  );
}

export default App;

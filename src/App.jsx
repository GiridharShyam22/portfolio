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

// Lazy-load the heavy Three.js particle field
const ParticleField = lazy(() => import('./components/3d/ParticleField'));

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
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
        {/* ── Global 3D Particle Background ── */}
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>

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
  );
}

export default App;

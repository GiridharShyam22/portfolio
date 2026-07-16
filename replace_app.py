import re

with open('src/App.jsx', 'r') as f:
    c = f.read()

c = c.replace("const ParticleField = lazy(() => import('./components/3d/ParticleField'));\n", "")

c = c.replace("""        {/* ── Global 3D Particle Background ── */}
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>""", """        {/* ── Global Noise Overlay ── */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: "url(\\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\\")" }} />""")

with open('src/App.jsx', 'w') as f:
    f.write(c)
print("Updated App.jsx with noise background.")

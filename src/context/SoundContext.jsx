import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

const SoundContext = createContext();

let audioCtx = null;
let masterGain = null;

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const contextRef = useRef(null);

  useEffect(() => {
    // Load preference from localStorage
    const saved = localStorage.getItem('cyber-sound');
    if (saved === 'true') {
      setSoundEnabled(true);
      initAudio();
    }
  }, []);

  const initAudio = () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.connect(audioCtx.destination);
      masterGain.gain.value = 0.15; // Global volume
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    contextRef.current = { audioCtx, masterGain };
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('cyber-sound', next.toString());
      if (next) initAudio();
      return next;
    });
  };

  const playHover = useCallback(() => {
    if (!soundEnabled || !audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime); // High pitch blip
    osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(masterGain);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  }, [soundEnabled]);

  const playClick = useCallback(() => {
    if (!soundEnabled || !audioCtx) return;

    // A low, solid mechanical "clack"
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(masterGain);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  }, [soundEnabled]);

  const playGlitch = useCallback(() => {
    if (!soundEnabled || !audioCtx) return;

    // White noise buffer for static/glitch sound
    const bufferSize = audioCtx.sampleRate * 0.1; // 100ms
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    noiseSource.start();
  }, [soundEnabled]);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playHover, playClick, playGlitch }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useCyberSounds() {
  return useContext(SoundContext);
}

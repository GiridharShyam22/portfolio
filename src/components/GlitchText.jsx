import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#_';

export default function GlitchText({ text, as = 'span', className = '' }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const Tag = as;

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    const startGlitch = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === ' ') return ' ';
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
        }

        iteration += 1 / 3;
      }, 30);
    };

    if (isHovering) {
      startGlitch();
    } else {
      setDisplayText(text);
    }

    return () => clearInterval(interval);
  }, [text, isHovering]);

  // Run once on mount
  useEffect(() => {
    setIsHovering(true);
    const t = setTimeout(() => setIsHovering(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.span
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Tag className={className}>{displayText}</Tag>
    </motion.span>
  );
}

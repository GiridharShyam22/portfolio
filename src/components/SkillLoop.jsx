import React from 'react';
import { motion } from 'framer-motion';
import {
  SiPython, SiTensorflow, SiOpencv, SiPytorch, SiScikitlearn,
  SiReact, SiNextdotjs, SiNodedotjs, SiFastapi, SiFlutter,
  SiMongodb, SiPostgresql, SiDocker, SiSocketdotio, SiWebrtc,
  SiFirebase, SiJsonwebtokens
} from 'react-icons/si';

const SKILLS_TOP = [
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8' },
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
  { name: 'Scikit-Learn', icon: SiScikitlearn, color: '#F7931E' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' }
];

const SKILLS_BOTTOM = [
  { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Socket.io', icon: SiSocketdotio, color: '#010101' },
  { name: 'WebRTC', icon: SiWebrtc, color: '#333333' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'JWT', icon: SiJsonwebtokens, color: '#000000' }
];

function SkillLoop() {
  return (
    <div className="w-full overflow-hidden relative flex flex-col gap-5 py-6 mt-8">
      {/* Left/Right Fade out to match the dark background */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 15%, transparent 85%, var(--color-bg) 100%)'
      }} />

      {/* Top Loop (Moves Left) */}
      <div className="flex w-max">
        <motion.div
          className="flex gap-5 pr-5"
          animate={{ x: "-50%" }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        >
          {/* We duplicate the array 4 times to ensure seamless infinite loop at high resolutions */}
          {[...SKILLS_TOP, ...SKILLS_TOP, ...SKILLS_TOP, ...SKILLS_TOP].map((skill, idx) => (
            <SkillCard key={`top-${idx}`} skill={skill} />
          ))}
        </motion.div>
      </div>

      {/* Bottom Loop (Moves Right) */}
      <div className="flex w-max">
        <motion.div
          className="flex gap-5 pr-5"
          animate={{ x: "0%" }}
          initial={{ x: "-50%" }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {[...SKILLS_BOTTOM, ...SKILLS_BOTTOM, ...SKILLS_BOTTOM, ...SKILLS_BOTTOM].map((skill, idx) => (
            <SkillCard key={`bot-${idx}`} skill={skill} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function SkillCard({ skill }) {
  const { icon: Icon } = skill;
  return (
    <div
      className="flex items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0 transition-all duration-300 hover:scale-110 hover:bg-[rgba(115,115,115,0.15)] group"
      style={{
        background: 'rgba(115,115,115,0.05)',
        border: '1px solid rgba(115,115,115,0.2)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}
    >
      <Icon size={28} className="text-[#e4e4e7] group-hover:text-white transition-colors duration-300" />
    </div>
  );
}

export default SkillLoop;

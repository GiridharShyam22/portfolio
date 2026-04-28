import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Code, Mail, FileText } from 'lucide-react';
import Dock from './Dock';

export default function Navbar() {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'experience', 'contact'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is above the middle of the screen
          if (rect.top <= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      if (current) {
        setActiveId(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check immediately on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = [
    { icon: Home, label: 'Home', href: '#home', id: 'home' },
    { icon: User, label: 'About', href: '#about', id: 'about' },
    { icon: Code, label: 'Projects', href: '#projects', id: 'projects' },
    { icon: Briefcase, label: 'Experience', href: '#experience', id: 'experience' },
    { icon: Mail, label: 'Contact', href: '#contact', id: 'contact' },
    { icon: FileText, label: 'Resume', href: '/CharansResume.pdf', id: 'resume', external: true },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <Dock items={items} activeId={activeId} />
    </nav>
  );
}

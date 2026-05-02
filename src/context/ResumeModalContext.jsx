import React, { createContext, useContext, useState } from 'react';

const ResumeModalContext = createContext(null);

export function ResumeModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ResumeModalContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  return useContext(ResumeModalContext);
}

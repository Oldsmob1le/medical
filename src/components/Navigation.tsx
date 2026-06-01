import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X } from '@phosphor-icons/react';

const navItems = [
  { name: 'Цели', href: '#goals' },
  { name: 'Деятельность', href: '#activities' },
  { name: 'Контакты', href: '#contacts' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300`}>
      <div className={`flex items-center justify-between w-full max-w-7xl px-6 rounded-full transition-all duration-300 ${scrolled ? 'py-2 glass-panel shadow-lg border border-white/20' : 'py-4 bg-transparent'}`}>
        <a href="/" className="flex items-center gap-3 group">
          <img src="/logo.svg" alt="MAVHL Logo" className="h-10 w-auto transition-transform group-hover:scale-105 active:scale-95" />
          <span className="text-xl font-black tracking-tighter text-brand-dark">MAVHL</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-text-base hover:text-brand-red transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-accent after:transition-all hover:after:w-full"
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#contacts" 
            className="bg-brand-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-red transition-all shadow-md shadow-brand-dark/10 active:scale-95"
          >
            Связаться
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-brand-dark"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-full left-4 right-4 mt-2 glass-panel border border-brand-dark/5 p-6 md:hidden shadow-2xl rounded-3xl"
          >
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-lg font-semibold text-text-base"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="#contacts" 
                className="bg-brand-dark text-white text-center py-4 rounded-2xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                Связаться с нами
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

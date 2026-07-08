/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, MapPin } from 'lucide-react';

interface HeaderProps {
  lang: 'en' | 'cz';
  setLang: (lang: 'en' | 'cz') => void;
  activeSection: string;
}

export default function Header({ lang, setLang, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection to add solid background to floating header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', en: 'Home', cz: 'Domů' },
    { id: 'about', en: 'About', cz: 'O nás' },
    { id: 'classes', en: 'Classes', cz: 'Třídy' },
    { id: 'fees', en: 'Fees', cz: 'Poplatky' },
    { id: 'team', en: 'Our Team', cz: 'Náš tým' },
    { id: 'register', en: 'Register', cz: 'Zápis' },
    { id: 'contact', en: 'Contact', cz: 'Kontakt' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      id="header-bar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-neutral-950/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-lg' 
          : 'bg-gradient-to-b from-neutral-950/80 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex flex-col items-start cursor-pointer text-left focus:outline-none group"
        >
          <span className="font-sans font-bold tracking-tight text-lg text-white transition-colors duration-200 group-hover:text-amber-400">
            {lang === 'en' ? 'Czech School' : 'Česká škola'}
          </span>
          <span className="font-mono text-[10px] tracking-widest text-neutral-400 flex items-center gap-1 uppercase">
            <MapPin className="w-2.5 h-2.5 text-amber-500" /> Warwick
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`relative px-4 py-2 font-sans text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer focus:outline-none ${
                  isActive 
                    ? 'text-white font-medium' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {lang === 'en' ? link.en : link.cz}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side Controls (Language & CTA) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="relative flex bg-neutral-900 border border-white/10 rounded-full p-0.5 shadow-inner">
            <button
              id="lang-btn-en"
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-[10px] font-sans font-semibold tracking-wider rounded-full transition-all duration-300 ${
                lang === 'en'
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              id="lang-btn-cz"
              onClick={() => setLang('cz')}
              className={`px-3 py-1 text-[10px] font-sans font-semibold tracking-wider rounded-full transition-all duration-300 ${
                lang === 'cz'
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              CZ
            </button>
          </div>

          {/* CTA Button */}
          <button
            id="header-cta-register"
            onClick={() => handleLinkClick('register')}
            className="px-4 py-2 bg-white/10 hover:bg-amber-400 hover:text-neutral-950 border border-white/10 hover:border-amber-400 rounded-full font-sans text-xs uppercase tracking-wider text-white transition-all duration-300 font-medium cursor-pointer"
          >
            {lang === 'en' ? 'Enroll Now' : 'Přihlásit dítě'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden space-x-3">
          {/* Mobile Language Switcher */}
          <button
            id="mobile-lang-switch"
            onClick={() => setLang(lang === 'en' ? 'cz' : 'en')}
            className="flex items-center gap-1 px-3 py-1.5 bg-neutral-900 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-wider text-neutral-300"
          >
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            {lang === 'en' ? 'CZ' : 'EN'}
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 w-full bg-neutral-950 border-b border-white/5 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full py-2.5 text-left font-sans text-sm uppercase tracking-wider border-b border-white/5 cursor-pointer ${
                    activeSection === link.id ? 'text-amber-400 font-medium' : 'text-neutral-400'
                  }`}
                >
                  {lang === 'en' ? link.en : link.cz}
                </button>
              ))}
              <div className="pt-2 flex flex-col space-y-3">
                <button
                  id="mobile-cta-enroll"
                  onClick={() => handleLinkClick('register')}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-neutral-950 rounded-full text-center font-sans text-xs uppercase tracking-wider font-semibold"
                >
                  {lang === 'en' ? 'Register Child' : 'Zapsat dítě'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

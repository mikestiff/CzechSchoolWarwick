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
    { id: 'fees', en: 'Fees', cz: 'Školné' },
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
          ? 'bg-white/90 backdrop-blur-xl border-b-2 border-amber-200/80 py-3 shadow-md shadow-amber-500/5' 
          : 'bg-gradient-to-b from-amber-100/80 via-amber-50/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 cursor-pointer text-left focus:outline-none group"
        >
          <div className="relative overflow-hidden rounded-xl border border-amber-300 shadow-sm bg-white p-0.5 transform group-hover:scale-105 transition-transform shrink-0">
            <img 
              src={`${import.meta.env.BASE_URL}czechschoolwarwick.jpg`}
              alt="Czech School Warwick Logo"
              className="h-11 w-auto object-contain rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-wide text-xl text-slate-800 transition-colors duration-200 group-hover:text-sky-600">
              {lang === 'en' ? 'Czech School Warwick' : 'Česká škola Warwick'}
            </span>
            <span className="font-sans font-semibold text-xs tracking-wider text-rose-500 flex items-center gap-1 uppercase">
              <MapPin className="w-3 h-3 text-amber-500" /> 11 Nelson Ave
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 bg-amber-100/60 p-1.5 rounded-full border border-amber-200/60 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`relative px-4 py-1.5 font-display text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer focus:outline-none rounded-full ${
                  isActive 
                    ? 'text-slate-900 font-bold bg-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {lang === 'en' ? link.en : link.cz}
              </button>
            );
          })}
        </nav>

        {/* Right Side Controls (Language & CTA) */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Language Switcher */}
          <div className="relative flex bg-slate-100 border border-slate-200 rounded-full p-1 shadow-inner">
            <button
              id="lang-btn-en"
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-xs font-display font-bold tracking-wider rounded-full transition-all duration-300 ${
                lang === 'en'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              id="lang-btn-cz"
              onClick={() => setLang('cz')}
              className={`px-3 py-1 text-xs font-display font-bold tracking-wider rounded-full transition-all duration-300 ${
                lang === 'cz'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CZ
            </button>
          </div>

          {/* CTA Button */}
          <button
            id="header-cta-register"
            onClick={() => handleLinkClick('register')}
            className="px-5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border-2 border-amber-300/80 rounded-full font-display text-xs uppercase tracking-wider text-slate-900 shadow-md hover:shadow-lg transition-all duration-300 font-bold cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {lang === 'en' ? 'Enroll Now' : 'Přihlásit dítě'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden space-x-2">
          {/* Mobile Language Switcher */}
          <button
            id="mobile-lang-switch"
            onClick={() => setLang(lang === 'en' ? 'cz' : 'en')}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 border border-amber-300 rounded-full text-xs font-display font-bold uppercase tracking-wider text-slate-800"
          >
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            {lang === 'en' ? 'CZ' : 'EN'}
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-800 hover:text-rose-500 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b-2 border-amber-300 shadow-xl md:hidden overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full py-2.5 text-left font-display text-base tracking-wider border-b border-amber-100 cursor-pointer ${
                    activeSection === link.id ? 'text-rose-600 font-bold' : 'text-slate-700'
                  }`}
                >
                  {lang === 'en' ? link.en : link.cz}
                </button>
              ))}
              <div className="pt-2 flex flex-col space-y-3">
                <button
                  id="mobile-cta-enroll"
                  onClick={() => handleLinkClick('register')}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-full text-center font-display text-sm uppercase tracking-wider font-bold shadow-md"
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

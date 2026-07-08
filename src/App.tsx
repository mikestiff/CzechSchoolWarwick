/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CLASSES_DATA, 
  TEACHERS_DATA, 
  FEES_DATA, 
  CONTACT_DETAILS, 
  IMAGE_ASSETS 
} from './data';
import { Teacher, ClassInfo } from './types';
import Header from './components/Header';
import ParallaxSection from './components/ParallaxSection';
import RegistrationForm from './components/RegistrationForm';
import { 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  BookOpen, 
  Music, 
  Palette, 
  ArrowDown, 
  ExternalLink,
  Users,
  Award,
  Globe,
  Smile,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'en' | 'cz'>('cz'); // Default to Czech as it's a Czech school!
  const [activeSection, setActiveSection] = useState('hero');
  const [activeTeacher, setActiveTeacher] = useState<Teacher | null>(null);
  const [teacherFilter, setTeacherFilter] = useState<'all' | 'management' | 'teachers'>('all');
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);

  // Intersection Observer for tracking active section
  useEffect(() => {
    const sections = ['hero', 'about', 'classes', 'fees', 'team', 'register', 'contact'];
    const observers = sections.map(id => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      }, {
        rootMargin: '-30% 0px -60% 0px' // triggers when section occupies the main center view
      });

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach(obs => {
        if (obs) obs.observer.unobserve(obs.element);
      });
    };
  }, []);

  // Filter teachers list
  const filteredTeachers = TEACHERS_DATA.filter(t => {
    if (teacherFilter === 'all') return true;
    if (teacherFilter === 'management') {
      return t.roleEn.toLowerCase().includes('director') || t.roleEn.toLowerCase().includes('founder') || t.roleEn.toLowerCase().includes('head');
    }
    if (teacherFilter === 'teachers') {
      return t.roleEn.toLowerCase().includes('teacher') || t.roleEn.toLowerCase().includes('assistant');
    }
    return true;
  });

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <div className="bg-neutral-950 text-white font-sans antialiased selection:bg-amber-400 selection:text-neutral-950 overflow-x-hidden">
      {/* Header */}
      <Header lang={lang} setLang={setLang} activeSection={activeSection} />

      {/* Hero Section */}
      <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${IMAGE_ASSETS.heroBg})`,
          }}
          referrerPolicy="no-referrer"
        />
        {/* Modern dark gradient backdrop */}
        <div className="absolute inset-0 bg-neutral-950/65 z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-neutral-950/40 z-2" />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4 flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-300">
              {lang === 'en' ? 'Supplemental Education in Warwick' : 'Doplňkové vzdělávání ve Warwicku'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 leading-[1.1]"
          >
            {lang === 'en' ? 'Czech School' : 'Česká škola'}
            <span className="block text-amber-400 font-sans font-light italic text-4xl md:text-6xl lg:text-7xl mt-2 tracking-wide">
              {lang === 'en' ? 'in Warwick' : 've Warwicku'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-neutral-300 text-sm md:text-lg max-w-xl mb-10 leading-relaxed font-light"
          >
            {lang === 'en' 
              ? 'Preserving our language, culture, and traditions for the next bilingual generation in the West Midlands.' 
              : 'Uchováváme český jazyk, kulturu a rodinné tradice pro další generaci bilingvních dětí.'}
          </motion.p>

          {/* Quick Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          >
            <button
              id="hero-enroll-btn"
              onClick={() => handleScrollTo('register')}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-500 text-neutral-950 font-sans text-xs uppercase tracking-wider font-bold rounded-full transition-all duration-300 shadow-xl shadow-amber-400/10 cursor-pointer w-full sm:w-auto"
            >
              {lang === 'en' ? 'Register Now' : 'Zapsat dítě k výuce'}
            </button>
            <button
              id="hero-learn-more"
              onClick={() => handleScrollTo('about')}
              className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full font-sans text-xs uppercase tracking-wider text-white transition-all duration-300 cursor-pointer w-full sm:w-auto"
            >
              {lang === 'en' ? 'Explore School' : 'Více informací'}
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          id="hero-scroll-indicator"
          onClick={() => handleScrollTo('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-neutral-500 hover:text-white transition-colors gap-2 cursor-pointer focus:outline-none"
        >
          <span className="font-mono text-[9px] uppercase tracking-widest">
            {lang === 'en' ? 'Scroll to explore' : 'Sjeďte níže'}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4 text-amber-400" />
          </motion.div>
        </motion.button>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative w-full">
        <ParallaxSection bgImage={IMAGE_ASSETS.learningBg} overlayOpacity={0.75}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Minimal Big Typography Left */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <span className="font-mono text-amber-400 text-xs tracking-widest uppercase flex items-center gap-2">
                <Info className="w-4 h-4" /> {lang === 'en' ? 'Bilingual Journey' : 'Cesta ke dvěma jazykům'}
              </span>
              <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                {lang === 'en' ? ' Fun, Friendship, & Language.' : 'Učení, které baví a spojuje.'}
              </h2>
              <div className="h-1 w-20 bg-amber-400 rounded-full mt-2" />
            </div>

            {/* Premium Glassmorphic Card Right */}
            <div className="lg:col-span-7 bg-neutral-900/65 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl space-y-6">
              <p className="font-sans text-neutral-300 text-base md:text-lg leading-relaxed font-light">
                {lang === 'en' 
                  ? 'Czech School Warwick is a supplement Saturday-Sunday school and nursery run entirely by volunteers. We help children of bilingual and Czech families build deep connections to the Czech language, history, geography, and rich cultural traditions.' 
                  : 'Česká škola ve Warwicku je nezisková víkendová škola a školka vedená dobrovolníky. Pomáháme dětem z dvojjazyčných a českých rodin udržovat a prohlubovat mateřský jazyk, objevovat českou historii, zeměpis a uchovávat naše tradice.'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5 font-sans">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-400/10 p-2 rounded-lg border border-amber-400/20 text-amber-400 mt-1">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-1">
                      {lang === 'en' ? 'Timings' : 'Čas výuky'}
                    </h4>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      {lang === 'en' ? CONTACT_DETAILS.timeEn : CONTACT_DETAILS.timeCz}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-amber-400/10 p-2 rounded-lg border border-amber-400/20 text-amber-400 mt-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-1">
                      {lang === 'en' ? 'Location' : 'Kde nás najdete'}
                    </h4>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      {CONTACT_DETAILS.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ParallaxSection>
      </section>

      {/* Classrooms Section */}
      <section id="classes" className="py-24 bg-neutral-950 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-amber-400 text-xs tracking-widest uppercase mb-3 block">
              {lang === 'en' ? 'Classroom Groups' : 'Naše třídy'}
            </span>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white tracking-tight">
              {lang === 'en' ? 'Tailored for Every Age' : 'Skupiny šité na míru věku'}
            </h2>
            <p className="font-sans text-neutral-400 text-sm mt-4 font-light leading-relaxed">
              {lang === 'en' 
                ? 'We split lessons into targeted, interactive age groupings to offer optimal speech development, reading, writing, and socialization.' 
                : 'Výuku rozdělujeme podle věkových skupin tak, abychom dětem poskytli nejlepší stimulaci pro čtení, psaní a konverzaci.'}
            </p>
          </div>

          {/* Elegant Bento-style Grid of Classes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {CLASSES_DATA.map((cls, index) => {
              const isSelected = selectedClass?.id === cls.id;
              return (
                <motion.div
                  key={cls.id}
                  id={`class-card-${cls.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedClass(isSelected ? null : cls)}
                  className={`group relative p-6 bg-neutral-900 border ${isSelected ? 'border-amber-400/50 shadow-lg shadow-amber-400/5' : 'border-white/5'} rounded-2xl cursor-pointer transition-all duration-300 hover:border-white/10 hover:bg-neutral-900/80 flex flex-col justify-between overflow-hidden`}
                >
                  <div className={`absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r ${cls.color}`} />
                  
                  <div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500 block mb-2 font-semibold">
                      {cls.age}
                    </span>
                    <h3 className="font-sans font-bold text-lg text-white mb-3 group-hover:text-amber-400 transition-colors">
                      {lang === 'en' ? cls.nameEn : cls.nameCz}
                    </h3>
                    <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light mb-6">
                      {lang === 'en' ? cls.descriptionEn : cls.descriptionCz}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-mono uppercase tracking-wider">
                    <span>{lang === 'en' ? 'View Schedule' : 'Zobrazit lekce'}</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Expansion Panel for selected class calendar */}
          <AnimatePresence>
            {selectedClass && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-12 bg-neutral-900/60 border border-amber-400/20 rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <h4 className="font-sans font-bold text-lg text-white mb-2">
                      {lang === 'en' ? `${selectedClass.nameEn} Details` : `Podrobnosti o třídě: ${selectedClass.nameCz}`}
                    </h4>
                    <p className="text-neutral-400 text-xs leading-relaxed max-w-xl font-light">
                      {lang === 'en' 
                        ? 'Classes take place bi-weekly. Lessons combine vocabulary acquisition with songs, arts, crafts, movement, and standard Czech school curriculum.' 
                        : 'Lekce probíhají každých 14 dní. Výuka v této skupině propojuje osvojování slovní zásoby s tvořením, zpíváním, tělocvikem a klasickým učivem dle českých osnov.'}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <button
                      id="close-class-panel"
                      onClick={() => setSelectedClass(null)}
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-400 rounded-lg border border-white/5"
                    >
                      {lang === 'en' ? 'Hide Details' : 'Skrýt detaily'}
                    </button>
                    <button
                      id="btn-class-register"
                      onClick={() => handleScrollTo('register')}
                      className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-neutral-950 text-xs font-sans font-bold uppercase tracking-wider rounded-lg shadow-md cursor-pointer"
                    >
                      {lang === 'en' ? 'Enroll' : 'Zapsat se'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Activities Parallax Section */}
      <section id="activities" className="relative w-full">
        <ParallaxSection bgImage={IMAGE_ASSETS.activitiesBg} overlayOpacity={0.8}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Elegant glass card left */}
            <div className="lg:col-span-7 bg-neutral-900/70 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl space-y-8">
              <div>
                <span className="font-mono text-amber-400 text-xs tracking-widest uppercase block mb-2">
                  {lang === 'en' ? 'Rich Learning Activities' : 'Rozmanitý program'}
                </span>
                <h3 className="font-serif font-bold text-3xl md:text-4xl text-white tracking-tight">
                  {lang === 'en' ? 'Beyond Standard Reading & Writing' : 'Více než jen čtení a psaní'}
                </h3>
              </div>

              {/* Core Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
                <div className="space-y-3">
                  <div className="h-10 w-10 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-xl flex items-center justify-center">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-sm">
                    {lang === 'en' ? 'Arts & Crafts' : 'Výtvarné dílny'}
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    {lang === 'en' 
                      ? 'Interactive crafts integrated directly with linguistic vocabulary and history lessons.' 
                      : 'Výtvarné projekty tematicky propojené s probíranou slovní zásobou a českými reáliemi.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="h-10 w-10 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-xl flex items-center justify-center">
                    <Music className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-sm">
                    {lang === 'en' ? 'Music & Dance' : 'Zpěv & Tancování'}
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    {lang === 'en' 
                      ? 'Exploring Czech nursery rhymes, folklore songs, and active movement blocks.' 
                      : 'Zpívání lidových písniček, říkanek a pohybové hry pro udržení rytmu a radosti.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="h-10 w-10 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-xl flex items-center justify-center">
                    <Smile className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-sm">
                    {lang === 'en' ? 'Special Events' : 'Oslavy a akce'}
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    {lang === 'en' 
                      ? 'St. Nicholas, Christmas events, Easter workshops, Olympic days, and forest trips.' 
                      : 'Mikulášská nadílka, vánoční besídka, velikonoční dílny, školní olympiáda a společné výlety.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Typography Right */}
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-amber-400 text-xs tracking-widest uppercase flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> {lang === 'en' ? 'Curriculum focus' : 'Způsob naší výuky'}
              </span>
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-white tracking-tight leading-tight">
                {lang === 'en' ? 'Teaching through rich cultural experiences' : 'Učíme prožitkem a hrou'}
              </h2>
              <p className="font-sans text-neutral-400 text-sm font-light leading-relaxed">
                {lang === 'en' 
                  ? 'We organize special themed community workshops alongside the Slovak school, believing strongly in the closeness of our languages and cultures.' 
                  : 'Pořádáme také tematické dílny ve spolupráci se slovenskou školou. Věříme v udržování blízkých vztahů a vzájemné jazykové příbuznosti našich kultur.'}
              </p>
            </div>
          </div>
        </ParallaxSection>
      </section>

      {/* Fees & Calendar Section */}
      <section id="fees" className="py-24 bg-neutral-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-amber-400 text-xs tracking-widest uppercase mb-3 block">
              {lang === 'en' ? 'Tuition Fees & Terms' : 'Poplatky & Trimestry'}
            </span>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white tracking-tight">
              {lang === 'en' ? 'Transparent Fees, Clear Dates' : 'Přehledné školné a termíny'}
            </h2>
            <p className="font-sans text-neutral-400 text-sm mt-4 font-light leading-relaxed">
              {lang === 'en' 
                ? 'We operate on a transparent pricing model per term. Sibling discounts are automatically calculated to help families.' 
                : 'Školné funguje na bázi trimestrálních plateb. Pro rodiny s více dětmi automaticky poskytujeme sourozenecké slevy.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Term Date Cards */}
            {FEES_DATA.terms.map((term, idx) => (
              <div 
                key={term.id}
                id={`term-card-${term.id}`}
                className="bg-neutral-900 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                      {lang === 'en' ? `Term 0${idx+1}` : `Trimestr 0${idx+1}`}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 bg-white/5 px-2 py-1 rounded">
                      {term.sessions} {lang === 'en' ? 'lessons' : 'lekcí'}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-lg text-white mb-2">
                    {lang === 'en' ? term.nameEn : term.nameCz}
                  </h3>

                  {/* Dates List */}
                  <div className="flex flex-wrap gap-1.5 mt-4 mb-6">
                    {term.dates.map((date, dIdx) => (
                      <span key={dIdx} className="font-mono text-[9px] px-2 py-1 bg-neutral-950 text-neutral-400 rounded border border-white/5">
                        {date}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">{lang === 'en' ? 'First Child' : '1. dítě'}</span>
                    <span className="text-white font-bold text-sm">£{term.priceChild.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">{lang === 'en' ? 'Sibling Discount' : 'Sourozenec sleva'}</span>
                    <span className="text-amber-400 font-bold text-sm">£{term.priceSibling.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Bank Details alert bar */}
          <div className="bg-neutral-900/50 rounded-2xl border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto font-sans">
            <div className="flex items-center gap-4 text-left">
              <div className="h-10 w-10 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-xl flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">
                  {lang === 'en' ? 'Supporter of Supplementary Education' : 'Nezisková organizace'}
                </h4>
                <p className="text-neutral-400 text-xs font-light">
                  {lang === 'en' 
                    ? 'All payments contribute strictly to volunteer teaching resources, books, and educational space leases.' 
                    : 'Veškeré platby slouží výhradně k zajištění prostor, učebních pomůcek a českých knih pro výuku.'}
                </p>
              </div>
            </div>
            <button
              id="bank-cta-register"
              onClick={() => handleScrollTo('register')}
              className="px-6 py-3 bg-white text-neutral-950 hover:bg-amber-400 hover:text-neutral-950 font-sans text-xs uppercase tracking-wider font-bold rounded-xl transition-all duration-300 shrink-0 cursor-pointer"
            >
              {lang === 'en' ? 'View Payment Details' : 'Zobrazit podrobnosti plateb'}
            </button>
          </div>
        </div>
      </section>

      {/* Teachers / Team Section */}
      <section id="team" className="py-24 bg-neutral-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-amber-400 text-xs tracking-widest uppercase mb-3 block">
              {lang === 'en' ? 'Our Dedicated Team' : 'Náš tým'}
            </span>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white tracking-tight">
              {lang === 'en' ? 'Meet our teachers and organizers' : 'Seznamte se s našimi učitelkami'}
            </h2>
            <p className="font-sans text-neutral-400 text-sm mt-4 font-light leading-relaxed">
              {lang === 'en' 
                ? 'An enthusiastic, professional team of bilingual parents, historians, philologists, and education specialists.' 
                : 'Náš tým tvoří nadšené a kvalifikované učitelky, maminky, historičky umění a absolventky pedagogických fakult.'}
            </p>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center bg-neutral-900 border border-white/10 rounded-full p-1 mt-8 max-w-sm mx-auto">
              <button
                id="filter-all"
                onClick={() => setTeacherFilter('all')}
                className={`flex-1 py-2 text-center font-sans text-[10px] font-bold tracking-wider rounded-full uppercase transition-all duration-300 cursor-pointer ${
                  teacherFilter === 'all'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {lang === 'en' ? 'All' : 'Všechny'}
              </button>
              <button
                id="filter-mgt"
                onClick={() => setTeacherFilter('management')}
                className={`flex-1 py-2 text-center font-sans text-[10px] font-bold tracking-wider rounded-full uppercase transition-all duration-300 cursor-pointer ${
                  teacherFilter === 'management'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {lang === 'en' ? 'Leadership' : 'Vedení'}
              </button>
              <button
                id="filter-teachers"
                onClick={() => setTeacherFilter('teachers')}
                className={`flex-1 py-2 text-center font-sans text-[10px] font-bold tracking-wider rounded-full uppercase transition-all duration-300 cursor-pointer ${
                  teacherFilter === 'teachers'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {lang === 'en' ? 'Teachers' : 'Výuka'}
              </button>
            </div>
          </div>

          {/* Grid of Teachers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                id={`teacher-card-${teacher.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setActiveTeacher(teacher)}
                className="group bg-neutral-900 border border-white/5 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-amber-400/30 hover:bg-neutral-900/85 hover:shadow-lg hover:shadow-amber-400/2 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[9px] tracking-widest uppercase text-amber-400 block mb-2 font-semibold">
                    {lang === 'en' ? teacher.roleEn : teacher.roleCz}
                  </span>
                  <h3 className="font-sans font-bold text-lg text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {teacher.name}
                  </h3>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed line-clamp-3 font-light mb-6">
                    {lang === 'en' ? teacher.bioEn : teacher.bioCz}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-neutral-500 group-hover:text-amber-400 text-[10px] font-mono uppercase tracking-wider transition-colors pt-4 border-t border-white/5">
                  <span>{lang === 'en' ? 'Read full bio' : 'Zobrazit celý profil'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Teacher Bio Modal Dialog */}
        <AnimatePresence>
          {activeTeacher && (
            <motion.div
              id="teacher-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="relative bg-neutral-900 border border-white/10 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl p-8 md:p-10 text-left font-sans"
              >
                <button
                  id="close-teacher-modal"
                  onClick={() => setActiveTeacher(null)}
                  className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  ✕
                </button>

                <span className="font-mono text-[10px] tracking-widest uppercase text-amber-400 block mb-2 font-bold">
                  {lang === 'en' ? activeTeacher.roleEn : activeTeacher.roleCz}
                </span>

                <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-6">
                  {activeTeacher.name}
                </h3>

                <div className="h-0.5 w-16 bg-amber-400 rounded mb-6" />

                <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
                  {lang === 'en' ? activeTeacher.bioEn : activeTeacher.bioCz}
                </p>

                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button
                    id="btn-close-modal-footer"
                    onClick={() => setActiveTeacher(null)}
                    className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Close' : 'Zavřít'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-24 bg-neutral-950 border-b border-white/5 relative">
        {/* Glow backdrop decorative bubbles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-amber-400 text-xs tracking-widest uppercase mb-3 block">
              {lang === 'en' ? 'Enrolment' : 'Zápis a rezervace'}
            </span>
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-white tracking-tight">
              {lang === 'en' ? 'Secure Your Seat Today' : 'Rezervujte si místo pro výuku'}
            </h2>
            <p className="font-sans text-neutral-400 text-sm mt-4 font-light leading-relaxed">
              {lang === 'en' 
                ? 'Enroll your child dynamically below. Once submitted, we will pre-reserve a desk and generate your tuition invoice reference.' 
                : 'Vyplňte rychlou přihlášku níže. Obratem vám zarezervujeme místo v příslušné třídě a vygenerujeme platební kód.'}
            </p>
          </div>

          <RegistrationForm lang={lang} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
            {/* Location & Details Left */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div>
                <span className="font-mono text-amber-400 text-xs tracking-widest uppercase block mb-2">
                  {lang === 'en' ? 'Get In Touch' : 'Kontaktujte nás'}
                </span>
                <h2 className="font-serif font-bold text-4xl md:text-5xl text-white tracking-tight leading-tight">
                  {lang === 'en' ? 'Always here for our families' : 'Budujme komunitu společně'}
                </h2>
              </div>

              <div className="space-y-6 font-sans text-sm">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-amber-400 mt-1 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      {lang === 'en' ? 'School Premises' : 'Místo konání výuky'}
                    </h4>
                    <p className="text-neutral-400 text-xs leading-relaxed max-w-xs">
                      Emscote Infant School, All Saints Road, Warwick, CV34 5NH
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-amber-400 mt-1 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      {lang === 'en' ? 'Czech School Email' : 'E-mail české školy'}
                    </h4>
                    <a href={`mailto:${CONTACT_DETAILS.emails.czechSchool}`} className="text-neutral-400 hover:text-amber-400 transition-colors text-xs font-mono">
                      {CONTACT_DETAILS.emails.czechSchool}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-amber-400 mt-1 shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      {lang === 'en' ? 'Slovak School Partner' : 'Slovenská škola (Partner)'}
                    </h4>
                    <a href={`mailto:${CONTACT_DETAILS.emails.slovakSchool}`} className="text-neutral-400 hover:text-amber-400 transition-colors text-xs font-mono">
                      {CONTACT_DETAILS.emails.slovakSchool}
                    </a>
                  </div>
                </div>
              </div>

              {/* Partners section */}
              <div className="pt-8 border-t border-white/5 space-y-4">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">
                  {lang === 'en' ? 'Official partners & sponsors' : 'Naši vážení partneři'}
                </span>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-neutral-400">
                  <div className="bg-neutral-900 border border-white/5 rounded-xl p-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span>Embassy of CZ</span>
                  </div>
                  <div className="bg-neutral-900 border border-white/5 rounded-xl p-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>MŠMT ČR</span>
                  </div>
                  <div className="bg-neutral-900 border border-white/5 rounded-xl p-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-white" />
                    <span>Czech Centre</span>
                  </div>
                  <div className="bg-neutral-900 border border-white/5 rounded-xl p-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-400" />
                    <span>Ministry of FA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Inquiry Form Right */}
            <div className="lg:col-span-7 bg-neutral-900 border border-white/5 p-8 md:p-12 rounded-3xl relative">
              <h3 className="font-sans font-bold text-2xl text-white mb-3">
                {lang === 'en' ? 'Send a Quick Message' : 'Napište nám zprávu'}
              </h3>
              <p className="font-sans text-xs text-neutral-400 mb-8 font-light leading-relaxed">
                {lang === 'en' 
                  ? 'Have a specific question about classrooms, schedule, or volunteering? Message us directly.' 
                  : 'Máte dotaz ohledně věkových skupin, kalendáře nebo byste se chtěli stát naším dobrovolníkem? Dejte nám vědět.'}
              </p>

              <form 
                id="contact-form-inquires"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(lang === 'en' ? 'Message sent successfully! We will get back to you shortly.' : 'Zpráva byla úspěšně odeslána! Ozveme se vám zpět v nejbližší době.');
                }}
                className="space-y-6 font-sans text-left"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      {lang === 'en' ? 'Your Name' : 'Vaše jméno'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Marie Nováková"
                      className="w-full bg-neutral-950/60 border border-white/10 focus:border-amber-400 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      {lang === 'en' ? 'Your Email' : 'Váš e-mail'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="marie@email.com"
                      className="w-full bg-neutral-950/60 border border-white/10 focus:border-amber-400 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    {lang === 'en' ? 'Your Message' : 'Text zprávy'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={lang === 'en' ? 'Tell us what you would like to know...' : 'Napište svůj dotaz...'}
                    className="w-full bg-neutral-950/60 border border-white/10 focus:border-amber-400 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="w-full py-4 bg-white hover:bg-amber-400 hover:text-neutral-950 text-neutral-950 font-sans text-xs uppercase tracking-wider font-bold rounded-xl transition-all duration-300 shadow-md shadow-amber-400/5 cursor-pointer"
                >
                  {lang === 'en' ? 'Send Message' : 'Odeslat zprávu'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Footer */}
      <footer className="border-t border-white/5 bg-neutral-950 py-12 text-center font-mono text-[10px] text-neutral-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <p className="text-neutral-400 font-bold uppercase tracking-wider text-xs">
              {lang === 'en' ? 'CZECH & SLOVAK CLUB ENGLAND C.I.C.' : 'CZECH & SLOVAK CLUB ENGLAND C.I.C.'}
            </p>
            <p>Registered Seat: 4 Arden Close, Warwick, CV34 5SN</p>
            <p>{CONTACT_DETAILS.companyNo}</p>
          </div>
          <div className="text-right space-y-1">
            <p>© {new Date().getFullYear()} Czech School in Warwick. All rights reserved.</p>
            <p>Made for the Czech Supplementary School & Nursery Warwick community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

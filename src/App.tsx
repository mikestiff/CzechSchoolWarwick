/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CLASSES_DATA, 
  TEACHERS_DATA,
  EVENTS_DATA,
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
    const sections = ['hero', 'about', 'classes', 'fees', 'calendar', 'team', 'register', 'contact'];
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
    <div className="bg-amber-50/50 text-slate-800 font-sans antialiased selection:bg-amber-300 selection:text-slate-900 overflow-x-hidden">
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
        {/* Playful warm backdrop overlay */}
        <div className="absolute inset-0 bg-amber-900/40 backdrop-brightness-95 z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-50 via-transparent to-amber-900/50 z-2" />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4 flex items-center gap-2 bg-white/90 border-2 border-amber-300 rounded-full px-5 py-2 backdrop-blur-md shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-bounce" />
            <span className="font-display font-bold text-xs tracking-wider uppercase text-slate-800">
              {lang === 'en' ? 'Supplemental Education in Warwick' : 'Doplňkové vzdělávání ve Warwicku'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tight text-white mb-2 leading-[1.05] drop-shadow-md"
          >
            {lang === 'en' ? 'Czech School Warwick' : 'Česká škola Warwick'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-white text-base md:text-xl max-w-2xl mb-10 leading-relaxed font-semibold drop-shadow-sm"
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
              className="px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-slate-900 font-display text-sm uppercase tracking-wider font-bold rounded-full transition-all duration-300 shadow-xl hover:scale-105 border-2 border-amber-300 cursor-pointer w-full sm:w-auto"
            >
              {lang === 'en' ? 'Register Now' : 'Zapsat dítě k výuce'}
            </button>
            <button
              id="hero-learn-more"
              onClick={() => handleScrollTo('about')}
              className="px-8 py-4 bg-white/90 hover:bg-white text-slate-800 border-2 border-amber-200 rounded-full font-display text-sm uppercase tracking-wider font-bold transition-all duration-300 shadow-md hover:scale-105 cursor-pointer w-full sm:w-auto"
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/90 hover:text-white transition-colors gap-2 cursor-pointer focus:outline-none"
        >
          <span className="font-display font-bold text-xs uppercase tracking-widest drop-shadow-sm">
            {lang === 'en' ? 'Scroll to explore' : 'Sjeďte níže'}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-amber-300 drop-shadow" />
          </motion.div>
        </motion.button>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative w-full">
        <ParallaxSection bgImage={IMAGE_ASSETS.learningBg} overlayOpacity={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Minimal Big Typography Left */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <span className="font-display font-bold text-amber-200 text-xs tracking-widest uppercase flex items-center gap-2 bg-amber-900/70 backdrop-blur-md px-4 py-1.5 rounded-full w-fit shadow-md border border-amber-400/30">
                <Info className="w-4 h-4 text-amber-400" /> {lang === 'en' ? 'Bilingual Journey' : 'Cesta ke dvěma jazykům'}
              </span>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight drop-shadow-md">
                {lang === 'en' ? ' Fun, Friendship, & Language.' : 'Učení, které baví a spojuje.'}
              </h2>
              <div className="h-2 w-24 bg-amber-400 rounded-full mt-2" />
            </div>

            {/* Premium Playful Glassmorphic Card Right */}
            <div className="lg:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl border-2 border-amber-200 p-8 md:p-12 shadow-xl space-y-6 text-slate-800">
              <p className="font-sans text-slate-700 text-base md:text-lg leading-relaxed font-medium">
                {lang === 'en' 
                  ? 'Czech School Warwick is a supplement Saturday-Sunday school and nursery run entirely by volunteers. We help children of bilingual and Czech families build deep connections to the Czech language, history, geography, and rich cultural traditions.' 
                  : 'Česká škola ve Warwicku je nezisková víkendová škola a školka vedená dobrovolníky. Pomáháme dětem z dvojjazyčných a českých rodin udržovat a prohlubovat mateřský jazyk, objevovat českou historii, zeměpis a uchovávat naše tradice.'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-amber-200 font-sans">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2.5 rounded-2xl border border-amber-200 text-amber-600 mt-1 shadow-sm">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 text-xs font-display font-bold uppercase tracking-wider mb-1">
                      {lang === 'en' ? 'Timings' : 'Čas výuky'}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed font-medium">
                      {lang === 'en' ? CONTACT_DETAILS.timeEn : CONTACT_DETAILS.timeCz}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2.5 rounded-2xl border border-amber-200 text-amber-600 mt-1 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 text-xs font-display font-bold uppercase tracking-wider mb-1">
                      {lang === 'en' ? 'Location' : 'Kde nás najdete'}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed font-medium">
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
      <section id="classes" className="py-24 bg-gradient-to-b from-amber-50 via-sky-50/50 to-amber-50/80 border-b border-amber-200/60 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-display font-bold text-amber-700 text-xs tracking-widest uppercase mb-3 block bg-amber-100/90 px-4 py-1.5 rounded-full w-fit mx-auto border border-amber-300 shadow-sm">
              {lang === 'en' ? 'Classroom Groups' : 'Naše třídy'}
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-slate-800 tracking-tight">
              {lang === 'en' ? 'Tailored for Every Age' : 'Skupiny šité na míru věku'}
            </h2>
            <p className="font-sans text-slate-600 text-base mt-4 font-medium leading-relaxed">
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
                  className={`group relative p-6 bg-white border-2 ${isSelected ? 'border-amber-400 ring-2 ring-amber-300 shadow-xl' : 'border-amber-200 hover:border-amber-400'} rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden shadow-sm`}
                >
                  <div className={`absolute top-0 left-0 h-2 w-full bg-gradient-to-r ${cls.color}`} />
                  
                  <div>
                    <span className="font-display text-xs tracking-wider uppercase text-amber-800 block mb-3 font-bold bg-amber-100/80 px-3 py-1 rounded-full w-fit">
                      {cls.age}
                    </span>
                    <h3 className="font-display font-bold text-xl text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">
                      {lang === 'en' ? cls.nameEn : cls.nameCz}
                    </h3>
                    <p className="font-sans text-xs text-slate-600 leading-relaxed font-normal mb-6">
                      {lang === 'en' ? cls.descriptionEn : cls.descriptionCz}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-amber-600 text-xs font-display font-bold uppercase tracking-wider">
                    <span>{lang === 'en' ? 'View Details' : 'Zobrazit lekce'}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
                className="mt-12 bg-white border-2 border-amber-300 rounded-3xl p-6 md:p-8 shadow-xl text-slate-800"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <h4 className="font-display font-bold text-xl text-slate-800 mb-2">
                      {lang === 'en' ? `${selectedClass.nameEn} Details` : `Podrobnosti o třídě: ${selectedClass.nameCz}`}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed max-w-xl font-normal">
                      {lang === 'en' 
                        ? 'Classes take place bi-weekly. Lessons combine vocabulary acquisition with songs, arts, crafts, movement, and standard Czech school curriculum.' 
                        : 'Lekce probíhají každých 14 dní. Výuka v této skupině propojuje osvojování slovní zásoby s tvořením, zpíváním, tělocvikem a klasickým učivem dle českých osnov.'}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <button
                      id="close-class-panel"
                      onClick={() => setSelectedClass(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-display font-bold text-slate-600 rounded-xl border border-slate-300 transition-colors"
                    >
                      {lang === 'en' ? 'Hide Details' : 'Skrýt detaily'}
                    </button>
                    <button
                      id="btn-class-register"
                      onClick={() => handleScrollTo('register')}
                      className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-display font-bold uppercase tracking-wider rounded-xl shadow-md border border-amber-300 cursor-pointer transition-all"
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
        <ParallaxSection bgImage={IMAGE_ASSETS.activitiesBg} overlayOpacity={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Elegant glass card left */}
            <div className="lg:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl border-2 border-amber-200 p-8 md:p-12 shadow-xl space-y-8 text-slate-800">
              <div>
                <span className="font-display font-bold text-rose-500 text-xs tracking-widest uppercase block mb-2 bg-rose-100/80 px-3 py-1 rounded-full w-fit border border-rose-200">
                  {lang === 'en' ? 'Rich Learning Activities' : 'Rozmanitý program'}
                </span>
                <h3 className="font-display font-extrabold text-3xl md:text-4xl text-slate-800 tracking-tight">
                  {lang === 'en' ? 'Beyond Standard Reading & Writing' : 'Více než jen čtení a psaní'}
                </h3>
              </div>

              {/* Core Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
                <div className="space-y-3">
                  <div className="h-12 w-12 bg-rose-100 border border-rose-200 text-rose-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <Palette className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-slate-800 text-base">
                    {lang === 'en' ? 'Arts & Crafts' : 'Výtvarné dílny'}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-normal">
                    {lang === 'en' 
                      ? 'Interactive crafts integrated directly with linguistic vocabulary and history lessons.' 
                      : 'Výtvarné projekty tematicky propojené s probíranou slovní zásobou a českými reáliemi.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="h-12 w-12 bg-sky-100 border border-sky-200 text-sky-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <Music className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-slate-800 text-base">
                    {lang === 'en' ? 'Music & Dance' : 'Zpěv & Tancování'}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-normal">
                    {lang === 'en' 
                      ? 'Exploring Czech nursery rhymes, folklore songs, and active movement blocks.' 
                      : 'Zpívání lidových písniček, říkanek a pohybové hry pro udržení rytmu a radosti.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="h-12 w-12 bg-amber-100 border border-amber-200 text-amber-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <Smile className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-slate-800 text-base">
                    {lang === 'en' ? 'Special Events' : 'Oslavy a akce'}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-normal">
                    {lang === 'en' 
                      ? 'St. Nicholas, Christmas events, Easter workshops, Olympic days, and forest trips.' 
                      : 'Mikulášská nadílka, vánoční besídka, velikonoční dílny, školní olympiáda a společné výlety.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Typography Right */}
            <div className="lg:col-span-5 space-y-4">
              <span className="font-display font-bold text-amber-200 text-xs tracking-widest uppercase flex items-center gap-2 bg-amber-900/70 backdrop-blur-md px-4 py-1.5 rounded-full w-fit shadow-md border border-amber-400/30">
                <BookOpen className="w-4 h-4 text-amber-300" /> {lang === 'en' ? 'Curriculum focus' : 'Způsob naší výuky'}
              </span>
              <h2 className="font-display font-black text-4xl md:text-5xl text-white tracking-tight leading-tight drop-shadow-md">
                {lang === 'en' ? 'Teaching through rich cultural experiences' : 'Učíme prožitkem a hrou'}
              </h2>
              <p className="font-sans text-white text-base font-semibold leading-relaxed drop-shadow-sm">
                {lang === 'en' 
                  ? 'We organize special themed community workshops alongside the Slovak school, believing strongly in the closeness of our languages and cultures.' 
                  : 'Pořádáme také tematické dílny ve spolupráci se slovenskou školou. Věříme v udržování blízkých vztahů a vzájemné jazykové příbuznosti našich kultur.'}
              </p>
            </div>
          </div>
        </ParallaxSection>
      </section>

      {/* Fees & Calendar Section */}
      <section id="fees" className="py-24 bg-gradient-to-b from-amber-50 via-white to-sky-50/60 border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-display font-bold text-sky-700 text-xs tracking-widest uppercase mb-3 block bg-sky-100/90 px-4 py-1.5 rounded-full w-fit mx-auto border border-sky-300 shadow-sm">
              {lang === 'en' ? 'Tuition Fees & Terms' : 'Školné & Pololetí'}
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-slate-800 tracking-tight">
              {lang === 'en' ? 'Transparent Fees, Clear Dates' : 'Přehledné školné a termíny'}
            </h2>
            <p className="font-sans text-slate-600 text-base mt-4 font-medium leading-relaxed">
              {lang === 'en' 
                ? 'We operate on a transparent pricing model per term. Sibling discounts are automatically calculated to help families.' 
                : 'Školné funguje na bázi pololetních plateb. Pro rodiny s více dětmi automaticky poskytujeme sourozenecké slevy.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Term Date Cards */}
            {FEES_DATA.terms.map((term, idx) => (
              <div 
                key={term.id}
                id={`term-card-${term.id}`}
                className="bg-white border-2 border-amber-200 rounded-3xl p-6 hover:border-amber-400 hover:shadow-xl transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                    <span className="text-xs font-display text-sky-600 font-bold uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                      {lang === 'en' ? `Term 0${idx+1}` : `Pololetí 0${idx+1}`}
                    </span>
                    <span className="text-xs font-display font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {term.sessions} {lang === 'en' ? 'lessons' : 'lekcí'}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-slate-800 mb-2">
                    {lang === 'en' ? term.nameEn : term.nameCz}
                  </h3>

                  {/* Dates List */}
                  <div className="flex flex-wrap gap-1.5 mt-4 mb-6">
                    {term.dates.map((date, dIdx) => (
                      <span key={dIdx} className="font-display text-xs font-bold px-2.5 py-1 bg-amber-50 text-slate-700 rounded-xl border border-amber-200">
                        {date}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-amber-200 flex items-center justify-between font-sans text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-display font-bold uppercase tracking-wider">{lang === 'en' ? 'First Child' : '1. dítě'}</span>
                    <span className="text-slate-800 font-display font-bold text-lg">£{term.priceChild.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px] font-display font-bold uppercase tracking-wider">{lang === 'en' ? 'Sibling Discount' : 'Sourozenec sleva'}</span>
                    <span className="text-amber-600 font-display font-bold text-lg">£{term.priceSibling.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Bank Details alert bar */}
          <div className="bg-amber-100/80 rounded-3xl border-2 border-amber-300 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto font-sans shadow-md">
            <div className="flex items-center gap-4 text-left">
              <div className="h-12 w-12 bg-amber-400 text-slate-900 border border-amber-300 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-800 font-display font-bold text-base">
                  {lang === 'en' ? 'Supporter of Supplementary Education' : 'Nezisková organizace'}
                </h4>
                <p className="text-slate-600 text-xs font-medium">
                  {lang === 'en' 
                    ? 'All payments contribute strictly to volunteer teaching resources, books, and educational space leases.' 
                    : 'Veškeré platby slouží výhradně k zajištění prostor, učebních pomůcek a českých knih pro výuku.'}
                </p>
              </div>
            </div>
            <button
              id="bank-cta-register"
              onClick={() => handleScrollTo('register')}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-display text-xs uppercase tracking-wider font-bold rounded-2xl transition-all duration-300 shrink-0 cursor-pointer border border-amber-300 shadow-sm"
            >
              {lang === 'en' ? 'View Payment Details' : 'Zobrazit podrobnosti plateb'}
            </button>
          </div>

          {/* Calendar of school days and community events */}
          <div id="calendar" className="mt-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 bg-sky-100 text-sky-600 border border-sky-200 rounded-2xl flex items-center justify-center shadow-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-slate-800">
                  {lang === 'en' ? 'Calendar of Events' : 'Kalendář akcí'}
                </h3>
                <p className="text-slate-600 text-xs font-medium">
                  {lang === 'en' ? 'School days, family events, and seasonal celebrations.' : 'Školní výuka, rodinné akce a tradiční oslavy.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {EVENTS_DATA.map((event) => {
                const isSpecialEvent = event.titleEn !== 'School day';
                return (
                  <div
                    key={event.id}
                    className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 shadow-sm ${isSpecialEvent ? 'bg-amber-100 border-amber-300' : 'bg-white border-slate-200'}`}
                  >
                    <span className="font-display text-xs font-bold text-slate-800 whitespace-nowrap">
                      {lang === 'en' ? event.dateEn : event.dateCz}
                    </span>
                    <span className={`text-right text-xs font-semibold ${isSpecialEvent ? 'text-amber-800' : 'text-slate-600'}`}>
                      {lang === 'en' ? event.titleEn : event.titleCz}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Teachers / Team Section */}
      <section id="team" className="py-24 bg-gradient-to-b from-sky-50/60 via-amber-50/60 to-rose-50/40 border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-display font-bold text-emerald-700 text-xs tracking-widest uppercase mb-3 block bg-emerald-100/90 px-4 py-1.5 rounded-full w-fit mx-auto border border-emerald-300 shadow-sm">
              {lang === 'en' ? 'Our Dedicated Team' : 'Náš tým'}
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-slate-800 tracking-tight">
              {lang === 'en' ? 'Meet our teachers and organizers' : 'Seznamte se s našimi učitelkami'}
            </h2>
            <p className="font-sans text-slate-600 text-base mt-4 font-medium leading-relaxed">
              {lang === 'en' 
                ? 'An enthusiastic, professional team of bilingual parents, historians, philologists, and education specialists.' 
                : 'Náš tým tvoří nadšené a kvalifikované učitelky, maminky, historičky umění a absolventky pedagogických fakult.'}
            </p>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center bg-white border-2 border-amber-200 rounded-full p-1.5 mt-8 max-w-sm mx-auto shadow-sm">
              <button
                id="filter-all"
                onClick={() => setTeacherFilter('all')}
                className={`flex-1 py-2 text-center font-display text-xs font-bold tracking-wider rounded-full uppercase transition-all duration-300 cursor-pointer ${
                  teacherFilter === 'all'
                    ? 'bg-amber-400 text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'en' ? 'All' : 'Všechny'}
              </button>
              <button
                id="filter-mgt"
                onClick={() => setTeacherFilter('management')}
                className={`flex-1 py-2 text-center font-display text-xs font-bold tracking-wider rounded-full uppercase transition-all duration-300 cursor-pointer ${
                  teacherFilter === 'management'
                    ? 'bg-amber-400 text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'en' ? 'Leadership' : 'Vedení'}
              </button>
              <button
                id="filter-teachers"
                onClick={() => setTeacherFilter('teachers')}
                className={`flex-1 py-2 text-center font-display text-xs font-bold tracking-wider rounded-full uppercase transition-all duration-300 cursor-pointer ${
                  teacherFilter === 'teachers'
                    ? 'bg-amber-400 text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
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
                className="group bg-white border-2 border-amber-200 rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:border-amber-400 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <span className="font-display text-[10px] tracking-widest uppercase text-amber-700 block mb-2 font-bold bg-amber-50 px-3 py-1 rounded-full w-fit border border-amber-200">
                    {lang === 'en' ? teacher.roleEn : teacher.roleCz}
                  </span>
                  <h3 className="font-display font-bold text-xl text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">
                    {teacher.name}
                  </h3>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal mb-6">
                    {lang === 'en' ? teacher.bioEn : teacher.bioCz}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-amber-600 group-hover:text-amber-700 text-xs font-display font-bold uppercase tracking-wider transition-colors pt-4 border-t border-slate-100">
                  <span>{lang === 'en' ? 'Read full bio' : 'Zobrazit celý profil'}</span>
                  <ChevronRight className="w-4 h-4" />
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="relative bg-white border-2 border-amber-300 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl p-8 md:p-10 text-left font-sans text-slate-800"
              >
                <button
                  id="close-teacher-modal"
                  onClick={() => setActiveTeacher(null)}
                  className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer text-xl font-bold"
                  aria-label="Close dialog"
                >
                  ✕
                </button>

                <span className="font-display text-xs tracking-widest uppercase text-amber-700 block mb-2 font-bold bg-amber-100 px-3 py-1 rounded-full w-fit">
                  {lang === 'en' ? activeTeacher.roleEn : activeTeacher.roleCz}
                </span>

                <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-800 mb-6">
                  {activeTeacher.name}
                </h3>

                <div className="h-1 w-20 bg-amber-400 rounded-full mb-6" />

                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal">
                  {lang === 'en' ? activeTeacher.bioEn : activeTeacher.bioCz}
                </p>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    id="btn-close-modal-footer"
                    onClick={() => setActiveTeacher(null)}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer border border-slate-300"
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
      <section id="register" className="py-24 bg-gradient-to-b from-amber-50 via-sky-50/40 to-amber-100/50 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-display font-bold text-rose-600 text-xs tracking-widest uppercase mb-3 block bg-rose-100/90 px-4 py-1.5 rounded-full w-fit mx-auto border border-rose-300 shadow-sm">
              {lang === 'en' ? 'Enrolment' : 'Zápis a rezervace'}
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-slate-800 tracking-tight">
              {lang === 'en' ? 'Secure Your Seat Today' : 'Rezervujte si místo pro výuku'}
            </h2>
            <p className="font-sans text-slate-600 text-base mt-4 font-medium leading-relaxed">
              {lang === 'en' 
                ? 'Enroll your child dynamically below. Once submitted, we will pre-reserve a desk and generate your tuition invoice reference.' 
                : 'Vyplňte rychlou přihlášku níže. Obratem vám zarezervujeme místo v příslušné třídě a vygenerujeme platební kód.'}
            </p>
          </div>

          <RegistrationForm lang={lang} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-amber-100/50 to-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
            {/* Location & Details Left */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div>
                <span className="font-display font-bold text-amber-700 text-xs tracking-widest uppercase block mb-2 bg-amber-200/80 px-3 py-1 rounded-full w-fit">
                  {lang === 'en' ? 'Get In Touch' : 'Kontaktujte nás'}
                </span>
                <h2 className="font-display font-extrabold text-4xl md:text-5xl text-slate-800 tracking-tight leading-tight">
                  {lang === 'en' ? 'Always here for our families' : 'Budujme komunitu společně'}
                </h2>
              </div>

              <div className="space-y-6 font-sans text-sm">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-amber-100 border border-amber-300 rounded-2xl flex items-center justify-center text-amber-700 mt-1 shrink-0 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-800 mb-1">
                      {lang === 'en' ? 'School Premises' : 'Místo konání výuky'}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed max-w-xs font-medium">
                      {CONTACT_DETAILS.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-amber-100 border border-amber-300 rounded-2xl flex items-center justify-center text-amber-700 mt-1 shrink-0 shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-800 mb-1">
                      {lang === 'en' ? 'Czech School Email' : 'E-mail české školy'}
                    </h4>
                    <a href={`mailto:${CONTACT_DETAILS.emails.czechSchool}`} className="text-slate-700 hover:text-amber-600 transition-colors text-xs font-mono font-bold">
                      {CONTACT_DETAILS.emails.czechSchool}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-amber-100 border border-amber-300 rounded-2xl flex items-center justify-center text-amber-700 mt-1 shrink-0 shadow-sm">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-800 mb-1">
                      {lang === 'en' ? 'Slovak School Partner' : 'Slovenská škola (Partner)'}
                    </h4>
                    <a href={`mailto:${CONTACT_DETAILS.emails.slovakSchool}`} className="text-slate-700 hover:text-amber-600 transition-colors text-xs font-mono font-bold">
                      {CONTACT_DETAILS.emails.slovakSchool}
                    </a>
                  </div>
                </div>
              </div>

              {/* Partners section */}
              <div className="pt-8 border-t border-amber-200 space-y-4">
                <span className="font-display text-xs text-slate-500 font-bold uppercase tracking-widest block">
                  {lang === 'en' ? 'Official partners & sponsors' : 'Naši vážení partneři'}
                </span>
                <div className="grid grid-cols-2 gap-4 text-xs font-display font-bold text-slate-700">
                  <div className="bg-white border border-amber-200 rounded-2xl p-3 flex items-center gap-2 shadow-sm">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    <span>Embassy of CZ</span>
                  </div>
                  <div className="bg-white border border-amber-200 rounded-2xl p-3 flex items-center gap-2 shadow-sm">
                    <div className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                    <span>MŠMT ČR</span>
                  </div>
                  <div className="bg-white border border-amber-200 rounded-2xl p-3 flex items-center gap-2 shadow-sm">
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span>Czech Centre</span>
                  </div>
                  <div className="bg-white border border-amber-200 rounded-2xl p-3 flex items-center gap-2 shadow-sm">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span>Ministry of FA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Inquiry Form Right */}
            <div className="lg:col-span-7 bg-white border-2 border-amber-200 p-8 md:p-12 rounded-3xl relative shadow-xl">
              <h3 className="font-display font-bold text-2xl text-slate-800 mb-3">
                {lang === 'en' ? 'Send a Quick Message' : 'Napište nám zprávu'}
              </h3>
              <p className="font-sans text-xs text-slate-600 mb-8 font-medium leading-relaxed">
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
                    <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-2">
                      {lang === 'en' ? 'Your Name' : 'Vaše jméno'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Marie Nováková"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white rounded-2xl py-3 px-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-2">
                      {lang === 'en' ? 'Your Email' : 'Váš e-mail'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="marie@email.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white rounded-2xl py-3 px-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-2">
                    {lang === 'en' ? 'Your Message' : 'Text zprávy'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={lang === 'en' ? 'Tell us what you would like to know...' : 'Napište svůj dotaz...'}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white rounded-2xl py-3 px-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-slate-900 font-display text-xs uppercase tracking-wider font-bold rounded-2xl transition-all duration-300 shadow-lg border border-amber-300 cursor-pointer"
                >
                  {lang === 'en' ? 'Send Message' : 'Odeslat zprávu'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Footer */}
      <footer className="border-t border-amber-200 bg-amber-100/80 py-12 text-center font-display text-xs text-slate-600 font-semibold">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <p className="text-slate-800 font-bold uppercase tracking-wider text-sm">
              {lang === 'en' ? 'CZECH & SLOVAK CLUB ENGLAND C.I.C.' : 'CZECH & SLOVAK CLUB ENGLAND C.I.C.'}
            </p>
            <p>Registered Seat: {CONTACT_DETAILS.postalAddress}</p>
            <p>{CONTACT_DETAILS.companyNo}</p>
          </div>
          <div className="text-right space-y-1">
            <p>© {new Date().getFullYear()} Warwick Czech School. All rights reserved.</p>
            <p>Made for the Czech Supplementary School & Nursery Warwick community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

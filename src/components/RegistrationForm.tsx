/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLASSES_DATA, FEES_DATA } from '../data';
import { Calendar, User, Mail, Phone, Users, CheckCircle2, Copy, FileText, ArrowRight, Printer } from 'lucide-react';

interface RegistrationFormProps {
  lang: 'en' | 'cz';
}

export default function RegistrationForm({ lang }: RegistrationFormProps) {
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [childName, setChildName] = useState('');
  const [selectedClass, setSelectedClass] = useState(CLASSES_DATA[0].id);
  const [selectedTerms, setSelectedTerms] = useState<string[]>([FEES_DATA.terms[0].id]);
  const [numChildren, setNumChildren] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTermToggle = (termId: string) => {
    if (selectedTerms.includes(termId)) {
      if (selectedTerms.length > 1) {
        setSelectedTerms(selectedTerms.filter(id => id !== termId));
      }
    } else {
      setSelectedTerms([...selectedTerms, termId]);
    }
  };

  const calculateTotalFees = () => {
    let total = 0;
    selectedTerms.forEach(termId => {
      const term = FEES_DATA.terms.find(t => t.id === termId);
      if (term) {
        // First child pays priceChild, other children pay priceSibling
        total += term.priceChild;
        if (numChildren > 1) {
          total += term.priceSibling * (numChildren - 1);
        }
      }
    });
    return total;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!parentName.trim()) tempErrors.parentName = lang === 'en' ? 'Parent name is required' : 'Jméno rodiče je povinné';
    if (!email.trim()) {
      tempErrors.email = lang === 'en' ? 'Email is required' : 'Email je povinný';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = lang === 'en' ? 'Email is invalid' : 'Neplatný email';
    }
    if (!phone.trim()) tempErrors.phone = lang === 'en' ? 'Phone is required' : 'Telefonní číslo je povinné';
    if (!childName.trim()) tempErrors.childName = lang === 'en' ? "Child's name is required" : 'Jméno dítěte je povinné';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const totalFees = calculateTotalFees();
  const selectedClassDetails = CLASSES_DATA.find(c => c.id === selectedClass);
  const selectedTermsDetails = FEES_DATA.terms.filter(t => selectedTerms.includes(t.id));

  return (
    <div id="registration-component" className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl border-2 border-amber-200 overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="registration-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            {/* Left Column: Form Fields */}
            <div className="flex flex-col space-y-6">
              <div>
                <h3 className="font-display font-bold text-2xl text-slate-800 mb-2">
                  {lang === 'en' ? 'Register Your Child' : 'Zápis do školy'}
                </h3>
                <p className="font-sans text-sm text-slate-600 leading-relaxed">
                  {lang === 'en' 
                    ? 'Join our community! Please fill in the details below to complete your registration request.' 
                    : 'Připojte se k naší komunitě! Vyplňte prosím níže uvedené údaje k dokončení registrace.'}
                </p>
              </div>

              {/* Parent Name */}
              <div className="relative">
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {lang === 'en' ? 'Parent / Guardian Full Name' : 'Celé jméno rodiče / opatrovníka'}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-4 w-4 text-amber-500" />
                  <input
                    type="text"
                    id="reg-parent-name"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. Marie Nováková' : 'např. Marie Nováková'}
                    className={`w-full bg-slate-50 border ${errors.parentName ? 'border-rose-500' : 'border-slate-200'} focus:border-amber-400 focus:bg-white rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all`}
                  />
                </div>
                {errors.parentName && <span className="text-xs font-semibold text-rose-500 mt-1 block">{errors.parentName}</span>}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-2">
                    {lang === 'en' ? 'Email Address' : 'E-mailová adresa'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-4 w-4 text-amber-500" />
                    <input
                      type="email"
                      id="reg-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marie@email.com"
                      className={`w-full bg-slate-50 border ${errors.email ? 'border-rose-500' : 'border-slate-200'} focus:border-amber-400 focus:bg-white rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all`}
                    />
                  </div>
                  {errors.email && <span className="text-xs font-semibold text-rose-500 mt-1 block">{errors.email}</span>}
                </div>

                <div className="relative">
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-2">
                    {lang === 'en' ? 'Phone Number' : 'Telefonní číslo'}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 h-4 w-4 text-amber-500" />
                    <input
                      type="tel"
                      id="reg-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7123 456789"
                      className={`w-full bg-slate-50 border ${errors.phone ? 'border-rose-500' : 'border-slate-200'} focus:border-amber-400 focus:bg-white rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all`}
                    />
                  </div>
                  {errors.phone && <span className="text-xs font-semibold text-rose-500 mt-1 block">{errors.phone}</span>}
                </div>
              </div>

              {/* Child's Name */}
              <div className="relative">
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {lang === 'en' ? "Child's Full Name" : 'Celé jméno dítěte'}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-4 w-4 text-rose-500" />
                  <input
                    type="text"
                    id="reg-child-name"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. Tomáš Novák' : 'např. Tomáš Novák'}
                    className={`w-full bg-slate-50 border ${errors.childName ? 'border-rose-500' : 'border-slate-200'} focus:border-amber-400 focus:bg-white rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all`}
                  />
                </div>
                {errors.childName && <span className="text-xs font-semibold text-rose-500 mt-1 block">{errors.childName}</span>}
              </div>

              {/* Class Select */}
              <div className="relative">
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {lang === 'en' ? 'Target Classroom / Age Group' : 'Výběr třídy / Věková skupina'}
                </label>
                <select
                  id="reg-class"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white rounded-2xl py-3 px-4 text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all cursor-pointer appearance-none"
                >
                  {CLASSES_DATA.map((cls) => (
                    <option key={cls.id} value={cls.id} className="bg-white text-slate-800">
                      {lang === 'en' ? `${cls.nameEn} (${cls.age})` : `${cls.nameCz} (${cls.age})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column: Fees and Calculation */}
            <div className="flex flex-col justify-between space-y-6 bg-amber-50/70 p-6 rounded-3xl border border-amber-200">
              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-800 mb-2">
                    {lang === 'en' ? 'Fees & Term Selection' : 'Výběr pololetí & školné'}
                  </h4>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed">
                    {lang === 'en' 
                      ? 'Select which terms your child will attend. Fees are payable termly. A 16.6% sibling discount is automatically applied from the 2nd child.' 
                      : 'Zvolte, která pololetí bude dítě navštěvovat. Školné se hradí na začátku pololetí. Od 2. dítěte je automaticky uplatněna sourozenecká sleva.'}
                  </p>
                </div>

                {/* Term Select Toggles */}
                <div className="space-y-3">
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1">
                    {lang === 'en' ? 'Select Terms' : 'Zvolte pololetí'}
                  </label>
                  {FEES_DATA.terms.map((term) => {
                    const isSelected = selectedTerms.includes(term.id);
                    return (
                      <button
                        key={term.id}
                        type="button"
                        id={`term-toggle-${term.id}`}
                        onClick={() => handleTermToggle(term.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-300 ${
                          isSelected
                            ? 'bg-amber-400/20 border-2 border-amber-500 text-slate-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${isSelected ? 'border-amber-500 bg-amber-400 text-slate-900 font-bold' : 'border-slate-300 bg-slate-100'}`}>
                            {isSelected && <span className="text-xs">✓</span>}
                          </div>
                          <div>
                            <p className="text-xs font-display font-bold text-slate-800">
                              {lang === 'en' ? term.nameEn : term.nameCz}
                            </p>
                            <p className="text-[10px] font-mono text-slate-500">
                              {term.sessions} {lang === 'en' ? 'sessions' : 'lekcí'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-display font-bold text-slate-800">
                            £{term.priceChild.toFixed(2)}
                          </p>
                          <p className="text-[9px] font-mono text-slate-500">
                            {lang === 'en' ? 'Sibling: ' : 'Sourozenec: '} £{term.priceSibling.toFixed(2)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Number of Children counter */}
                <div className="flex items-center justify-between py-3 border-t border-b border-amber-200">
                  <div>
                    <span className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700">
                      {lang === 'en' ? 'Number of Children' : 'Počet přihlašovaných dětí'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {lang === 'en' ? 'Applies sibling discount' : 'Uplatňuje sourozeneckou slevu'}
                    </span>
                  </div>
                  <div className="flex items-center bg-white border border-amber-300 rounded-xl overflow-hidden p-0.5 shadow-sm">
                    <button
                      type="button"
                      id="btn-children-dec"
                      onClick={() => numChildren > 1 && setNumChildren(numChildren - 1)}
                      className="px-3 py-1.5 hover:bg-amber-100 text-slate-800 font-bold text-sm focus:outline-none transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm text-slate-900 font-bold font-display">
                      {numChildren}
                    </span>
                    <button
                      type="button"
                      id="btn-children-inc"
                      onClick={() => setNumChildren(numChildren + 1)}
                      className="px-3 py-1.5 hover:bg-amber-100 text-slate-800 font-bold text-sm focus:outline-none transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="space-y-4 pt-2">
                <div className="flex items-end justify-between">
                  <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-600">
                    {lang === 'en' ? 'Estimated Total:' : 'Odhadovaná částka:'}
                  </span>
                  <span className="text-3xl font-bold font-display text-amber-600">
                    £{totalFees.toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  id="reg-submit-btn"
                  className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-slate-900 rounded-2xl font-display text-sm uppercase tracking-wider font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer border-2 border-amber-300"
                >
                  {lang === 'en' ? 'Submit Registration' : 'Odeslat nezávaznou poptávku'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.form>
        ) : (
          /* Submission Success Receipt */
          <motion.div
            key="registration-receipt"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 md:p-12 text-center flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-md border-2 border-emerald-300">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            
            <h3 className="font-display font-bold text-3xl text-slate-800 mb-3">
              {lang === 'en' ? 'Registration Request Received!' : 'Nezávazná poptávka odeslána!'}
            </h3>
            
            <p className="font-sans text-sm text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
              {lang === 'en' 
                ? `Thank you, ${parentName}! We have generated your registration details. A place has been pre-reserved for ${childName} in the ${selectedClassDetails?.nameEn}.`
                : `Děkujeme, ${parentName}! Vaše nezávazná poptávka byla zaznamenána. Místo bylo předběžně rezervováno pro ${childName} ve třídě ${selectedClassDetails?.nameCz}.`}
            </p>

            {/* Glassmorphic Printable Receipt */}
            <div id="printable-receipt" className="w-full max-w-lg bg-amber-50/90 rounded-3xl border-2 border-amber-200 text-left p-6 md:p-8 space-y-6 mb-8 shadow-md">
              <div className="flex items-center justify-between border-b border-amber-200 pb-4">
                <div>
                  <h4 className="font-display font-bold text-base text-slate-800">WARWICK CZECH SCHOOL</h4>
                  <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Reference ID: CSW-{Math.floor(1000 + Math.random() * 9000)}-2026
                  </p>
                </div>
                <div className="bg-amber-400/20 border border-amber-400 rounded-full px-3 py-1">
                  <span className="font-display text-[10px] text-amber-800 uppercase font-bold tracking-wider">
                    {lang === 'en' ? 'Pre-registered' : 'Předregistrováno'}
                  </span>
                </div>
              </div>

              {/* Receipt Details */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="block text-slate-500 font-display text-[10px] font-bold uppercase tracking-wider">{lang === 'en' ? 'Parent Name' : 'Jméno rodiče'}</span>
                  <span className="text-slate-800 font-bold text-sm">{parentName}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-display text-[10px] font-bold uppercase tracking-wider">{lang === 'en' ? 'Child Name' : 'Jméno dítěte'}</span>
                  <span className="text-slate-800 font-bold text-sm">{childName}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-display text-[10px] font-bold uppercase tracking-wider">{lang === 'en' ? 'Assigned Class' : 'Přiřazená třída'}</span>
                  <span className="text-slate-800 font-bold text-sm">{lang === 'en' ? selectedClassDetails?.nameEn : selectedClassDetails?.nameCz}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-display text-[10px] font-bold uppercase tracking-wider">{lang === 'en' ? 'Selected Terms' : 'Zvolená pololetí'}</span>
                  <span className="text-slate-800 font-bold text-sm">{selectedTermsDetails.map(t => lang === 'en' ? t.nameEn.split(' ')[0] + ' ' + t.nameEn.split(' ')[1] : t.nameCz.split(' ')[0] + ' ' + t.nameCz.split(' ')[1]).join(', ')}</span>
                </div>
              </div>

              {/* Bank Details section */}
              <div className="bg-white border border-amber-200 rounded-2xl p-4 space-y-3 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-display font-bold text-xs text-slate-800">
                    {lang === 'en' ? 'Payment Instruction (Bank Transfer)' : 'Platební pokyny (Převod na účet)'}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">Sort & Acc No</span>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Account Name */}
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-slate-500">Name:</span>
                    <button
                      type="button"
                      id="copy-acc-name"
                      onClick={() => copyToClipboard(FEES_DATA.bankDetails.accountName, 'accName')}
                      className="text-slate-800 font-bold hover:text-amber-600 flex items-center gap-1 focus:outline-none"
                    >
                      {FEES_DATA.bankDetails.accountName}
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                  
                  {/* Account Number */}
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-slate-500">Acc No:</span>
                    <button
                      type="button"
                      id="copy-acc-num"
                      onClick={() => copyToClipboard(FEES_DATA.bankDetails.accountNumber, 'accNo')}
                      className="text-slate-800 font-bold hover:text-amber-600 flex items-center gap-1 focus:outline-none"
                    >
                      {FEES_DATA.bankDetails.accountNumber}
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>

                  {/* Sort Code */}
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-slate-500">Sort Code:</span>
                    <button
                      type="button"
                      id="copy-sort"
                      onClick={() => copyToClipboard(FEES_DATA.bankDetails.sortCode, 'sort')}
                      className="text-slate-800 font-bold hover:text-amber-600 flex items-center gap-1 focus:outline-none"
                    >
                      {FEES_DATA.bankDetails.sortCode}
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>

                  {/* Reference */}
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-slate-500">Reference:</span>
                    <button
                      type="button"
                      id="copy-ref"
                      onClick={() => copyToClipboard(childName, 'ref')}
                      className="text-amber-600 flex items-center gap-1 focus:outline-none font-bold"
                    >
                      {childName}
                      <Copy className="w-3.5 h-3.5 text-amber-600" />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {copiedField && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-xs font-display text-emerald-600 font-bold"
                    >
                      {lang === 'en' ? 'Copied to clipboard ✓' : 'Zkopírováno do schránky ✓'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Total Due */}
              <div className="flex items-end justify-between border-t border-amber-200 pt-4">
                <span className="font-display font-bold text-xs text-slate-600 uppercase">{lang === 'en' ? 'Amount Due' : 'Částka k úhradě'}</span>
                <span className="font-display text-2xl font-bold text-amber-600">£{totalFees.toFixed(2)}</span>
              </div>
            </div>

            {/* Print and Action Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                id="btn-print-receipt"
                onClick={() => window.print()}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs uppercase tracking-wider font-display font-bold flex items-center gap-2 border border-slate-300 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-sky-600" />
                {lang === 'en' ? 'Print Receipt' : 'Vytisknout potvrzení'}
              </button>

              <button
                type="button"
                id="btn-register-another"
                onClick={() => {
                  setChildName('');
                  setIsSubmitted(false);
                }}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-2xl text-xs uppercase tracking-wider font-display font-bold transition-all duration-300 shadow-md border border-amber-300 cursor-pointer"
              >
                {lang === 'en' ? 'Register Another Child' : 'Zapsat další dítě'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

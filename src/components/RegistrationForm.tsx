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
    <div id="registration-component" className="w-full max-w-4xl mx-auto bg-neutral-900/65 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
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
                <h3 className="font-sans font-bold text-2xl text-white mb-2">
                  {lang === 'en' ? 'Register Your Child' : 'Zápis do školy'}
                </h3>
                <p className="font-sans text-sm text-neutral-400">
                  {lang === 'en' 
                    ? 'Join our community! Please fill in the details below to complete your registration request.' 
                    : 'Připojte se k naší komunitě! Vyplňte prosím níže uvedené údaje k dokončení registrace.'}
                </p>
              </div>

              {/* Parent Name */}
              <div className="relative">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  {lang === 'en' ? 'Parent / Guardian Full Name' : 'Celé jméno rodiče / opatrovníka'}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    id="reg-parent-name"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. Marie Nováková' : 'např. Marie Nováková'}
                    className={`w-full bg-neutral-950/60 border ${errors.parentName ? 'border-red-500' : 'border-white/10'} focus:border-amber-400 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors`}
                  />
                </div>
                {errors.parentName && <span className="text-xs text-red-500 mt-1 block">{errors.parentName}</span>}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    {lang === 'en' ? 'Email Address' : 'E-mailová adresa'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-4 w-4 text-neutral-500" />
                    <input
                      type="email"
                      id="reg-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marie@email.com"
                      className={`w-full bg-neutral-950/60 border ${errors.email ? 'border-red-500' : 'border-white/10'} focus:border-amber-400 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors`}
                    />
                  </div>
                  {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                </div>

                <div className="relative">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    {lang === 'en' ? 'Phone Number' : 'Telefonní číslo'}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 h-4 w-4 text-neutral-500" />
                    <input
                      type="tel"
                      id="reg-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7123 456789"
                      className={`w-full bg-neutral-950/60 border ${errors.phone ? 'border-red-500' : 'border-white/10'} focus:border-amber-400 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors`}
                    />
                  </div>
                  {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone}</span>}
                </div>
              </div>

              {/* Child's Name */}
              <div className="relative">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  {lang === 'en' ? "Child's Full Name" : 'Celé jméno dítěte'}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    id="reg-child-name"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. Tomáš Novák' : 'např. Tomáš Novák'}
                    className={`w-full bg-neutral-950/60 border ${errors.childName ? 'border-red-500' : 'border-white/10'} focus:border-amber-400 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors`}
                  />
                </div>
                {errors.childName && <span className="text-xs text-red-500 mt-1 block">{errors.childName}</span>}
              </div>

              {/* Class Select */}
              <div className="relative">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  {lang === 'en' ? 'Target Classroom / Age Group' : 'Výběr třídy / Věková skupina'}
                </label>
                <select
                  id="reg-class"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-neutral-950/60 border border-white/10 focus:border-amber-400 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors cursor-pointer appearance-none"
                >
                  {CLASSES_DATA.map((cls) => (
                    <option key={cls.id} value={cls.id} className="bg-neutral-900 text-white">
                      {lang === 'en' ? `${cls.nameEn} (${cls.age})` : `${cls.nameCz} (${cls.age})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column: Fees and Calculation */}
            <div className="flex flex-col justify-between space-y-6 bg-neutral-950/40 p-6 rounded-2xl border border-white/5">
              <div className="space-y-6">
                <div>
                  <h4 className="font-sans font-semibold text-lg text-white mb-2">
                    {lang === 'en' ? 'Fees & Term Selection' : 'Výběr trimestru & Poplatky'}
                  </h4>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                    {lang === 'en' 
                      ? 'Select which terms your child will attend. Fees are payable termly. A 16.6% sibling discount is automatically applied from the 2nd child.' 
                      : 'Zvolte, které trimestry bude dítě navštěvovat. Školné se hradí na začátku trimestru. Od 2. dítěte je automaticky uplatněna sourozenecká sleva.'}
                  </p>
                </div>

                {/* Term Select Toggles */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    {lang === 'en' ? 'Select Terms' : 'Zvolte trimestry'}
                  </label>
                  {FEES_DATA.terms.map((term) => {
                    const isSelected = selectedTerms.includes(term.id);
                    return (
                      <button
                        key={term.id}
                        type="button"
                        id={`term-toggle-${term.id}`}
                        onClick={() => handleTermToggle(term.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-300 ${
                          isSelected
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-neutral-950/60 border-white/5 text-neutral-400 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${isSelected ? 'border-amber-400 bg-amber-400 text-neutral-950' : 'border-neutral-700'}`}>
                            {isSelected && <span className="text-[10px] font-bold">✓</span>}
                          </div>
                          <div>
                            <p className="text-xs font-sans font-semibold">
                              {lang === 'en' ? term.nameEn : term.nameCz}
                            </p>
                            <p className="text-[10px] font-mono text-neutral-500">
                              {term.sessions} {lang === 'en' ? 'sessions' : 'lekcí'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-mono font-bold text-white">
                            £{term.priceChild.toFixed(2)}
                          </p>
                          <p className="text-[9px] font-mono text-neutral-500">
                            {lang === 'en' ? 'Sibling: ' : 'Sourozenec: '} £{term.priceSibling.toFixed(2)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Number of Children counter */}
                <div className="flex items-center justify-between py-3 border-t border-b border-white/5">
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                      {lang === 'en' ? 'Number of Children' : 'Počet přihlašovaných dětí'}
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      {lang === 'en' ? 'Applies sibling discount' : 'Uplatňuje sourozeneckou slevu'}
                    </span>
                  </div>
                  <div className="flex items-center bg-neutral-950 border border-white/10 rounded-xl overflow-hidden p-0.5">
                    <button
                      type="button"
                      id="btn-children-dec"
                      onClick={() => numChildren > 1 && setNumChildren(numChildren - 1)}
                      className="px-3 py-1.5 hover:bg-white/5 text-white font-bold text-sm focus:outline-none"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm text-white font-bold font-mono">
                      {numChildren}
                    </span>
                    <button
                      type="button"
                      id="btn-children-inc"
                      onClick={() => setNumChildren(numChildren + 1)}
                      className="px-3 py-1.5 hover:bg-white/5 text-white font-bold text-sm focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="space-y-4 pt-4">
                <div className="flex items-end justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    {lang === 'en' ? 'Estimated Total:' : 'Odhadovaná částka:'}
                  </span>
                  <span className="text-2xl font-bold font-mono text-amber-400">
                    £{totalFees.toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  id="reg-submit-btn"
                  className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-neutral-950 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-lg shadow-amber-400/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {lang === 'en' ? 'Submit Registration' : 'Odeslat závaznou přihlášku'}
                  <ArrowRight className="w-4 h-4" />
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
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-6" />
            
            <h3 className="font-sans font-bold text-3xl text-white mb-3">
              {lang === 'en' ? 'Registration Request Received!' : 'Přihláška úspěšně odeslána!'}
            </h3>
            
            <p className="font-sans text-sm text-neutral-400 max-w-xl mx-auto mb-8">
              {lang === 'en' 
                ? `Thank you, ${parentName}! We have generated your registration details. A place has been pre-reserved for ${childName} in the ${selectedClassDetails?.nameEn}.`
                : `Děkujeme, ${parentName}! Vaše přihláška byla zaznamenána. Místo bylo předběžně rezervováno pro ${childName} ve třídě ${selectedClassDetails?.nameCz}.`}
            </p>

            {/* Glassmorphic Printable Receipt */}
            <div id="printable-receipt" className="w-full max-w-lg bg-neutral-950/80 rounded-2xl border border-white/10 text-left p-6 md:p-8 space-y-6 mb-8 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">CZECH SCHOOL WARWICK</h4>
                  <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                    Reference ID: CSW-{Math.floor(1000 + Math.random() * 9000)}-2026
                  </p>
                </div>
                <div className="bg-amber-400/10 border border-amber-400/30 rounded-full px-3 py-1">
                  <span className="font-mono text-[9px] text-amber-400 uppercase font-bold tracking-wider">
                    {lang === 'en' ? 'Pre-registered' : 'Předregistrováno'}
                  </span>
                </div>
              </div>

              {/* Receipt Details */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="block text-neutral-500 font-mono text-[9px] uppercase tracking-wider">{lang === 'en' ? 'Parent Name' : 'Jméno rodiče'}</span>
                  <span className="text-white font-medium">{parentName}</span>
                </div>
                <div>
                  <span className="block text-neutral-500 font-mono text-[9px] uppercase tracking-wider">{lang === 'en' ? 'Child Name' : 'Jméno dítěte'}</span>
                  <span className="text-white font-medium">{childName}</span>
                </div>
                <div>
                  <span className="block text-neutral-500 font-mono text-[9px] uppercase tracking-wider">{lang === 'en' ? 'Assigned Class' : 'Přiřazená třída'}</span>
                  <span className="text-white font-medium">{lang === 'en' ? selectedClassDetails?.nameEn : selectedClassDetails?.nameCz}</span>
                </div>
                <div>
                  <span className="block text-neutral-500 font-mono text-[9px] uppercase tracking-wider">{lang === 'en' ? 'Selected Terms' : 'Zvolené trimestry'}</span>
                  <span className="text-white font-medium">{selectedTermsDetails.map(t => lang === 'en' ? t.nameEn.split(' ')[0] + ' ' + t.nameEn.split(' ')[1] : t.nameCz.split(' ')[0] + ' ' + t.nameCz.split(' ')[1]).join(', ')}</span>
                </div>
              </div>

              {/* Bank Details section */}
              <div className="bg-neutral-900 border border-white/5 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-semibold text-xs text-white">
                    {lang === 'en' ? 'Payment Instruction (Bank Transfer)' : 'Platební pokyny (Převod na účet)'}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500">Sort & Acc No</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {/* Account Name */}
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-neutral-500">Name:</span>
                    <button
                      type="button"
                      id="copy-acc-name"
                      onClick={() => copyToClipboard(FEES_DATA.bankDetails.accountName, 'accName')}
                      className="text-white hover:text-amber-400 flex items-center gap-1 focus:outline-none"
                    >
                      {FEES_DATA.bankDetails.accountName}
                      <Copy className="w-3 h-3 text-neutral-500" />
                    </button>
                  </div>
                  
                  {/* Account Number */}
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-neutral-500">Acc No:</span>
                    <button
                      type="button"
                      id="copy-acc-num"
                      onClick={() => copyToClipboard(FEES_DATA.bankDetails.accountNumber, 'accNo')}
                      className="text-white hover:text-amber-400 flex items-center gap-1 focus:outline-none"
                    >
                      {FEES_DATA.bankDetails.accountNumber}
                      <Copy className="w-3 h-3 text-neutral-500" />
                    </button>
                  </div>

                  {/* Sort Code */}
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-neutral-500">Sort Code:</span>
                    <button
                      type="button"
                      id="copy-sort"
                      onClick={() => copyToClipboard(FEES_DATA.bankDetails.sortCode, 'sort')}
                      className="text-white hover:text-amber-400 flex items-center gap-1 focus:outline-none"
                    >
                      {FEES_DATA.bankDetails.sortCode}
                      <Copy className="w-3 h-3 text-neutral-500" />
                    </button>
                  </div>

                  {/* Reference */}
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-neutral-500">Reference:</span>
                    <button
                      type="button"
                      id="copy-ref"
                      onClick={() => copyToClipboard(childName, 'ref')}
                      className="text-amber-400 flex items-center gap-1 focus:outline-none font-bold"
                    >
                      {childName}
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {copiedField && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-[10px] font-mono text-emerald-400 font-semibold"
                    >
                      {lang === 'en' ? 'Copied to clipboard ✓' : 'Zkopírováno do schránky ✓'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Total Due */}
              <div className="flex items-end justify-between border-t border-white/5 pt-4">
                <span className="font-mono text-xs text-neutral-500 uppercase">{lang === 'en' ? 'Amount Due' : 'Částka k úhradě'}</span>
                <span className="font-mono text-xl font-bold text-amber-400">£{totalFees.toFixed(2)}</span>
              </div>
            </div>

            {/* Print and Action Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                id="btn-print-receipt"
                onClick={() => window.print()}
                className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs uppercase tracking-wider font-mono flex items-center gap-2 border border-white/10 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                {lang === 'en' ? 'Print Receipt' : 'Vytisknout potvrzení'}
              </button>

              <button
                type="button"
                id="btn-register-another"
                onClick={() => {
                  setChildName('');
                  setIsSubmitted(false);
                }}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-neutral-950 rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-md shadow-amber-400/5 cursor-pointer"
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

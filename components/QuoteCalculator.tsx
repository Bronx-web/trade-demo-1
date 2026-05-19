
import React, { useState, useMemo } from 'react';
import { QuoteData, QuoteBreakdown } from '../types';
import { RATES } from '../constants';

const QuoteCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuoteData>({
    serviceType: 'brick',
    area: 50,
    complexity: 1.0,
    includeMaterials: true
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const breakdown = useMemo((): QuoteBreakdown => {
    const labor = RATES.labor[data.serviceType] * data.area * data.complexity;
    const mats = data.includeMaterials ? (RATES.materials[data.serviceType] * data.area) : 0;
    const sub = labor + mats;
    const tax = sub * RATES.taxRate;
    return { laborCost: labor, materialCost: mats, subtotal: sub, tax, total: sub + tax };
  }, [data]);

  const format = (val: number) => new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' }).format(val);

  if (formSubmitted) {
    return (
      <div className="bg-white p-16 rounded-2xl shadow-2xl text-center border-b-8 border-[#CB4154] animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-4xl font-oswald font-bold mb-4 uppercase tracking-tighter">Quote Request Sent</h2>
        <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto">
          We've received your estimate for <strong>{format(breakdown.total)}</strong>. One of our master masons will contact you within 24 hours to arrange a site visit.
        </p>
        <button onClick={() => {setFormSubmitted(false); setStep(1);}} className="bg-slate-900 text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-[#CB4154] transition-all">
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 grid grid-cols-1 lg:grid-cols-12">
      
      {/* LEFT: INTERACTIVE FORM */}
      <div className="lg:col-span-7 p-8 md:p-12">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-2 flex-grow rounded-full transition-all duration-500 ${step >= s ? 'bg-[#CB4154]' : 'bg-slate-100'}`} />
          ))}
        </div>

        {/* Step 1: The Build */}
        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
            <h2 className="text-3xl font-oswald font-bold uppercase tracking-tight">1. Build Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Service</label>
                <select 
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#CB4154] outline-none transition-all"
                  value={data.serviceType}
                  onChange={(e) => setData({...data, serviceType: e.target.value as any})}
                >
                  <option value="brick">Bricklaying</option>
                  <option value="block">Structural Block</option>
                  <option value="veneer">Brick Veneer</option>
                  <option value="retaining">Retaining Wall</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Total Area (m²)</label>
                <input 
                  type="number" 
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#CB4154] outline-none"
                  value={data.area}
                  onChange={(e) => setData({...data, area: Number(e.target.value)})}
                />
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-slate-900 text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-[#CB4154] transition-all">
              Next Step
            </button>
          </div>
        )}

        {/* Step 2: Site & Materials */}
        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
            <h2 className="text-3xl font-oswald font-bold uppercase tracking-tight">2. Site Factors</h2>
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase">Site Complexity</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Standard', val: 1.0, desc: 'Flat' },
                  { label: 'Moderate', val: 1.2, desc: 'Sloped' },
                  { label: 'High', val: 1.5, desc: 'Scaffold' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => setData({...data, complexity: opt.val})}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${data.complexity === opt.val ? 'border-[#CB4154] bg-red-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                  >
                    <span className={`block font-bold uppercase text-xs ${data.complexity === opt.val ? 'text-[#CB4154]' : 'text-slate-400'}`}>{opt.label}</span>
                    <span className="block font-oswald text-lg font-bold">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-4 p-5 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-all">
              <input 
                type="checkbox" 
                checked={data.includeMaterials}
                onChange={(e) => setData({...data, includeMaterials: e.target.checked})}
                className="w-6 h-6 accent-[#CB4154]"
              />
              <div>
                <span className="block font-bold text-slate-800">Supply Materials</span>
                <span className="block text-xs text-slate-500 uppercase">We handle Bricks, Sand, and Cement delivery</span>
              </div>
            </label>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-xl font-bold uppercase hover:bg-slate-200">Back</button>
              <button onClick={() => setStep(3)} className="flex-[2] bg-slate-900 text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-[#CB4154]">Next Step</button>
            </div>
          </div>
        )}

        {/* Step 3: Contact */}
        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
            <h2 className="text-3xl font-oswald font-bold uppercase tracking-tight">3. Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="w-full p-4 border-2 border-slate-100 rounded-xl focus:border-[#CB4154] outline-none" required />
              <input type="email" placeholder="Email Address" className="w-full p-4 border-2 border-slate-100 rounded-xl focus:border-[#CB4154] outline-none" required />
            </div>
            <input type="text" placeholder="Project Location (e.g., Rolleston)" className="w-full p-4 border-2 border-slate-100 rounded-xl focus:border-[#CB4154] outline-none" />
            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-xl font-bold uppercase hover:bg-slate-200">Back</button>
              <button onClick={() => setFormSubmitted(true)} className="flex-[2] bg-[#CB4154] text-white py-5 rounded-xl font-oswald font-bold text-xl uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg">
                Submit Request
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: LIVE SUMMARY */}
      <div className="lg:col-span-5 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between border-l border-slate-800">
        <div>
          <h3 className="text-xl font-oswald font-bold text-[#CB4154] mb-12 uppercase tracking-[0.2em] border-b border-slate-800 pb-4">Estimate Summary</h3>
          
          <div className="space-y-8">
            <div className="flex justify-between items-center group">
              <span className="text-slate-400 font-medium">Masonry Labor</span>
              <span className="text-xl font-bold font-oswald tracking-tight">{format(breakdown.laborCost)}</span>
            </div>
            {data.includeMaterials && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Materials & Supply</span>
                <span className="text-xl font-bold font-oswald tracking-tight">{format(breakdown.materialCost)}</span>
              </div>
            )}
            <div className="pt-8 border-t border-slate-800 space-y-4">
              <div className="flex justify-between text-slate-400">
                <span>GST (15%)</span>
                <span>{format(breakdown.tax)}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[#CB4154] font-oswald font-bold text-lg uppercase tracking-wider">Total Quote</span>
                <span className="text-5xl font-oswald font-bold tracking-tighter">{format(breakdown.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-slate-800/40 rounded-2xl border border-slate-800 text-xs text-slate-500 italic leading-relaxed">
          Estimate based on current NZ material rates. All projects are built to <strong>NZS 3604</strong> masonry standards for seismic and weather durability.
        </div>
      </div>

    </div>
  );
};

export default QuoteCalculator;

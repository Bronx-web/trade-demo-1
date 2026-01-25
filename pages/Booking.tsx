
import React, { useState, useEffect } from 'react';
import { BRICK_RATES, CONTACT_INFO } from '../constants';
import { ServiceType } from '../types';

/**
 * Booking Component
 * 
 * This page handles the premium quote calculator and lead capture via Calendly.
 * It uses the 'labour' spelling to align with AU/NZ English standards.
 */
const Booking: React.FC = () => {
  const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.BRICK);
  const [area, setArea] = useState<number>(0);
  const [complexity, setComplexity] = useState<number>(1.0);
  const [includeMaterials, setIncludeMaterials] = useState<boolean>(true);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  
  // Estimate state uses AU/NZ spelling for 'labour'
  const [estimate, setEstimate] = useState({
    labour: 0,
    materials: 0,
    subtotal: 0,
    gst: 0,
    total: 0
  });

  // Calculate the estimate whenever inputs change
  useEffect(() => {
    const labourRate = BRICK_RATES.labour[serviceType];
    const materialRate = BRICK_RATES.materials[serviceType];

    const totalLabour = (labourRate * area) * complexity;
    const totalMaterials = includeMaterials ? (materialRate * area) : 0;
    const subtotal = totalLabour + totalMaterials;
    const gst = subtotal * BRICK_RATES.taxRate;
    const total = subtotal + gst;

    setEstimate({
      labour: totalLabour,
      materials: totalMaterials,
      subtotal: subtotal,
      gst: gst,
      total: total
    });
  }, [serviceType, area, complexity, includeMaterials]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' }).format(val);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#CB4154] text-white py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-6xl font-bold oswald uppercase leading-tight">Instant Quote Calculator</h1>
          <p className="mt-2 text-lg md:text-xl font-light opacity-90">Fair pricing. Clean work. No hidden surprises.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 md:-mt-8 pb-16 md:pb-24">
        {/* Main Stack: Project Details > Summary > Calendly */}
        <div className="flex flex-col gap-6 md:gap-8">
          
          {/* 1. Project Details Section */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border-t-4 border-[#CB4154]">
            <h2 className="text-xl md:text-2xl font-bold oswald mb-6 flex items-center gap-3 uppercase">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#CB4154]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              Project Details
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wider">Service Type</label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ServiceType)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:ring-2 focus:ring-[#CB4154] outline-none text-sm md:text-base appearance-none"
                >
                  <option value={ServiceType.BRICK}>Bricklaying (Standard)</option>
                  <option value={ServiceType.BLOCK}>Blocklaying (Standard)</option>
                  <option value={ServiceType.VENEER}>Brick Veneer</option>
                  <option value={ServiceType.RETAINING}>Block Retaining Wall</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wider">Area Size (m²)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 50" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:ring-2 focus:ring-[#CB4154] outline-none text-sm md:text-base"
                  value={area === 0 ? '' : area}
                  onChange={(e) => setArea(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wider">Site Complexity</label>
                <select 
                  value={complexity}
                  onChange={(e) => setComplexity(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:ring-2 focus:ring-[#CB4154] outline-none text-sm md:text-base appearance-none"
                >
                  <option value={1.0}>Standard (Flat, Easy Access)</option>
                  <option value={1.2}>Moderate (Sloped, Corners)</option>
                  <option value={1.5}>Complex (High Detail, Bad Access)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-4 sm:pt-6">
                <input 
                  type="checkbox" 
                  id="materials"
                  checked={includeMaterials}
                  onChange={(e) => setIncludeMaterials(e.target.checked)}
                  className="w-5 h-5 accent-[#CB4154] cursor-pointer"
                />
                <label htmlFor="materials" className="text-sm font-semibold text-gray-700 cursor-pointer">Include Materials</label>
              </div>

              {/* Special Instructions Field */}
              <div className="col-span-1 sm:col-span-2 mt-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wider">Special Instructions</label>
                <textarea 
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:ring-2 focus:ring-[#CB4154] outline-none text-sm md:text-base"
                  placeholder="e.g., specific site access details..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          {/* 2. Estimation Summary Section */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border-t-8 border-[#CB4154]">
            <h3 className="text-xl md:text-2xl font-bold oswald mb-6 border-b pb-4 flex items-center gap-2 uppercase">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#CB4154]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Quote Summary
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between text-sm md:text-base text-gray-600">
                  <span>Labour Cost</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(estimate.labour)}</span>
                </div>
                {includeMaterials && (
                  <div className="flex justify-between text-sm md:text-base text-gray-600">
                    <span>Materials</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(estimate.materials)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm md:text-base text-gray-600 pt-4 border-t">
                  <span>Subtotal (excl. GST)</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(estimate.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base text-gray-600">
                  <span>GST (15%)</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(estimate.gst)}</span>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center bg-[#CB4154]/5 p-6 rounded-lg border border-[#CB4154]/10">
                <p className="text-[10px] md:text-xs font-bold text-[#CB4154] uppercase tracking-widest mb-1">Total Estimate</p>
                <p className="text-4xl md:text-5xl font-bold text-[#CB4154] oswald">{formatCurrency(estimate.total)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2 text-xs text-gray-400 italic leading-tight">
                 <span className="text-[#CB4154] font-bold mt-0.5">*</span>
                 <p>Estimated m² rates for labour and materials. Final fixed price issued after site inspection.</p>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-400 italic leading-tight">
                 <span className="text-[#CB4154] font-bold mt-0.5">*</span>
                 <p>All work carries a 10-year craftsmanship guarantee and is compliant with NZS 3604.</p>
              </div>
            </div>
          </div>

          {/* 3. Calendly Inline Widget Section */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border-t-4 border-[#CB4154]">
            <h2 className="text-xl md:text-2xl font-bold oswald mb-6 uppercase">Book a Site Visit</h2>
            <div className="w-full overflow-hidden" style={{ minHeight: '700px' }}>
              <iframe
                src="https://calendly.com/YOUR_LINK"
                width="100%"
                height="700px"
                frameBorder="0"
                title="Select a Date & Time"
                className="rounded-md"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      
      {/* Service Area Section */}
      <div className="bg-white py-16 md:py-24 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold oswald mb-8 uppercase tracking-wide">Serving the Greater Canterbury Region</h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {CONTACT_INFO.areas.map(area => (
              <span key={area} className="bg-gray-50 px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-gray-600 border border-gray-200">{area}</span>
            ))}
          </div>
          <div className="h-64 md:h-[450px] w-full rounded-xl md:rounded-3xl overflow-hidden shadow-2xl bg-gray-100 ring-4 ring-gray-50">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27523.607555608025!2d172.66798389128635!3d-43.52188175116992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snz!4v1766292956812!5m2!1sen!2snz" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Service Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;


import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BRICK_RATES, CONTACT_INFO, LEAD_ENDPOINT, PHONE_HREF, SITE } from '../constants';
import { ServiceType } from '../types';

/**
 * Booking Component
 *
 * This page handles the premium quote calculator and lead capture via a custom
 * form that posts the quote payload to Google Apps Script → Google Sheets.
 * It uses the 'labour' spelling to align with AU/NZ English standards.
 */
const Booking: React.FC = () => {
  const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.BRICK);
  const [area, setArea] = useState<number>(0);
  const [complexity, setComplexity] = useState<number>(1.0);
  const [includeMaterials, setIncludeMaterials] = useState<boolean>(true);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  
  // New state for calculation and summary visibility
  const [showSummary, setShowSummary] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Existing state for the sticky action button and the booking modal
  const [showActionButton, setShowActionButton] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Lead form state — posts to Google Apps Script (see LEAD_ENDPOINT in constants.ts)
  const [lead, setLead] = useState({ name: '', phone: '', email: '', suburb: '', preferredTime: 'Anytime' });
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Optional plans/docs from the client. Sent base64-encoded inside the JSON
  // payload (keeps the request "simple", no CORS preflight); the Apps Script
  // handler saves them to Drive. Caps keep the payload inside Apps Script limits.
  const MAX_FILES = 3;
  const MAX_TOTAL_BYTES = 10 * 1024 * 1024; // 10 MB combined
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>('');

  const handleFilesChosen = (chosen: FileList | null) => {
    if (!chosen) return;
    const next = [...files, ...Array.from(chosen)].slice(0, MAX_FILES);
    const totalBytes = next.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      setFileError('Files too big. Keep the combined size under 10 MB.');
      return;
    }
    setFileError('');
    setFiles(next);
  };

  const fileToBase64 = (file: File) =>
    new Promise<{ name: string; type: string; data: string }>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Strip the "data:<mime>;base64," prefix; Apps Script wants raw base64.
        resolve({ name: file.name, type: file.type || 'application/octet-stream', data: result.split(',')[1] || '' });
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  // Ref for the element to observe for scroll (e.g., the end of the quote summary)
  const quoteSummaryRef = useRef<HTMLDivElement>(null);

  // Estimate state uses AU/NZ spelling for 'labour'
  const [estimate, setEstimate] = useState({
    labour: 0,
    materials: 0,
    subtotal: 0,
    gst: 0,
    total: 0
  });

  // Function to calculate the estimate
  const calculateEstimate = useCallback(() => {
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


  // Effect to hide summary if inputs change after calculation
  useEffect(() => {
    if (showSummary && !isCalculating) { // Only reset if summary is visible and not actively calculating
      setShowSummary(false);
      // Also hide the action button if inputs change
      setShowActionButton(false); 
    }
  }, [serviceType, area, complexity, includeMaterials]); // Depend on all quote inputs


  // Effect to handle the visibility of the "Send Job Request" button
  useEffect(() => {
    const target = quoteSummaryRef.current;
    if (!target || !showSummary) { // Only observe if summary is shown
      setShowActionButton(false); // Hide button if summary is not shown
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button when the summary is at least 50% in view AND summary is actually visible
        setShowActionButton(entry.isIntersecting && entry.intersectionRatio >= 0.5 && showSummary);
      },
      { 
        threshold: 0.5, 
        rootMargin: '0px 0px -100px 0px' 
      }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [quoteSummaryRef, showSummary]); // Re-run when showSummary changes

  const handleCalculateClick = () => {
    setIsCalculating(true);
    setShowSummary(false); // Hide summary while calculating
    calculateEstimate(); // Recalculate based on current inputs
    
    setTimeout(() => {
      setIsCalculating(false);
      setShowSummary(true); // Show summary after delay
    }, 2000); // 2-second spinning animation
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-NZ', { style: 'currency', currency: 'NZD' }).format(val);
  };

  const isCalculateButtonEnabled = area > 0;

  const SERVICE_LABELS: Record<ServiceType, string> = {
    [ServiceType.BRICK]: 'Bricklaying (Standard)',
    [ServiceType.BLOCK]: 'Blocklaying (Standard)',
    [ServiceType.VENEER]: 'Brick Veneer',
    [ServiceType.RETAINING]: 'Block Retaining Wall'
  };

  const complexityLabel =
    complexity === 1.5 ? 'Complex (High Detail, Bad Access)' :
    complexity === 1.2 ? 'Moderate (Sloped, Corners)' :
    'Standard (Flat, Easy Access)';

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!LEAD_ENDPOINT) {
      // Not configured yet — without this guard the fetch would hit the current
      // page and a 200 would read as a fake success.
      console.error('LEAD_ENDPOINT is not set in constants.ts — lead not sent.');
      setSendStatus('error');
      return;
    }
    setSendStatus('sending');
    try {
      const encodedFiles = await Promise.all(files.map(fileToBase64));
      // No custom headers — keeps this a "simple" request so the Apps Script
      // web app accepts it without a CORS preflight.
      const res = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          suburb: lead.suburb,
          preferredTime: lead.preferredTime,
          service: SERVICE_LABELS[serviceType],
          areaM2: area,
          complexity: complexityLabel,
          materialsIncluded: includeMaterials,
          labour: estimate.labour,
          materials: estimate.materials,
          subtotal: estimate.subtotal,
          gst: estimate.gst,
          total: estimate.total,
          specialInstructions,
          files: encodedFiles,
          source: window.location.href
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFiles([]);
      setSendStatus('success');
    } catch (err) {
      console.error('Lead submit failed:', err);
      setSendStatus('error');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#CB4154] text-white py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-6xl font-bold oswald uppercase leading-tight">Instant Quote Calculator</h1>
          <p className="mt-2 text-lg md:text-xl font-light opacity-90">Fair pricing. No hidden surprises. We source the latest prices from our trusted partners to give you updated information.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 md:-mt-8 pb-16 md:pb-24">
        {/* Main Stack: Project Details > Summary */}
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

          {/* Calculate Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleCalculateClick}
              disabled={!isCalculateButtonEnabled || isCalculating}
              className={`flex items-center gap-3 px-8 py-4 rounded-md font-bold oswald text-xl uppercase tracking-widest transition-all duration-300
                ${isCalculateButtonEnabled && !isCalculating 
                  ? 'bg-[#CB4154] text-white hover:bg-[#b03848] active:scale-95 shadow-md' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
            >
              {isCalculating ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </>
              ) : (
                <>
                  Calculate Quote
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* 2. Estimation Summary Section - Observing this element for button visibility */}
          {showSummary && (
            <div ref={quoteSummaryRef} className="bg-white p-6 md:p-8 rounded-lg shadow-xl border-t-8 border-[#CB4154] animate-in fade-in duration-500">
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
                <div className="flex items-start gap-2 text-xs text-gray-400 italic leading-tight">
                  <span className="text-[#CB4154] font-bold mt-0.5">*</span>
                  <p>Happy with quote book a call to finalise details.</p>
                </div>
              </div>
            </div>
          )}
          {/* The original inline Calendly section is removed from here */}
        </div>
      </div>
      
      {/* "Send Job Request" Sticky Button */}
      <div 
        className={`fixed bottom-0 left-0 w-full z-40 transition-all duration-300 ${
          showActionButton ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0' 
        }`}
      >
        <button
          onClick={() => { setSendStatus('idle'); setIsBookingModalOpen(true); }}
          className="w-full bg-[#CB4154] text-white py-6 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center gap-3 active:brightness-90 transition-all"
          aria-label="Send Job Request"
        >
          <span className="oswald font-bold text-xl uppercase tracking-widest">
            Send Job Request
          </span>
          <svg 
            className="w-6 h-6 animate-pulse" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 z-50 p-2"
              aria-label="Close booking form"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="p-6 md:p-8 pt-12 md:pt-14 overflow-y-auto max-h-[85vh]">
              <h2 id="booking-modal-title" className="text-xl md:text-2xl font-bold oswald mb-2 uppercase">Send Job Request</h2>

              {sendStatus === 'success' ? (
                <div className="text-center py-10">
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold oswald uppercase mb-2">Request Sent</h3>
                  <p className="text-gray-600 mb-6">Your quote and details are in. We'll call you back to lock in a time.</p>
                  <button
                    onClick={() => setIsBookingModalOpen(false)}
                    className="bg-[#CB4154] text-white px-8 py-3 rounded-md font-bold oswald uppercase tracking-widest"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-6">
                    Your quote comes with the request: <span className="font-semibold text-gray-800">{SERVICE_LABELS[serviceType]}, {area} m², {formatCurrency(estimate.total)} incl. GST</span>. Just add your details and we'll call you back.
                  </p>
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="lead-name" className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wider">Name *</label>
                        <input
                          id="lead-name"
                          type="text"
                          required
                          autoComplete="name"
                          className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:ring-2 focus:ring-[#CB4154] outline-none text-sm md:text-base"
                          value={lead.name}
                          onChange={(e) => setLead({ ...lead, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="lead-phone" className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wider">Phone *</label>
                        <input
                          id="lead-phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:ring-2 focus:ring-[#CB4154] outline-none text-sm md:text-base"
                          value={lead.phone}
                          onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="lead-email" className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wider">Email</label>
                        <input
                          id="lead-email"
                          type="email"
                          autoComplete="email"
                          className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:ring-2 focus:ring-[#CB4154] outline-none text-sm md:text-base"
                          value={lead.email}
                          onChange={(e) => setLead({ ...lead, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="lead-suburb" className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wider">Suburb</label>
                        <input
                          id="lead-suburb"
                          type="text"
                          className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:ring-2 focus:ring-[#CB4154] outline-none text-sm md:text-base"
                          value={lead.suburb}
                          onChange={(e) => setLead({ ...lead, suburb: e.target.value })}
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <label htmlFor="lead-time" className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wider">Best Time To Call</label>
                        <select
                          id="lead-time"
                          className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:ring-2 focus:ring-[#CB4154] outline-none text-sm md:text-base appearance-none"
                          value={lead.preferredTime}
                          onChange={(e) => setLead({ ...lead, preferredTime: e.target.value })}
                        >
                          <option>Anytime</option>
                          <option>Morning</option>
                          <option>Afternoon</option>
                          <option>After 5pm</option>
                        </select>
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <label htmlFor="lead-files" className="block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wider">
                          Plans / Docs (Optional)
                        </label>
                        <label
                          htmlFor="lead-files"
                          className="flex flex-col items-center justify-center gap-1 border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:border-[#CB4154] transition-colors bg-gray-50 text-center"
                        >
                          <svg className="w-6 h-6 text-[#CB4154]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                          <span className="text-sm text-gray-600">Upload plans, drawings or consent docs</span>
                          <span className="text-xs text-gray-400">PDF, Word or images. Up to {MAX_FILES} files, 10 MB total.</span>
                        </label>
                        <input
                          id="lead-files"
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,image/*"
                          className="sr-only"
                          onChange={(e) => { handleFilesChosen(e.target.files); e.target.value = ''; }}
                        />
                        {fileError && <p className="mt-2 text-xs text-red-600 font-semibold">{fileError}</p>}
                        {files.length > 0 && (
                          <ul className="mt-3 space-y-2">
                            {files.map((file, i) => (
                              <li key={`${file.name}-${i}`} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700">
                                <span className="truncate">{file.name} <span className="text-gray-400 text-xs">({(file.size / 1024 / 1024).toFixed(1)} MB)</span></span>
                                <button
                                  type="button"
                                  onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                                  className="text-gray-400 hover:text-red-600 font-bold px-2"
                                  aria-label={`Remove ${file.name}`}
                                >
                                  ✕
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {sendStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-sm text-red-700">
                        Something went wrong sending your request. Give us a call instead on{' '}
                        <a href={PHONE_HREF} className="font-bold underline">{CONTACT_INFO.phone}</a>.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={sendStatus === 'sending'}
                      className={`w-full py-4 rounded-md font-bold oswald text-lg uppercase tracking-widest transition-all
                        ${sendStatus === 'sending'
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-[#CB4154] text-white hover:bg-[#b03848] active:scale-[0.99]'
                        }`}
                    >
                      {sendStatus === 'sending' ? 'Sending…' : 'Send Job Request'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Service Area Section */}
      <div className="bg-white py-16 md:py-24 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold oswald mb-8 uppercase tracking-wide">Serving {SITE.regionLabel}</h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {CONTACT_INFO.areas.map(area => (
              <span key={area} className="bg-gray-50 px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-gray-600 border border-gray-200">{area}</span>
            ))}
          </div>
          <div className="h-64 md:h-[450px] w-full rounded-xl md:rounded-3xl overflow-hidden shadow-2xl bg-gray-100 ring-4 ring-gray-50">
            <iframe 
              src={SITE.mapEmbedUrl}
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

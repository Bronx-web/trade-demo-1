
import React, { useState } from 'react';
import { CONTACT_INFO, LEAD_ENDPOINT, PHONE_HREF, SITE } from '../constants';
import TriageForm, { TriageAnswers } from '../components/TriageForm';

/**
 * Booking Component
 *
 * Job request flow: a branching triage form qualifies the job, then a short
 * contact form sends it through to Google Apps Script → Google Sheets.
 *
 * There is deliberately NO instant price. Electrical work needs eyes on site
 * before anyone commits to a number, so the page qualifies the job and promises
 * a clear price before work starts — rather than generating a figure the client
 * would have to walk back.
 */
const Booking: React.FC = () => {
  // Triage results — set once the user finishes the question flow.
  const [triageAnswers, setTriageAnswers] = useState<TriageAnswers | null>(null);
  const [triageSummary, setTriageSummary] = useState('');

  const [details, setDetails] = useState('');

  // Lead form state — posts to Google Apps Script (see LEAD_ENDPOINT in constants.ts)
  const [lead, setLead] = useState({ name: '', phone: '', email: '', suburb: '', preferredTime: 'Anytime' });
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Optional photos/docs from the customer. Sent base64-encoded inside the JSON
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
          // Triage output: a readable summary plus the raw answers, so the
          // sheet stays legible while the individual fields remain queryable.
          jobSummary: triageSummary,
          ...triageAnswers,
          details,
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

  const inputClass =
    'w-full bg-gray-50 border border-gray-200 rounded-md p-3 focus:ring-2 focus:ring-accent outline-none text-sm md:text-base';
  const labelClass = 'block text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wider';

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-accent text-accent-ink py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-6xl font-bold oswald uppercase leading-tight">Request A Job</h1>
          <p className="mt-2 text-lg md:text-xl font-light opacity-90">
            A few quick questions so we know what we are turning up to. Clear price before any work starts.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 md:-mt-8 pb-16 md:pb-24">
        {/* Urgent-call shortcut, above the form so it is never buried. */}
        <div className="mb-6 bg-white border-l-4 border-accent rounded-r-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">Power out or something unsafe?</span>{' '}
            Do not fill in a form — call us.
          </p>
          <a
            href={PHONE_HREF}
            className="shrink-0 inline-flex items-center gap-2 bg-accent text-accent-ink px-5 py-2.5 rounded-md font-bold oswald tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {CONTACT_INFO.phone}
          </a>
        </div>

        {sendStatus === 'success' ? (
          <div className="bg-white rounded-lg shadow-lg border-t-4 border-accent p-8 md:p-12 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold oswald uppercase mb-2">Request Sent</h2>
            <p className="text-gray-600">
              Thanks — we have your job details. {SITE.name} will call you back to confirm a time and price.
            </p>
          </div>
        ) : !triageAnswers ? (
          <TriageForm
            onComplete={(answers, summary) => {
              setTriageAnswers(answers);
              setTriageSummary(summary);
            }}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-lg border-t-4 border-accent p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold oswald uppercase">Almost done</h2>
                <p className="text-sm text-gray-500 mt-1">How do we get hold of you?</p>
              </div>
              <button
                type="button"
                onClick={() => { setTriageAnswers(null); setTriageSummary(''); }}
                className="shrink-0 text-sm font-semibold text-gray-500 hover:text-gray-900 underline"
              >
                Change answers
              </button>
            </div>

            <div className="bg-accent-soft border border-accent/20 rounded-md p-4 mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Your job</p>
              <p className="text-sm text-gray-800">{triageSummary}</p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-name" className={labelClass}>Name *</label>
                  <input
                    id="lead-name" type="text" required autoComplete="name" className={inputClass}
                    value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="lead-phone" className={labelClass}>Phone *</label>
                  <input
                    id="lead-phone" type="tel" required autoComplete="tel" className={inputClass}
                    value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="lead-email" className={labelClass}>Email</label>
                  <input
                    id="lead-email" type="email" autoComplete="email" className={inputClass}
                    value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="lead-suburb" className={labelClass}>Suburb</label>
                  <input
                    id="lead-suburb" type="text" className={inputClass}
                    value={lead.suburb} onChange={(e) => setLead({ ...lead, suburb: e.target.value })}
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label htmlFor="lead-time" className={labelClass}>Best Time To Call</label>
                  <select
                    id="lead-time" className={`${inputClass} appearance-none`}
                    value={lead.preferredTime} onChange={(e) => setLead({ ...lead, preferredTime: e.target.value })}
                  >
                    <option>Anytime</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>After 5pm</option>
                  </select>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label htmlFor="lead-details" className={labelClass}>Anything else we should know?</label>
                  <textarea
                    id="lead-details" rows={3} className={inputClass}
                    placeholder="Access, parking, pets, best entrance — anything that helps us turn up prepared."
                    value={details} onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label htmlFor="lead-files" className={labelClass}>Photos (Optional)</label>
                  <label
                    htmlFor="lead-files"
                    className="flex flex-col items-center justify-center gap-1 border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:border-accent transition-colors bg-gray-50 text-center"
                  >
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">A photo of the switchboard or the problem helps a lot</span>
                    <span className="text-xs text-gray-400">Images, PDF or Word. Up to {MAX_FILES} files, 10 MB total.</span>
                  </label>
                  <input
                    id="lead-files" type="file" multiple accept=".pdf,.doc,.docx,image/*" className="sr-only"
                    onChange={(e) => { handleFilesChosen(e.target.files); e.target.value = ''; }}
                  />
                  {fileError && <p className="mt-2 text-xs text-red-600 font-semibold">{fileError}</p>}
                  {files.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {files.map((file, i) => (
                        <li key={`${file.name}-${i}`} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700">
                          <span className="truncate">
                            {file.name} <span className="text-gray-400 text-xs">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                          </span>
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
                  Something went wrong sending your request. Please call us on{' '}
                  <a href={PHONE_HREF} className="font-bold underline">{CONTACT_INFO.phone}</a> instead.
                </div>
              )}

              <button
                type="submit"
                disabled={sendStatus === 'sending'}
                className="w-full bg-accent hover:bg-accent-dark text-accent-ink py-4 rounded-md font-bold oswald text-lg uppercase tracking-widest transition-colors disabled:opacity-60"
              >
                {sendStatus === 'sending' ? 'Sending…' : 'Send Job Request'}
              </button>
              <p className="text-xs text-gray-400 text-center">
                We will only use these details to get back to you about this job.
              </p>
            </form>
          </div>
        )}

        {/* Service area */}
        <div className="mt-16 md:mt-20">
          <h2 className="text-2xl md:text-3xl font-bold oswald uppercase text-center mb-6">
            Serving {SITE.regionLabel}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CONTACT_INFO.areas.map((area) => (
              <span key={area} className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-600">
                {area}
              </span>
            ))}
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src={SITE.mapEmbedUrl}
              title={`${SITE.name} service area map`}
              className="w-full h-[320px] md:h-[420px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;


import React, { useMemo, useState } from 'react';
import { CONTACT_INFO, PHONE_HREF } from '../constants';

/**
 * TriageForm
 *
 * Replaces the masonry quote calculator. Electrical work cannot be honestly
 * priced from a web form — an area-times-rate number would commit the client to
 * a figure they cannot stand behind — so this qualifies the job instead of
 * quoting it.
 *
 * Two things make it more than a styled contact form:
 *
 * 1. EMERGENCY DETECTION. Answers that indicate danger (no power, burning
 *    smell, sparks, water near the switchboard) stop the flow immediately and
 *    show the phone number. A form that calmly collects an email address while
 *    someone's switchboard is smoking is actively harmful.
 * 2. BRANCHING. The follow-up question depends on the job type, so a fault gets
 *    asked about symptoms while a new install gets asked about the property.
 *
 * Contact details are requested last, once the user has invested a few taps.
 *
 * PER-CLIENT: the question set below is trade-specific. Swap QUESTIONS and
 * EMERGENCY_ANSWER_IDS for a different trade; the step machinery is generic.
 */

export type TriageAnswers = Record<string, string>;

type Option = {
  id: string;
  label: string;
  hint?: string;
  /** Selecting this jumps straight to the emergency panel. */
  emergency?: boolean;
};

type Question = {
  id: string;
  /** Only asked when this returns true — how branching works. */
  when?: (a: TriageAnswers) => boolean;
  title: string;
  subtitle?: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: 'jobType',
    title: 'What do you need done?',
    subtitle: 'Pick the closest match — we will confirm the details when we call.',
    options: [
      { id: 'fault', label: 'Something is broken', hint: 'Power out, tripping, not working' },
      { id: 'install', label: 'New install or upgrade', hint: 'Powerpoints, lights, switchboard' },
      { id: 'newbuild', label: 'New build or renovation', hint: 'Full wiring, fitout' },
      { id: 'data', label: 'Data or networking', hint: 'Fibre, cabling, dead zones' },
    ],
  },
  {
    id: 'faultSymptom',
    when: (a) => a.jobType === 'fault',
    title: 'What is happening right now?',
    subtitle: 'If anything here looks serious, we will tell you to call instead of waiting on a form.',
    options: [
      { id: 'burning', label: 'Burning smell, sparks or smoke', emergency: true },
      { id: 'nopower', label: 'No power at all', emergency: true },
      { id: 'water', label: 'Water near wiring or the switchboard', emergency: true },
      { id: 'tripping', label: 'Breaker keeps tripping', hint: 'Power comes back when reset' },
      { id: 'partial', label: 'Some lights or sockets not working' },
    ],
  },
  {
    id: 'installWhat',
    when: (a) => a.jobType === 'install',
    title: 'What are we installing?',
    options: [
      { id: 'switchboard', label: 'Switchboard upgrade' },
      { id: 'lighting', label: 'Lights or LED strip' },
      { id: 'powerpoints', label: 'Powerpoints or new circuits' },
      { id: 'appliance', label: 'Oven, hob or heat pump' },
      { id: 'other-install', label: 'Something else' },
    ],
  },
  {
    id: 'buildStage',
    when: (a) => a.jobType === 'newbuild',
    title: 'What stage is the job at?',
    options: [
      { id: 'planning', label: 'Still planning', hint: 'After a price to budget with' },
      { id: 'preline', label: 'Ready for pre-line wiring' },
      { id: 'fitoff', label: 'Ready for fit-off' },
      { id: 'reno', label: 'Renovation of an existing space' },
    ],
  },
  {
    id: 'dataWhat',
    when: (a) => a.jobType === 'data',
    title: 'What do you need?',
    options: [
      { id: 'deadzones', label: 'Wifi dead zones' },
      { id: 'cabling', label: 'Data or fibre cabling' },
      { id: 'testing', label: 'Testing an existing network' },
      { id: 'other-data', label: 'Something else' },
    ],
  },
  {
    id: 'property',
    title: 'What kind of property?',
    options: [
      { id: 'home', label: 'My home' },
      { id: 'rental', label: 'A rental I own or manage' },
      { id: 'business', label: 'Business or commercial' },
    ],
  },
  {
    id: 'timing',
    title: 'How soon do you need us?',
    options: [
      { id: 'asap', label: 'As soon as possible' },
      { id: 'thisweek', label: 'This week' },
      { id: 'fewweeks', label: 'Next few weeks' },
      { id: 'planning-ahead', label: 'Just planning ahead' },
    ],
  },
];

/** Human-readable summary of the answers, for the lead payload and the UI. */
export const summariseTriage = (answers: TriageAnswers): string =>
  QUESTIONS.filter((q) => answers[q.id])
    .map((q) => {
      const chosen = q.options.find((o) => o.id === answers[q.id]);
      return `${q.title} ${chosen ? chosen.label : answers[q.id]}`;
    })
    .join(' | ');

type Props = {
  /** Called once triage is complete, with the collected answers. */
  onComplete: (answers: TriageAnswers, summary: string) => void;
};

const TriageForm: React.FC<Props> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<TriageAnswers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [isEmergency, setIsEmergency] = useState(false);

  // Only the questions that apply to the answers so far. Recomputed on every
  // answer, so choosing a different job type re-routes the remaining steps.
  const activeQuestions = useMemo(
    () => QUESTIONS.filter((q) => !q.when || q.when(answers)),
    [answers]
  );

  const current = activeQuestions[stepIndex];
  const total = activeQuestions.length;
  const progress = Math.round((stepIndex / total) * 100);

  const choose = (option: Option) => {
    const next = { ...answers, [current.id]: option.id };
    setAnswers(next);

    if (option.emergency) {
      setIsEmergency(true);
      return;
    }

    // activeQuestions is stale here (it is memoised off the previous answers),
    // so recompute against `next` to decide whether this was the final step.
    const remaining = QUESTIONS.filter((q) => !q.when || q.when(next));
    if (stepIndex + 1 >= remaining.length) {
      onComplete(next, summariseTriage(next));
      return;
    }
    setStepIndex(stepIndex + 1);
  };

  const back = () => {
    if (stepIndex === 0) return;
    const previous = activeQuestions[stepIndex - 1];
    const { [previous.id]: _removed, ...rest } = answers;
    setAnswers(rest);
    setStepIndex(stepIndex - 1);
  };

  if (isEmergency) {
    return (
      <div className="bg-white rounded-lg shadow-lg border-t-4 border-red-600 p-6 md:p-10 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold oswald uppercase mb-3">Please call us — do not wait on this form</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-2">
          What you have described can be a fire or shock risk. Do not use the affected circuit,
          and if it is safe to do so, switch it off at the switchboard.
        </p>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          If you can smell burning or see smoke, get everyone out and call <strong>111</strong> first.
        </p>
        <a
          href={PHONE_HREF}
          className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-md font-bold oswald text-xl tracking-wider transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {CONTACT_INFO.phone}
        </a>
        <button
          type="button"
          onClick={() => { setIsEmergency(false); back(); }}
          className="block mx-auto mt-6 text-sm text-gray-500 underline hover:text-gray-800"
        >
          That is not my situation — go back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border-t-4 border-accent p-6 md:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
          <span>Step {stepIndex + 1} of {total}</span>
          <span>{progress}% complete</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${Math.max(progress, 4)}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      <h2 className="text-xl md:text-3xl font-bold oswald uppercase mb-2">{current.title}</h2>
      {current.subtitle && <p className="text-gray-500 text-sm md:text-base mb-6">{current.subtitle}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        {current.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => choose(option)}
            className="text-left border-2 border-gray-200 hover:border-accent hover:bg-accent-soft rounded-lg p-4 transition-colors group"
          >
            <span className="block font-bold oswald uppercase tracking-wide text-gray-900 group-hover:text-accent-dark">
              {option.label}
            </span>
            {option.hint && <span className="block text-xs text-gray-500 mt-1">{option.hint}</span>}
          </button>
        ))}
      </div>

      {stepIndex > 0 && (
        <button
          type="button"
          onClick={back}
          className="mt-6 text-sm font-semibold text-gray-500 hover:text-gray-900 inline-flex items-center gap-1"
        >
          <span aria-hidden="true">←</span> Back
        </button>
      )}
    </div>
  );
};

export default TriageForm;

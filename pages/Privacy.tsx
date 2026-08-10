
import React from 'react';
import { SITE, CONTACT_INFO } from '../constants';

/**
 * Privacy Page
 *
 * Plain-English privacy statement covering the lead form. Generic template —
 * content pulls from constants so it re-skins with the rest of the site.
 */
const Privacy: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-accent text-accent-ink py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold oswald uppercase leading-tight">Privacy Policy</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16 space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold oswald uppercase mb-3">What we collect</h2>
          <p>
            When you send a job request through this site, we collect the details you give us:
            your name, phone number, email, suburb, the details of the job you're asking about,
            and any plans or documents you choose to upload.
            That's it. No accounts, no tracking profiles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold oswald uppercase mb-3">What we do with it</h2>
          <p>
            We use your details to get back to you about your job. Your request is stored securely
            and is never sold or passed on to anyone else.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold oswald uppercase mb-3">Your rights</h2>
          <p>
            Under the Privacy Act 2020 you can ask to see the information we hold about you, or ask
            us to correct or delete it. Email{' '}
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-accent font-semibold underline">{CONTACT_INFO.email}</a>{' '}
            and we'll sort it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold oswald uppercase mb-3">Third-party services</h2>
          <p>
            This site uses Google Maps to show our service area. Google may set its own cookies
            when the map loads. See Google's privacy policy for details.
          </p>
        </section>

        <p className="text-sm text-gray-400 border-t pt-6">
          {SITE.name}, {CONTACT_INFO.address}
        </p>
      </div>
    </div>
  );
};

export default Privacy;

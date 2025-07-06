import React from 'react'

const page = () => {
  return (
    <>
      <main className="p-6 max-w-5xl mx-auto text-gray-800 bg-slate-100">
      <h1 className="text-4xl font-bold text-black mb-6">Terms of Use</h1>

      <p className="mb-6 text-lg">
        Welcome to <strong>Arogyam</strong> — a specialized healthcare platform
        built to offer real-time emergency help, AI health support, wellness
        reminders, and virtual care services. By using this website or app, you
        agree to the following terms and conditions.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-700">1. Purpose of Use</h2>
        <p>
          Arogyam is an informational and support tool, not a replacement for
          licensed medical professionals. It connects users with hospital data,
          health alerts, symptom checkers, and virtual consultations to support
          informed decision-making.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-700">2. No Medical Liability</h2>
        <p>
          The AI chatbot and suggestions provided are based on trained datasets
          but do not guarantee medical accuracy. Always consult a doctor for
          diagnosis or treatment. Arogyam is not responsible for adverse outcomes
          due to AI recommendations or hospital delays.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-700">3. Data Usage & Privacy</h2>
        <p>
          By using Arogyam, you consent to the collection and processing of your
          personal and health data in accordance with our <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a>. 
          All sensitive information is protected with secure protocols.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-700">4. Third-Party Integrations</h2>
        <p>
          Arogyam may include third-party services like hospital systems, cab/ambulance
          providers, or medicine retailers. We are not responsible for their
          availability, pricing, or services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-700">5. User Responsibilities</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Provide accurate personal and health details when prompted.</li>
          <li>Do not misuse emergency features or provide false inputs.</li>
          <li>Respect the integrity and privacy of other users.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-green-700">6. Modifications to Terms</h2>
        <p>
          Arogyam reserves the right to modify these Terms at any time. Updates
          will be posted here. Continued use means you accept the latest version.
        </p>
      </section>

      
    </main>
    </>
  )
}

export default page

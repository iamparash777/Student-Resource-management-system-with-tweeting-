import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">Effective Date: [Date]</p>

      <section>
        <h2 className="text-2xl font-semibold mt-6">1. Introduction</h2>
        <p>
          These Terms of Service govern your use of our platform and services. By using our services, you agree to comply with these terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6">2. User Responsibilities</h2>
        <p>
          Users are responsible for ensuring their activities on the platform are lawful and do not violate any terms outlined here.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6">3. Prohibited Activities</h2>
        <ul className="list-disc pl-5 mt-2">
          <li>Engaging in illegal activities on the platform</li>
          <li>Impersonating others or misusing our services</li>
          <li>Uploading harmful or offensive content</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6">4. Termination of Services</h2>
        <p>
          We reserve the right to suspend or terminate access to our platform for users who violate the terms of service or engage in misconduct.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6">5. Limitation of Liability</h2>
        <p>
          Our platform is not responsible for any damages, losses, or issues resulting from the use of our services.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;

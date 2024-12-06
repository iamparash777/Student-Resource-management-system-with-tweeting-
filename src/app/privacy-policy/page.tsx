import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy and Community Guidelines</h1>
      <p className="mb-4">Effective Date: [Date]</p>

      <section>
        <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
        <p>
          To enhance your experience and ensure a secure environment, we collect certain personal information, including:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Location Data:</strong> We may access your location to personalize your experience and deliver relevant content.</li>
          <li><strong>Account Information:</strong> During account creation, we collect your username, full name, and Gmail address to uniquely identify you on our platform.</li>
          <li><strong>Login Activity:</strong> Login activities are monitored to maintain security and prevent unauthorized access.</li>
        </ul>
        <p className="mt-2">Please note that we <strong>do not collect or store your password</strong> directly. Passwords are managed and encrypted securely through our authentication provider.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6">2. Content Monitoring and Moderation</h2>
        <p>To foster a safe and positive community, we may monitor and moderate content as follows:</p>
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Message Monitoring:</strong> We reserve the right to monitor and, if necessary, delete messages that violate our guidelines, including messages containing harassment, hate speech, or other offensive language.</li>
          <li><strong>Post Deletion:</strong> Content that violates our standards, including violent, harmful, or culturally insensitive material, may be removed to protect our community.</li>
          <li><strong>Unauthorized Behavior:</strong> Unauthorized activities, including hacking, account impersonation, or disruptive content, will result in appropriate actions, such as warnings, account suspension, or permanent removal.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6">3. Cultural Sensitivity and Harassment Policy</h2>
        <p>Our platform respects all cultures and strictly prohibits any form of harassment. Users are expected to:</p>
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Respect Cultural Differences:</strong> Any form of discrimination or culturally insensitive behavior will be moderated, and violators may face disciplinary action.</li>
          <li><strong>Avoid Harassment:</strong> Harassment of any kind, including bullying, hate speech, or targeting individuals, is strictly prohibited.</li>
        </ul>
        <p className="mt-2">Violations of these policies may result in immediate action against the account in question.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6">4. User Responsibilities</h2>
        <p>Users are responsible for ensuring that their activity on the platform aligns with these guidelines. By using our services, you agree to these policies and understand that violations may result in disciplinary actions.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

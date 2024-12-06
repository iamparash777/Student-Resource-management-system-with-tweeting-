import React from 'react';

const Support = () => {
  return (
    <div className="container mx-auto p-6 bg-white text-gray-900">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Support</h1>
      </header>

      <section className="support-info text-center mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Need Help?</h2>
        <p className="text-gray-700 mb-4">
          If you are experiencing any issues or need assistance with using the platform, please feel free to reach out to us.
          We are here to help you with any technical problems, questions, or suggestions you might have.
        </p>
        <p className="text-gray-700">
          You can contact us through the form below or via email. Our support team is available Monday through Friday, 9 AM to 6 PM.
        </p>
      </section>

      <section className="contact-form bg-gray-100 p-6 rounded-md shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h3>
        <form action="#" method="POST" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-800">Your Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" className="w-full p-3 bg-white text-gray-900 rounded-md border border-gray-300 focus:outline-none" required />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-800">Your Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" className="w-full p-3 bg-white text-gray-900 rounded-md border border-gray-300 focus:outline-none" required />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-800">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Write your message" className="w-full p-3 bg-white text-gray-900 rounded-md border border-gray-300 focus:outline-none" required></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none">Send Message</button>
          </div>
        </form>
      </section>

      <section className="faq mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions (FAQs)</h2>
        <ul className="space-y-4 text-gray-700">
          <li>
            <h3 className="font-semibold text-gray-800">How do I reset my password?</h3>
            <p>If you’ve forgotten your password, click the “Forgot Password” link on the login page to reset it.</p>
          </li>
          <li>
            <h3 className="font-semibold text-gray-800">How can I contact support?</h3>
            <p>You can contact support by filling out the contact form above or by emailing us directly at support@website.com.</p>
          </li>
          <li>
            <h3 className="font-semibold text-gray-800">How do I upload study materials?</h3>
            <p>Once logged in, go to the &quot;Upload&quot; section and follow the instructions to submit your study materials.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Support;

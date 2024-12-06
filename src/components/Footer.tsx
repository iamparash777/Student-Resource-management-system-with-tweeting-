import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p>&copy; 2024 Parash Shakya. All rights reserved.</p>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-gray-300">Terms of Service</a></li>
              <li><a href="mailto:pparashh777@gmail.com" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

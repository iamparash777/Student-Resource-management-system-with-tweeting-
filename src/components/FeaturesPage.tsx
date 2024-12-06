import React from 'react';
import { SiNextdotjs, SiPinterest, SiBehance, SiFigma, SiOpenai } from 'react-icons/si'; // Import some icons

import Image from 'next/image';
import FigmaIcon from '../../public/figma-seeklogo.svg';
import PinterestIcon from '../../public/pinterest-seek.svg';
import FirebaseIcon from '../../public/firebase-seek.svg';
import NextJsIcon from '../../public/next.js.svg';

const FeaturesPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6  text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Platform Features</h1>
      
      {/* Features List */}
      <ul className="text-lg text-gray-600 space-y-3 mb-10">
        <li>🔹 Chat with peers and mentors</li>
        <li>🔹 Tweet and share your ideas</li>
        <li>🔹 Easy access to study resources</li>
        <li>🔹 Login with Google</li>
      </ul>

      {/* Supported Tools Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Supported Tools & Technologies</h2>
      
      <div className="flex overflow-hidden mt-4">
        <div className="flex animate-scroll space-x-10">
          {/* Icons for each tool */}
          <a href="/nextjs" className="text-6xl text-gray-800">
            <Image src={NextJsIcon} alt="Next.js" width={100} height={100} />
          </a>
          <a href="/firebase" className="text-6xl text-yellow-500">
            <Image src={FirebaseIcon} alt="Firebase" width={100} height={100} />
          </a>
          <a href="/pinterest" className="text-6xl text-pink-600">
            <Image src={PinterestIcon} alt="Pinterest" width={100} height={100} />
          </a>
          <a href="/figma" className="text-6xl text-blue-500">
            <Image src={FigmaIcon} alt="Figma" width={100} height={100} />
          </a>
          <a href="/chatgpt" className="text-6xl text-green-500">
            <SiOpenai />
          </a>
          <div className="text-6xl text-indigo-500">
            <SiBehance />
          </div>

          {/* Repeat icons to create a continuous loop */}
          <a href="/nextjs" className="text-6xl text-gray-800">
            <SiNextdotjs />
          </a>
          <a href="/pinterest" className="text-6xl text-pink-600">
            <SiPinterest />
          </a>
          <a href="/behance" className="text-6xl text-blue-500">
            <SiBehance />
          </a>
          <a href="/figma" className="text-6xl text-indigo-500">
            <SiFigma />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;

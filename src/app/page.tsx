'use client'; // Mark this as a Client Component

import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import FeaturesPage from '../components/FeaturesPage';
import AboutPage from '../components/AboutPage';
import SupportedPage from '../components/SupportedPage';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';



const Page = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Video behavior for updating playback time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime < 10) {
        video.currentTime = 10;
      }
      if (video.duration - video.currentTime < 10) {
        video.currentTime = 0;  // Reset to beginning
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

 

  // Add a function to handle manual navigation
  const handleNavigation = (path: string) => {
    if (isLoggedIn) {
      router.push(path);
    }
  };

  return (
    <div className="relative w-screen overflow-x-hidden">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-8">
          <Header isLoggedIn={isLoggedIn} onNavigate={handleNavigation} />
        </div>
      </div>

      {/* Main content */}
      <main>
        <section id="home" className="relative min-h-screen">
          {/* Video background for HomePage */}
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="/assists/TIDAL ECHOES.mp4"
            autoPlay
            loop
            muted
          />
          <div className="container mx-auto px-4 relative z-10 pt-24">
            <HomePage />
          </div>
        </section>
        <section id="features" className="bg-white min-h-screen">
          <div className="container mx-auto px-4 py-16">
            <FeaturesPage />
          </div>
        </section>
        <section id="about" className="bg-black min-h-screen">
          <div className="container mx-auto px-4 py-16">
            <AboutPage />
          </div>
        </section>
        <section id="supported" className="bg-white min-h-screen">
          <div className="container mx-auto px-4 py-16">
            <SupportedPage />
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Page;

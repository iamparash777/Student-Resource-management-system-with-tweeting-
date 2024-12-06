import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-6  text-white">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">About the Project</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* About Me Section */}
        <section className="about-me text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">About Me</h2>
          <p className="text-gray-400 mb-4">
            Hi, I&apos;m Paras Shakya, a student currently pursuing a BCA at St. Lawrence College in Chabhile, Nepal.
            I created this platform to help students easily access academic resources like study notes, question papers,
            quizzes, and more. As a student myself, I understand how important it is to have everything in one place to 
            study effectively.
          </p>
          <p className="text-gray-400">
            The goal of this platform is to provide students with a streamlined way to find and share educational materials, 
            while also offering features for communication and staying updated on academic events.
          </p>
        </section>

        {/* About the Website Section */}
        <section className="project-description text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">About the Website</h2>
          <p className="text-gray-400 mb-4">
            This platform is designed to provide students with easy access to essential academic resources like study notes, 
            question papers, quizzes, and more. It includes features that allow students to interact through chatting and tweeting, 
            as well as stay updated on important academic events.
          </p>
          <p className="text-gray-400">
            Built using modern technologies such as Next.js and Firebase, the platform also supports Google login for a seamless 
            user experience. With a focus on user-friendly design, this website aims to make students&apos; academic journeys more organized 
            and accessible.
          </p>
        </section>
      </div>

      <section className="technologies-used mt-12">
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">Technologies Used</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li><strong>Next.js:</strong> A powerful React framework used for building the website.</li>
          <li><strong>Firebase:</strong> A backend platform used for database management and user authentication.</li>
          <li><strong>Shadcn/UI:</strong> A UI toolkit used to create beautiful and responsive interfaces.</li>
          <li><strong>Figma:</strong> Used for UI/UX design to ensure a smooth user experience.</li>
          <li><strong>Behance:</strong> Inspirations and design ideas for visual aspects of the platform.</li>
          <li><strong>Pinterest:</strong> Additional design inspirations.</li>
          <li><strong>Tribhuvan University (TU):</strong> Inspired by the educational needs of students at TU and beyond.</li>
        </ul>
      </section>
    </div>
  );
};

export default About;

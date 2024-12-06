import React from 'react';
import Header from '../pages/widgets/Header';
import UploadWidget from '../../componentsuser/pages/UploadWidgets/UploadWidget';

const UploadContent = () => (
  <div className="flex flex-col h-screen w-full text-gray-200">
     <div className="flex items-center justify-between ">
      <h1 className="font-bold text-3xl font-sans">Upload</h1> {/* Updated Title */}
      <Header />
    </div>
    <div className="flex-1 p-6 overflow-y-auto">
      <UploadWidget />
    </div>
  </div>
);

export default UploadContent;

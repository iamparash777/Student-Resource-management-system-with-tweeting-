// src/components/UploadBar.tsx
'use client';

import React, { useState } from 'react';

const UploadBar = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      console.log('Uploading:', file.name);
      // Add your upload logic here
    }
  };

  return (
    <div className="bg-white p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Upload File</h2>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        {file ? `Upload ${file.name}` : 'Upload'}
      </button>
    </div>
  );
};

export default UploadBar;

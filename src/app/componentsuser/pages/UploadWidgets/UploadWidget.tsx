import React, { useState } from 'react';
import { db } from '../../../firebaseConfig'; // Make sure Firebase is initialized
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

// Utility function to truncate text to a maximum of 15 words
const truncateText = (text: string, maxWords: number) => {
  const words = text.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
};

const UploadWidget: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<'class' | 'semester' | 'year' | ''>('');
  const [classSemYear, setClassSemYear] = useState('');
  const [subjectTitle, setSubjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [submittedFiles, setSubmittedFiles] = useState<
    { id: string; title: string; date: string; classSemYear: string; description: string; urls: string[] }[]
  >([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null); // State for notification

  // Fetch submitted files from Firestore
  const fetchSubmittedFiles = async () => {
    const querySnapshot = await getDocs(collection(db, 'submittedFiles'));
    const files: any[] = [];
    querySnapshot.forEach((doc) => {
      files.push({ ...doc.data(), id: doc.id });
    });
    setSubmittedFiles(files);
  };

  // Handle URL Addition
  const handleAddUrl = () => {
    if (url) {
      setUploadedUrls([...uploadedUrls, url]);
      setUrl('');
    }
  };

  // Handle URL Removal
  const handleRemoveUrl = (index: number) => {
    setUploadedUrls(uploadedUrls.filter((_, i) => i !== index));
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentDate = new Date().toLocaleDateString();

    const newEntry = {
      title: subjectTitle,
      date: currentDate,
      classSemYear,
      description,
      urls: uploadedUrls,
    };

    try {
      if (editingIndex !== null && editingIndex >= 0 && editingIndex < submittedFiles.length) {
        const fileToEdit = submittedFiles[editingIndex];
        const docRef = doc(db, 'submittedFiles', fileToEdit.id);
        await updateDoc(docRef, newEntry);
        setEditingIndex(null);
      } else {
        await addDoc(collection(db, 'submittedFiles'), newEntry);
      }

      // Fetch submitted files after successful upload
      await fetchSubmittedFiles();

      // Set notification message
      setNotification('File uploaded successfully!');

      // Reset fields after submission
      setSubjectTitle('');
      setClassSemYear('');
      setDescription('');
      setUploadedUrls([]);
      setSelectedOption('');
    } catch (error) {
      console.error('Error submitting the form: ', error);
    }
  };

  const handleRemoveSubject = async (index: number) => {
    const fileToRemove = submittedFiles[index];
    await deleteDoc(doc(db, 'submittedFiles', fileToRemove.id));
    fetchSubmittedFiles();
  };

  const handleEditSubject = (index: number) => {
    const subject = submittedFiles[index];
    setSubjectTitle(subject.title);
    setClassSemYear(subject.classSemYear);
    setDescription(subject.description);
    setUploadedUrls(subject.urls);
    setEditingIndex(index);
  };

  React.useEffect(() => {
    fetchSubmittedFiles();
  }, []);

  // Clear notification after a few seconds
  React.useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000); // Notification will disappear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="flex">
      {/* Notification Display */}
      {notification && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          {notification}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col p-8 space-y-4 bg-gray-800 text-gray-200 rounded-lg w-2/3">
        <h2 className="text-xl font-semibold">{editingIndex !== null ? 'Edit Subject' : 'Upload Educational Details'}</h2>

        {/* Select either Class, Semester, or Year */}
        <div className="grid grid-cols-3 gap-4">
          <select
            className="bg-gray-700 p-2 rounded"
            value={selectedOption === 'class' ? classSemYear : ''}
            onChange={(e) => {
              setSelectedOption('class');
              setClassSemYear(e.target.value);
            }}
            disabled={selectedOption !== '' && selectedOption !== 'class'}
          >
            <option value="">Select Class</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={`Class ${i + 1}`}>
                Class {i + 1}
              </option>
            ))}
          </select>
          <select
            className="bg-gray-700 p-2 rounded"
            value={selectedOption === 'semester' ? classSemYear : ''}
            onChange={(e) => {
              setSelectedOption('semester');
              setClassSemYear(e.target.value);
            }}
            disabled={selectedOption !== '' && selectedOption !== 'semester'}
          >
            <option value="">Select Semester</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={`Semester ${i + 1}`}>
                Semester {i + 1}
              </option>
            ))}
          </select>
          <select
            className="bg-gray-700 p-2 rounded"
            value={selectedOption === 'year' ? classSemYear : ''}
            onChange={(e) => {
              setSelectedOption('year');
              setClassSemYear(e.target.value);
            }}
            disabled={selectedOption !== '' && selectedOption !== 'year'}
          >
            <option value="">Select Year</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={`Year ${i + 1}`}>
                Year {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Title */}
        <input
          type="text"
          className="bg-gray-700 p-2 rounded w-full"
          placeholder="Subject Title"
          value={subjectTitle}
          onChange={(e) => setSubjectTitle(e.target.value)}
        />

        {/* Description */}
        <textarea
          className="bg-gray-700 p-2 rounded w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* URL Input Field */}
        <div className="bg-gray-700 p-4 rounded flex flex-col space-y-4">
          <label className="text-sm text-gray-300">Add file URL</label>
          <input
            type="text"
            className="bg-gray-600 p-2 rounded w-full"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="button" onClick={handleAddUrl} className="text-blue-500 mt-2">
            Add URL
          </button>
        </div>

        {/* Uploaded URLs Display */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Uploaded URLs</h3>
          {uploadedUrls.length > 0 ? (
            <div className="space-y-4 mt-2">
              {uploadedUrls.map((link, index) => (
                <div key={index} className="p-2 border-b border-gray-500 flex justify-between items-center">
                  <p>{link}</p>
                  <button type="button" onClick={() => handleRemoveUrl(index)} className="text-red-500">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4">No URLs added</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full mt-4">
          {editingIndex !== null ? 'Update' : 'Upload'}
        </button>
      </form>

      {/* Right Sidebar for Submitted Files */}
      <div className="bg-gray-700 p-4 w-1/3 text-gray-200 rounded-lg ml-4">
        <h3 className="text-lg font-semibold">Submitted Details</h3>
        {submittedFiles.length > 0 ? (
          <div className="space-y-4 mt-4">
            {submittedFiles.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
                <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                  <p className="font-semibold">{truncateText(item.title, 15)}</p>
                  <p className="text-sm">{truncateText(item.classSemYear, 15)}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                  <p className="mt-2">{truncateText(item.description, 15)}</p>
                  <ul className="mt-2 text-blue-400">
                    {item.urls.map((link, idx) => (
                      <li key={idx} className="overflow-hidden whitespace-nowrap text-ellipsis">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          {truncateText(link, 15)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <button type="button" onClick={() => handleEditSubject(index)} className="text-blue-500 mr-2">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleRemoveSubject(index)} className="text-red-500">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4">No submitted details found</p>
        )}
      </div>
    </div>
  );
};

export default UploadWidget;

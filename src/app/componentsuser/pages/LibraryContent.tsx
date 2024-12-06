import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebaseConfig'; // Ensure Firebase and auth are initialized
import { collection, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import Header from './widgets/Header';
import Snackbar from '@mui/material/Snackbar';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import MuiAlert, { AlertProps } from '@mui/material/Alert';

const UserPage: React.FC = () => {
  const [submittedFiles, setSubmittedFiles] = useState<
    { id: string; title: string; date: string; classSemYear: string; description: string; urls: string[] }[]
  >([]);
  const [bookmarkedFiles, setBookmarkedFiles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>(''); // State for snackbar message

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  // Fetch submitted files from Firestore
  const fetchSubmittedFiles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'submittedFiles'));
      const files: any[] = [];
      querySnapshot.forEach((doc) => {
        files.push({ ...doc.data(), id: doc.id });
      });
      setSubmittedFiles(files);
    } catch (error) {
      console.error('Error fetching submitted files:', error);
    }
  };

  const fetchBookmarkedFiles = async () => {
    const userId = auth.currentUser?.uid; // Get the current user's ID
    if (!userId) return;

    try {
      const bookmarksSnapshot = await getDocs(collection(db, `Bookmarks`));
      const bookmarks: string[] = [];
      bookmarksSnapshot.forEach((doc) => {
        bookmarks.push(doc.id); // Store the IDs of bookmarked files
      });
      setBookmarkedFiles(bookmarks);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  useEffect(() => {
    fetchSubmittedFiles();
    fetchBookmarkedFiles(); // Fetch bookmarks when the component mounts
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredFiles = submittedFiles.filter(file =>
    file.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookmark = async (file: { id: string; title: string; date: string; classSemYear: string; description: string; urls: string[] }) => {
    const userId = auth.currentUser?.uid; // Get the current user's ID
    if (!userId) {
      console.error('User is not authenticated. Cannot add bookmark.');
      setSnackbarMessage('You must be logged in to bookmark items.'); // Set error message
      setOpenSnackbar(true); // Show notification
      return;
    }

    try {
      // This writes the bookmark under the new "Bookmarks" collection
      await setDoc(doc(db, `Bookmarks/${file.id}`), { // Change the path to the new collection
        userId: userId, // Optionally store the user ID if needed
        title: file.title,
        date: file.date,
        classSemYear: file.classSemYear,
        description: file.description,
        urls: file.urls,
        createdAt: serverTimestamp() // Optional: add a timestamp
      });
      setSnackbarMessage('Bookmark added successfully!'); // Set success message
      setOpenSnackbar(true); // Show notification
    } catch (error) {
      console.error('Error adding bookmark:', error);
      setSnackbarMessage('Error adding bookmark. Please try again.'); // Set error message
      setOpenSnackbar(true); // Show notification
    }
  };
  

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="p-8 text-gray-200 min-h-screen">
      <div className="flex items-center justify-between p-4">
        <h1 className="font-bold text-3xl font-sans">Library</h1>
        <Header />
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 rounded border border-gray-600"
        />
      </div>

      {filteredFiles.length > 0 ? (
        <div className="space-y-6">
          {filteredFiles.map((item, index) => (
            <div key={index} className="flex items-center p-4 bg-gray-800 rounded-lg">
              <div className="flex-shrink-0 w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded-lg">
                <span className="text-lg overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</span>
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-sm text-gray-400">{item.classSemYear}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
                <p className="mt-2">{item.description}</p>
                <ul className="mt-2 space-y-1">
                  {item.urls.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline hover:text-blue-500"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Bookmark Icon with hover effect */}
              <div className="ml-4">
                {bookmarkedFiles.includes(item.id) ? ( // Check if the file is bookmarked
                  <BookmarkIcon 
                    className="cursor-pointer text-blue-500 hover:text-blue-700" // Change color on hover
                    onClick={() => handleBookmark(item)} 
                  />
                ) : (
                  <BookmarkBorderIcon 
                    className="cursor-pointer text-gray-400 hover:text-blue-500" 
                    onClick={() => handleBookmark(item)} 
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No uploaded data found.</p>
      )}

      {/* Snackbar for notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage} {/* Display the snackbar message */}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserPage;

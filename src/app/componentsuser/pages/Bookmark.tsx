import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Ensure this path is correct based on your Firebase setup
import {
  Box,
  Typography,
  Card,
  CardContent,
  Link,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import Header from "./widgets/Header"; // Ensure this path is correct for the Header component

interface Bookmark {
  id: string;
  classSemYear: string;
  createdAt: any; // Use `Timestamp` from Firebase if needed
  date: string;
  description: string;
  title: string;
  urls: string[];
  userId: string;
}

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Bookmarks"));
        const data: Bookmark[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Bookmark[];
        setBookmarks(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookmarks: ", error);
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box className="flex items-center justify-between p-4">
        <Typography variant="h4" component="h1" fontWeight="bold">
          Bookmark
        </Typography>
        <Header />
      </Box>
      <Box display="flex" alignItems="center" p={2}>
        <TextField
          variant="outlined"
          placeholder="Search bookmarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px", flex: 1, backgroundColor: "white" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Search for:", searchTerm)}
        >
          Search
        </Button>
      </Box>
      <Box p={4}>
        {filteredBookmarks.length === 0 ? (
          <Typography>No bookmarks found.</Typography>
        ) : (
          filteredBookmarks.map((bookmark) => (
            <Card key={bookmark.id} style={{ marginBottom: "20px" }}>
              <CardContent style={{ display: "flex", justifyContent: "space-between" }}>
                <Box style={{ flex: 1 }}>
                  <Typography variant="h5">{bookmark.title}</Typography>
                  <Typography variant="body2" paragraph>
                    {bookmark.description}
                  </Typography>
                </Box>
                <Box style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  {bookmark.urls.map((url, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      color="primary"
                      onClick={() => window.open(url, "_blank")}
                      style={{ marginBottom: "10px" }}
                    >
                      View
                    </Button>
                  ))}
                  <Typography variant="subtitle1" color="textSecondary">
                    {bookmark.classSemYear} | Added on {bookmark.date}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </>
  );
};

export default Bookmark;

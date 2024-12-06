"use client";

import { useState } from "react";
import { auth, googleProvider, db } from "../firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignupPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const generateUsername = (email) => email.split("@")[0];

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, "users", result.user.uid);

      await setDoc(userRef, {
        fullName,
        email,
        username: generateUsername(email),
        role: email === "pparashh77@gmail.com" ? "admin" : "user",
      });

      router.push("/redirect");
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Signup failed. Please try again.");
    }
  };

  const signupWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, "users", result.user.uid);

      await setDoc(userRef, {
        email: result.user.email,
        username: generateUsername(result.user.email),
        role: result.user.email === "pparashh77@gmail.com" ? "admin" : "user",
      });

      router.push("/redirect");
    } catch (error) {
      console.error("Google signup failed:", error);
      setError("Google signup failed. Please try again.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'black',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px', // Set maximum width
        backgroundColor: 'DimGray',
        padding: '20px',
        borderRadius: '8px',
      }}>
        <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Sign Up</h1>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          InputProps={{ style: { backgroundColor: 'white' } }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setUsername(generateUsername(e.target.value));
          }}
          InputProps={{ style: { backgroundColor: 'white' } }}
        />
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          disabled
          InputProps={{ style: { backgroundColor: 'white' } }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            style: { backgroundColor: 'white' },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            style: { backgroundColor: 'white' },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignup}
          style={{ marginTop: '20px', backgroundColor: '#4285F4', color: 'white' }}
        >
          Sign Up with Email
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={signupWithGoogle}
          style={{ marginTop: '10px', color: 'white', borderColor: 'white' }}
        >
          Sign Up with Google
        </Button>
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            style={{ color: '#4285F4', cursor: 'pointer' }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

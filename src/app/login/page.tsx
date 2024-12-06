"use client"; // Mark this component as a Client Component

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation"; // Correct import for routing
import { auth, googleProvider } from "../firebaseConfig"; // Consolidate import for Firebase config
import { Button, TextField, Typography } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const adminEmail = "pparashh777@gmail.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = userCredential.user.email === adminEmail;
      router.push(isAdmin ? "/dashboard" : "/userdashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const isAdmin = result.user.email === adminEmail;
      router.push(isAdmin ? "/dashboard" : "/userdashboard");
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'black',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px', // Set max width
        padding: '20px',
        backgroundColor: 'DimGray',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <Typography variant="h4" component="h1" style={{ marginBottom: '20px', color: 'white' }}>
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{ style: { backgroundColor: 'white' } }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{ style: { backgroundColor: 'white' } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px', backgroundColor: '#0070f3', color: 'white' }}
          >
            Login
          </Button>
          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="contained"
            fullWidth
            style={{ marginTop: '10px', backgroundColor: '#4285F4', color: 'white' }}
          >
            Login with Google
          </Button>
          {error && (
            <Typography color="error" style={{ marginTop: '10px', color: 'red' }}>
              {error}
            </Typography>
          )}
        </form>
        <Typography style={{ marginTop: '20px', color: 'white' }}>
          Don&apos;t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            style={{ color: '#4285F4', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Sign up
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default LoginPage;

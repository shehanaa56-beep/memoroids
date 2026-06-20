import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword } from '../firebase';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check custom admin credentials first
    if (email === 'memoroidsbyshehana@gmail.com' && password === 'shanusheh@56') {
      const adminToken = btoa("admin:memoroidsbyshehana@gmail.com:static");
      localStorage.setItem('adminToken', adminToken);
      localStorage.setItem('role', 'admin');
      setSuccess('Admin login successful! Redirecting...');
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 1000);
      return;
    }

    // Otherwise, attempt regular customer sign-in with Firebase Auth
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      localStorage.setItem('userToken', user.uid);
      localStorage.setItem('role', 'user');
      localStorage.setItem('userName', user.displayName || 'Customer');
      
      setSuccess(`Welcome back, ${user.displayName || 'Customer'}!`);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      // Friendly messages based on common Firebase errors
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else {
        setError('Authentication failed. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if the signed-in Google account belongs to the admin
      if (user.email === 'memoroidsbyshehana@gmail.com') {
        const adminToken = btoa("admin:memoroidsbyshehana@gmail.com:static");
        localStorage.setItem('adminToken', adminToken);
        localStorage.setItem('role', 'admin');
        setSuccess('Admin login successful! Redirecting...');
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 1000);
      } else {
        localStorage.setItem('userToken', user.uid);
        localStorage.setItem('role', 'user');
        localStorage.setItem('userName', user.displayName || 'Customer');
        setSuccess(`Logged in successfully as ${user.displayName || 'Customer'}!`);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (err) {
      console.error('Google Sign-In error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in error. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to Memoroids</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button type="button" onClick={handleGoogleSignIn} className="google-btn">
          <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Sign in with Google
        </button>

        <p className="auth-footer-text">
          Don't have an account? <Link to="/signup" className="auth-link">Sign Up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

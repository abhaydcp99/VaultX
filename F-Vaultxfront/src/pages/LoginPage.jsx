


import React, { useState, useEffect } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff, FiMail } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [expiryTime, setExpiryTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(60);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const [loading, setLoading] = useState(false); // NEW

  const navigate = useNavigate();

  const API = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' },
  });

  const validateEmailOrPhone = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!validateEmailOrPhone(emailOrPhone)) {
      return setError('Please enter a valid email or 10-digit phone number.');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/login', {
        email: emailOrPhone,
        password,
      });
      setMessage(res.data || 'OTP sent to your email.');
      setStep(2);
      const expiry = new Date().getTime() + 60 * 1000;
      setExpiryTime(expiry);
    } catch (err) {
      setError(err.response?.data || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (remainingTime <= 0) {
      return setError('OTP expired. Please login again.');
    }

    if (!/^\d{6}$/.test(otp)) {
      return setError('OTP must be a 6-digit number.');
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/confirm-login', {
        email: emailOrPhone,
        otp,
      });

      const { token, email, firstName, lastName, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('role', role);

      switch (role) {
        case 'ADMIN': navigate('/admin'); break;
        case 'CLERK': navigate('/clerk'); break;
        case 'MANAGER': navigate('/manager'); break;
        case 'CUSTOMER': navigate('/customer'); break;
        default: navigate('/unauthorized');
      }
    } catch (err) {
      setError(err.response?.data || 'Invalid OTP or login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setMessage('');
    setError('');
    setResending(true);
    try {
      const res = await API.post('/auth/resend-otp', { email: emailOrPhone });
      setMessage(res.data || 'OTP resent successfully.');
      const newExpiry = new Date().getTime() + 60 * 1000;
      setExpiryTime(newExpiry);
    } catch (err) {
      setError(err.response?.data || 'Failed to resend OTP.');
    } finally {
      setResending(false);
    }
  };

  useEffect(() => {
    if (step === 2 && expiryTime) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = Math.max(0, Math.floor((expiryTime - now) / 1000));
        setRemainingTime(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, expiryTime]);

  return (
   
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-blue-900 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          {step === 1 ? 'Login to VaultX' : 'Verify OTP'}
        </h2>

        {message && <p className="text-green-600 text-sm mb-3 text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <form onSubmit={step === 1 ? handleLogin : handleOtpVerify}>
          {step === 1 && (
            <>
              <div className="mb-4 relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Email or Phone"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4 relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
                <div className="text-right mt-1">
                  <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-4 relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <p className="text-sm text-red-500 mb-3 text-center">
                OTP expires in {Math.floor(remainingTime / 60).toString().padStart(2, '0')}:
                {(remainingTime % 60).toString().padStart(2, '0')}
              </p>

              <button
                type="submit"
                className={`w-full ${
                  remainingTime <= 0 ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'
                } text-white py-2 rounded-lg transition duration-200 disabled:opacity-60`}
                disabled={remainingTime <= 0 || loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <div className="text-center mt-3">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resending}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {resending ? 'Resending OTP...' : 'Resend OTP'}
                </button>
              </div>
            </>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

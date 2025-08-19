import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCalendarAlt, FaMapMarkedAlt, FaCity, FaGlobeAsia, FaHashtag } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();

    // Trim all fields before validating
    const trimmedData = {};
    Object.keys(formData).forEach(key => {
      trimmedData[key] = typeof formData[key] === 'string' ? formData[key].trim() : formData[key];
    });

    // Name validation
    if (!trimmedData.firstName) newErrors.firstName = 'First name is required';
    if (!/^[A-Za-z]+$/.test(trimmedData.firstName)) newErrors.firstName = 'First name must contain only letters';

    if (!trimmedData.lastName) newErrors.lastName = 'Last name is required';
    if (!/^[A-Za-z]+$/.test(trimmedData.lastName)) newErrors.lastName = 'Last name must contain only letters';

    // Email validation
    if (!trimmedData.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(trimmedData.email)) newErrors.email = 'Invalid email format';

    // Password validation
    if (!trimmedData.password) newErrors.password = 'Password is required';
    else if (trimmedData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(trimmedData.password)) newErrors.password = 'Password must include an uppercase letter';
    else if (!/[a-z]/.test(trimmedData.password)) newErrors.password = 'Password must include a lowercase letter';
    else if (!/\d/.test(trimmedData.password)) newErrors.password = 'Password must include a number';
    else if (!/[!@#$%^&*]/.test(trimmedData.password)) newErrors.password = 'Password must include a special character (!@#$%^&*)';

    // Phone validation
    if (!/^\d{10}$/.test(trimmedData.phoneNumber)) newErrors.phoneNumber = 'Valid 10-digit phone number required';

    // DOB validation
    if (!trimmedData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    else {
      const dob = new Date(trimmedData.dateOfBirth);
      if (dob > today) newErrors.dateOfBirth = 'Date of birth cannot be in the future';
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) newErrors.dateOfBirth = 'You must be at least 18 years old';
    }

    // Address validation
    if (!trimmedData.address) newErrors.address = 'Address is required';
    else if (trimmedData.address.length < 5) newErrors.address = 'Address must be at least 5 characters long';

    // City, State
    if (!trimmedData.city) newErrors.city = 'City is required';
    if (!trimmedData.state) newErrors.state = 'State is required';

    // Pincode validation
    if (!/^\d{6}$/.test(trimmedData.pincode)) newErrors.pincode = 'Valid 6-digit pincode required';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Live validation - clear error when field changes
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post('http://localhost:8080/api/customer/register-customer', {
          ...formData,
          phoneno: formData.phoneNumber, // backend expects 'phoneno'
        });
        navigate('/login');
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Registration failed. Try again.');
      }
    }
  };

  const renderInput = (label, name, icon, type = 'text', placeholder = '') => (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <div className={`flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 ${errors[name] ? 'border-red-500' : ''}`}>
        <span className="text-gray-500 mr-2">{icon}</span>
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent"
        />
      </div>
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <AppNavbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-10">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Open a New Account</h2>

          {errorMessage && <p className="text-red-600 mb-4 text-center">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput('First Name', 'firstName', <FaUser />)}
              {renderInput('Last Name', 'lastName', <FaUser />)}
              {renderInput('Email', 'email', <FaEnvelope />, 'email')}
              {renderInput('Password', 'password', <FaLock />, 'password')}
              {renderInput('Phone Number', 'phoneNumber', <FaPhone />, 'text', '10-digit')}
              {renderInput('Date of Birth', 'dateOfBirth', <FaCalendarAlt />, 'date')}
              {renderInput('Address', 'address', <FaMapMarkedAlt />)}
              {renderInput('City', 'city', <FaCity />)}
              {renderInput('State', 'state', <FaGlobeAsia />)}
              {renderInput('Pincode', 'pincode', <FaHashtag />, 'text', '6-digit')}
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-300 font-semibold"
            >
              Register Account
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;

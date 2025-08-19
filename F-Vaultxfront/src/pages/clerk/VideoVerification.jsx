// src/pages/Clerk/VideoVerification.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import ClerkLayout from '../../layouts/ClerkLayout';

const VideoVerification = () => {
  const { applicationId } = useParams();
  const [form, setForm] = useState({
    selfieVerified: false,
    poiVerified: false,
    poaVerified: false,
    livenessPassed: false,
    notes: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, checked, value, type } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post(`http://localhost:8080/api/clerk/kyc/forward/${applicationId}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccess('KYC successfully forwarded to manager!');
    } catch (err) {
      setError('Failed to forward KYC. Try again.');
    }
  };

  return (
    <ClerkLayout>
    <Container className="mt-4">
      <h3>Video Verification for Application #{applicationId}</h3>

      {/* Placeholder for WebRTC Video Call */}
      <div className="bg-dark text-white p-3 mb-3 text-center">🎥 WebRTC Video Call Interface Here</div>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Check
          label="✔️ Selfie Verified"
          name="selfieVerified"
          checked={form.selfieVerified}
          onChange={handleChange}
        />
        <Form.Check
          label="✔️ Proof of Identity (PoI) Verified"
          name="poiVerified"
          checked={form.poiVerified}
          onChange={handleChange}
        />
        <Form.Check
          label="✔️ Proof of Address (PoA) Verified"
          name="poaVerified"
          checked={form.poaVerified}
          onChange={handleChange}
        />
        <Form.Check
          label="✔️ Liveness Detection Passed"
          name="livenessPassed"
          checked={form.livenessPassed}
          onChange={handleChange}
        />

        <Form.Group className="mt-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" className="mt-3" variant="success">
          Forward to Manager
        </Button>
      </Form>
    </Container>
    </ClerkLayout>
  );
};

export default VideoVerification;

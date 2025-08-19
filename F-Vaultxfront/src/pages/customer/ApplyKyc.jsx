
import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import CustomerLayout from '../../layouts/CustomerLayout';
import {jwtDecode} from "jwt-decode";

const ApplyKyc = () => {
  const [poiType, setPoiType] = useState('');
  const [poaType, setPoaType] = useState('');
  const [poiFile, setPoiFile] = useState(null);
  const [poaFile, setPoaFile] = useState(null);
  const [accountType, setAccountType] = useState('');
  const [message, setMessage] = useState('');

const handleUpload = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    setMessage('Token not found. Please login again.');
    return;
  }

  const decoded = jwtDecode(token);
  const userId = decoded.userId; // 👈 Decode userId from token

  const formData = new FormData();
  formData.append('accountType', accountType);
  formData.append('poiDocument', poiFile);
  formData.append('poaDocument', poaFile);
  formData.append('userId', userId); // 👈 Send userId to backend

  try {
    const res = await axios.post('http://localhost:8080/api/customer/upload-kyc', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });

    setMessage(res.data || 'KYC submitted successfully!');
  } catch (error) {
    setMessage(error.response?.data || 'Failed to upload KYC');
  }
};


  return (
    <CustomerLayout>
      <Container className="mt-5">
        <Row>
          {/* Instructions Card */}
          <Col md={6} className="mb-4">
            <Card bg="light" className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">📋 KYC Application Instructions</h5>
              </Card.Header>
              <Card.Body>
                <ul>
                  <li><strong>Proof of Identity (PoI):</strong> PAN Card or Driving License (must be valid).</li>
                  <li><strong>Proof of Address (PoA):</strong> Aadhaar or Voter ID with your current residential address.</li>
                  <li><strong>Accepted File Formats:</strong> JPG, PNG, PDF (max size 2MB each).</li>
                  <li><strong>Account Types:</strong> Choose between Savings or Current account.</li>
                  <li><strong>Note:</strong> Ensure your documents are clearly visible and not password protected.</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          {/* Apply KYC Form */}
          <Col md={6}>
            <Card className="shadow">
              <Card.Header className="bg-dark text-white">
                <h5 className="mb-0">📝 Apply for KYC</h5>
              </Card.Header>
              <Card.Body>
                {message && <Alert variant={message.includes('success') ? 'success' : 'danger'}>{message}</Alert>}
                <Form onSubmit={handleUpload}>
                  <Form.Group className="mb-3">
                    <Form.Label>Account Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      required
                    >
                      <option value="">-- Select Account Type --</option>
                      <option value="SAVINGS">SAVINGS ACCOUNT</option>
                      <option value="CURRENT">CURRENT ACCOUNT</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Proof of Identity (PoI) Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={poiType}
                      onChange={(e) => setPoiType(e.target.value)}
                      required
                    >
                      <option value="">-- Select PoI --</option>
                      <option value="PAN">PAN Card</option>
                      <option value="DRIVING">Driving License</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Upload PoI File</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => setPoiFile(e.target.files[0])}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Proof of Address (PoA) Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={poaType}
                      onChange={(e) => setPoaType(e.target.value)}
                      required
                    >
                      <option value="">-- Select PoA --</option>
                      <option value="AADHAAR">Aadhaar</option>
                      <option value="VOTER_ID">Voter ID</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Upload PoA File</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => setPoaFile(e.target.files[0])}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button type="submit" variant="success">
                      📤 Submit KYC
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </CustomerLayout>
  );
};

export default ApplyKyc;

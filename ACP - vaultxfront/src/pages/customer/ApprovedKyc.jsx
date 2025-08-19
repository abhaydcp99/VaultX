// src/pages/customer/ApprovedKyc.jsx
import React, { useEffect, useState } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import CustomerLayout from '../../layouts/CustomerLayout';
const ApprovedKyc = () => {
  const [kyc, setKyc] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/customer/self')
      .then((res) => setKyc(res.data))
      .catch((err) => setError(err.response?.data || 'Failed to load KYC'));
  }, []);

  return (
    <CustomerLayout>
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h3>My KYC Status</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {kyc ? (
            <>
              <p><strong>Status:</strong> {kyc.status}</p>
              <p><strong>Remarks:</strong> {kyc.remarks || 'N/A'}</p>
              <p><strong>Reviewed By:</strong> {kyc.reviewedBy || 'Pending'}</p>
            </>
          ) : (
            <p>No KYC record found</p>
          )}
        </Card.Body>
      </Card>
    </Container>
     </CustomerLayout>
  );
};

export default ApprovedKyc;

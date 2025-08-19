import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ManagerLayout from '../../layouts/ManagerLayout';

const PendingKycReview = () => {
  const [pendingKycs, setPendingKycs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPendingKycs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/manager/pending-kyc', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPendingKycs(response.data);
      } catch (err) {
        setError('Failed to load pending KYCs.');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingKycs();
  }, []);

  return (
    <ManagerLayout>
      <Container className="mt-4">
        <h3 className="mb-4">🕒 Pending KYC Applications</h3>

        {loading && <Spinner animation="border" />}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && pendingKycs.length === 0 && (
          <Alert variant="info">No pending KYCs available.</Alert>
        )}

        {!loading && pendingKycs.length > 0 && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Application ID</th>
                <th>Customer Name</th>
                <th>Status</th>
                <th>Submitted By Clerk</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingKycs.map((kyc, index) => (
                <tr key={kyc.id}>
                  <td>{index + 1}</td>
                  <td>{kyc.id}</td>
                  <td>{`${kyc.user?.firstName || ''} ${kyc.user?.lastName || ''}`}</td>
                  <td>{kyc.status}</td>
                  <td>{kyc.clerk?.firstName || '—'}</td>
                  <td>
                    <Link to={`/manager/review-kyc/${kyc.id}`}>
                      <Button variant="primary">Review</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </ManagerLayout>
  );
};

export default PendingKycReview;

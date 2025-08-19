import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner, Alert } from 'react-bootstrap';
import CustomerLayout from '../../layouts/CustomerLayout';

const AccountInfo = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const token = localStorage.getItem('token'); // JWT token

        if (!token) {
          setError('Missing token. Please login again.');
          return;
        }

        const res = await axios.get('http://localhost:8080/api/customer/account', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInfo(res.data);
      } catch (err) {
        setError('Failed to load account info');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <CustomerLayout>
      <Card className="p-3">
        <h5>Account Info</h5>
        <p><strong>Account Number:</strong> {info.accountNumber}</p>
        <p><strong>Type:</strong> {info.accountType || 'N/A'}</p>
        <p><strong>Branch:</strong> {info.branchName}</p>
        <p><strong>IFSC:</strong> {info.ifscCode}</p>
        <p><strong>Balance:</strong> ₹{info.balance}</p>
        <p><strong>Status:</strong> {info.accountStatus || 'N/A'}</p>
      </Card>
    </CustomerLayout>
  );
};

export default AccountInfo;

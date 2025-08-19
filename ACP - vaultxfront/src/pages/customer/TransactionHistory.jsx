import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert, Card, Spinner, Button } from 'react-bootstrap';
import CustomerLayout from '../../layouts/CustomerLayout';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');

  useEffect(() => {
    const fetchTransactions = async () => {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');

      if (!email) {
        setError('Email not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/transactions/history', {
          headers: {
            'Content-Type': 'application/json',
            'email': email,
            // Uncomment if your backend uses JWT auth
            'Authorization': `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleDownload = async () => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(
        `http://localhost:8080/api/transactions/download?email=${encodeURIComponent(email)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `BankStatement-${email}.csv`;
      link.click();

      setVariant('success');
      setMessage('Statement downloaded successfully!');
    } catch (err) {
      console.error('Download error:', err);
      setVariant('danger');
      setMessage(err.response?.data?.message || 'Failed to download statement.');
    }
  };

  return (
    <CustomerLayout>
      <Container className="mt-4">
        <Card>
          <Card.Header>📊 Transaction History</Card.Header>
          <Card.Body>
            {loading && (
              <div className="text-center my-3">
                <Spinner animation="border" role="status" />
                <span className="ms-2">Loading...</span>
              </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant={variant}>{message}</Alert>}

            {!loading && transactions.length > 0 ? (
              <>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Description</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn) => (
                      <tr key={txn.id}>
                        <td>{txn.id}</td>
                        <td>{txn.type}</td>
                        <td>{txn.amount.toLocaleString()}</td>
                        <td>{txn.description}</td>
                        <td>
                          {txn.timestamp
                            ? new Date(txn.timestamp).toLocaleString()
                            : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="text-end mt-3">
                  <Button variant="primary" onClick={handleDownload}>
                    Download CSV
                  </Button>
                </div>
              </>
            ) : (
              !loading && <p>No transactions available.</p>
            )}
          </Card.Body>
        </Card>
      </Container>
    </CustomerLayout>
  );
};

export default TransactionHistory;

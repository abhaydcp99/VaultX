// src/pages/customer/Withdraw.jsx
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import CustomerLayout from '../../layouts/CustomerLayout';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');

const handleSubmit = async (e) => {
  e.preventDefault();
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  try {
    const res = await axios.post( // ✅ Capture the response here
      'http://localhost:8080/api/transactions/withdraw',
      null,
      {
        params: { email, amount },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setVariant('success');
    setMessage(res.data || 'Withdrawal successful!');
    setAmount('');
  } catch (err) {
    setVariant('danger');
    setMessage(err.response?.data?.message || 'Withdrawal failed.');
  }
};

  

  return (
    <CustomerLayout>
    <Container className="mt-4">
      <Card>
        <Card.Header>🏧 Withdraw Money</Card.Header>
        <Card.Body>
          {message && <Alert variant={variant}>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="danger" type="submit" className="mt-3">
              Withdraw
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </CustomerLayout>
  );
};

export default Withdraw;

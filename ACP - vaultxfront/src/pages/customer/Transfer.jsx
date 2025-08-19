// src/pages/customer/Transfer.jsx
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import CustomerLayout from '../../layouts/CustomerLayout';

const Transfer = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');

 const handleSubmit = async (e) => {
  e.preventDefault();
  const senderEmail = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  try {
    const res = await axios.post(
      'http://localhost:8080/api/transactions/transfer',
      null,
      {
        params: {
          fromEmail: senderEmail,
          toEmail: recipientEmail,
          amount,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setVariant('success');
    setMessage(res.data || 'Transfer successful!');
    setRecipientEmail('');
    setAmount('');
  } catch (err) {
    setVariant('danger');
    setMessage(err.response?.data?.message || 'Transfer failed.');
  }
};



  return (
    <CustomerLayout>
    <Container className="mt-4">
      <Card>
        <Card.Header>🔁 Transfer Funds</Card.Header>
        <Card.Body>
          {message && <Alert variant={variant}>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Recipient Email</Form.Label>
              <Form.Control
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-3">
              Transfer
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </CustomerLayout>
  );
};

export default Transfer;

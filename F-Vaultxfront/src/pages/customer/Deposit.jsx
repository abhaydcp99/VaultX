// src/pages/customer/Deposit.jsx
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import CustomerLayout from '../../layouts/CustomerLayout';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');
  const [isLoading, setIsLoading] = useState(false);

  // Quick amount options
  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        'http://localhost:8080/api/transactions/deposit',
        null,
        {
          params: { email, amount },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVariant('success');
      setMessage(res.data || 'Amount deposited successfully!');
      setAmount('');
    } catch (err) {
      setVariant('danger');
      setMessage(err.response?.data?.message || 'Deposit failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAmount = (quickAmount) => {
    setAmount(quickAmount.toString());
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <CustomerLayout>
      <div 
        className="min-vh-100 py-4" 
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: 'calc(100vh - 60px)'
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} xl={6}>
              {/* Header Section */}
              <div className="text-center mb-4">
                <div 
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span style={{ fontSize: '2.5rem' }}>💰</span>
                </div>
                <h1 className="text-white mb-2" style={{ fontWeight: '700' }}>
                  Add Funds
                </h1>
                <p className="text-white-50">
                  Deposit money to your account instantly
                </p>
              </div>

              {/* Main Deposit Card */}
              <Card 
                className="shadow-lg border-0 mb-4"
                style={{ 
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="card-header border-0 text-white text-center py-4"
                  style={{ 
                    background: 'linear-gradient(45deg, #28a745, #20c997)',
                  }}
                >
                  <h4 className="mb-0">💸 Quick Deposit</h4>
                </div>
                
                <Card.Body className="p-4">
                  {message && (
                    <Alert 
                      variant={variant} 
                      className="mb-4"
                      style={{ borderRadius: '12px' }}
                    >
                      <div className="d-flex align-items-center">
                        <span className="me-2">
                          {variant === 'success' ? '✅' : '⚠️'}
                        </span>
                        {message}
                      </div>
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    {/* Quick Amount Buttons */}
                    <div className="mb-4">
                      <Form.Label className="fw-bold text-dark mb-3">
                        Quick Select Amount
                      </Form.Label>
                      <Row className="g-2">
                        {quickAmounts.map((quickAmount) => (
                          <Col key={quickAmount} xs={6} md={4}>
                            <Button
                              variant={amount === quickAmount.toString() ? "primary" : "outline-primary"}
                              className="w-100 py-2"
                              style={{ 
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                fontWeight: '600'
                              }}
                              onClick={() => handleQuickAmount(quickAmount)}
                              type="button"
                            >
                              {formatCurrency(quickAmount)}
                            </Button>
                          </Col>
                        ))}
                      </Row>
                    </div>

                    {/* Custom Amount Input */}
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold text-dark mb-2">
                        Or Enter Custom Amount
                      </Form.Label>
                      <InputGroup size="lg">
                        <InputGroup.Text 
                          className="bg-light border-end-0"
                          style={{ 
                            borderRadius: '12px 0 0 12px',
                            borderColor: '#e0e0e0'
                          }}
                        >
                          ₹
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          min="1"
                          max="100000"
                          step="1"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="border-start-0"
                          style={{ 
                            borderRadius: '0 12px 12px 0',
                            borderColor: '#e0e0e0',
                            fontSize: '1.1rem',
                            fontWeight: '500'
                          }}
                          required
                        />
                      </InputGroup>
                      {amount && (
                        <div className="mt-2 text-success">
                          <small>
                            ✓ You're depositing: <strong>{formatCurrency(amount)}</strong>
                          </small>
                        </div>
                      )}
                    </Form.Group>

                    {/* Deposit Button */}
                    <div className="d-grid gap-2">
                      <Button 
                        variant="success" 
                        type="submit" 
                        size="lg"
                        disabled={!amount || isLoading}
                        className="py-3"
                        style={{ 
                          borderRadius: '12px',
                          fontWeight: '600',
                          fontSize: '1.1rem',
                          background: 'linear-gradient(45deg, #28a745, #20c997)',
                          border: 'none'
                        }}
                      >
                        {isLoading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Processing Deposit...
                          </>
                        ) : (
                          <>
                            💳 Deposit {amount && formatCurrency(amount)}
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              {/* Info Cards */}
              <Row className="g-3">
                <Col md={4}>
                  <Card 
                    className="h-100 border-0 shadow-sm text-center"
                    style={{ 
                      borderRadius: '15px',
                      background: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Card.Body className="p-3">
                      <div className="mb-2" style={{ fontSize: '2rem' }}>⚡</div>
                      <h6 className="mb-1">Instant</h6>
                      <small className="text-muted">Immediate deposit</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card 
                    className="h-100 border-0 shadow-sm text-center"
                    style={{ 
                      borderRadius: '15px',
                      background: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Card.Body className="p-3">
                      <div className="mb-2" style={{ fontSize: '2rem' }}>🔒</div>
                      <h6 className="mb-1">Secure</h6>
                      <small className="text-muted">Bank-grade security</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card 
                    className="h-100 border-0 shadow-sm text-center"
                    style={{ 
                      borderRadius: '15px',
                      background: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Card.Body className="p-3">
                      <div className="mb-2" style={{ fontSize: '2rem' }}>📱</div>
                      <h6 className="mb-1">Easy</h6>
                      <small className="text-muted">Simple process</small>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Terms */}
              <div className="text-center mt-4">
                <small className="text-white-50">
                  By depositing, you agree to our terms and conditions. 
                  All transactions are secured and encrypted.
                </small>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </CustomerLayout>
  );
};

export default Deposit;
// src/pages/customer/Transfer.jsx
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, InputGroup, Spinner, Modal, Badge } from 'react-bootstrap';
import axios from 'axios';
import CustomerLayout from '../../layouts/CustomerLayout';

const Transfer = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  // Quick amount options for transfers
  const quickAmounts = [100, 500, 1000, 2500, 5000];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(email);
    setIsEmailValid(valid && email.length > 0);
    return valid;
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setRecipientEmail(email);
    validateEmail(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(recipientEmail)) {
      setVariant('danger');
      setMessage('Please enter a valid email address');
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmTransfer = async () => {
    setIsLoading(true);
    setShowConfirmModal(false);
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
      setIsEmailValid(false);
    } catch (err) {
      setVariant('danger');
      setMessage(err.response?.data?.message || 'Transfer failed.');
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

  const senderEmail = localStorage.getItem('email');

  return (
    <CustomerLayout>
      <div 
        className="min-vh-100 py-4" 
        style={{ 
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          minHeight: 'calc(100vh - 60px)'
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} xl={7}>
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
                  <span style={{ fontSize: '2.5rem' }}>💸</span>
                </div>
                <h1 className="text-white mb-2" style={{ fontWeight: '700' }}>
                  Transfer Funds
                </h1>
                <p className="text-white-50">
                  Send money instantly to any registered user
                </p>
              </div>

              {/* Main Transfer Card */}
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
                    background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                  }}
                >
                  <h4 className="mb-0">🔁 Quick Transfer</h4>
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
                    {/* Sender Info */}
                    <div className="mb-4">
                      <Form.Label className="fw-bold text-dark mb-2">
                        From (Your Account)
                      </Form.Label>
                      <div 
                        className="p-3 rounded-3 bg-light d-flex align-items-center"
                        style={{ border: '2px dashed #e9ecef' }}
                      >
                        <div className="me-3">
                          <div 
                            className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                            style={{ width: '40px', height: '40px' }}
                          >
                            <span className="text-white fw-bold">
                              {senderEmail?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <small className="text-muted d-block">Sending from</small>
                          <strong>{senderEmail}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Recipient Email */}
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold text-dark mb-2">
                        To (Recipient Email)
                      </Form.Label>
                      <InputGroup size="lg">
                        <InputGroup.Text 
                          className="bg-light border-end-0"
                          style={{ 
                            borderRadius: '12px 0 0 12px',
                            borderColor: '#e0e0e0'
                          }}
                        >
                          📧
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          value={recipientEmail}
                          onChange={handleEmailChange}
                          placeholder="recipient@example.com"
                          className="border-start-0"
                          style={{ 
                            borderRadius: '0 12px 12px 0',
                            borderColor: isEmailValid ? '#28a745' : '#e0e0e0',
                            fontSize: '1.1rem'
                          }}
                          required
                        />
                        {isEmailValid && (
                          <InputGroup.Text 
                            className="bg-success text-white border-start-0"
                            style={{ borderRadius: '0 12px 12px 0' }}
                          >
                            ✓
                          </InputGroup.Text>
                        )}
                      </InputGroup>
                      {recipientEmail && (
                        <div className="mt-2">
                          {isEmailValid ? (
                            <small className="text-success">
                              ✓ Valid email format
                            </small>
                          ) : (
                            <small className="text-danger">
                              ✗ Please enter a valid email address
                            </small>
                          )}
                        </div>
                      )}
                    </Form.Group>

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
                        <div className="mt-2 text-primary">
                          <small>
                            💰 Transfer amount: <strong>{formatCurrency(amount)}</strong>
                          </small>
                        </div>
                      )}
                    </Form.Group>

                    {/* Transfer Summary */}
                    {recipientEmail && amount && isEmailValid && (
                      <div 
                        className="p-3 rounded-3 mb-4"
                        style={{ 
                          background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                          border: '1px solid rgba(99, 102, 241, 0.2)'
                        }}
                      >
                        <h6 className="text-primary mb-2">Transfer Summary</h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <small className="text-muted">To:</small>
                            <div className="fw-bold">{recipientEmail}</div>
                          </div>
                          <div className="text-end">
                            <small className="text-muted">Amount:</small>
                            <div className="fw-bold text-primary fs-5">{formatCurrency(amount)}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Transfer Button */}
                    <div className="d-grid gap-2">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        size="lg"
                        disabled={!amount || !recipientEmail || !isEmailValid || isLoading}
                        className="py-3"
                        style={{ 
                          borderRadius: '12px',
                          fontWeight: '600',
                          fontSize: '1.1rem',
                          background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
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
                            Processing Transfer...
                          </>
                        ) : (
                          <>
                            🚀 Transfer {amount && formatCurrency(amount)}
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              {/* Feature Cards */}
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
                      <small className="text-muted">Real-time transfer</small>
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
                      <small className="text-muted">Encrypted transfer</small>
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
                      <div className="mb-2" style={{ fontSize: '2rem' }}>💳</div>
                      <h6 className="mb-1">Free</h6>
                      <small className="text-muted">No transfer fees</small>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Security Notice */}
              <Card 
                className="mt-4 border-0"
                style={{ 
                  borderRadius: '15px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}
              >
                <Card.Body className="p-3">
                  <div className="d-flex align-items-start">
                    <span className="me-2" style={{ fontSize: '1.2rem' }}>🛡️</span>
                    <div>
                      <h6 className="text-success mb-1">Security Notice</h6>
                      <small className="text-white-75">
                        All transfers are encrypted and monitored for fraud. Only transfer to people you trust.
                        Double-check the recipient email before confirming.
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Terms */}
              <div className="text-center mt-4">
                <small className="text-white-50">
                  By transferring funds, you agree to our terms and conditions. 
                  All transactions are recorded and traceable.
                </small>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered size="md">
        <Modal.Header 
          closeButton 
          className="border-0 pb-0"
          style={{ background: 'linear-gradient(45deg, #6366f1, #8b5cf6)' }}
        >
          <Modal.Title className="text-white">
            <span className="me-2">🔐</span>
            Confirm Transfer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div className="mb-4">
            <div 
              className="mx-auto mb-3 d-flex align-items-center justify-content-center text-primary"
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'rgba(99, 102, 241, 0.1)'
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>💸</span>
            </div>
            <h5>Transfer {formatCurrency(amount)}?</h5>
            
            <div 
              className="p-3 rounded-3 mt-3"
              style={{ backgroundColor: '#f8f9fa' }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">From:</span>
                <Badge bg="primary" className="rounded-pill">{senderEmail}</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">To:</span>
                <Badge bg="success" className="rounded-pill">{recipientEmail}</Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Amount:</span>
                <Badge bg="warning" className="rounded-pill">{formatCurrency(amount)}</Badge>
              </div>
            </div>
            
            <p className="text-muted mt-3 mb-0">
              This transfer will be processed instantly and cannot be undone.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowConfirmModal(false)}
            style={{ borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={confirmTransfer}
            disabled={isLoading}
            style={{ 
              borderRadius: '8px',
              background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
              border: 'none'
            }}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Processing...
              </>
            ) : (
              'Confirm Transfer'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </CustomerLayout>
  );
};

export default Transfer;
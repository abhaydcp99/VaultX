// src/pages/customer/Withdraw.jsx
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, InputGroup, Spinner, Modal } from 'react-bootstrap';
import axios from 'axios';
import CustomerLayout from '../../layouts/CustomerLayout';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Quick amount options
  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const confirmWithdraw = async () => {
    setIsLoading(true);
    setShowConfirmModal(false);
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
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
          background: 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)',
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
                  <span style={{ fontSize: '2.5rem' }}>🏧</span>
                </div>
                <h1 className="text-white mb-2" style={{ fontWeight: '700' }}>
                  Withdraw Funds
                </h1>
                <p className="text-white-50">
                  Securely withdraw money from your account
                </p>
              </div>

              {/* Main Withdraw Card */}
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
                    background: 'linear-gradient(45deg, #dc3545, #fd7e14)',
                  }}
                >
                  <h4 className="mb-0">💸 Quick Withdrawal</h4>
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
                              variant={amount === quickAmount.toString() ? "danger" : "outline-danger"}
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
                          max="50000"
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
                        <div className="mt-2 text-danger">
                          <small>
                            ⚠️ You're withdrawing: <strong>{formatCurrency(amount)}</strong>
                          </small>
                        </div>
                      )}
                    </Form.Group>

                    {/* Withdraw Button */}
                    <div className="d-grid gap-2">
                      <Button 
                        variant="danger" 
                        type="submit" 
                        size="lg"
                        disabled={!amount || isLoading}
                        className="py-3"
                        style={{ 
                          borderRadius: '12px',
                          fontWeight: '600',
                          fontSize: '1.1rem',
                          background: 'linear-gradient(45deg, #dc3545, #fd7e14)',
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
                            Processing Withdrawal...
                          </>
                        ) : (
                          <>
                            🏧 Withdraw {amount && formatCurrency(amount)}
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              {/* Security Info Cards */}
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
                      <div className="mb-2" style={{ fontSize: '2rem' }}>🛡️</div>
                      <h6 className="mb-1">Secure</h6>
                      <small className="text-muted">End-to-end encryption</small>
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
                      <div className="mb-2" style={{ fontSize: '2rem' }}>⏰</div>
                      <h6 className="mb-1">Fast</h6>
                      <small className="text-muted">Within 24 hours</small>
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
                      <div className="mb-2" style={{ fontSize: '2rem' }}>📋</div>
                      <h6 className="mb-1">Tracked</h6>
                      <small className="text-muted">Full audit trail</small>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Important Notice */}
              <Card 
                className="mt-4 border-0"
                style={{ 
                  borderRadius: '15px',
                  background: 'rgba(255,193,7,0.1)',
                  border: '1px solid rgba(255,193,7,0.3)'
                }}
              >
                <Card.Body className="p-3">
                  <div className="d-flex align-items-start">
                    <span className="me-2" style={{ fontSize: '1.2rem' }}>⚠️</span>
                    <div>
                      <h6 className="text-warning mb-1">Important Notice</h6>
                      <small className="text-white-75">
                        Withdrawals are processed within 24 hours. Make sure your account details are correct.
                        Minimum withdrawal amount is ₹100.
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Terms */}
              <div className="text-center mt-4">
                <small className="text-white-50">
                  By withdrawing, you agree to our terms and conditions. 
                  All transactions are monitored for security.
                </small>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header 
          closeButton 
          className="border-0 pb-0"
          style={{ background: 'linear-gradient(45deg, #dc3545, #fd7e14)' }}
        >
          <Modal.Title className="text-white">
            <span className="me-2">🔐</span>
            Confirm Withdrawal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div className="mb-3">
            <div 
              className="mx-auto mb-3 d-flex align-items-center justify-content-center text-danger"
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: 'rgba(220, 53, 69, 0.1)'
              }}
            >
              <span style={{ fontSize: '2rem' }}>💸</span>
            </div>
            <h5>Withdraw {formatCurrency(amount)}?</h5>
            <p className="text-muted mb-0">
              This action cannot be undone. The amount will be transferred to your registered bank account.
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
            variant="danger" 
            onClick={confirmWithdraw}
            disabled={isLoading}
            style={{ 
              borderRadius: '8px',
              background: 'linear-gradient(45deg, #dc3545, #fd7e14)',
              border: 'none'
            }}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Processing...
              </>
            ) : (
              'Confirm Withdrawal'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </CustomerLayout>
  );
};

export default Withdraw;
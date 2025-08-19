import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner, Alert, Container, Row, Col, Button, Badge, ProgressBar } from 'react-bootstrap';
import CustomerLayout from '../../layouts/CustomerLayout';
import { 
  CreditCard, 
  Building, 
  MapPin, 
  Hash, 
  Wallet, 
  CheckCircle, 
  Copy, 
  Eye, 
  EyeOff, 
  RefreshCw,
  TrendingUp,
  Shield,
  Calendar,
  User,
  Phone,
  Mail,
  AlertCircle
} from 'lucide-react';

const AccountInfo = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBalance, setShowBalance] = useState(false);
  const [copiedField, setCopiedField] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  const fetchAccountInfo = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Authentication required. Please login again.');
        return;
      }

      const res = await axios.get('http://localhost:8080/api/customer/account', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInfo(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else if (err.response?.status === 404) {
        setError('Account information not found. Please contact support.');
      } else {
        setError('Failed to load account information. Please try again.');
      }
      console.error('Account info error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    await fetchAccountInfo();
    setTimeout(() => setRefreshing(false), 500);
  };

  const copyToClipboard = (text, field) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const getAccountStatusVariant = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'SUSPENDED':
      case 'CLOSED':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getAccountStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return CheckCircle;
      case 'PENDING':
        return AlertCircle;
      default:
        return Shield;
    }
  };

  const InfoCard = ({ title, value, icon: Icon, color, copyable = false, field = '', isBalance = false }) => (
    <Card className="h-100 border-0 shadow-sm hover-lift info-card">
      <Card.Body className="p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className={`p-2 rounded-circle bg-${color}-subtle`}>
            <Icon size={20} className={`text-${color}`} />
          </div>
          {copyable && value && (
            <Button
              variant="link"
              size="sm"
              className="p-1 text-muted"
              onClick={() => copyToClipboard(value, field)}
              title="Copy to clipboard"
            >
              {copiedField === field ? (
                <CheckCircle size={16} className="text-success" />
              ) : (
                <Copy size={16} />
              )}
            </Button>
          )}
          {isBalance && (
            <Button
              variant="link"
              size="sm"
              className="p-1 text-muted"
              onClick={() => setShowBalance(!showBalance)}
              title={showBalance ? "Hide balance" : "Show balance"}
            >
              {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          )}
        </div>
        
        <h6 className="text-muted mb-2 text-uppercase fw-semibold" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
          {title}
        </h6>
        
        <div className="d-flex align-items-center">
          {isBalance ? (
            <h5 className="mb-0 fw-bold">
              {showBalance ? `₹${parseFloat(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '₹••••••••'}
            </h5>
          ) : (
            <h6 className="mb-0 fw-semibold text-dark">
              {value || 'Not Available'}
            </h6>
          )}
          {copyable && copiedField === field && (
            <small className="text-success ms-2 fw-semibold">Copied!</small>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <CustomerLayout>
        <Container className="py-5">
          <div className="text-center">
            <div className="mb-4">
              <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <h4 className="text-muted">Loading Account Information</h4>
            <p className="text-muted">Please wait while we fetch your details...</p>
          </div>
        </Container>
      </CustomerLayout>
    );
  }

  if (error) {
    return (
      <CustomerLayout>
        <Container className="py-5">
          <Alert variant="danger" className="d-flex align-items-center justify-content-between border-0 shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <AlertCircle size={24} />
              <div>
                <h5 className="mb-1">Error Loading Account Info</h5>
                <p className="mb-0">{error}</p>
              </div>
            </div>
            <Button variant="outline-danger" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw size={16} className={refreshing ? 'spin' : ''} />
            </Button>
          </Alert>
        </Container>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <Container className="py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-2 fw-bold text-dark">Account Information</h2>
            <p className="text-muted mb-0">Complete overview of your banking account details</p>
          </div>
          <Button 
            variant="outline-primary" 
            onClick={handleRefresh}
            disabled={refreshing}
            className="d-flex align-items-center gap-2"
          >
            <RefreshCw size={16} className={refreshing ? 'spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>

        {/* Account Status Banner */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body className="p-4">
            <div className="d-flex align-items-center gap-3">
              <div className={`p-3 rounded-circle bg-${getAccountStatusVariant(info?.accountStatus)}-subtle`}>
                {React.createElement(getAccountStatusIcon(info?.accountStatus), { 
                  size: 28, 
                  className: `text-${getAccountStatusVariant(info?.accountStatus)}` 
                })}
              </div>
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <h4 className="mb-0 fw-bold">Account Status</h4>
                  <Badge bg={getAccountStatusVariant(info?.accountStatus)} className="px-3 py-2">
                    {info?.accountStatus || 'Unknown'}
                  </Badge>
                </div>
                <p className="text-muted mb-0">
                  {info?.accountStatus?.toUpperCase() === 'ACTIVE' 
                    ? 'Your account is active and ready for all banking operations.'
                    : 'Please contact support if you have any concerns about your account status.'}
                </p>
              </div>
              {info?.accountStatus?.toUpperCase() === 'ACTIVE' && (
                <div className="text-end">
                  <div className="text-success fw-semibold">✓ Verified</div>
                  <small className="text-muted">All services available</small>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>

        {/* Account Details Grid */}
        <Row className="g-4 mb-4">
          <Col lg={4} md={6}>
            <InfoCard
              title="Account Balance"
              value={info?.balance}
              icon={Wallet}
              color="success"
              isBalance={true}
            />
          </Col>
          <Col lg={4} md={6}>
            <InfoCard
              title="Account Number"
              value={info?.accountNumber}
              icon={Hash}
              color="primary"
              copyable={true}
              field="account"
            />
          </Col>
          <Col lg={4} md={6}>
            <InfoCard
              title="Account Type"
              value={info?.accountType}
              icon={CreditCard}
              color="info"
            />
          </Col>
        </Row>

        <Row className="g-4 mb-4">
          <Col lg={6} md={6}>
            <InfoCard
              title="IFSC Code"
              value={info?.ifscCode}
              icon={Building}
              color="warning"
              copyable={true}
              field="ifsc"
            />
          </Col>
          <Col lg={6} md={6}>
            <InfoCard
              title="Branch Name"
              value={info?.branchName}
              icon={MapPin}
              color="secondary"
            />
          </Col>
        </Row>

        {/* Additional Information Card */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-light border-0 py-3">
            <h5 className="mb-0 d-flex align-items-center gap-2">
              <User size={20} />
              Additional Account Details
            </h5>
          </Card.Header>
          <Card.Body className="p-4">
            <Row className="g-4">
              <Col md={6}>
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                  <Calendar size={20} className="text-muted" />
                  <div>
                    <small className="text-muted d-block">Account Created</small>
                    <span className="fw-semibold">
                      {info?.createdDate ? new Date(info.createdDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Not Available'}
                    </span>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                  <TrendingUp size={20} className="text-muted" />
                  <div>
                    <small className="text-muted d-block">Last Updated</small>
                    <span className="fw-semibold">
                      {info?.lastUpdated ? new Date(info.lastUpdated).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Not Available'}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Security Notice */}
        <Alert variant="info" className="mt-4 border-0 shadow-sm">
          <div className="d-flex align-items-start gap-3">
            <Shield size={20} className="mt-1" />
            <div>
              <h6 className="mb-1">Security Notice</h6>
              <p className="mb-0">
                Keep your account information confidential. Never share your account details with unauthorized persons.
                If you notice any suspicious activity, contact our support team immediately.
              </p>
            </div>
          </div>
        </Alert>
      </Container>

      {/* Custom Styles */}
      <style>{`
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }
        .info-card {
          border-left: 4px solid transparent;
          transition: all 0.3s ease;
        }
        .info-card:hover {
          border-left-color: var(--bs-primary);
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </CustomerLayout>
  );
};

export default AccountInfo;
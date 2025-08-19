import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Col, Container, Row, Spinner, Badge, ProgressBar } from 'react-bootstrap';
import CustomerLayout from '../../layouts/CustomerLayout';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Send, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  XCircle,
  Wallet,
  Building,
  Plus,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  FileText,
  Shield,
  Activity,
  Zap
} from 'lucide-react';

const CustomerDashboard = () => {
  const [kyc, setKyc] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accountLoading, setAccountLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [copiedField, setCopiedField] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchKycStatus(), fetchAccountInfo()]);
    setLoading(false);
  };

  const fetchKycStatus = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/customer/self', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setKyc(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setKyc(null);
      } else {
        console.error('KYC fetch error:', err);
        setError(true);
      }
    }
  };

  const fetchAccountInfo = async () => {
    try {
      setAccountLoading(true);
      const res = await axios.get('http://localhost:8080/api/customer/account', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAccountInfo(res.data);
    } catch (err) {
      console.error('Account info fetch error:', err);
    } finally {
      setAccountLoading(false);
    }
  };

  const handleApplyKYC = () => {
    navigate('/customer/apply-kyc');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setTimeout(() => setRefreshing(false), 500);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const getKYCStatusVariant = () => {
    if (!kyc) return 'secondary';
    switch (kyc.status) {
      case 'PENDING':
      case 'CLERK_VERIFIED':
        return 'warning';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getKYCIcon = () => {
    if (!kyc) return AlertCircle;
    switch (kyc.status) {
      case 'PENDING':
      case 'CLERK_VERIFIED':
        return Clock;
      case 'APPROVED':
        return CheckCircle;
      case 'REJECTED':
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getKYCProgress = () => {
    if (!kyc) return 0;
    switch (kyc.status) {
      case 'PENDING':
        return 33;
      case 'CLERK_VERIFIED':
        return 66;
      case 'APPROVED':
        return 100;
      case 'REJECTED':
        return 0;
      default:
        return 0;
    }
  };

  const getStatusMessage = () => {
    if (!kyc) return {
      variant: 'warning',
      icon: '🚨',
      title: 'Action Required',
      message: 'Complete your KYC verification to unlock all banking features.'
    };
    
    switch (kyc.status) {
      case 'PENDING':
        return {
          variant: 'info',
          icon: '⏳',
          title: 'Under Review',
          message: 'Your documents are being verified by our team.'
        };
      case 'CLERK_VERIFIED':
        return {
          variant: 'info',
          icon: '👥',
          title: 'Manager Review',
          message: 'Your documents passed initial verification and are with the manager.'
        };
      case 'APPROVED':
        return {
          variant: 'success',
          icon: '✅',
          title: 'Verified!',
          message: 'Your account is fully active and ready to use all features.'
        };
      case 'REJECTED':
        return {
          variant: 'danger',
          icon: '❌',
          title: 'Verification Failed',
          message: kyc.remarks || 'Please contact support for details and reapply.'
        };
      default:
        return {
          variant: 'secondary',
          icon: '❓',
          title: 'Unknown Status',
          message: 'Please contact support for assistance.'
        };
    }
  };

  const QuickStatCard = ({ title, value, icon: Icon, color, loading: cardLoading, onClick }) => (
    <Card className="h-100 border-0 shadow-sm hover-lift quick-stat-card" onClick={onClick}>
      <Card.Body className="text-center p-4">
        <div className={`bg-${color}-subtle p-3 rounded-circle d-inline-block mb-3`}>
          <Icon size={24} className={`text-${color}`} />
        </div>
        <h6 className="text-muted mb-2">{title}</h6>
        {cardLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" size="sm" variant={color} />
          </div>
        ) : (
          <h5 className="mb-0 fw-bold">{value}</h5>
        )}
      </Card.Body>
    </Card>
  );

  const ActionCard = ({ title, description, buttonText, variant, onClick, icon: Icon, gradient }) => (
    <Card className={`border-0 shadow-sm hover-lift action-card ${gradient ? `bg-gradient-${gradient}` : ''}`}>
      <Card.Body className="d-flex align-items-center p-4">
        <div className={`${gradient ? 'bg-white bg-opacity-20' : `bg-${variant}-subtle`} p-3 rounded-circle me-3`}>
          <Icon size={24} className={gradient ? 'text-white' : `text-${variant}`} />
        </div>
        <div className={`flex-grow-1 ${gradient ? 'text-white' : ''}`}>
          <Card.Title className={`mb-1 ${gradient ? 'text-white' : ''}`}>{title}</Card.Title>
          <Card.Text className={`mb-0 ${gradient ? 'text-white-50' : 'text-muted'}`}>
            {description}
          </Card.Text>
        </div>
        <Button 
          variant={gradient ? 'light' : `outline-${variant}`} 
          size="sm" 
          className="ms-auto"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <CustomerLayout>
        <Container className="py-5 text-center">
          <div className="d-flex flex-column align-items-center">
            <div className="mb-4">
              <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <h4 className="text-muted">Loading your dashboard...</h4>
            <p className="text-muted">Please wait while we fetch your information</p>
          </div>
        </Container>
      </CustomerLayout>
    );
  }

  const statusInfo = getStatusMessage();

  return (
    <CustomerLayout>
      <Container className="py-4">
        {/* Enhanced Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div>
            <h1 className="mb-2 fw-bold text-primary">
              {kyc?.firstName ? `Welcome back, ${kyc.firstName}!` : 'Welcome to Your Dashboard'}
            </h1>
            <p className="text-muted mb-0 lead">
              Manage your account and access all banking services in one place
            </p>
          </div>
          <div className="d-flex gap-2">
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
              className="d-flex align-items-center gap-2"
            >
              <RefreshCw size={16} className={refreshing ? 'spin' : ''} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="danger" className="d-flex align-items-center gap-3 mb-4 border-0 shadow-sm">
            <AlertCircle size={24} />
            <div>
              <h5 className="mb-1">Connection Error</h5>
              <p className="mb-0">Unable to load your data. Please check your connection and try again.</p>
            </div>
          </Alert>
        )}

        {/* Enhanced KYC Status Card */}
        <Card className="mb-4 border-0 shadow-lg kyc-status-card">
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="d-flex align-items-center gap-3">
                <div className={`p-3 rounded-circle bg-${getKYCStatusVariant()}-subtle position-relative`}>
                  {React.createElement(getKYCIcon(), { 
                    size: 28, 
                    className: `text-${getKYCStatusVariant()}` 
                  })}
                  {kyc?.status === 'APPROVED' && (
                    <div className="position-absolute top-0 start-100 translate-middle">
                      <span className="badge rounded-pill bg-success">
                        <Shield size={12} />
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="mb-2 fw-bold">KYC Verification Status</h4>
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <Badge bg={getKYCStatusVariant()} className="px-3 py-2 fs-6">
                      {!kyc ? 'Not Applied' : kyc.status.replace('_', ' ')}
                    </Badge>
                    {kyc && (
                      <div className="d-flex align-items-center gap-2">
                        <Activity size={16} className="text-muted" />
                        <small className="text-muted fw-semibold">
                          Progress: {getKYCProgress()}%
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {(!kyc || kyc.status === 'REJECTED') && (
                <Button 
                  variant="primary" 
                  onClick={handleApplyKYC}
                  className="btn-lg"
                >
                  <FileText size={18} className="me-2" />
                  {!kyc ? 'Apply for KYC' : 'Reapply KYC'}
                </Button>
              )}
            </div>

            {kyc && (
              <ProgressBar 
                now={getKYCProgress()} 
                variant={getKYCStatusVariant()}
                className="mb-3"
                style={{ height: '8px' }}
                animated={kyc.status === 'PENDING' || kyc.status === 'CLERK_VERIFIED'}
              />
            )}

            <Alert variant={statusInfo.variant} className="mb-0 border-0 shadow-sm">
              <div className="d-flex align-items-start gap-3">
                <span style={{ fontSize: '1.5rem' }}>{statusInfo.icon}</span>
                <div>
                  <strong>{statusInfo.title}:</strong> {statusInfo.message}
                </div>
              </div>
            </Alert>
          </Card.Body>
        </Card>

        {/* Account Statistics - Show for all users but with different data */}
        <Row className="g-4 mb-4">
          <Col md={3} sm={6}>
            <QuickStatCard
              title="Account Balance"
              value={
                kyc?.status === 'APPROVED' 
                  ? (showBalance 
                      ? `₹${accountInfo?.balance?.toLocaleString() || '0.00'}`
                      : '₹••••••'
                    )
                  : 'KYC Required'
              }
              icon={Wallet}
              color="success"
              loading={accountLoading}
              onClick={() => kyc?.status === 'APPROVED' && setShowBalance(!showBalance)}
            />
          </Col>
          <Col md={3} sm={6}>
            <QuickStatCard
              title="Account Status"
              value={kyc?.status === 'APPROVED' ? 'Active' : 'Pending KYC'}
              icon={kyc?.status === 'APPROVED' ? CheckCircle : Clock}
              color={kyc?.status === 'APPROVED' ? 'success' : 'warning'}
            />
          </Col>
          <Col md={3} sm={6}>
            <QuickStatCard
              title="Account Type"
              value={kyc?.accountType || accountInfo?.accountType || 'Savings'}
              icon={CreditCard}
              color="primary"
            />
          </Col>
          <Col md={3} sm={6}>
            <QuickStatCard
              title="Verification Level"
              value={`${getKYCProgress()}%`}
              icon={Shield}
              color={getKYCStatusVariant()}
            />
          </Col>
        </Row>

        {/* Account Details - Only show if KYC approved */}
        {kyc?.status === 'APPROVED' && accountInfo && (
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white py-3">
              <h5 className="mb-0 d-flex align-items-center gap-2">
                <Building size={20} />
                Account Information
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="g-4">
                <Col md={6}>
                  <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                    <div>
                      <small className="text-muted d-block">Account Number</small>
                      <code className="fs-5 fw-bold">{accountInfo.accountNumber || 'Not Available'}</code>
                    </div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => copyToClipboard(accountInfo.accountNumber, 'account')}
                    >
                      {copiedField === 'account' ? (
                        <CheckCircle size={16} className="text-success" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </Button>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                    <div>
                      <small className="text-muted d-block">IFSC Code</small>
                      <code className="fs-5 fw-bold">{accountInfo.ifscCode || 'Not Available'}</code>
                    </div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => copyToClipboard(accountInfo.ifscCode, 'ifsc')}
                    >
                      {copiedField === 'ifsc' ? (
                        <CheckCircle size={16} className="text-success" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        {/* Quick Actions */}
        <h4 className="mb-4 fw-bold d-flex align-items-center gap-2">
          <Zap size={24} className="text-primary" />
          Quick Actions
        </h4>

        <Row className="g-4 mb-4">
          <Col md={6}>
            <ActionCard
              title="Profile Management"
              description="View and update your KYC status, personal information, and preferences"
              buttonText="Manage →"
              variant="primary"
              icon={User}
              gradient="primary"
              onClick={() => navigate('/customer/profile')}
            />
          </Col>
          <Col md={6}>
            <ActionCard
              title="Account Overview"
              description="Check detailed account information, transaction history, and statements"
              buttonText="View →"
              variant="info"
              icon={FileText}
              gradient="info"
              onClick={() => navigate('/customer/account')}
            />
          </Col>
        </Row>

        {/* Banking Services */}
        <Row className="g-4">
          <Col md={4}>
            <ActionCard
              title="💸 Deposit Money"
              description="Add funds to your account with instant processing and multiple payment methods"
              buttonText={kyc?.status === 'APPROVED' ? 'Deposit Now' : 'KYC Required'}
              variant="success"
              icon={Plus}
              onClick={() => kyc?.status === 'APPROVED' && navigate('/customer/deposit')}
            />
          </Col>
          <Col md={4}>
            <ActionCard
              title="🏧 Withdraw Funds"
              description="Access your money securely with instant withdrawal to your registered accounts"
              buttonText={kyc?.status === 'APPROVED' ? 'Withdraw' : 'KYC Required'}
              variant="warning"
              icon={TrendingDown}
              onClick={() => kyc?.status === 'APPROVED' && navigate('/customer/withdraw')}
            />
          </Col>
          <Col md={4}>
            <ActionCard
              title="🔁 Transfer Money"
              description="Send money instantly to other customers using email ID with zero fees"
              buttonText={kyc?.status === 'APPROVED' ? 'Transfer' : 'KYC Required'}
              variant="primary"
              icon={Send}
              onClick={() => kyc?.status === 'APPROVED' && navigate('/customer/transfer')}
            />
          </Col>
        </Row>

        {/* Help Section */}
        {(!kyc || kyc.status !== 'APPROVED') && (
          <Card className="mt-5 border-0 bg-light">
            <Card.Body className="text-center py-5">
              <AlertCircle size={48} className="text-muted mb-3" />
              <h5 className="mb-3">Need Help with KYC?</h5>
              <p className="text-muted mb-4">
                Complete your KYC verification to unlock all banking features and start using your account.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Button variant="primary" onClick={handleApplyKYC}>
                  {!kyc ? 'Start KYC Process' : 'Continue KYC'}
                </Button>
                <Button variant="outline-secondary">
                  Contact Support
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>

      {/* Custom Styles */}
      <style>{`
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
        }
        .action-card {
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
        }
        .action-card:hover {
          border-left-color: var(--bs-primary);
        }
        .bg-gradient-primary {
          background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%);
        }
        .bg-gradient-info {
          background: linear-gradient(135deg, #0dcaf0 0%, #6610f2 100%);
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .kyc-status-card {
          background: linear-gradient(135deg, #f8f9fc 0%, #ffffff 100%);
          border-top: 4px solid var(--bs-primary);
        }
        .quick-stat-card:hover {
          background: linear-gradient(135deg, #f8f9fc 0%, #ffffff 100%);
        }
      `}</style>
    </CustomerLayout>
  );
};

export default CustomerDashboard;
// src/pages/Manager/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Alert, Button } from 'react-bootstrap';
import { FiUsers, FiCheckCircle, FiXCircle, FiClock, FiTrendingUp, FiEye } from 'react-icons/fi';
import ManagerLayout from '../../layouts/ManagerLayout';
import axios from 'axios';

const ManagerDashboard = () => {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Fetch all KYC data from your backend
      const [pendingRes, approvedRes, rejectedRes] = await Promise.all([
        axios.get('http://localhost:8080/api/manager/pending-kyc', config),
        axios.get('http://localhost:8080/api/manager/approved-kycs', config),
        axios.get('http://localhost:8080/api/manager/rejected-kycs', config)
      ]);

      const pending = pendingRes.data.length;
      const approved = approvedRes.data.length;
      const rejected = rejectedRes.data.length;

      setStats({
        pending,
        approved,
        rejected,
        total: pending + approved + rejected
      });

      // Get recent 5 pending applications for quick view
      setRecentApplications(Array.isArray(pendingRes.data) ? pendingRes.data.slice(0, 5) : []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, bgColor, textColor }) => (
    <Card className="h-100 shadow-sm border-0 stat-card" style={{ background: bgColor }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className={`card-subtitle mb-2 text-${textColor} opacity-75`}>{title}</h6>
            <h2 className={`mb-0 fw-bold text-${textColor}`}>{loading ? '...' : value}</h2>
          </div>
          <div className={`p-3 rounded-circle bg-white bg-opacity-20`}>
            <Icon size={24} className={`text-${textColor}`} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  const QuickActionCard = ({ title, description, buttonText, variant, onClick, icon: Icon }) => (
    <Card className="h-100 shadow-sm border-0 hover-card">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <div className={`p-2 rounded-circle bg-${variant} bg-opacity-10 me-3`}>
            <Icon size={20} className={`text-${variant}`} />
          </div>
          <h6 className="mb-0 fw-semibold">{title}</h6>
        </div>
        <p className="text-muted mb-3 flex-grow-1">{description}</p>
        <Button variant={variant} onClick={onClick} className="align-self-start">
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      'PENDING': 'warning',
      'APPROVED': 'success',
      'REJECTED': 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <ManagerLayout>
      <Container fluid className="py-4">
        {/* Header Section */}
        <div className="mb-4">
          <h2 className="mb-2 fw-bold text-dark">Manager Dashboard</h2>
          <p className="text-muted mb-0">
            Review and manage KYC applications submitted by clerks
          </p>
        </div>

        {/* Statistics Cards */}
        <Row className="g-3 mb-4">
          <Col md={3} sm={6}>
            <StatCard
              title="Pending Reviews"
              value={stats.pending}
              icon={FiClock}
              color="warning"
              bgColor="linear-gradient(135deg, #FFF3CD 0%, #FFF8E1 100%)"
              textColor="warning"
            />
          </Col>
          <Col md={3} sm={6}>
            <StatCard
              title="Approved KYCs"
              value={stats.approved}
              icon={FiCheckCircle}
              color="success"
              bgColor="linear-gradient(135deg, #D1E7DD 0%, #E8F5E8 100%)"
              textColor="success"
            />
          </Col>
          <Col md={3} sm={6}>
            <StatCard
              title="Rejected KYCs"
              value={stats.rejected}
              icon={FiXCircle}
              color="danger"
              bgColor="linear-gradient(135deg, #F8D7DA 0%, #FDEAEA 100%)"
              textColor="danger"
            />
          </Col>
          <Col md={3} sm={6}>
            <StatCard
              title="Total Applications"
              value={stats.total}
              icon={FiUsers}
              color="primary"
              bgColor="linear-gradient(135deg, #CCE5FF 0%, #E3F2FD 100%)"
              textColor="primary"
            />
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row className="g-3 mb-4">
          <Col md={4}>
            <QuickActionCard
              title="Review Pending KYCs"
              description="Review and approve or reject KYC applications awaiting your decision"
              buttonText="Review Now"
              variant="warning"
              icon={FiClock}
              onClick={() => window.location.href = '/manager/review-kycs'}
            />
          </Col>
          <Col md={4}>
            <QuickActionCard
              title="View Approved KYCs"
              description="Browse through all successfully approved KYC applications"
              buttonText="View Approved"
              variant="success"
              icon={FiCheckCircle}
              onClick={() => window.location.href = '/manager/approved-kycs'}
            />
          </Col>
          <Col md={4}>
            <QuickActionCard
              title="View Rejected KYCs"
              description="Review rejected applications and their rejection reasons"
              buttonText="View Rejected"
              variant="danger"
              icon={FiXCircle}
              onClick={() => window.location.href = '/manager/rejected-kycs'}
            />
          </Col>
        </Row>

        {/* Recent Applications */}
        <Row>
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white border-0 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-semibold">Recent Pending Applications</h5>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => window.location.href = '/manager/pending-kyc'}
                  >
                    <FiEye className="me-1" /> View All
                  </Button>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : recentApplications.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <FiCheckCircle size={48} className="mb-3 opacity-50" />
                    <p className="mb-0">No pending applications at the moment</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="border-0 py-3">Application ID</th>
                          <th className="border-0 py-3">Customer Name</th>
                          <th className="border-0 py-3">Account Type</th>
                          <th className="border-0 py-3">Submitted Date</th>
                          <th className="border-0 py-3">Status</th>
                          <th className="border-0 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentApplications.map((app) => (
                          <tr key={app.id}>
                            <td className="align-middle">
                              <span className="fw-semibold text-primary">#{app.id}</span>
                            </td>
                            <td className="align-middle">
                              <div>
                                <div className="fw-semibold">{app.firstName} {app.lastName}</div>
                                <small className="text-muted">{app.email}</small>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="badge bg-info bg-opacity-10 text-info">
                                {app.accountType}
                              </span>
                            </td>
                            <td className="align-middle text-muted">
                              {formatDate(app.submissionDate)}
                            </td>
                            <td className="align-middle">
                              {getStatusBadge(app.status)}
                            </td>
                            <td className="align-middle">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => window.location.href = `/manager/kyc-details/${app.id}`}
                              >
                                <FiEye className="me-1" /> Review
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Performance Alert */}
        {stats.pending > 10 && (
          <Alert variant="warning" className="mt-4 border-0 shadow-sm">
            <div className="d-flex align-items-center">
              <FiTrendingUp className="me-2" />
              <div>
                <strong>High Volume Alert:</strong> You have {stats.pending} pending applications requiring review. 
                Consider prioritizing reviews to maintain efficient processing times.
              </div>
            </div>
          </Alert>
        )}
      </Container>

      {/* Custom Styles */}
      <style>{`
        .stat-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
        }
        .hover-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
        }
        .table th {
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6c757d;
        }
        .table tbody tr:hover {
          background-color: rgba(0,123,255,0.04);
        }
      `}</style>
    </ManagerLayout>
  );
};

export default ManagerDashboard;
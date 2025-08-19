import React, { useState, useEffect } from 'react';
import ClerkLayout from '../../layouts/ClerkLayout';
import { Card, Container, Row, Col, Badge, Button, Alert, Modal, Spinner, Table } from 'react-bootstrap';
import { 
  FaUsers, 
  FaClipboardCheck, 
  FaClock, 
  FaVideo, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaEye,
  FaForward,
  FaSyncAlt,
  FaTasks,
  FaCalendarAlt,
  FaUser,
  FaFileAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const ClerkDashboard = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [forwardReview, setForwardReview] = useState('');
  const [forwarding, setForwarding] = useState(false);

  // Fetch pending KYC applications
  const fetchPendingApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/clerk/kyc/pending', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Ensure we have an array, handle different response formats
      const applications = Array.isArray(response.data) ? response.data : [];
      setPendingApplications(applications);
      setError(null);
    } catch (err) {
      setError('Failed to fetch pending applications');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  // Forward application to manager
  const handleForwardToManager = async () => {
    if (!selectedApplication || !forwardReview.trim()) return;

    try {
      setForwarding(true);
      const token = localStorage.getItem('token');
      const reviewRequest = {
        reviewComments: forwardReview,
        recommendation: 'FORWARDED_TO_MANAGER'
      };

      await axios.post(`http://localhost:8080/api/clerk/kyc/forward/${selectedApplication.id}`, reviewRequest, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Refresh the applications list
      await fetchPendingApplications();
      
      // Close modal and reset state
      setShowForwardModal(false);
      setSelectedApplication(null);
      setForwardReview('');
      
      alert('Application successfully forwarded to manager!');
    } catch (err) {
      console.error('Error forwarding application:', err);
      alert('Failed to forward application. Please try again.');
    } finally {
      setForwarding(false);
    }
  };

  useEffect(() => {
    fetchPendingApplications();
  }, []);

  // Calculate statistics from actual data - ensure pendingApplications is an array
  const applicationsArray = Array.isArray(pendingApplications) ? pendingApplications : [];
  const totalPending = applicationsArray.length;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'PENDING': { variant: 'warning', text: 'Pending Review' },
      'UNDER_REVIEW': { variant: 'info', text: 'Under Review' },
      'PENDING_REVIEW': { variant: 'primary', text: 'Ready for Review' },
      'APPROVED': { variant: 'success', text: 'Approved' },
      'REJECTED': { variant: 'danger', text: 'Rejected' },
      'FORWARDED_TO_MANAGER': { variant: 'secondary', text: 'Forwarded' }
    };
    
    const badgeInfo = statusMap[status] || { variant: 'secondary', text: status || 'Unknown' };
    return <Badge bg={badgeInfo.variant}>{badgeInfo.text}</Badge>;
  };

  return (
    <ClerkLayout>
      <Container fluid>
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Row className="align-items-center">
            <Col>
              <h3 className="mb-1">Welcome, Clerk 👋</h3>
              <p className="text-muted mb-0">Manage KYC applications and process customer verifications</p>
            </Col>
            <Col xs="auto">
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={fetchPendingApplications}
                disabled={loading}
              >
                <FaSyncAlt className={`me-1 ${loading ? 'fa-spin' : ''}`} />
                Refresh
              </Button>
            </Col>
          </Row>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)} className="mb-4">
            <FaExclamationTriangle className="me-2" />
            {error}
          </Alert>
        )}

        {/* Statistics Card */}
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Card.Body className="text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="fw-bold mb-1">{totalPending}</h3>
                      <p className="mb-0 opacity-75">Total Pending Applications</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center"
                         style={{ width: '50px', height: '50px' }}>
                      <FaUsers size={20} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Main Content */}
        <Row>
          <Col lg={8}>
            {/* KYC Processing Overview */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom-0 pb-0">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                         style={{ width: '40px', height: '40px' }}>
                      <FaTasks size={16} />
                    </div>
                    <div>
                      <h5 className="mb-0">KYC Processing Overview</h5>
                      <small className="text-muted">Your daily workflow and responsibilities</small>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <h6 className="text-primary mb-3">
                        <FaCheckCircle className="me-2" />
                        Primary Tasks
                      </h6>
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <FaClipboardCheck className="text-success me-2" />
                          Review and process pending KYC applications
                        </li>
                        <li className="mb-2">
                          <FaVideo className="text-info me-2" />
                          Initiate live video verification for identity confirmation
                        </li>
                        <li className="mb-2">
                          <FaForward className="text-warning me-2" />
                          Forward reviewed applications to manager
                        </li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <h6 className="text-primary mb-3">
                        <FaUser className="me-2" />
                        Quick Actions
                      </h6>
                      <div className="d-grid gap-2">
                        <Button variant="outline-primary" size="sm">
                          <FaEye className="me-2" />
                          View All Applications
                        </Button>
                        <Button variant="outline-success" size="sm">
                          <FaVideo className="me-2" />
                          Start Video Session
                        </Button>
                        <Button variant="outline-info" size="sm">
                          <FaFileAlt className="me-2" />
                          Generate Report
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </motion.div>

            {/* Pending Applications Table */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      <FaClipboardCheck className="text-primary me-2" />
                      Pending KYC Applications
                      {totalPending > 0 && (
                        <Badge bg="primary" className="ms-2">{totalPending}</Badge>
                      )}
                    </h5>
                  </div>
                </Card.Header>
                <Card.Body className="p-0">
                  {loading ? (
                    <div className="text-center p-5">
                      <Spinner animation="border" variant="primary" />
                      <p className="mt-3 text-muted">Loading applications...</p>
                    </div>
                  ) : applicationsArray.length === 0 ? (
                    <div className="text-center p-5">
                      <FaCheckCircle size={60} className="text-success mb-3 opacity-50" />
                      <h5 className="text-muted">No Pending Applications</h5>
                      <p className="text-muted mb-0">All KYC applications have been processed.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <Table hover className="mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Application ID</th>
                            <th>Applicant</th>
                            <th>Submission Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applicationsArray.map((app, idx) => (
                            <motion.tr 
                              key={app.id || idx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.05 }}
                              className="align-middle"
                            >
                              <td>
                                <code className="text-primary">
                                  {app.applicationId || app.id || `KYC${idx + 1}`}
                                </code>
                              </td>
                              <td>
                                <div>
                                  <strong>{app.applicantName || app.customerName || app.fullName || 'N/A'}</strong>
                                  {app.email && (
                                    <>
                                      <br />
                                      <small className="text-muted">{app.email}</small>
                                    </>
                                  )}
                                </div>
                              </td>
                              <td>
                                <FaCalendarAlt className="text-muted me-1" />
                                {formatDate(app.submissionDate || app.createdAt || app.createdDate)}
                              </td>
                              <td>{getStatusBadge(app.status)}</td>
                              <td>
                                <div className="d-flex gap-1">
                                  <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    title="View Details"
                                  >
                                    <FaEye />
                                  </Button>
                                  <Button 
                                    variant="outline-warning" 
                                    size="sm"
                                    title="Forward to Manager"
                                    onClick={() => {
                                      setSelectedApplication(app);
                                      setShowForwardModal(true);
                                    }}
                                  >
                                    <FaForward />
                                  </Button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <h6 className="mb-0">
                    <FaVideo className="me-2" />
                    Video Verification
                  </h6>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted mb-3">
                    Conduct secure video calls with applicants to verify their identity documents and complete KYC process.
                  </p>
                  <div className="d-grid">
                    <Button variant="success" className="mb-2">
                      <FaVideo className="me-2" />
                      Start New Session
                    </Button>
                    <Button variant="outline-primary" size="sm">
                      View Session History
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Forward to Manager Modal */}
        <Modal show={showForwardModal} onHide={() => setShowForwardModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <FaForward className="text-warning me-2" />
              Forward Application to Manager
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedApplication && (
              <>
                <div className="bg-light p-3 rounded mb-3">
                  <h6 className="mb-2">Application Details</h6>
                  <p className="mb-1">
                    <strong>ID:</strong> {selectedApplication.applicationId || selectedApplication.id || 'N/A'}
                  </p>
                  <p className="mb-0">
                    <strong>Applicant:</strong> {selectedApplication.applicantName || selectedApplication.customerName || selectedApplication.fullName || 'N/A'}
                  </p>
                </div>
                <div className="mb-3">
                  <label htmlFor="reviewComments" className="form-label">
                    Review Comments <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="reviewComments"
                    className="form-control"
                    rows={4}
                    placeholder="Please provide detailed comments about your review and any recommendations for the manager..."
                    value={forwardReview}
                    onChange={(e) => setForwardReview(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={() => {
                setShowForwardModal(false);
                setForwardReview('');
              }}
              disabled={forwarding}
            >
              Cancel
            </Button>
            <Button 
              variant="warning" 
              onClick={handleForwardToManager}
              disabled={!forwardReview.trim() || forwarding}
            >
              {forwarding ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Forwarding...
                </>
              ) : (
                <>
                  <FaForward className="me-1" />
                  Forward to Manager
                </>
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </ClerkLayout>
  );
};

export default ClerkDashboard;
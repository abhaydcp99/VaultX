// // src/pages/Admin/Dashboard.jsx
// import AdminLayout from '../../layouts/AdminLayout';
// import React from 'react';

// const AdminDashboard = () => {
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   };

//   return (
//     <AdminLayout onLogout={handleLogout}>
//       <h2>Welcome, Admin</h2>
//       <p>This is your dashboard.</p>
//     </AdminLayout>
//   );
// };

// export default AdminDashboard;

// src/pages/Admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Card, Row, Col, Badge, Button, Spinner, Alert } from 'react-bootstrap';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    clerks: [],
    managers: [],
    customers: [],
    auditLogs: [],
    loading: true,
    error: null
  });

  const [systemStatus, setSystemStatus] = useState({
    database: 'Online',
    apiServices: 'Operational',
    security: 'Secure',
    backup: 'Completed'
  });

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setDashboardData(prev => ({ ...prev, loading: true, error: null }));
        
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        // Fetch all data in parallel
        const [clerksRes, managersRes, customersRes, auditLogsRes] = await Promise.all([
          fetch('http://localhost:8080/api/admin/clerks', { headers }),
          fetch('http://localhost:8080/api/admin/managers', { headers }),
          fetch('http://localhost:8080/api/admin/customer', { headers }),
          fetch('http://localhost:8080/api/admin', { headers }) // audit logs endpoint
        ]);

        // Check if all requests were successful
        if (!clerksRes.ok || !managersRes.ok || !customersRes.ok || !auditLogsRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const [clerks, managers, customers, auditLogs] = await Promise.all([
          clerksRes.json(),
          managersRes.json(),
          customersRes.json(),
          auditLogsRes.json()
        ]);

        setDashboardData({
          clerks,
          managers,
          customers,
          auditLogs: auditLogs.slice(0, 5), // Show only recent 5 logs
          loading: false,
          error: null
        });

        // Update system status based on successful API calls
        setSystemStatus({
          database: 'Online',
          apiServices: 'Operational',
          security: 'Secure',
          backup: 'Completed'
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setDashboardData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load dashboard data. Please try again.'
        }));
        
        // Update system status to show issues
        setSystemStatus(prev => ({
          ...prev,
          database: 'Error',
          apiServices: 'Error'
        }));
      }
    };

    fetchDashboardData();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calculate totals
  const totalEmployees = dashboardData.clerks.length + dashboardData.managers.length;
  const totalCustomers = dashboardData.customers.length;
  const recentAuditCount = dashboardData.auditLogs.length;

  // Get recent activities from audit logs
  const getRecentActivities = () => {
    return dashboardData.auditLogs.slice(0, 3).map(log => ({
      id: log.id,
      action: log.action || 'System Activity',
      details: log.details || log.entityName || 'No details available',
      timestamp: log.timestamp ? new Date(log.timestamp).toLocaleString() : 'Unknown time',
      type: getActivityType(log.action)
    }));
  };

  const getActivityType = (action) => {
    if (!action) return 'info';
    const actionLower = action.toLowerCase();
    if (actionLower.includes('create') || actionLower.includes('register')) return 'success';
    if (actionLower.includes('update') || actionLower.includes('modify')) return 'warning';
    if (actionLower.includes('delete') || actionLower.includes('remove')) return 'danger';
    if (actionLower.includes('login') || actionLower.includes('access')) return 'primary';
    return 'info';
  };

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'online':
      case 'operational':
      case 'secure':
      case 'completed':
        return 'success';
      case 'error':
      case 'offline':
        return 'danger';
      case 'in progress':
      case 'maintenance':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <AdminLayout>
      {/* Welcome Header */}
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-4">
        <div className="mb-2 mb-sm-0">
          <h2 className="text-primary fw-bold mb-1 h3 h2-sm">
            Welcome back, Administrator 
            <span className="ms-2" role="img" aria-label="crown">👑</span>
          </h2>
          <p className="text-muted mb-0 small">
            Monitor and manage your VaultX banking system
            {dashboardData.loading && <Spinner size="sm" className="ms-2" />}
          </p>
        </div>
        <Badge bg={systemStatus.database === 'Online' ? 'success' : 'danger'} className="p-2">
          <i className="bi bi-circle-fill me-1"></i>
          <span className="d-none d-sm-inline">System </span>
          {systemStatus.database === 'Online' ? 'Online' : 'Issues'}
        </Badge>
      </div>

      {/* Error Alert */}
      {dashboardData.error && (
        <Alert variant="danger" className="mb-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {dashboardData.error}
        </Alert>
      )}

      {/* Quick Stats Cards */}
      <Row className="mb-4">
        <Col xs={6} md={3} className="mb-3">
          <Card className="h-100 shadow-sm border-0" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-white-50 mb-1 small">Total Employees</h6>
                  <h3 className="mb-0 fw-bold h4 h3-md">
                    {dashboardData.loading ? <Spinner size="sm" /> : totalEmployees}
                  </h3>
                  <small className="text-white-75 d-none d-sm-block">
                    {dashboardData.clerks.length} Clerks, {dashboardData.managers.length} Managers
                  </small>
                </div>
                <div className="bg-white bg-opacity-25 rounded-circle p-2 p-md-3">
                  <i className="bi bi-people-fill fs-5 fs-4-md"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xs={6} md={3} className="mb-3">
          <Card className="h-100 shadow-sm border-0" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-white-50 mb-1 small">Total Customers</h6>
                  <h3 className="mb-0 fw-bold h4 h3-md">
                    {dashboardData.loading ? <Spinner size="sm" /> : totalCustomers.toLocaleString()}
                  </h3>
                  <small className="text-white-75 d-none d-sm-block">Active accounts</small>
                </div>
                <div className="bg-white bg-opacity-25 rounded-circle p-3">
                  <i className="bi bi-person-check-fill fs-4"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xs={6} md={3} className="mb-3">
          <Card className="h-100 shadow-sm border-0" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-white-50 mb-1 small">Recent Activities</h6>
                  <h3 className="mb-0 fw-bold h4 h3-md">
                    {dashboardData.loading ? <Spinner size="sm" /> : recentAuditCount}
                  </h3>
                  <small className="text-white-75 d-none d-sm-block">Latest audit entries</small>
                </div>
                <div className="bg-white bg-opacity-25 rounded-circle p-3">
                  <i className="bi bi-activity fs-4"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xs={6} md={3} className="mb-3">
          <Card className="h-100 shadow-sm border-0" style={{background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'}}>
            <Card.Body className="text-white">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-white-50 mb-1 small">System Health</h6>
                  <h3 className="mb-0 fw-bold h4 h3-md">
                    {Object.values(systemStatus).filter(status => 
                      status === 'Online' || status === 'Operational' || status === 'Secure' || status === 'Completed'
                    ).length}/4
                  </h3>
                  <small className="text-white-75 d-none d-sm-block">Services operational</small>
                </div>
                <div className="bg-white bg-opacity-25 rounded-circle p-3">
                  <i className="bi bi-shield-check-fill fs-4"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Control Panel */}
      <Row>
        <Col xl={8} lg={7} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-primary text-white py-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <i className="bi bi-shield-check me-2"></i>
                  <Card.Title className="mb-0 h5">Admin Control Panel</Card.Title>
                </div>
                {dashboardData.loading && <Spinner size="sm" />}
              </div>
            </Card.Header>
            <Card.Body className="p-4">
              <p className="text-muted mb-4 small">
                Comprehensive management tools for your banking system. 
                <span className="d-none d-md-inline">
                  Monitor operations, manage staff, oversee customer accounts, and maintain system security.
                </span>
              </p>
              
              <Row>
                <Col sm={6} lg={6} xl={6} className="mb-3">
                  <div className="p-3 bg-light rounded-3 h-100">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-people text-primary me-2"></i>
                      <h6 className="mb-0">Employee Management</h6>
                    </div>
                    <p className="text-muted small mb-2 d-none d-lg-block">
                      {dashboardData.clerks.length} clerks and {dashboardData.managers.length} managers
                    </p>
                    <Button variant="outline-primary" size="sm" href="/admin/users" className="btn-sm">
                      <span className="d-none d-sm-inline">Manage </span>Staff
                    </Button>
                  </div>
                </Col>
                
                <Col sm={6} lg={6} xl={6} className="mb-3">
                  <div className="p-3 bg-light rounded-3 h-100">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-person-lines-fill text-success me-2"></i>
                      <h6 className="mb-0">Customer Overview</h6>
                    </div>
                    <p className="text-muted small mb-2">
                      {totalCustomers.toLocaleString()} registered customers
                    </p>
                    <Button variant="outline-success" size="sm" href="/admin/view-customers">
                      View Customers
                    </Button>
                  </div>
                </Col>
                
                <Col md={6} className="mb-3">
                  <div className="p-3 bg-light rounded-3 h-100">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-list-check text-info me-2"></i>
                      <h6 className="mb-0">System Audit</h6>
                    </div>
                    <p className="text-muted small mb-2">
                      {recentAuditCount} recent audit entries
                    </p>
                    <Button variant="outline-info" size="sm" href="/admin/audit-logs">
                      View Logs
                    </Button>
                  </div>
                </Col>
                
                <Col md={6} className="mb-3">
                  <div className="p-3 bg-light rounded-3 h-100">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-gear text-warning me-2"></i>
                      <h6 className="mb-0">System Settings</h6>
                    </div>
                    <p className="text-muted small mb-2">
                      Configure system parameters and security
                    </p>
                    <Button variant="outline-warning" size="sm" disabled>
                      Coming Soon
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm border-0 mb-3">
            <Card.Header className="bg-success text-white py-3">
              <div className="d-flex align-items-center">
                <i className="bi bi-activity me-2"></i>
                <Card.Title className="mb-0 h6">System Status</Card.Title>
              </div>
            </Card.Header>
            <Card.Body>
              {Object.entries(systemStatus).map(([service, status]) => (
                <div key={service} className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted small text-capitalize">
                    {service.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <Badge bg={getStatusBadgeVariant(status)}>{status}</Badge>
                </div>
              ))}
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-info text-white py-3">
              <div className="d-flex align-items-center">
                <i className="bi bi-bell me-2"></i>
                <Card.Title className="mb-0 h6">Recent Activities</Card.Title>
              </div>
            </Card.Header>
            <Card.Body>
              {dashboardData.loading ? (
                <div className="text-center">
                  <Spinner size="sm" />
                  <div className="small text-muted mt-2">Loading activities...</div>
                </div>
              ) : getRecentActivities().length > 0 ? (
                <div className="small">
                  {getRecentActivities().map((activity) => (
                    <div key={activity.id} className="d-flex align-items-start mb-2 pb-2 border-bottom">
                      <i className={`bi bi-${
                        activity.type === 'success' ? 'check-circle text-success' :
                        activity.type === 'warning' ? 'exclamation-triangle text-warning' :
                        activity.type === 'danger' ? 'x-circle text-danger' :
                        activity.type === 'primary' ? 'person-check text-primary' :
                        'info-circle text-info'
                      } me-2 mt-1`}></i>
                      <div className="flex-grow-1">
                        <div className="fw-medium">{activity.action}</div>
                        <div className="text-muted">{activity.details}</div>
                        <div className="text-muted" style={{fontSize: '0.75rem'}}>
                          {activity.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted small">
                  <i className="bi bi-inbox d-block mb-2" style={{fontSize: '2rem'}}></i>
                  No recent activities
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AdminDashboard;
// import React, { useState, useEffect } from 'react';
// import { Tabs, Tab, Form, Button, Alert, Row, Col, Card, Table, Spinner, Modal, Badge } from 'react-bootstrap';
// import AdminLayout from '../../layouts/AdminLayout';
// import axios from 'axios';

// const AdminUserManagement = () => {
//   const initialForm = {
//     firstName: '', lastName: '', email: '', password: '',
//     phoneno: '', dateOfBirth: '', address: '', city: '', state: '', pincode: ''
//   };

//   const [form, setForm] = useState(initialForm);
//   const [success, setSuccess] = useState('');
//   const [clerks, setClerks] = useState([]);
//   const [managers, setManagers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [editModal, setEditModal] = useState({ show: false, role: '', data: {} });
//   const [editForm, setEditForm] = useState(initialForm);

//   const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
//   const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

//   const fetchClerks = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://localhost:8080/api/admin/clerks', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClerks(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchManagers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://localhost:8080/api/admin/managers', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setManagers(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAddUser = async (role) => {
//     try {
//       const token = localStorage.getItem('token');
//       const url = role === 'CLERK'
//         ? 'http://localhost:8080/api/admin/clerk'
//         : 'http://localhost:8080/api/admin/manager';

//       await axios.post(url, form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setSuccess(`${role} added successfully!`);
//       setForm(initialForm);
//       role === 'CLERK' ? fetchClerks() : fetchManagers();
//     } catch (err) {
//       alert(`Failed to add ${role.toLowerCase()}.`);
//     }
//   };

//   const handleDelete = async (id, role) => {
//     if (!window.confirm(`Are you sure you want to delete this ${role.toLowerCase()}?`)) return;
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:8080/api/admin/${role.toLowerCase()}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       role === 'CLERK' ? fetchClerks() : fetchManagers();
//     } catch (err) {
//       alert(`Failed to delete ${role.toLowerCase()}.`);
//     }
//   };

//   const openEditModal = (user, role) => {
//     setEditForm(user);
//     setEditModal({ show: true, role, data: user });
//   };

//   const handleEditSubmit = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`http://localhost:8080/api/admin/${editModal.role.toLowerCase()}/${editModal.data.id}`, {
//         ...editForm, role: editModal.role, password: ''
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEditModal({ ...editModal, show: false });
//       editModal.role === 'CLERK' ? fetchClerks() : fetchManagers();
//     } catch (err) {
//       alert('Failed to update user.');
//     }
//   };

//   useEffect(() => {
//     fetchClerks();
//     fetchManagers();
//     setLoading(false);
//   }, []);

//   const renderForm = (role) => (
//     <Form
//       onSubmit={(e) => {
//         e.preventDefault();
//         handleAddUser(role);
//       }}
//     >
//       <Row>
//         <Col md={6}><Form.Group className="mb-3"><Form.Label>First Name</Form.Label><Form.Control name="firstName" value={form.firstName} onChange={handleFormChange} required /></Form.Group></Col>
//         <Col md={6}><Form.Group className="mb-3"><Form.Label>Last Name</Form.Label><Form.Control name="lastName" value={form.lastName} onChange={handleFormChange} required /></Form.Group></Col>
//       </Row>

//       <Row>
//         <Col md={6}><Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={form.email} onChange={handleFormChange} required /></Form.Group></Col>
//         <Col md={6}><Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" name="password" value={form.password} onChange={handleFormChange} required /></Form.Group></Col>
//       </Row>

//       <Row>
//         <Col md={6}><Form.Group className="mb-3"><Form.Label>Phone</Form.Label><Form.Control name="phoneno" value={form.phoneno} onChange={handleFormChange} required /></Form.Group></Col>
//         <Col md={6}><Form.Group className="mb-3"><Form.Label>Date of Birth</Form.Label><Form.Control type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleFormChange} required /></Form.Group></Col>
//       </Row>

//       <Form.Group className="mb-3"><Form.Label>Address</Form.Label><Form.Control name="address" value={form.address} onChange={handleFormChange} required /></Form.Group>

//       <Row>
//         <Col md={4}><Form.Group className="mb-3"><Form.Label>City</Form.Label><Form.Control name="city" value={form.city} onChange={handleFormChange} required /></Form.Group></Col>
//         <Col md={4}><Form.Group className="mb-3"><Form.Label>State</Form.Label><Form.Control name="state" value={form.state} onChange={handleFormChange} required /></Form.Group></Col>
//         <Col md={4}><Form.Group className="mb-3"><Form.Label>Pincode</Form.Label><Form.Control name="pincode" value={form.pincode} onChange={handleFormChange} required /></Form.Group></Col>
//       </Row>

//       <Button type="submit" variant="primary">Add {role}</Button>
//     </Form>
//   );

//   const renderTable = (data, role) => (
//     <Table striped bordered hover responsive>
//       <thead>
//         <tr>
//           <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>City</th><th>State</th><th>Pincode</th><th>Verified</th><th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((user, idx) => (
//           <tr key={user.id}>
//             <td>{idx + 1}</td>
//             <td>{user.firstName} {user.lastName}</td>
//             <td>{user.email}</td>
//             <td>{user.phoneno}</td>
//             <td>{user.address}</td>
//             <td>{user.city}</td>
//             <td>{user.state}</td>
//             <td>{user.pincode}</td>
//             <td>{user.verified ? <Badge bg="success">Yes</Badge> : <Badge bg="secondary">No</Badge>}</td>
//             <td>
//               <Button size="sm" variant="outline-primary" onClick={() => openEditModal(user, role)}>Edit</Button>{' '}
//               <Button size="sm" variant="danger" onClick={() => handleDelete(user.id, role)}>Delete</Button>
//             </td>
//           </tr>
//         ))}
//         {data.length === 0 && (
//           <tr><td colSpan="10" className="text-center text-muted">No {role.toLowerCase()}s found.</td></tr>
//         )}
//       </tbody>
//     </Table>
//   );

//   return (
//     <AdminLayout>
//       <Card className="p-4 shadow-sm">
//         <h4 className="mb-4">👥 Admin User Management</h4>
//         {success && <Alert variant="success">{success}</Alert>}
//         <Tabs defaultActiveKey="addClerk" className="mb-3" fill>
//           <Tab eventKey="addClerk" title="Add Clerk">{renderForm('CLERK')}</Tab>
//           <Tab eventKey="addManager" title="Add Manager">{renderForm('MANAGER')}</Tab>
//           <Tab eventKey="viewClerks" title="View Clerks">{loading ? <Spinner animation="border" /> : renderTable(clerks, 'CLERK')}</Tab>
//           <Tab eventKey="viewManagers" title="View Managers">{loading ? <Spinner animation="border" /> : renderTable(managers, 'MANAGER')}</Tab>
//         </Tabs>
//       </Card>

//       {/* Edit Modal */}
//       <Modal show={editModal.show} onHide={() => setEditModal({ ...editModal, show: false })} centered>
//         <Modal.Header closeButton><Modal.Title>Edit {editModal.role}</Modal.Title></Modal.Header>
//         <Modal.Body>
//           <Form>
//             {Object.entries(editForm).map(([key, value]) => (
//               key !== 'id' && (
//                 <Form.Group className="mb-3" key={key}>
//                   <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
//                   <Form.Control
//                     type={key === 'dateOfBirth' ? 'date' : 'text'}
//                     name={key}
//                     value={value}
//                     onChange={handleEditChange}
//                   />
//                 </Form.Group>
//               )
//             ))}
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setEditModal({ ...editModal, show: false })}>Cancel</Button>
//           <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
//         </Modal.Footer>
//       </Modal>
//     </AdminLayout>
//   );
// };

// export default AdminUserManagement;


import React, { useState, useEffect } from 'react';
import {
  Tabs, Tab, Form, Button, Alert,
  Row, Col, Card, Table, Spinner,
  Modal, Badge, InputGroup, Container,
  OverlayTrigger, Tooltip, ButtonGroup
} from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';

const AdminUserManagement = () => {
  const initialForm = {
    firstName: '', lastName: '', email: '', password: '',
    phoneno: '', dateOfBirth: '', address: '', city: '', state: '', pincode: ''
  };

  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState('');
  const [clerks, setClerks] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [editModal, setEditModal] = useState({ show: false, role: '', data: {} });
  const [editForm, setEditForm] = useState(initialForm);

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const validateFields = (data) => {
    const letterOnly = /^[A-Za-z ]+$/;
    const phoneRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!letterOnly.test(data.firstName)) return 'First name must contain only letters.';
    if (!letterOnly.test(data.lastName)) return 'Last name must contain only letters.';
    if (!emailRegex.test(data.email)) return 'Invalid email address.';
    if (data.password.length < 6) return 'Password must be at least 6 characters.';
    if (!phoneRegex.test(data.phoneno)) return 'Phone must be 10 digits.';
    if (!letterOnly.test(data.city)) return 'City must contain only letters.';
    if (!letterOnly.test(data.state)) return 'State must contain only letters.';
    if (!pincodeRegex.test(data.pincode)) return 'Pincode must be 6 digits.';
    return null;
  };

  const fetchClerks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/admin/clerks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClerks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchManagers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/admin/managers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setManagers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async (role) => {
    const errMsg = validateFields(form);
    if (errMsg) return alert(errMsg);

    try {
      const token = localStorage.getItem('token');
      const url = role === 'CLERK'
        ? 'http://localhost:8080/api/admin/clerk'
        : 'http://localhost:8080/api/admin/manager';

      await axios.post(url, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess(`${role} added successfully!`);
      setForm(initialForm);
      role === 'CLERK' ? fetchClerks() : fetchManagers();
    } catch (err) {
      alert(`Failed to add ${role.toLowerCase()}.`);
    }
  };

  const handleDelete = async (id, role) => {
    if (!window.confirm(`Are you sure you want to delete this ${role.toLowerCase()}?`)) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/admin/${role.toLowerCase()}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      role === 'CLERK' ? fetchClerks() : fetchManagers();
    } catch (err) {
      alert(`Failed to delete ${role.toLowerCase()}.`);
    }
  };

  const openEditModal = (user, role) => {
    setEditForm(user);
    setEditModal({ show: true, role, data: user });
  };

  const handleEditSubmit = async () => {
    const errMsg = validateFields(editForm);
    if (errMsg) return alert(errMsg);

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/admin/${editModal.role.toLowerCase()}/${editModal.data.id}`, {
        ...editForm, role: editModal.role, password: ''
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditModal({ ...editModal, show: false });
      editModal.role === 'CLERK' ? fetchClerks() : fetchManagers();
    } catch (err) {
      alert('Failed to update user.');
    }
  };

  useEffect(() => {
    fetchClerks();
    fetchManagers();
    setLoading(false);
  }, []);

  const renderForm = (role) => (
    <Card className="border-0 shadow-sm bg-light" style={{ borderRadius: '15px' }}>
      <Card.Body className="p-4">
        <div className="d-flex align-items-center mb-4">
          <div 
            className={`rounded-circle me-3 d-flex align-items-center justify-content-center ${
              role === 'CLERK' ? 'bg-info' : 'bg-warning'
            }`}
            style={{ width: '50px', height: '50px' }}
          >
            <span className="text-white fs-4">
              {role === 'CLERK' ? '👨‍💼' : '👨‍💻'}
            </span>
          </div>
          <div>
            <h5 className="mb-1 text-dark">Add New {role}</h5>
            <small className="text-muted">Fill in the details to create a new {role.toLowerCase()}</small>
          </div>
        </div>

        <Form onSubmit={(e) => { e.preventDefault(); handleAddUser(role); }}>
          <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
            <h6 className="text-primary mb-3">
              <span className="me-2">👤</span>Personal Information
            </h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <span className="me-2">📝</span>First Name
                  </Form.Label>
                  <Form.Control 
                    name="firstName" 
                    value={form.firstName} 
                    onChange={handleFormChange} 
                    required 
                    className="border-2 rounded-pill px-3"
                    style={{ height: '45px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <span className="me-2">📝</span>Last Name
                  </Form.Label>
                  <Form.Control 
                    name="lastName" 
                    value={form.lastName} 
                    onChange={handleFormChange} 
                    required 
                    className="border-2 rounded-pill px-3"
                    style={{ height: '45px' }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <span className="me-2">📧</span>Email
                  </Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleFormChange} 
                    required 
                    className="border-2 rounded-pill px-3"
                    style={{ height: '45px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <span className="me-2">🔒</span>Password
                  </Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password" 
                    value={form.password} 
                    onChange={handleFormChange} 
                    required 
                    className="border-2 rounded-pill px-3"
                    style={{ height: '45px' }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <span className="me-2">📱</span>Phone
                  </Form.Label>
                  <Form.Control 
                    name="phoneno" 
                    value={form.phoneno} 
                    onChange={handleFormChange} 
                    required 
                    className="border-2 rounded-pill px-3"
                    style={{ height: '45px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <span className="me-2">🎂</span>Date of Birth
                  </Form.Label>
                  <Form.Control 
                    type="date" 
                    name="dateOfBirth" 
                    value={form.dateOfBirth} 
                    onChange={handleFormChange} 
                    required 
                    className="border-2 rounded-pill px-3"
                    style={{ height: '45px' }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
            <h6 className="text-success mb-3">
              <span className="me-2">🏠</span>Address Information
            </h6>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                <span className="me-2">📍</span>Address
              </Form.Label>
              <Form.Control 
                name="address" 
                value={form.address} 
                onChange={handleFormChange} 
                required 
                className="border-2 rounded-3 px-3"
                style={{ minHeight: '45px' }}
                as="textarea"
                rows={2}
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <span className="me-2">🏙️</span>City
                  </Form.Label>
                  <Form.Control 
                    name="city" 
                    value={form.city} 
                    onChange={handleFormChange} 
                    required 
                    className="border-2 rounded-pill px-3"
                    style={{ height: '45px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <span className="me-2">🗺️</span>State
                  </Form.Label>
                  <Form.Control 
                    name="state" 
                    value={form.state} 
                    onChange={handleFormChange} 
                    required 
                    className="border-2 rounded-pill px-3"
                    style={{ height: '45px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <span className="me-2">📮</span>Pincode
                  </Form.Label>
                  <Form.Control 
                    name="pincode" 
                    value={form.pincode} 
                    onChange={handleFormChange} 
                    required 
                    className="border-2 rounded-pill px-3"
                    style={{ height: '45px' }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div className="d-grid">
            <Button 
              type="submit" 
              variant="primary" 
              size="lg"
              className="rounded-pill py-3 fw-semibold"
              style={{ 
                background: role === 'CLERK' ? 'linear-gradient(45deg, #007bff, #0056b3)' : 'linear-gradient(45deg, #ffc107, #e0a800)',
                border: 'none',
                boxShadow: '0 4px 15px rgba(0,123,255,0.3)'
              }}
            >
              <span className="me-2">{role === 'CLERK' ? '➕' : '➕'}</span>
              Add {role}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderTable = (data, role) => {
    const filtered = data.filter((u) =>
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
        <Card.Header className={`border-0 ${role === 'CLERK' ? 'bg-info' : 'bg-warning'} text-white`} style={{ borderRadius: '15px 15px 0 0' }}>
          <div className="d-flex align-items-center">
            <span className="me-3 fs-4">{role === 'CLERK' ? '👨‍💼' : '👨‍💻'}</span>
            <div>
              <h5 className="mb-1">{role === 'CLERK' ? 'Clerks' : 'Managers'} Management</h5>
              <small className="opacity-75">Total: {data.length} {role.toLowerCase()}s</small>
            </div>
          </div>
        </Card.Header>
        
        <Card.Body className="p-4">
          <div className="mb-4">
            <InputGroup size="lg">
              <InputGroup.Text className="border-2 rounded-start-pill bg-light">
                <span>🔍</span>
              </InputGroup.Text>
              <Form.Control 
                placeholder="Search by name or email..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="border-2 rounded-end-pill"
                style={{ height: '50px' }}
              />
            </InputGroup>
          </div>

          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="bg-light">
                <tr>
                  <th className="border-0 py-3 text-muted fw-semibold">#</th>
                  <th className="border-0 py-3 text-muted fw-semibold">
                    <span className="me-2">👤</span>Name
                  </th>
                  <th className="border-0 py-3 text-muted fw-semibold">
                    <span className="me-2">📧</span>Email
                  </th>
                  <th className="border-0 py-3 text-muted fw-semibold">
                    <span className="me-2">📱</span>Phone
                  </th>
                  <th className="border-0 py-3 text-muted fw-semibold">
                    <span className="me-2">📍</span>Address
                  </th>
                  <th className="border-0 py-3 text-muted fw-semibold">
                    <span className="me-2">🏙️</span>City
                  </th>
                  <th className="border-0 py-3 text-muted fw-semibold">
                    <span className="me-2">🗺️</span>State
                  </th>
                  <th className="border-0 py-3 text-muted fw-semibold">
                    <span className="me-2">📮</span>Pincode
                  </th>
                  <th className="border-0 py-3 text-muted fw-semibold">
                    <span className="me-2">✅</span>Verified
                  </th>
                  <th className="border-0 py-3 text-muted fw-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, idx) => (
                  <tr key={user.id} className="border-bottom">
                    <td className="py-3">
                      <Badge bg="secondary" pill>{idx + 1}</Badge>
                    </td>
                    <td className="py-3">
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle bg-primary text-white me-3 d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: '40px', height: '40px', fontSize: '14px' }}
                        >
                          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-semibold">{user.firstName} {user.lastName}</div>
                          <small className="text-muted">ID: {user.id}</small>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-primary">{user.email}</td>
                    <td className="py-3">{user.phoneno}</td>
                    <td className="py-3">
                      <small className="text-muted" style={{ maxWidth: '150px', display: 'block' }}>
                        {user.address.length > 30 ? user.address.substring(0, 30) + '...' : user.address}
                      </small>
                    </td>
                    <td className="py-3">{user.city}</td>
                    <td className="py-3">{user.state}</td>
                    <td className="py-3">
                      <Badge bg="light" text="dark" className="rounded-pill">
                        {user.pincode}
                      </Badge>
                    </td>
                    <td className="py-3">
                      {user.verified ? 
                        <Badge bg="success" className="rounded-pill">
                          <span className="me-1">✅</span>Verified
                        </Badge> : 
                        <Badge bg="warning" text="dark" className="rounded-pill">
                          <span className="me-1">⏳</span>Pending
                        </Badge>
                      }
                    </td>
                    <td className="py-3 text-center">
                      <ButtonGroup size="sm">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Edit User</Tooltip>}
                        >
                          <Button 
                            variant="outline-primary" 
                            className="rounded-pill me-1"
                            onClick={() => openEditModal(user, role)}
                            style={{ width: '35px', height: '35px' }}
                          >
                            ✏️
                          </Button>
                        </OverlayTrigger>
                        
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Delete User</Tooltip>}
                        >
                          <Button 
                            variant="outline-danger" 
                            className="rounded-pill"
                            onClick={() => handleDelete(user.id, role)}
                            style={{ width: '35px', height: '35px' }}
                          >
                            🗑️
                          </Button>
                        </OverlayTrigger>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="10" className="text-center py-5">
                      <div className="text-muted">
                        <div className="mb-3" style={{ fontSize: '3rem', opacity: 0.3 }}>
                          {role === 'CLERK' ? '👨‍💼' : '👨‍💻'}
                        </div>
                        <h6>No {role.toLowerCase()}s found</h6>
                        <small>Try adjusting your search criteria</small>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <AdminLayout>
      <Container fluid className="p-4">
        <div className="mb-4">
          <div className="d-flex align-items-center mb-3">
            <div 
              className="rounded-circle bg-gradient bg-primary text-white me-4 d-flex align-items-center justify-content-center"
              style={{ width: '60px', height: '60px' }}
            >
              <span style={{ fontSize: '1.5rem' }}>👥</span>
            </div>
            <div>
              <h2 className="mb-1 text-dark">Admin User Management</h2>
              <p className="text-muted mb-0">Manage clerks and managers in your organization</p>
            </div>
          </div>
          
          {success && (
            <Alert variant="success" className="border-0 rounded-3 shadow-sm" dismissible onClose={() => setSuccess('')}>
              <div className="d-flex align-items-center">
                <span className="me-2 fs-5">🎉</span>
                <strong>{success}</strong>
              </div>
            </Alert>
          )}
        </div>

        <Card className="border-0 shadow-lg" style={{ borderRadius: '20px' }}>
          <Card.Body className="p-0">
            <Tabs 
              defaultActiveKey="addClerk" 
              className="border-0 px-4 pt-3" 
              fill
            >
              <Tab 
                eventKey="addClerk" 
                title={
                  <div className="d-flex align-items-center justify-content-center py-2">
                    <span className="me-2">👨‍💼</span>
                    <span>Add Clerk</span>
                  </div>
                }
                className="p-4"
              >
                {renderForm('CLERK')}
              </Tab>
              
              <Tab 
                eventKey="addManager" 
                title={
                  <div className="d-flex align-items-center justify-content-center py-2">
                    <span className="me-2">👨‍💻</span>
                    <span>Add Manager</span>
                  </div>
                }
                className="p-4"
              >
                {renderForm('MANAGER')}
              </Tab>
              
              <Tab 
                eventKey="viewClerks" 
                title={
                  <div className="d-flex align-items-center justify-content-center py-2">
                    <span className="me-2">📋</span>
                    <span>View Clerks</span>
                    <Badge bg="info" className="ms-2 rounded-pill">{clerks.length}</Badge>
                  </div>
                }
                className="p-4"
              >
                {loading ? 
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                    <p className="mt-3 text-muted">Loading clerks...</p>
                  </div> : 
                  renderTable(clerks, 'CLERK')
                }
              </Tab>
              
              <Tab 
                eventKey="viewManagers" 
                title={
                  <div className="d-flex align-items-center justify-content-center py-2">
                    <span className="me-2">📊</span>
                    <span>View Managers</span>
                    <Badge bg="warning" text="dark" className="ms-2 rounded-pill">{managers.length}</Badge>
                  </div>
                }
                className="p-4"
              >
                {loading ? 
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="warning" style={{ width: '3rem', height: '3rem' }} />
                    <p className="mt-3 text-muted">Loading managers...</p>
                  </div> : 
                  renderTable(managers, 'MANAGER')
                }
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>

        {/* Enhanced Edit Modal */}
        <Modal 
          show={editModal.show} 
          onHide={() => setEditModal({ ...editModal, show: false })} 
          centered
          size="lg"
          backdrop="static"
        >
          <Modal.Header closeButton className="border-0 pb-1">
            <Modal.Title className="d-flex align-items-center">
              <span className="me-3 fs-3">
                {editModal.role === 'CLERK' ? '👨‍💼' : '👨‍💻'}
              </span>
              <div>
                <h5 className="mb-1">Edit {editModal.role}</h5>
                <small className="text-muted">Update user information</small>
              </div>
            </Modal.Title>
          </Modal.Header>
          
          <Modal.Body className="p-4">
            <Form>
              <Row>
                {Object.entries(editForm).map(([key, value]) => (
                  key !== 'id' && (
                    <Col md={key === 'address' ? 12 : 6} key={key}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-capitalize">
                          <span className="me-2">
                            {key === 'firstName' || key === 'lastName' ? '📝' :
                             key === 'email' ? '📧' :
                             key === 'phoneno' ? '📱' :
                             key === 'dateOfBirth' ? '🎂' :
                             key === 'address' ? '📍' :
                             key === 'city' ? '🏙️' :
                             key === 'state' ? '🗺️' :
                             key === 'pincode' ? '📮' : '📄'}
                          </span>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Form.Label>
                        <Form.Control
                          type={key === 'dateOfBirth' ? 'date' : key === 'email' ? 'email' : 'text'}
                          name={key}
                          value={value}
                          onChange={handleEditChange}
                          className={`border-2 ${key === 'address' ? 'rounded-3' : 'rounded-pill'} px-3`}
                          style={{ height: '45px' }}
                          as={key === 'address' ? 'textarea' : 'input'}
                          rows={key === 'address' ? 2 : undefined}
                        />
                      </Form.Group>
                    </Col>
                  )
                ))}
              </Row>
            </Form>
          </Modal.Body>
          
          <Modal.Footer className="border-0 pt-0">
            <Button 
              variant="outline-secondary" 
              onClick={() => setEditModal({ ...editModal, show: false })}
              className="rounded-pill px-4"
            >
              <span className="me-2">❌</span>Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleEditSubmit}
              className="rounded-pill px-4"
              style={{ 
                background: 'linear-gradient(45deg, #007bff, #0056b3)',
                border: 'none'
              }}
            >
              <span className="me-2">💾</span>Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </AdminLayout>
  );
};

export default AdminUserManagement;
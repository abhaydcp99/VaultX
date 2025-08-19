import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Container, Card } from 'react-bootstrap';
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const token = localStorage.getItem('token');

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/admin/customer', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const openEditModal = (customer) => {
    setSelectedCustomer({ ...customer });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedCustomer(null);
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/customer/${selectedCustomer.id}`,
        selectedCustomer,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCustomers();
      closeEditModal();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/customer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <AdminLayout>
      <Container className="mt-4">
        <Card className="shadow-lg border-0">
          <Card.Header
            className="text-white fw-bold"
            style={{
              background: 'linear-gradient(90deg, #6a11cb, #ff4b2b)',
              fontSize: '1.3rem',
            }}
          >
            All Customers
          </Card.Header>
          <Card.Body>
            <Table
              striped
              bordered
              hover
              responsive
              className="align-middle text-center"
              style={{ borderRadius: '10px', overflow: 'hidden' }}
            >
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>City</th>
                  <th>Pincode</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, idx) => (
                  <tr key={customer.id} style={{ transition: '0.2s' }}>
                    <td>{idx + 1}</td>
                    <td>{customer.firstName} {customer.lastName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phoneno}</td>
                    <td>{customer.city}</td>
                    <td>{customer.pincode}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => openEditModal(customer)}
                      >
                        <PencilSquare /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(customer.id)}
                      >
                        <TrashFill /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={closeEditModal} centered>
          <Modal.Header closeButton style={{ background: '#6a11cb', color: 'white' }}>
            <Modal.Title>Edit Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedCustomer && (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    value={selectedCustomer.firstName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    value={selectedCustomer.lastName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={selectedCustomer.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone No</Form.Label>
                  <Form.Control
                    name="phoneno"
                    value={selectedCustomer.phoneno}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    value={selectedCustomer.city}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    name="pincode"
                    value={selectedCustomer.pincode}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleUpdate}
              style={{ background: '#6a11cb', border: 'none' }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </AdminLayout>
  );
};

export default ViewCustomers;
  
// src/pages/Manager/Dashboard.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import ManagerLayout from '../../layouts/ManagerLayout';

const ManagerDashboard = () => (
  <ManagerLayout>   
  <Container >
    <h3>Welcome to the Manager Dashboard</h3>
    <p>Use the sidebar to review KYC applications submitted by clerks.</p>
  </Container>
  </ManagerLayout>
);

export default ManagerDashboard;

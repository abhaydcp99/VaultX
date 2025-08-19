// src/layouts/AdminLayout.jsx
import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import AdminSidebar from '../components/sidebars/AdminSidebar';

const AdminLayout = ({ children, onLogout }) => {
  return (
    <>
      <AdminNavbar onLogout={onLogout} />
      <Row noGutters>
        <Col md={2}><AdminSidebar /></Col>
        <Col md={10} className="p-4">{children}</Col>
      </Row>
    </>
  );
};

export default AdminLayout;



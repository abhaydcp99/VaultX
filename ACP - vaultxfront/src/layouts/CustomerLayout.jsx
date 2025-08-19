// src/layouts/CustomerLayout.jsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CustomerNavbar from '../components/Navbar/CustomerNavbar';
import CustomerSidebar from '../components/sidebars/CustomerSidebar';

const CustomerLayout = ({ children, onLogout }) => {
  return (
    <>
      <CustomerNavbar onLogout={onLogout} />
      <Row className="g-0"> {/* or remove noGutters */}
        <Col md={2}>
          <CustomerSidebar />
        </Col>
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </>
  );
};

export default CustomerLayout;

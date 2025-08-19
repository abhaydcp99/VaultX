import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ClerkNavbar from '../components/Navbar/ClerkNavbar';
import ClerkSidebar from '../components/sidebars/ClerkSidebar';

const ClerkLayout = ({ children, onLogout }) => {
  return (
    <>
      <ClerkNavbar onLogout={onLogout} />
      <Row className="g-0">
        <Col md={2}>
          <ClerkSidebar />
        </Col>
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </>
  );
};

export default ClerkLayout;

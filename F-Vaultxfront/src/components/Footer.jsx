import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-blue-900 pt-5 pb-3">
      <Container>
        <Row className="mb-4">
          {/* Brand Info */}
          <Col md={4} className="mb-4 mb-md-0">
            <h4 className="fw-bold text-warning">Vault<span className="text-light">X</span></h4>
            <p style={{ fontSize: '0.95rem', color: 'white' }}>
              India's leading digital bank providing secure, fast, and reliable banking services to millions of customers.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-light fs-5" title="Facebook"><BsFacebook /></a>
              <a href="#" className="text-light fs-5" title="Instagram"><BsInstagram /></a>
              <a href="#" className="text-light fs-5" title="Twitter"><BsTwitter /></a>
              <a href="#" className="text-light fs-5" title="LinkedIn"><BsLinkedin /></a>
            </div>
          </Col>

          {/* Services */}
          <Col md={4} className="mb-4 mb-md-0">
            <h6 className="text-uppercase fw-semibold mb-3 text-warning">Our Services</h6>
            <ul className="list-unstyled text-light small">
              <li className="mb-2"><i className="bi bi-chevron-right me-2 text-warning"></i> Savings Account</li>
              <li className="mb-2"><i className="bi bi-chevron-right me-2 text-warning"></i> Current Account</li>
              <li className="mb-2"><i className="bi bi-chevron-right me-2 text-warning"></i> Credit Cards</li>
              <li className="mb-2"><i className="bi bi-chevron-right me-2 text-warning"></i> Personal Loans</li>
              <li><i className="bi bi-chevron-right me-2 text-warning"></i> Investments & Insurance</li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={4}>
            <h6 className="text-uppercase fw-semibold mb-3 text-warning ">Contact Info</h6>
            <p className="small mb-2 text-light" >📞 <strong>1800-123-VAULT</strong></p>
            <p className="small mb-2">📧 <a href="mailto:support@vaultx.com" className="text-light text-decoration-none">support@vaultx.com</a></p>
            <p className="small mb-2 text-light">📍 Mumbai, Maharashtra, India</p>
            <p className="small mb-0 text-light">⏰ 24/7 Customer Support</p>
          </Col>
        </Row>

        <hr className="border-top border-secondary" />
        <p className="text-center text-secondary small mt-3 mb-0">
          &copy; {new Date().getFullYear()} <strong className="text-warning">VaultX</strong> Digital Bank. All rights reserved. <br />
          RBI Licensed | 🔐 256-bit SSL Secured | Designed for Trust & Speed 🚀
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

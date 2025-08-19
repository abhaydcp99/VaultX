


import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './AppNavbar.css';

const AppNavbar = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top" className="bg-gradient-to-br from-gray-800 to-blue-900 py-3" >
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2 fs-4 fw-bold text-white">
          <i className="bi bi-bank2 fs-3 text-warning"></i>
          <span>
            Vault<span className="text-warning">X</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center nav-text">

            {/* Styled Dropdowns */}
            <NavDropdown
              title={<span className="nav-link-custom"><i className="bi bi-wallet2 me-1"></i>Accounts</span>}
              id="accounts-dropdown"
              className="custom-dropdown"
            >
              <NavDropdown.Item href="/register"><i className="bi bi-piggy-bank me-2"></i>Savings Account</NavDropdown.Item>
              <NavDropdown.Item href="/register"><i className="bi bi-building me-2"></i>Current Account</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={<span className="nav-link-custom"><i className="bi bi-cash-coin me-1"></i>Loans</span>}
              id="loans-dropdown"
              className="custom-dropdown"
            >
              <NavDropdown.Item href="/home-loan"><i className="bi bi-house-door me-2"></i>Home Loan</NavDropdown.Item>
              <NavDropdown.Item href="/education-loan"><i className="bi bi-mortarboard me-2"></i>Education Loan</NavDropdown.Item>
              <NavDropdown.Item href="/car-loan"><i className="bi bi-car-front me-2"></i>Car Loan</NavDropdown.Item>
              <NavDropdown.Item href="/gold-loan"><i className="bi bi-gem me-2"></i>Gold Loan</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={<span className="nav-link-custom"><i className="bi bi-credit-card-2-front me-1"></i>Payments</span>}
              id="payments-dropdown"
              className="custom-dropdown"
            >
              <NavDropdown.Item href="/transfer"><i className="bi bi-arrow-left-right me-2"></i>Fund Transfer</NavDropdown.Item>
              <NavDropdown.Item href="/upi"><i className="bi bi-phone me-2"></i>UPI Payments</NavDropdown.Item>
              <NavDropdown.Item href="/bill-pay"><i className="bi bi-receipt me-2"></i>Bill Payments</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={<span className="nav-link-custom"><i className="bi bi-card-heading me-1"></i>Cards</span>}
              id="cards-dropdown"
              className="custom-dropdown"
            >
              <NavDropdown.Item href="/credit-card"><i className="bi bi-credit-card me-2"></i>Credit Cards</NavDropdown.Item>
              <NavDropdown.Item href="/debit-card"><i className="bi bi-credit-card-2-front me-2"></i>Debit Cards</NavDropdown.Item>
              <NavDropdown.Item href="/apply-card"><i className="bi bi-pencil-square me-2"></i>Apply for Card</NavDropdown.Item>
            </NavDropdown>

            {/* Static Links */}
            <Nav.Link href="/about" className="nav-link-custom"><i className="bi bi-info-circle me-1"></i>About</Nav.Link>
            <Nav.Link href="/contact" className="nav-link-custom"><i className="bi bi-envelope me-1"></i>Contact</Nav.Link>
            <Nav.Link href="/login" className="nav-link-custom fw-semibold"><i className="bi bi-box-arrow-in-right me-1"></i>Login</Nav.Link>

            {/* Security Badges */}
            <Nav.Link disabled className="small text-white-50">🔐 RBI Approved</Nav.Link>
            <Nav.Link disabled className="small text-white-50">🔒 SSL Secured</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;



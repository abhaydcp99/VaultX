

import React from 'react';
import { Link } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer';

import homeLoan from '../assets/home-loan.jpg';
import educationLoan from '../assets/education-loan.jpg';
import carLoan from '../assets/car.jpg';
import goldLoan from '../assets/gold-loan.jpg';

import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { FaUsers, FaLock, FaMobileAlt, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HomePage = () => {
  const loanProducts = [
    {
      title: 'Home Loan',
      img: homeLoan,
      desc: 'Get loans starting at 7.35% to purchase or construct your dream home.',
    },
    {
      title: 'Education Loan',
      img: educationLoan,
      desc: 'Achieve your academic goals with low-interest student loans.',
    },
    {
      title: 'Car Loan',
      img: carLoan,
      desc: 'Own your dream car with quick approval and flexible EMIs.',
    },
    {
      title: 'Gold Loan',
      img: goldLoan,
      desc: 'Unlock the value of your gold with attractive interest rates.',
    },
  ];

  const services = [
    { icon: <FaUsers size={40} />, label: '24/7 Support' },
    { icon: <FaLock size={40} />, label: 'Secure Banking' },
    { icon: <FaMobileAlt size={40} />, label: 'Mobile App Access' },
    { icon: <FaChartLine size={40} />, label: 'Investment Options' },
  ];

  const faqs = [
    {
      q: 'What is VaultX?',
      a: 'VaultX is a digital banking platform offering loans, accounts, and secure transactions online.',
    },
    {
      q: 'How do I open an account?',
      a: 'Click "Open New Account" on the homepage and complete the online registration form.',
    },
    {
      q: 'Is my data secure with VaultX?',
      a: 'Yes, we use military-grade encryption and AI-driven fraud detection.',
    },
    {
      q: 'What documents are needed for a loan?',
      a: 'PAN card, Aadhaar card, income proof, and bank statements are typically required.',
    },
    {
      q: 'Can I repay loans early?',
      a: 'Yes, VaultX offers flexible prepayment options without extra charges.',
    },
    {
      q: 'What is the loan approval time?',
      a: 'Loan approvals are typically processed within 24 hours.',
    },
    {
      q: 'Is there a mobile app?',
      a: 'Yes, you can manage your entire account via the VaultX mobile app.',
    },
    {
      q: 'Can I download my statements as PDF?',
      a: 'Yes, you can access and download your account statements anytime.',
    },
    {
      q: 'How do I reset my password?',
      a: 'Click "Forgot Password" on the login screen to receive reset instructions.',
    },
    {
      q: 'Do I need to maintain a minimum balance?',
      a: 'Our savings accounts offer zero minimum balance facility.',
    },
    {
      q: 'How do I contact support?',
      a: 'You can contact us 24/7 via live chat, email, or the toll-free helpline.',
    },
    {
      q: 'Are there any hidden fees?',
      a: 'No hidden charges. All applicable fees are transparently listed before final submission.',
    },
  ];

  return (
    <>
      <AppNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="inline-block bg-yellow-500 text-black px-4 py-1 text-sm font-semibold rounded-full">
              ⭐ India’s Most Trusted Digital Bank
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Vault<span className="text-blue-400">X</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Experience the future of banking with instant transactions, AI-powered security, and seamless digital experiences.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/login">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow">
                System Login
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded shadow">
                Customer Login
              </button>
            </Link>
          </div>
          <div className="mt-6">
            <Link to="/register">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-8 rounded shadow">
                Open New Account
              </button>
            </Link>
          </div>
          <div className="flex justify-center mt-10 gap-10 text-yellow-400 font-semibold text-sm">
            <div>
              <p className="text-2xl font-bold">10M+</p>
              <p>Happy Customers</p>
            </div>
            <div>
              <p className="text-2xl font-bold">₹500Cr+</p>
              <p>Daily Transactions</p>
            </div>
            <div>
              <p className="text-2xl font-bold">99.9%</p>
              <p>Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Products Section */}
      <Container className="py-5">
        <h2 className="text-center mb-4">Loan Products</h2>
        <Row>
          {loanProducts.map((loan, idx) => (
            <Col md={6} lg={3} key={idx} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card>
                  <Card.Img
                    variant="top"
                    src={loan.img}
                    height="160"
                    style={{ objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{loan.title}</Card.Title>
                    <Card.Text>{loan.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Features Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <h2 className="text-center mb-4">Our Features</h2>
          <Row className="text-center">
            {services.map((service, idx) => (
              <Col key={idx} md={3} className="mb-4 flex flex-col items-center">
                <div className="bg-white text-primary rounded-full p-3 mb-2 shadow">
                  {service.icon}
                </div>
                <h5 className="mt-2">{service.label}</h5>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Banking Services */}
      <div className="bg-light py-5 border-top">
        <Container>
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Our Banking Services</h2>
          </motion.div>
          <Row className="g-4 text-center">
            {[
              { icon: '🏦', title: 'Savings Account', desc: 'High interest rates and zero balance benefits.' },
              { icon: '💼', title: 'Current Account', desc: 'Business-friendly features and tools.' },
              { icon: '📲', title: 'Fund Transfers', desc: 'Instant IMPS, NEFT, and UPI transactions.' },
              { icon: '📑', title: 'PDF Statements', desc: 'Download statements anytime with one click.' },
            ].map((service, idx) => (
              <Col md={3} key={idx}>
                <motion.div
                  className="p-4 border rounded bg-white shadow-sm h-100"
                  whileHover={{ scale: 1.05 }}
                >
                  <div style={{ fontSize: '2.5rem' }}>{service.icon}</div>
                  <h5 className="mt-3">{service.title}</h5>
                  <p className="text-muted">{service.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* FAQ Section */}
      <section className="bg-white py-5 border-top">
        <Container>
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <Accordion defaultActiveKey="0">
            {faqs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Accordion.Item eventKey={index.toString()}>
                  <Accordion.Header>{item.q}</Accordion.Header>
                  <Accordion.Body>{item.a}</Accordion.Body>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;

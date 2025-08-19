import React from 'react';
import { Link } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer';

import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaWhatsapp, 
  FaTwitter, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaInstagram,
  FaHeadset,
  FaMobileAlt,
  FaGlobe,
  FaUsers,
  FaCreditCard,
  FaHome,
  FaBuilding
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const contactMethods = [
    {
      icon: <FaPhone size={40} />,
      title: 'Customer Care Helpline',
      info: '1800-123-VAULT (82858)',
      subInfo: 'Toll-free across India',
      color: 'bg-blue-500',
      availability: '24/7 Available'
    },
    {
      icon: <FaWhatsapp size={40} />,
      title: 'WhatsApp Support',
      info: '+91 98765 43210',
      subInfo: 'Quick assistance via chat',
      color: 'bg-green-500',
      availability: '6 AM - 12 AM'
    },
    {
      icon: <FaEnvelope size={40} />,
      title: 'Email Support',
      info: 'support@vaultx.com',
      subInfo: 'General inquiries & support',
      color: 'bg-purple-500',
      availability: '24-48 hours response'
    },
    {
      icon: <FaHeadset size={40} />,
      title: 'Live Chat',
      info: 'Available on Website & App',
      subInfo: 'Instant support',
      color: 'bg-orange-500',
      availability: '24/7 Available'
    }
  ];

  const departments = [
    {
      icon: <FaUsers size={30} />,
      department: 'New Account Opening',
      email: 'newaccounts@vaultx.com',
      phone: '1800-123-8001',
      description: 'Help with opening savings, current & loan accounts'
    },
    {
      icon: <FaCreditCard size={30} />,
      department: 'Credit Cards & Loans',
      email: 'loans@vaultx.com',
      phone: '1800-123-8002',
      description: 'Credit card applications, loan inquiries & EMI support'
    },
    {
      icon: <FaGlobe size={30} />,
      department: 'Internet Banking',
      email: 'netbanking@vaultx.com',
      phone: '1800-123-8003',
      description: 'Online banking issues, password reset & technical support'
    },
    {
      icon: <FaMobileAlt size={30} />,
      department: 'Mobile Banking',
      email: 'mobileapp@vaultx.com',
      phone: '1800-123-8004',
      description: 'Mobile app support, UPI issues & digital services'
    }
  ];

  const offices = [
    {
      type: 'Head Office',
      icon: <FaBuilding size={30} />,
      address: 'VaultX Tower, Bandra Kurla Complex, Mumbai - 400051, Maharashtra',
      phone: '+91 22 6789 0000',
      email: 'headoffice@vaultx.com',
      timings: 'Mon-Fri: 9:00 AM - 6:00 PM'
    },
    {
      type: 'Regional Office - Delhi',
      icon: <FaHome size={30} />,
      address: 'Connaught Place, New Delhi - 110001, Delhi',
      phone: '+91 11 4567 8900',
      email: 'delhi@vaultx.com',
      timings: 'Mon-Fri: 9:30 AM - 5:30 PM'
    },
    {
      type: 'Regional Office - Bangalore',
      icon: <FaHome size={30} />,
      address: 'MG Road, Bangalore - 560001, Karnataka',
      phone: '+91 80 2345 6789',
      email: 'bangalore@vaultx.com',
      timings: 'Mon-Fri: 9:30 AM - 5:30 PM'
    },
    {
      type: 'Regional Office - Chennai',
      icon: <FaHome size={30} />,
      address: 'Anna Salai, Chennai - 600002, Tamil Nadu',
      phone: '+91 44 3456 7890',
      email: 'chennai@vaultx.com',
      timings: 'Mon-Fri: 9:30 AM - 5:30 PM'
    }
  ];

  const socialLinks = [
    { icon: <FaFacebookF size={20} />, name: 'Facebook', handle: '@VaultXBank', color: 'bg-blue-600' },
    { icon: <FaTwitter size={20} />, name: 'Twitter', handle: '@VaultX_Bank', color: 'bg-blue-400' },
    { icon: <FaLinkedinIn size={20} />, name: 'LinkedIn', handle: '@VaultX-Bank', color: 'bg-blue-700' },
    { icon: <FaInstagram size={20} />, name: 'Instagram', handle: '@vaultx_official', color: 'bg-pink-500' }
  ];

  const quickInfo = [
    { label: 'IFSC Code', value: 'VLTX0000001' },
    { label: 'Swift Code', value: 'VLTXINBB' },
    { label: 'Bank Code', value: '0789' },
    { label: 'MICR Code', value: '400211789' }
  ];

  return (
    <>
      <AppNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contact Vault<span className="text-blue-400">X</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              We're here to help you with all your banking needs. Reach out to us through any of these convenient channels.
            </p>
            <div className="inline-block bg-yellow-500 text-black px-6 py-2 text-lg font-semibold rounded-full">
              🌟 24/7 Customer Support Available
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <Container className="py-5">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Get In Touch</h2>
          <p className="text-muted">Choose the most convenient way to reach us</p>
        </motion.div>
        <Row>
          {contactMethods.map((method, idx) => (
            <Col md={6} lg={3} key={idx} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-100 text-center border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className={`${method.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
                         style={{ width: '70px', height: '70px' }}>
                      {method.icon}
                    </div>
                    <h5 className="mb-2">{method.title}</h5>
                    <p className="text-primary font-weight-bold mb-1">{method.info}</p>
                    <p className="text-muted small mb-2">{method.subInfo}</p>
                    <span className="badge bg-success">{method.availability}</span>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Department Contacts */}
      <section className="bg-light py-5">
        <Container>
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Department-wise Contact</h2>
            <p className="text-muted">Reach out to the right department for faster assistance</p>
          </motion.div>
          <Row>
            {departments.map((dept, idx) => (
              <Col md={6} key={idx} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                             style={{ width: '50px', height: '50px', minWidth: '50px' }}>
                          {dept.icon}
                        </div>
                        <div>
                          <h5 className="mb-1">{dept.department}</h5>
                          <p className="text-muted small mb-2">{dept.description}</p>
                        </div>
                      </div>
                      <div className="ms-5">
                        <p className="mb-1">
                          <FaPhone className="text-primary me-2" />
                          <span className="font-weight-bold">{dept.phone}</span>
                        </p>
                        <p className="mb-0">
                          <FaEnvelope className="text-primary me-2" />
                          <span className="text-primary">{dept.email}</span>
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Office Locations */}
      <Container className="py-5">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Office Locations</h2>
          <p className="text-muted">Visit us at our offices across India</p>
        </motion.div>
        <Row>
          {offices.map((office, idx) => (
            <Col md={6} lg={6} key={idx} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                           style={{ width: '50px', height: '50px' }}>
                        {office.icon}
                      </div>
                      <h5 className="mb-0">{office.type}</h5>
                    </div>
                    <div className="mb-3">
                      <p className="mb-2">
                        <FaMapMarkerAlt className="text-danger me-2" />
                        <span>{office.address}</span>
                      </p>
                      <p className="mb-2">
                        <FaPhone className="text-success me-2" />
                        <span className="font-weight-bold">{office.phone}</span>
                      </p>
                      <p className="mb-2">
                        <FaEnvelope className="text-primary me-2" />
                        <span className="text-primary">{office.email}</span>
                      </p>
                      <p className="mb-0">
                        <FaClock className="text-warning me-2" />
                        <span>{office.timings}</span>
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Quick Banking Info */}
      <section className="bg-primary text-white py-5">
        <Container>
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Quick Banking Information</h2>
            <p className="text-white-50">Important codes for your banking transactions</p>
          </motion.div>
          <Row className="text-center">
            {quickInfo.map((info, idx) => (
              <Col md={6} lg={3} key={idx} className="mb-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="bg-white bg-opacity-10 rounded p-3">
                    <h6 className="text-yellow-400 mb-1">{info.label}</h6>
                    <p className="h5 mb-0 font-weight-bold">{info.value}</p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Social Media & Emergency */}
      <Container className="py-5">
        <Row>
          <Col lg={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="mb-4">Follow Us On Social Media</h3>
              <p className="text-muted mb-4">Stay updated with our latest offers and banking updates</p>
              <Row>
                {socialLinks.map((social, idx) => (
                  <Col sm={6} key={idx} className="mb-3">
                    <div className="d-flex align-items-center p-3 border rounded">
                      <div className={`${social.color} text-white rounded-circle d-flex align-items-center justify-content-center me-3`}
                           style={{ width: '40px', height: '40px' }}>
                        {social.icon}
                      </div>
                      <div>
                        <h6 className="mb-0">{social.name}</h6>
                        <small className="text-muted">{social.handle}</small>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          </Col>
          <Col lg={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="mb-4">Emergency Services</h3>
              <div className="bg-danger-subtle border border-danger rounded p-4 mb-3">
                <h5 className="text-danger mb-2">🚨 Report Lost/Stolen Cards</h5>
                <p className="mb-2"><strong>Hotline:</strong> 1800-LOST-CARD (1800-5678-2273)</p>
                <p className="mb-0 small">Available 24/7 for immediate card blocking</p>
              </div>
              <div className="bg-warning-subtle border border-warning rounded p-4 mb-3">
                <h5 className="text-warning mb-2">⚠️ Fraud Reporting</h5>
                <p className="mb-2"><strong>Fraud Helpline:</strong> 1800-FRAUD-HELP (1800-3728-3435)</p>
                <p className="mb-0 small">Report suspicious transactions immediately</p>
              </div>
              <div className="bg-info-subtle border border-info rounded p-4">
                <h5 className="text-info mb-2">ℹ️ Technical Support</h5>
                <p className="mb-2"><strong>Tech Support:</strong> 1800-TECH-HELP (1800-8324-4357)</p>
                <p className="mb-0 small">App issues, login problems, password reset</p>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-gray-800 to-blue-900 text-white py-5">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4">Need Immediate Assistance?</h2>
            <p className="text-xl mb-4">
              Our customer support team is always ready to help you with your banking needs.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a href="tel:1800123VAULT" className="btn btn-success btn-lg px-4 py-2">
                📞 Call Now: 1800-123-VAULT
              </a>
              <Link to="/login">
                <button className="btn btn-outline-light btn-lg px-4 py-2">
                  Login to Account
                </button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default ContactPage;
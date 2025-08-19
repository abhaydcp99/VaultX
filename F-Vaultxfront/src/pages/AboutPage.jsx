import React from 'react';
import { Link } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer';

import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaShieldAlt, FaRocket, FaUsers, FaGlobe, FaAward, FaChartLine, FaHeart, FaLightbulb, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import TeamP1 from './../assets/dhanashri.jpg'
import TeamP2 from './../assets/paras.jpg'
import TeamP3 from './../assets/abhay.jpg'
import TeamP4 from './../assets/ashutosh.jpg'
import TeamP5 from './../assets/chaitanya.jpg'


const AboutPage = () => {
  const milestones = [
    { year: '2015', event: 'VaultX founded with a vision to revolutionize banking' },
    { year: '2017', event: 'Launched first AI-powered fraud detection system' },
    { year: '2019', event: 'Reached 1 million customers milestone' },
    { year: '2021', event: 'Introduced zero-balance savings accounts' },
    { year: '2023', event: 'Achieved 10 million+ happy customers' },
    { year: '2024', event: 'Launched advanced mobile banking platform' },
  ];

  const leadership = [
    {
      name: 'Dhanashri Dagade',
      position: 'CEO & Founder',
      experience: '20+ years in fintech',
      description: 'Visionary leader who transformed traditional banking with digital innovation.',
      image: TeamP1,
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Paras Kuranjekar',
      position: 'CTO',
      experience: '15+ years in technology',
      description: 'Tech expert driving our AI-powered security and seamless user experience.',
      image: TeamP2,
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Abhay Chavan',
      position: 'Head of Operations',
      experience: '18+ years in banking',
      description: 'Operations specialist ensuring 99.9% uptime and smooth transactions.',
      image: TeamP3,
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Ashutosh Upadhyay',
      position: 'Head of Customer Experience',
      experience: '12+ years in customer service',
      description: 'Customer advocate focused on delivering exceptional banking experiences.',
      image: TeamP4,
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Chaitanya Shyamkuwar',
      position: 'Head of Strategic Partnerships',
      experience: '12+ years in business development',
      description: 'Partnership strategist building ecosystem collaborations for enhanced services.',
      image: TeamP5,
      linkedin: '#',
      twitter: '#'
    },
  ];

  const values = [
    {
      icon: <FaShieldAlt size={40} />,
      title: 'Security First',
      description: 'Military-grade encryption and AI-driven fraud detection protect every transaction.',
    },
    {
      icon: <FaRocket size={40} />,
      title: 'Innovation',
      description: 'Constantly evolving with cutting-edge technology to serve you better.',
    },
    {
      icon: <FaUsers size={40} />,
      title: 'Customer Centric',
      description: '24/7 support and personalized banking solutions for every need.',
    },
    {
      icon: <FaHeart size={40} />,
      title: 'Trust & Transparency',
      description: 'No hidden fees, clear processes, and honest communication always.',
    },
  ];

  const achievements = [
    { icon: <FaAward size={30} />, title: 'Best Digital Bank 2024', org: 'Banking Excellence Awards' },
    { icon: <FaGlobe size={30} />, title: 'Most Trusted Fintech', org: 'Tech Innovation Summit' },
    { icon: <FaChartLine size={30} />, title: 'Fastest Growing Bank', org: 'Financial Times India' },
    { icon: <FaLightbulb size={30} />, title: 'Innovation in Banking', org: 'Digital Finance Awards' },
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
              About Vault<span className="text-blue-400">X</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Pioneering the future of digital banking with innovation, security, and customer-first approach since 2015.
            </p>
            <div className="inline-block bg-yellow-500 text-black px-6 py-2 text-lg font-semibold rounded-full">
              🏆 India's Most Trusted Digital Bank
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4">Our Mission</h2>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                To democratize banking by making financial services accessible, secure, and seamless for everyone. 
                We believe that banking should be simple, transparent, and available at your fingertips 24/7.
              </p>
              <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                Through cutting-edge technology and human-centered design, we're building a banking ecosystem 
                that empowers individuals and businesses to achieve their financial goals.
              </p>
            </motion.div>
          </Col>
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4">Our Vision</h2>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                To become India's leading digital banking platform that transforms how people interact with their money. 
                We envision a future where banking is invisible, intelligent, and instantly responsive to your needs.
              </p>
              <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                By 2030, we aim to serve 50 million customers with innovative financial solutions powered by 
                artificial intelligence and blockchain technology.
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Values Section */}
      <section className="bg-light py-5">
        <Container>
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Our Core Values</h2>
            <p className="text-muted">The principles that guide everything we do</p>
          </motion.div>
          <Row>
            {values.map((value, idx) => (
              <Col md={6} lg={3} key={idx} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="h-100 text-center border-0 shadow-sm">
                    <Card.Body className="p-4">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{ width: '70px', height: '70px' }}>
                        {value.icon}
                      </div>
                      <h5 className="mb-3">{value.title}</h5>
                      <p className="text-muted">{value.description}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Journey Timeline */}
      <Container className="py-5">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Journey</h2>
          <p className="text-muted">Milestones in our digital banking evolution</p>
        </motion.div>
        <Row>
          {milestones.map((milestone, idx) => (
            <Col md={6} lg={4} key={idx} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="h-100 border-left-primary">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      <span className="bg-primary text-white px-3 py-1 rounded text-sm font-weight-bold">
                        {milestone.year}
                      </span>
                    </div>
                    <p className="text-muted mb-0">{milestone.event}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Enhanced Leadership Section with Images */}
      <section className="bg-light py-5">
        <Container>
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="display-4 fw-bold mb-3">Meet Our Leadership</h2>
            <p className="text-muted fs-5 mb-4">The visionaries driving VaultX forward</p>
            <div className="w-25 mx-auto bg-primary" style={{ height: '3px' }}></div>
          </motion.div>
          <Row className="justify-content-center">
            {leadership.map((leader, idx) => (
              <Col md={6} lg={4} xl={3} key={idx} className="mb-5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <Card className="h-100 border-0 shadow-lg leadership-card">
                    <div className="position-relative">
                      <Card.Img 
                        variant="top" 
                        src={leader.image}
                        alt={leader.name}
                        style={{ 
                          height: '280px', 
                          objectFit: 'cover',
                          filter: 'grayscale(20%)'
                        }}
                        className="leadership-image"
                      />
                      <div className="position-absolute bottom-0 start-0 w-100 bg-gradient-overlay p-3">
                        <div className="d-flex justify-content-center gap-3">
                          <a 
                            href={leader.linkedin} 
                            className="text-white social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin size={20} />
                          </a>
                          <a 
                            href={leader.twitter} 
                            className="text-white social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaTwitter size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <Card.Body className="text-center p-4">
                      <h5 className="fw-bold mb-1">{leader.name}</h5>
                      <p className="text-primary fw-semibold mb-2 fs-6">{leader.position}</p>
                      <div className="bg-light rounded p-2 mb-3">
                        <small className="text-muted fw-semibold">
                          <i className="fas fa-briefcase me-1"></i>
                          {leader.experience}
                        </small>
                      </div>
                      <p className="text-muted small mb-0 lh-base">{leader.description}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Awards & Recognition */}
      <Container className="py-5">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Awards & Recognition</h2>
          <p className="text-muted">Celebrating our achievements and industry recognition</p>
        </motion.div>
        <Row>
          {achievements.map((award, idx) => (
            <Col md={6} lg={3} key={idx} className="mb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-100 text-center border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-yellow-100">
                  <Card.Body className="p-4">
                    <div className="text-warning mb-3">
                      {award.icon}
                    </div>
                    <h6 className="mb-2 font-weight-bold">{award.title}</h6>
                    <p className="text-muted small mb-0">{award.org}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Stats Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-weight-bold text-yellow-400">10M+</h2>
                <p className="mb-0">Happy Customers</p>
              </motion.div>
            </Col>
            <Col md={3} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h2 className="font-weight-bold text-yellow-400">₹500Cr+</h2>
                <p className="mb-0">Daily Transactions</p>
              </motion.div>
            </Col>
            <Col md={3} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h2 className="font-weight-bold text-yellow-400">99.9%</h2>
                <p className="mb-0">Uptime Guarantee</p>
              </motion.div>
            </Col>
            <Col md={3} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h2 className="font-weight-bold text-yellow-400">24/7</h2>
                <p className="mb-0">Customer Support</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-gray-800 to-blue-900 text-white py-5">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4">Ready to Experience VaultX?</h2>
            <p className="text-xl mb-4">
              Join millions of satisfied customers and discover the future of banking today.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/register">
                <button className="btn btn-success btn-lg px-4 py-2">
                  Open Account Now
                </button>
              </Link>
              <Link to="/login">
                <button className="btn btn-outline-light btn-lg px-4 py-2">
                  Customer Login
                </button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />

      {/* Custom Styles */}
      <style>{`
        .leadership-card {
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .leadership-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        
        .leadership-image {
          transition: all 0.3s ease;
        }
        
        .leadership-card:hover .leadership-image {
          transform: scale(1.05);
          filter: grayscale(0%);
        }
        
        .bg-gradient-overlay {
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.7) 0%,
            rgba(0,0,0,0.3) 50%,
            transparent 100%
          );
        }
        
        .social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .social-link:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-2px);
          color: white;
        }
        
        .border-left-primary {
          border-left: 4px solid #0d6efd !important;
        }
        
        @media (max-width: 768px) {
          .leadership-card {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default AboutPage;
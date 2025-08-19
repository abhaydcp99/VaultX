// import React from 'react';
// import { Row, Col } from 'react-bootstrap';
// import { Outlet } from 'react-router-dom';
// import ManagerNavbar from '../components/Navbar/ManagerNavbar';
// import ManagerSidebar from '../components/sidebars/ManagerSidebar';

// const ManagerLayout = () => {
//   return (
//     <>
//       <ManagerNavbar />
//       <Row className="g-0">
//         <Col md={2}><ManagerSidebar /></Col>
//         <Col md={10} className="p-4">
//           <Outlet />
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default ManagerLayout;

// src/layouts/ManagerLayout.jsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ManagerNavbar from '../components/Navbar/ManagerNavbar';
import ManagerSidebar from '../components/sidebars/ManagerSidebar';

const ManagerLayout = ({ children }) => {
  return (
    <>
      <ManagerNavbar />
      <Row className="g-0">
        <Col md={2}>
          <ManagerSidebar />
        </Col>
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </>
  );
};

export default ManagerLayout;

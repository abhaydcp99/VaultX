// // src/components/Sidebar/ManagerSidebar.jsx
// import { Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const ManagerSidebar = () => (
//   <Nav className="flex-column bg-light p-3" style={{ height: '100vh', width: '250px' }}>
//     <Nav.Link as={Link} to="/manager">Dashboard</Nav.Link>
//     <Nav.Link as={Link} to="/manager/review-kycs">Pending KYC Reviews</Nav.Link>
//     <Nav.Link as={Link} to="/manager/approved-kycs">Approved KYCs</Nav.Link>
//     <Nav.Link as={Link} to="/manager/rejected-kycs">Rejected KYCs</Nav.Link>
//     <Nav.Link as={Link} to="/manager/review/:applicationId">Rejected KYCPage</Nav.Link>
    

//   </Nav>
// );

// export default ManagerSidebar;

import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaEye, FaCrown
} from 'react-icons/fa';

const ManagerSidebar = () => {
  const linkClasses = "flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl hover:bg-white/10 transition-all duration-200 text-xs lg:text-sm font-medium group relative overflow-hidden text-blue-200";
  const activeLinkClasses = "bg-white/15 shadow-lg backdrop-blur-sm border-l-4 border-yellow-400 text-yellow-300";

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white flex flex-col shadow-2xl sticky top-0 relative overflow-hidden hidden lg:flex">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2 lg:gap-3 mb-2">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
            <FaCrown className="text-blue-900 text-sm lg:text-lg" />
          </div>
          <div>
            <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              VaultX
            </div>
            <div className="text-xs text-blue-200 font-medium">Manager Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 lg:px-4 py-4 lg:py-6 space-y-1 lg:space-y-2 relative z-10">
        <NavLink to="/manager" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <FaTachometerAlt className="text-xs lg:text-sm" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/manager/review-kycs" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <FaHourglassHalf className="text-xs lg:text-sm" />
          <span>Pending Reviews</span>
        </NavLink>

        <NavLink to="/manager/approved-kycs" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <FaCheckCircle className="text-xs lg:text-sm" />
          <span>Approved KYCs</span>
        </NavLink>

        <NavLink to="/manager/rejected-kycs" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <FaTimesCircle className="text-xs lg:text-sm" />
          <span>Rejected KYCs</span>
        </NavLink>

        <NavLink to="/manager/review-kyc/:id" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <FaEye className="text-xs lg:text-sm" />
          <span>Review Application</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default ManagerSidebar;

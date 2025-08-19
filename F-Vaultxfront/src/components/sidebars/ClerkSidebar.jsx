// import { Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const ClerkSidebar = () => (
//   <Nav className="flex-column bg-light p-3" style={{ height: '100vh', width: '250px' }}>
//     <Nav.Link as={Link} to="/clerk">Dashboard</Nav.Link>
//     <Nav.Link as={Link} to="/clerk/pending-kycs">Pending KYCs</Nav.Link>
//     <Nav.Link as={Link} to="/clerk/clerkvideo-kycs">VideoKYCs</Nav.Link> 
//     <Nav.Link as={Link} to="/clerk/verify/:applicationId">video</Nav.Link>
    
//   </Nav>
// );

// export default ClerkSidebar;

import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaClock, FaVideo } from 'react-icons/fa';

const ClerkSidebar = () => {
  const linkClasses = "flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl hover:bg-white/10 transition-all duration-200 text-xs lg:text-sm font-medium group relative overflow-hidden text-blue-200";
  const activeLinkClasses = "bg-white/15 shadow-lg backdrop-blur-sm border-l-4 border-yellow-400 text-yellow-300";

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white flex flex-col shadow-2xl sticky top-0 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="p-6 border-b border-white/10 relative z-10">
        <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent text-center">
          VaultX Clerk
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 relative z-10">
        <NavLink to="/clerk" end className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-lg bg-blue-700/50 flex items-center justify-center group-hover:bg-blue-600/50 transition-colors">
              <FaTachometerAlt className="text-sm" />
            </div>
            <span className="truncate">Dashboard</span>
          </div>
        </NavLink>

        <NavLink to="/clerk/pending-kycs" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-lg bg-blue-700/50 flex items-center justify-center group-hover:bg-blue-600/50 transition-colors">
              <FaClock className="text-sm" />
            </div>
            <span className="truncate">Pending KYCs</span>
          </div>
        </NavLink>

        <NavLink to="/clerk/kyc/:id" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-lg bg-blue-700/50 flex items-center justify-center group-hover:bg-blue-600/50 transition-colors">
              <FaVideo className="text-sm" />
            </div>
            <span className="truncate">Video KYCs</span>
          </div>
        </NavLink>

        <NavLink to="/clerk/verify/:applicationId" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-lg bg-blue-700/50 flex items-center justify-center group-hover:bg-blue-600/50 transition-colors">
              <FaVideo className="text-sm" />
            </div>
            <span className="truncate">Verify Video</span>
          </div>
        </NavLink>
      </nav>
    </div>
  );
};

export default ClerkSidebar;

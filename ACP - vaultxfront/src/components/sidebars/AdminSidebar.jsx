// // src/components/Sidebar/AdminSidebar.jsx
// import { Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const AdminSidebar = () => (
//   <Nav className="flex-column bg-light p-3" style={{ height: '100vh', width: '250px' }}>
//     <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
//     <Nav.Link as={Link} to="/admin/add-clerk">Add Clerk</Nav.Link>
//     <Nav.Link as={Link} to="/admin/view-clerks">View Clerks</Nav.Link>
//     <Nav.Link as={Link} to="/admin/add-manager">Add Manager</Nav.Link>
//     <Nav.Link as={Link} to="/admin/view-managers">View Managers</Nav.Link>
//     <Nav.Link as={Link} to="/admin/view-customers">View Customers</Nav.Link>
//     <Nav.Link as={Link} to="/admin/audit-logs">Audit Logs</Nav.Link>
//   </Nav>
// );

// export default AdminSidebar;
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaUserTie, FaSignOutAlt, FaList, FaCrown } from 'react-icons/fa';

const AdminSidebar = () => {
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
            <div className="text-xs text-blue-200 font-medium">Admin Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 lg:px-4 py-4 lg:py-6 space-y-1 lg:space-y-2 relative z-10">
        <NavLink 
          to="/admin" 
          end
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-blue-700/50 flex items-center justify-center group-hover:bg-blue-600/50 transition-colors">
              <FaTachometerAlt className="text-xs lg:text-sm" />
            </div>
            <span className="truncate">Dashboard</span>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-yellow-400 group-hover:h-full transition-all duration-200 rounded-l"></div>
        </NavLink>

        <NavLink 
          to="/admin/users" 
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-blue-700/50 flex items-center justify-center group-hover:bg-blue-600/50 transition-colors">
              <FaUserTie className="text-xs lg:text-sm" />
            </div>
            <span className="truncate">Employee Management</span>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-yellow-400 group-hover:h-full transition-all duration-200 rounded-l"></div>
        </NavLink>

        <NavLink 
          to="/admin/view-customers" 
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-blue-700/50 flex items-center justify-center group-hover:bg-blue-600/50 transition-colors">
              <FaUsers className="text-xs lg:text-sm" />
            </div>
            <span className="truncate">View Customers</span>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-yellow-400 group-hover:h-full transition-all duration-200 rounded-l"></div>
        </NavLink>

         <NavLink 
          to="/admin/status-page" 
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-blue-700/50 flex items-center justify-center group-hover:bg-blue-600/50 transition-colors">
              <FaUsers className="text-xs lg:text-sm" />
            </div>
            <span className="truncate">Active Accounts</span>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-yellow-400 group-hover:h-full transition-all duration-200 rounded-l"></div>
        </NavLink>


        <NavLink 
          to="/admin/audit-logs" 
          className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-blue-700/50 flex items-center justify-center group-hover:bg-blue-600/50 transition-colors">
              <FaList className="text-xs lg:text-sm" />
            </div>
            <span className="truncate">Audit Logs</span>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-yellow-400 group-hover:h-full transition-all duration-200 rounded-l"></div>
        </NavLink>
      </nav>

      {/* Footer/Logout Section */}
      <div className="p-3 lg:p-4 border-t border-white/10 relative z-10">
        <NavLink 
          to="/logout" 
          className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 text-xs lg:text-sm font-medium shadow-lg group text-red-100"
        >
          <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-red-800/30 flex items-center justify-center">
            <FaSignOutAlt className="text-xs lg:text-sm group-hover:scale-110 transition-transform" />
          </div>
          <span>Sign Out</span>
        </NavLink>
        
        {/* Admin Badge */}
        <div className="mt-3 lg:mt-4 p-2 lg:p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <div className="flex items-center gap-1 lg:gap-2">
            <FaCrown className="text-yellow-400 text-xs lg:text-sm" />
            <span className="text-xs font-medium text-yellow-200">Administrator Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
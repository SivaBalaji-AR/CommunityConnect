import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
      const [isAuthenticated,setIsAuthenticated]=useState(false);

   useEffect(() => {
           setIsAuthenticated(localStorage.getItem('isAuthenticated'));
  },);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.reload(); // Refresh the page to reflect the changes
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Community Platform</Link>
      <div>
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <span className="font-semibold">user</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-white bg-blue-500 px-4 py-2 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

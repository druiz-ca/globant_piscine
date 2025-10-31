import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiHome, FiPlus, FiUser, FiSun, FiMoon, FiLogOut, FiSettings } from 'react-icons/fi';
import { logout } from '../store/slices/authSlice';
import { toggleDarkMode } from '../store/slices/uiSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.ui);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-apple-gray-200 dark:border-apple-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-apple-blue to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SD</span>
            </div>
            <span className="text-xl font-semibold text-apple-gray-900 dark:text-white hidden sm:block">
              ServiceDeskAI
            </span>
          </Link>

          {/* Center Nav Items */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-apple-gray-700 dark:text-apple-gray-300 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 transition-colors"
            >
              <FiHome size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/tickets/new"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-apple-blue text-white hover:bg-blue-600 transition-colors"
            >
              <FiPlus size={18} />
              <span>New Ticket</span>
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-apple-gray-700 dark:text-apple-gray-300 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 transition-colors"
              >
                <FiSettings size={18} />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={handleToggleDarkMode}
              className="p-2 rounded-lg text-apple-gray-700 dark:text-apple-gray-300 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 transition-colors"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-apple-blue to-blue-600 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-apple-gray-900 dark:text-white font-medium">
                  {user?.name}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-apple-gray-800 rounded-xl shadow-apple-lg border border-apple-gray-200 dark:border-apple-gray-700">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-apple-gray-700 dark:text-apple-gray-300 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-700"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <FiUser size={16} />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-700"
                  >
                    <FiLogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-apple-gray-800 border-t border-apple-gray-200 dark:border-apple-gray-700 px-4 py-2">
        <div className="flex justify-around items-center">
          <Link
            to="/dashboard"
            className="flex flex-col items-center space-y-1 text-apple-gray-700 dark:text-apple-gray-300"
          >
            <FiHome size={24} />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/tickets/new"
            className="flex flex-col items-center space-y-1 text-apple-blue"
          >
            <div className="w-12 h-12 bg-apple-blue rounded-full flex items-center justify-center -mt-6 shadow-apple">
              <FiPlus size={24} color="white" />
            </div>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center space-y-1 text-apple-gray-700 dark:text-apple-gray-300"
          >
            <FiUser size={24} />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

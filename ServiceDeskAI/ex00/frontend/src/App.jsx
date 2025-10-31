import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTicket from './pages/CreateTicket';
import TicketDetail from './pages/TicketDetail';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';

// Components
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Services
import socketService from './services/socketService';

function App() {
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.ui);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Connect to socket if user is authenticated
    if (user) {
      socketService.connect();

      return () => {
        socketService.disconnect();
      };
    }
  }, [user]);

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('✅ Service Worker registered'))
        .catch((err) => console.log('❌ Service Worker registration failed:', err));
    }
  }, []);

  return (
    <div className="min-h-screen bg-apple-gray-50 dark:bg-apple-gray-900 transition-colors duration-200">
      <Router>
        {user && <Navbar />}
        <div className={user ? 'pt-16' : ''}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

            {/* Private routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/tickets/new"
              element={
                <PrivateRoute>
                  <CreateTicket />
                </PrivateRoute>
              }
            />
            <Route
              path="/tickets/:id"
              element={
                <PrivateRoute>
                  <TicketDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute roles={['admin']}>
                  <AdminPanel />
                </PrivateRoute>
              }
            />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
            <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
          </Routes>
        </div>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />
    </div>
  );
}

export default App;

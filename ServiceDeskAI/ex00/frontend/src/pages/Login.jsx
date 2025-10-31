import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-apple-blue to-blue-600">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-apple-lg mb-4">
            <span className="text-3xl font-bold text-apple-blue">SD</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-blue-100">Sign in to ServiceDeskAI</p>
        </div>

        <div className="card-apple">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-apple-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-apple pl-10"
                  placeholder="you@example.com"
                  required
                  aria-label="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-apple-gray-700 dark:text-apple-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-apple-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-apple pl-10"
                  placeholder="••••••••"
                  required
                  aria-label="Password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-apple btn-primary flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="spinner border-white"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-apple-gray-600 dark:text-apple-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-apple-blue font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-apple-gray-600 dark:text-apple-gray-400 text-center">
              <strong>Demo:</strong> admin@globant.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiUser, FiPhone, FiArrowRight } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
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
    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-apple-lg mb-4">
            <span className="text-3xl font-bold text-purple-600">SD</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Get Started</h2>
          <p className="text-blue-100">Create your ServiceDeskAI account</p>
        </div>

        <div className="card-apple">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-apple-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-apple pl-10"
                  required
                  aria-label="Full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-apple-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-apple pl-10"
                  required
                  aria-label="Email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="text-apple-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-apple pl-10"
                  aria-label="Phone"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-apple-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-apple pl-10"
                  required
                  minLength="6"
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
                  <span>Create Account</span>
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-apple-blue font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

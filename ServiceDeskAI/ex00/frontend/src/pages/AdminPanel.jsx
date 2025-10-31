import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/slices/userSlice';
import { getOffices } from '../store/slices/officeSlice';
import { getStatistics } from '../store/slices/ticketSlice';
import { FiMapPin, FiPlus, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api`;

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { offices } = useSelector((state) => state.offices);
  const { statistics } = useSelector((state) => state.tickets);
  const { token } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('stats');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showOfficeModal, setShowOfficeModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    phone: ''
  });
  const [newOffice, setNewOffice] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    floors: 1,
    contactEmail: '',
    contactPhone: '',
    longitude: '',
    latitude: ''
  });

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getOffices());
    dispatch(getStatistics());
  }, [dispatch]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/users`, newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('User created successfully!');
      setShowUserModal(false);
      setNewUser({ name: '', email: '', password: '', role: 'user', phone: '' });
      dispatch(getUsers());
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating user');
    }
  };

  const handleCreateOffice = async (e) => {
    e.preventDefault();
    try {
      const officeData = {
        name: newOffice.name,
        address: {
          street: newOffice.street,
          city: newOffice.city,
          state: newOffice.state,
          country: newOffice.country,
          zipCode: newOffice.zipCode
        },
        floors: parseInt(newOffice.floors),
        contactEmail: newOffice.contactEmail,
        contactPhone: newOffice.contactPhone
      };

      // Add location if coordinates are provided
      if (newOffice.longitude && newOffice.latitude) {
        officeData.location = {
          type: 'Point',
          coordinates: [parseFloat(newOffice.longitude), parseFloat(newOffice.latitude)]
        };
      }
      
      await axios.post(`${API_URL}/offices`, officeData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Office created successfully!');
      setShowOfficeModal(false);
      setNewOffice({ name: '', street: '', city: '', state: '', country: '', zipCode: '', floors: 1, contactEmail: '', contactPhone: '', longitude: '', latitude: '' });
      dispatch(getOffices());
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating office');
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-apple-gray-200 dark:border-apple-gray-700">
          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-2 px-4 font-semibold ${
              activeTab === 'stats'
                ? 'border-b-2 border-apple-blue text-apple-blue'
                : 'text-apple-gray-600 dark:text-apple-gray-400'
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-2 px-4 font-semibold ${
              activeTab === 'users'
                ? 'border-b-2 border-apple-blue text-apple-blue'
                : 'text-apple-gray-600 dark:text-apple-gray-400'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('offices')}
            className={`pb-2 px-4 font-semibold ${
              activeTab === 'offices'
                ? 'border-b-2 border-apple-blue text-apple-blue'
                : 'text-apple-gray-600 dark:text-apple-gray-400'
            }`}
          >
            Offices
          </button>
        </div>

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-apple">
              <h3 className="text-lg font-semibold mb-2">Total Tickets</h3>
              <p className="text-4xl font-bold text-apple-blue">{statistics?.total || 0}</p>
            </div>
            <div className="card-apple">
              <h3 className="text-lg font-semibold mb-2">Open Tickets</h3>
              <p className="text-4xl font-bold text-yellow-600">{statistics?.open || 0}</p>
            </div>
            <div className="card-apple">
              <h3 className="text-lg font-semibold mb-2">Total Users</h3>
              <p className="text-4xl font-bold text-green-600">{users?.length || 0}</p>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Users</h2>
              <button 
                onClick={() => setShowUserModal(true)}
                className="btn-apple btn-primary flex items-center space-x-2"
              >
                <FiPlus />
                <span>Add User</span>
              </button>
            </div>

            <div className="card-apple">
              <div className="space-y-4">
                {users?.map((user) => (
                  <div key={user._id} className="flex items-center justify-between p-4 border-b border-apple-gray-200 dark:border-apple-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-apple-blue flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-apple-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <span className="badge badge-open">{user.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Offices Tab */}
        {activeTab === 'offices' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Offices</h2>
              <button 
                onClick={() => setShowOfficeModal(true)}
                className="btn-apple btn-primary flex items-center space-x-2"
              >
                <FiPlus />
                <span>Add Office</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offices?.map((office) => (
                <div key={office._id} className="card-apple">
                  <div className="flex items-start space-x-3">
                    <FiMapPin className="text-apple-blue mt-1" size={20} />
                    <div>
                      <h3 className="font-bold">{office.name}</h3>
                      <p className="text-sm text-apple-gray-600 dark:text-apple-gray-400">
                        {office.address?.city}, {office.address?.country}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Create User */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-apple-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Create New User</h2>
              <button 
                onClick={() => setShowUserModal(false)}
                className="text-apple-gray-500 hover:text-apple-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="input-apple"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="input-apple"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="input-apple"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="input-apple"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="input-apple"
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 btn-apple bg-apple-gray-200 dark:bg-apple-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-apple btn-primary"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Create Office */}
      {showOfficeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-apple-gray-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Create New Office</h2>
              <button 
                onClick={() => setShowOfficeModal(false)}
                className="text-apple-gray-500 hover:text-apple-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateOffice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Office Name</label>
                <input
                  type="text"
                  value={newOffice.name}
                  onChange={(e) => setNewOffice({ ...newOffice, name: e.target.value })}
                  className="input-apple"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Street</label>
                  <input
                    type="text"
                    value={newOffice.street}
                    onChange={(e) => setNewOffice({ ...newOffice, street: e.target.value })}
                    className="input-apple"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    value={newOffice.city}
                    onChange={(e) => setNewOffice({ ...newOffice, city: e.target.value })}
                    className="input-apple"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <input
                    type="text"
                    value={newOffice.state}
                    onChange={(e) => setNewOffice({ ...newOffice, state: e.target.value })}
                    className="input-apple"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <input
                    type="text"
                    value={newOffice.country}
                    onChange={(e) => setNewOffice({ ...newOffice, country: e.target.value })}
                    className="input-apple"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={newOffice.zipCode}
                    onChange={(e) => setNewOffice({ ...newOffice, zipCode: e.target.value })}
                    className="input-apple"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Number of Floors</label>
                <input
                  type="number"
                  value={newOffice.floors}
                  onChange={(e) => setNewOffice({ ...newOffice, floors: e.target.value })}
                  className="input-apple"
                  min="1"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={newOffice.contactEmail}
                    onChange={(e) => setNewOffice({ ...newOffice, contactEmail: e.target.value })}
                    className="input-apple"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={newOffice.contactPhone}
                    onChange={(e) => setNewOffice({ ...newOffice, contactPhone: e.target.value })}
                    className="input-apple"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Longitude (Optional)</label>
                  <input
                    type="number"
                    step="any"
                    value={newOffice.longitude}
                    onChange={(e) => setNewOffice({ ...newOffice, longitude: e.target.value })}
                    className="input-apple"
                    placeholder="e.g., -3.7038"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Latitude (Optional)</label>
                  <input
                    type="number"
                    step="any"
                    value={newOffice.latitude}
                    onChange={(e) => setNewOffice({ ...newOffice, latitude: e.target.value })}
                    className="input-apple"
                    placeholder="e.g., 40.4168"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowOfficeModal(false)}
                  className="flex-1 btn-apple bg-apple-gray-200 dark:bg-apple-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-apple btn-primary"
                >
                  Create Office
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

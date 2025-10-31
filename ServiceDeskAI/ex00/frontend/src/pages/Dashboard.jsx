// Placeholder pages - Full implementation available in complete source
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from '../store/slices/ticketSlice';
import { Link } from 'react-router-dom';
import { FiPlus, FiFilter, FiX } from 'react-icons/fi';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tickets, isLoading } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.auth);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    priority: ''
  });
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  useEffect(() => {
    if (tickets) {
      let result = [...tickets];
      
      if (filters.status) {
        result = result.filter(t => t.status === filters.status);
      }
      if (filters.category) {
        result = result.filter(t => t.category === filters.category);
      }
      if (filters.priority) {
        result = result.filter(t => t.priority === filters.priority);
      }
      
      setFilteredTickets(result);
    }
  }, [tickets, filters]);

  const getStatusBadge = (status) => {
    const badges = {
      open: 'badge-open',
      assigned: 'badge-assigned',
      'in-progress': 'badge-in-progress',
      resolved: 'badge-resolved',
      closed: 'badge-closed',
    };
    return `badge ${badges[status] || 'badge-open'}`;
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-apple-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-apple-gray-600 dark:text-apple-gray-400">
            Welcome back, {user?.name}!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card-apple">
            <p className="text-sm text-apple-gray-600 dark:text-apple-gray-400">Total Tickets</p>
            <p className="text-3xl font-bold text-apple-gray-900 dark:text-white">{tickets?.length || 0}</p>
          </div>
          <div className="card-apple">
            <p className="text-sm text-apple-gray-600 dark:text-apple-gray-400">Open</p>
            <p className="text-3xl font-bold text-blue-600">{tickets?.filter(t => t.status === 'open').length || 0}</p>
          </div>
          <div className="card-apple">
            <p className="text-sm text-apple-gray-600 dark:text-apple-gray-400">In Progress</p>
            <p className="text-3xl font-bold text-yellow-600">{tickets?.filter(t => t.status === 'in-progress').length || 0}</p>
          </div>
          <div className="card-apple">
            <p className="text-sm text-apple-gray-600 dark:text-apple-gray-400">Resolved</p>
            <p className="text-3xl font-bold text-green-600">{tickets?.filter(t => t.status === 'resolved').length || 0}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-apple-gray-900 dark:text-white">My Tickets</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowFilterModal(true)}
              className="btn-apple btn-secondary flex items-center space-x-2"
            >
              <FiFilter size={18} />
              <span>Filter</span>
              {(filters.status || filters.category || filters.priority) && (
                <span className="ml-1 px-2 py-0.5 bg-apple-blue text-white text-xs rounded-full">
                  {[filters.status, filters.category, filters.priority].filter(Boolean).length}
                </span>
              )}
            </button>
            <Link to="/tickets/new" className="btn-apple btn-primary flex items-center space-x-2">
              <FiPlus size={18} />
              <span>New Ticket</span>
            </Link>
          </div>
        </div>

        {/* Tickets List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="spinner"></div>
          </div>
        ) : filteredTickets && filteredTickets.length > 0 ? (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Link
                key={ticket._id}
                to={`/tickets/${ticket._id}`}
                className="card-apple block hover:shadow-apple-lg transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-apple-gray-900 dark:text-white">
                    {ticket.title}
                  </h3>
                  <span className={getStatusBadge(ticket.status)}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-apple-gray-600 dark:text-apple-gray-400 mb-4 line-clamp-2">
                  {ticket.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-apple-gray-500 dark:text-apple-gray-500">
                    {ticket.office?.name}
                  </span>
                  <span className="text-apple-gray-500 dark:text-apple-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card-apple text-center py-12">
            <p className="text-apple-gray-600 dark:text-apple-gray-400 mb-4">
              No tickets found
            </p>
            <Link to="/tickets/new" className="btn-apple btn-primary inline-flex items-center space-x-2">
              <FiPlus size={18} />
              <span>Create Your First Ticket</span>
            </Link>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-apple-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Filter Tickets</h2>
              <button 
                onClick={() => setShowFilterModal(false)}
                className="text-apple-gray-500 hover:text-apple-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="input-apple"
                >
                  <option value="">All</option>
                  <option value="open">Open</option>
                  <option value="assigned">Assigned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="input-apple"
                >
                  <option value="">All</option>
                  <option value="hardware">Hardware</option>
                  <option value="software">Software</option>
                  <option value="facility">Facility</option>
                  <option value="network">Network</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                  className="input-apple"
                >
                  <option value="">All</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setFilters({ status: '', category: '', priority: '' });
                    setShowFilterModal(false);
                  }}
                  className="flex-1 btn-apple bg-apple-gray-200 dark:bg-apple-gray-700"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 btn-apple btn-primary"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

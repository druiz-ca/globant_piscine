import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket } from '../store/slices/ticketSlice';
import { getOffices } from '../store/slices/officeSlice';
import { toast } from 'react-toastify';
import { FiMapPin, FiArrowLeft } from 'react-icons/fi';

const CreateTicket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { offices } = useSelector((state) => state.offices);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    priority: 'medium',
    office: '',
    workstation: '',
  });
  const [files, setFiles] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    dispatch(getOffices());
    // Get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            type: 'Point',
            coordinates: [position.coords.longitude, position.coords.latitude],
          });
        },
        (error) => console.log('Geolocation error:', error)
      );
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketData = { ...formData, media: files, location };
    await dispatch(createTicket(ticketData));
    toast.success('Ticket created successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-apple-blue mb-6">
          <FiArrowLeft />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-bold mb-8">Create New Ticket</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card-apple">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-apple"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-apple"
                  rows="4"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-apple"
                  >
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
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="input-apple"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Office</label>
                <select
                  value={formData.office}
                  onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                  className="input-apple"
                  required
                >
                  <option value="">Select office</option>
                  {offices?.map((office) => (
                    <option key={office._id} value={office._id}>
                      {office.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Workstation (Optional)</label>
                <input
                  type="text"
                  value={formData.workstation}
                  onChange={(e) => setFormData({ ...formData, workstation: e.target.value })}
                  className="input-apple"
                  placeholder="e.g., Desk 42"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Attach Photos/Videos</label>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                  className="input-apple"
                />
              </div>

              {location && (
                <div className="flex items-center space-x-2 text-green-600">
                  <FiMapPin />
                  <span className="text-sm">Location captured</span>
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="w-full btn-apple btn-primary">
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;

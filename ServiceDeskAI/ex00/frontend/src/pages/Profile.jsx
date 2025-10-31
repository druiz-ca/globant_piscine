import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const handleUpdate = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

        <div className="card-apple">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-apple-blue to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-apple-gray-600 dark:text-apple-gray-400">{user?.email}</p>
              <span className="badge badge-open mt-2">{user?.role}</span>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="input-apple"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="input-apple"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                defaultValue={user?.phone}
                className="input-apple"
              />
            </div>

            <button type="submit" className="btn-apple btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

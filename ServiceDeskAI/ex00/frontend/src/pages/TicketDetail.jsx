import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTicket, updateTicket, addMessage } from '../store/slices/ticketSlice';
import socketService from '../services/socketService';
import { FiArrowLeft, FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticket } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(getTicket(id));
    socketService.joinTicket(id);
    
    socketService.onNewMessage((data) => {
      if (data.ticketId === id) {
        dispatch(getTicket(id));
      }
    });

    return () => {
      socketService.leaveTicket(id);
    };
  }, [id, dispatch]);

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await dispatch(updateTicket({ id, data: { status: newStatus } })).unwrap();
      toast.success(`Ticket status updated to ${newStatus}`);
      // Refrescar el ticket después de actualizar
      await dispatch(getTicket(id));
    } catch (error) {
      toast.error('Error updating ticket status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    dispatch(addMessage({ id, message: newMessage }));
    socketService.sendMessage({ ticketId: id, message: newMessage, userId: user._id });
    setNewMessage('');
  };

  if (!ticket) {
    return <div className="flex justify-center py-12"><div className="spinner"></div></div>;
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-apple-blue mb-6">
          <FiArrowLeft />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-apple">
              <h1 className="text-2xl font-bold mb-4">{ticket.title}</h1>
              <p className="text-apple-gray-600 dark:text-apple-gray-400 mb-4">{ticket.description}</p>
              
              {ticket.media && ticket.media.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {ticket.media.map((file, idx) => (
                    <img
                      key={idx}
                      src={`${process.env.REACT_APP_API_URL}${file.url}`}
                      alt="Ticket attachment"
                      className="rounded-lg w-full object-cover"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Chat Section */}
            <div className="card-apple">
              <h2 className="text-xl font-bold mb-4">Messages</h2>
              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {ticket.messages?.map((msg, idx) => (
                  <div key={idx} className="flex space-x-3">
                    <div className="w-8 h-8 rounded-full bg-apple-blue flex items-center justify-center text-white text-sm font-semibold">
                      {msg.user?.name?.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{msg.user?.name}</p>
                      <p className="text-sm text-apple-gray-600 dark:text-apple-gray-400">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="input-apple flex-1"
                  placeholder="Type a message..."
                />
                <button type="submit" className="btn-apple btn-primary">
                  <FiSend />
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card-apple">
              <h3 className="font-bold mb-4">Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-apple-gray-500">Status</p>
                  <p className="font-semibold">{ticket.status}</p>
                </div>
                <div>
                  <p className="text-sm text-apple-gray-500">Priority</p>
                  <p className="font-semibold">{ticket.priority}</p>
                </div>
                <div>
                  <p className="text-sm text-apple-gray-500">Category</p>
                  <p className="font-semibold">{ticket.category}</p>
                </div>
                <div>
                  <p className="text-sm text-apple-gray-500">Office</p>
                  <p className="font-semibold">{ticket.office?.name}</p>
                </div>
              </div>

              {(user?.role === 'service-desk' || user?.role === 'admin') && (
                <div className="mt-6 space-y-2">
                  <button 
                    onClick={() => handleStatusChange('assigned')} 
                    className="w-full btn-apple btn-secondary text-sm"
                    disabled={isUpdating || ticket.status === 'assigned'}
                  >
                    {isUpdating ? 'Updating...' : 'Assign'}
                  </button>
                  <button 
                    onClick={() => handleStatusChange('in-progress')} 
                    className="w-full btn-apple btn-secondary text-sm"
                    disabled={isUpdating || ticket.status === 'in-progress'}
                  >
                    {isUpdating ? 'Updating...' : 'In Progress'}
                  </button>
                  <button 
                    onClick={() => handleStatusChange('resolved')} 
                    className="w-full btn-apple btn-primary text-sm"
                    disabled={isUpdating || ticket.status === 'resolved'}
                  >
                    {isUpdating ? 'Updating...' : 'Resolve'}
                  </button>
                  <button 
                    onClick={() => handleStatusChange('closed')} 
                    className="w-full btn-apple bg-red-600 hover:bg-red-700 text-white text-sm"
                    disabled={isUpdating || ticket.status === 'closed'}
                  >
                    {isUpdating ? 'Updating...' : 'Close'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;

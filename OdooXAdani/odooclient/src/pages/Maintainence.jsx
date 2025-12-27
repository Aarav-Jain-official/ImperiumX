import React, { useState, useEffect, useCallback } from 'react';
import api from '../lib/Axios';
import { 
  Activity, 
  Search, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  User,
  Settings,
  Filter,
  Trash2,
  Edit3
} from 'lucide-react';

const MaintenanceRequestBoard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [technicians, setTechnicians] = useState([]);
  const [updating, setUpdating] = useState({});

  const statuses = ['New', 'In Progress', 'Completed', 'On Hold', 'Scrap'];
  const priorities = ['High', 'Medium', 'Low'];

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch requests
        const requestsRes = await api.get('/core/requests');
        setRequests(requestsRes.data.data || []);
        
        // Fetch technicians/users
        const usersRes = await api.get('/users'); // Assuming /api/v1/users endpoint
        setTechnicians(usersRes.data.data || []);
        
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter requests
  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      !searchTerm ||
      request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.equipment?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.equipment?.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterStatus || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Update request status (Drag & Drop + API call)
  const handleDropRequest = useCallback(async (requestId, newStatus) => {
    try {
      setUpdating(prev => ({ ...prev, [requestId]: true }));
      
      // Update on backend first
      await api.put(`/core/requests/${requestId}`, { status: newStatus });
      
      // Update local state
      setRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: newStatus } : req
        )
      );
      
    } catch (err) {
      console.error('Error updating status:', err);
      // Revert optimistic update on error
      setRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: prev.find(r => r.id === requestId)?.status } : req
        )
      );
    } finally {
      setUpdating(prev => ({ ...prev, [requestId]: false }));
    }
  }, []);

  const handleUpdateRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleSaveRequest = async (updatedRequest) => {
    try {
      await api.put(`/core/requests/${updatedRequest.id}`, updatedRequest);
      setRequests(prev =>
        prev.map(req =>
          req.id === updatedRequest.id ? updatedRequest : req
        )
      );
      setSelectedRequest(null);
    } catch (err) {
      console.error('Error saving request:', err);
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      await api.delete(`/core/requests/${requestId}`);
      setRequests(prev => prev.filter(req => req.id !== requestId));
      if (selectedRequest?.id === requestId) {
        setSelectedRequest(null);
      }
    } catch (err) {
      console.error('Error deleting request:', err);
    }
  };

  // Calculate Stats
  const stats = {
    total: filteredRequests.length,
    highPriority: filteredRequests.filter(r => r.priority === 'High').length,
    inProgress: filteredRequests.filter(r => r.status === 'In Progress').length,
    completed: filteredRequests.filter(r => r.status === 'Completed').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-700/50 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-lg">Loading maintenance board...</p>
        </div>
      </div>
    );
  }

  // Priority Badge Component
  const PriorityBadge = ({ priority }) => {
    const priorityStyles = {
      High: 'bg-red-900/20 border-red-500 text-red-300',
      Medium: 'bg-amber-900/20 border-amber-500 text-amber-300',
      Low: 'bg-green-900/20 border-green-500 text-green-300'
    };

    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold border ${priorityStyles[priority]}`}>
        {priority}
      </span>
    );
  };

  // Technician Avatar
  const TechnicianAvatar = ({ name, size = 'small' }) => {
    const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const sizeClasses = size === 'small' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';

    return (
      <div className={`rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center font-bold text-white ${sizeClasses}`}>
        {initials || 'U'}
      </div>
    );
  };

  // Request Card Component
  const RequestCard = ({ request, onUpdate, onDragStart }) => {
    const borderColors = {
      High: 'border-l-red-500 shadow-red-500/20',
      Medium: 'border-l-amber-500 shadow-amber-500/20',
      Low: 'border-l-green-500 shadow-green-500/20'
    };

    return (
      <div
        draggable={!updating[request.id]}
        onDragStart={onDragStart}
        onClick={() => onUpdate(request)}
        className={`group bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 mb-4 cursor-grab active:cursor-grabbing border-l-4 hover:border-l-6 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 border-slate-700 hover:border-slate-600 ${borderColors[request.priority || 'Medium']} hover:shadow-lg ${updating[request.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-3 gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-blue-300 transition-colors">
              {request.subject}
            </h3>
            <PriorityBadge priority={request.priority || 'Medium'} />
          </div>
        </div>

        {/* Equipment Info */}
        <div className="bg-slate-900/50 rounded-lg p-3 mb-3 border border-slate-700/50">
          <div className="text-blue-400 font-semibold text-xs uppercase tracking-wide mb-1">Equipment</div>
          <div className="font-medium text-sm text-white truncate">{request.equipment?.name}</div>
          <div className="text-xs text-slate-400 font-mono">#{request.equipment?.serialNumber}</div>
        </div>

        {/* Team & Type */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs bg-slate-700/50 px-2 py-1 rounded-full text-slate-300">
            🏢 {request.team?.name}
          </div>
          <div className="text-xs text-slate-400">
            📋 {request.type}
          </div>
        </div>

        {/* Technician */}
        {request.technician && (
          <div className="flex items-center gap-3 mb-3 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <TechnicianAvatar name={request.technician.name} />
            <div className="text-xs">
              <div className="font-semibold text-white">{request.technician.name}</div>
              <div className="text-slate-400">Technician</div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
          <div className="text-xs text-slate-400">
            Created {new Date(request.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    );
  };

  // Kanban Column Component
  const KanbanColumn = ({ status, requests: filteredRequests, onDropRequest, onUpdateRequest }) => {
    const [dragOver, setDragOver] = useState(false);
    const columnRequests = filteredRequests.filter(r => r.status === status);

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setDragOver(true);
    };

    const handleDragLeave = () => {
      setDragOver(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setDragOver(false);
      const requestId = e.dataTransfer.getData('text/plain');
      onDropRequest(requestId, status);
    };

    const getStatusIcon = (status) => {
      switch(status) {
        case 'New': return '📥';
        case 'In Progress': return '⚙️';
        case 'Completed': return '✅';
        case 'On Hold': return '⏸️';
        case 'Scrap': return '🗑️';
        default: return '📋';
      }
    };

    return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex-shrink-0 w-80 bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border-2 border-slate-700/50 transition-all duration-300 hover:border-slate-600/70 ${
          dragOver ? 'scale-105 border-blue-400/50 bg-blue-500/5 shadow-2xl shadow-blue-500/20' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getStatusIcon(status)}</span>
            <div>
              <h2 className="font-bold text-white text-lg">{status}</h2>
              <div className="text-xs text-slate-400 uppercase tracking-wide">{columnRequests.length} requests</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 min-h-[200px]">
          {columnRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
              <div className="text-4xl mb-4 opacity-50">{getStatusIcon(status)}</div>
              <p className="text-sm font-medium">No {status.toLowerCase()} requests</p>
              <p className="text-xs mt-1">Drag requests here to update status</p>
            </div>
          ) : (
            columnRequests.map(request => (
              <RequestCard
                key={request.id}
                request={request}
                onUpdate={onUpdateRequest}
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData('text/plain', request.id);
                }}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  // Request Modal (simplified version)
  const RequestModal = ({ request, onClose, onSave, onDelete }) => {
    const [formData, setFormData] = useState(request || {});
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSaving(true);
      await onSave(formData);
      setSaving(false);
    };

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50">
            <h2 className="text-2xl font-bold text-white">Edit Request</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-xl">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                  {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                  {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Notes</label>
              <textarea name="description" value={formData.description || ''} onChange={handleChange} rows="3" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white" />
            </div>

            <div className="flex gap-3 pt-6 border-t border-slate-700/50">
              <button type="submit" disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => onDelete(formData.id)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center gap-2">
                <Trash2 size={16} /> Delete
              </button>
              <button type="button" onClick={onClose} className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold rounded-xl">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">GearGuard Board</h1>
              <p className="text-gray-400 text-sm mt-1">Drag & drop to manage maintenance requests</p>
            </div>
            
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
                <div className="text-xs text-gray-400">Total</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-red-400">{stats.highPriority}</div>
                <div className="text-xs text-gray-400">High Priority</div>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="🔍 Search requests or equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 py-2 text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setFilterStatus(null)} className={`px-4 py-2 rounded text-xs font-semibold ${!filterStatus ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}>
                All
              </button>
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded text-xs font-semibold ${filterStatus === status ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-5 overflow-x-auto p-6 pb-20 scrollbar-thin scrollbar-thumb-slate-700">
        {statuses.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            requests={filteredRequests}
            onDropRequest={handleDropRequest}
            onUpdateRequest={handleUpdateRequest}
          />
        ))}
      </div>

      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onSave={handleSaveRequest}
          onDelete={handleDeleteRequest}
        />
      )}
    </div>
  );
};

export default MaintenanceRequestBoard;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, Eye, Edit, Trash2, Download, Loader, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';

// ============ REQUEST DETAIL MODAL ============
function RequestDetailModal({ isOpen, onClose, request }) {
  if (!request) return null;

  const getStatusColor = (status) => {
    const colors = {
      'New': { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
      'In Progress': { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
      'Completed': { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
      'Repaired': { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
      'Scrap': { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' }
    };
    return colors[status] || colors['New'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'text-red-400 bg-red-500/10',
      'Medium': 'text-yellow-400 bg-yellow-500/10',
      'Low': 'text-green-400 bg-green-500/10',
      'Normal': 'text-blue-400 bg-blue-500/10'
    };
    return colors[priority] || colors['Normal'];
  };

  const statusColors = getStatusColor(request.status);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-2">
                  {request.subject}
                </h2>
                <div className="flex gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors.bg} ${statusColors.border} ${statusColors.text}`}>
                    {request.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(request.priority)}`}>
                    {request.priority} Priority
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-400">
                    {request.type}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-1">Equipment</p>
                  <p className="text-white font-semibold">{request.equipment?.name}</p>
                  <p className="text-slate-400 text-sm">SN: {request.equipment?.serialNumber}</p>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-1">Department</p>
                  <p className="text-white font-semibold">{request.equipment?.department || 'N/A'}</p>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-1">Maintenance Team</p>
                  <p className="text-white font-semibold">{request.team?.name || 'N/A'}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-1">Assigned Technician</p>
                  <div className="flex items-center gap-3">
                    {request.technician?.avatar && (
                      <img
                        src={request.technician.avatar}
                        alt={request.technician.name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div>
                      <p className="text-white font-semibold">{request.technician?.name || 'Unassigned'}</p>
                      <p className="text-slate-400 text-sm">{request.technician?.email || ''}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-1">Created By</p>
                  <p className="text-white font-semibold">{request.createdBy?.name || 'N/A'}</p>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-1">Duration (Hours)</p>
                  <p className="text-white font-semibold">{request.duration || 'Not recorded'}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-6">
              <p className="text-slate-400 text-sm mb-2">Description</p>
              <p className="text-white">{request.description || 'No description provided'}</p>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Created Date</p>
                <p className="text-white font-semibold">
                  {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Scheduled Date</p>
                <p className="text-white font-semibold">
                  {request.scheduledDate ? new Date(request.scheduledDate).toLocaleDateString() : 'Not scheduled'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition font-medium"
              >
                Close
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/30"
              >
                Edit Request
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============ REQUESTS LIST PAGE ============
export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    type: 'all',
    team: 'all'
  });

  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch requests
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/v1/core/requests`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const json = await res.json();
      setRequests(json.data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let result = requests;

    // Search filter
    if (searchQuery) {
      result = result.filter(req =>
        req.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.equipment?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.technician?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      result = result.filter(req => req.status === filters.status);
    }

    // Priority filter
    if (filters.priority !== 'all') {
      result = result.filter(req => req.priority === filters.priority);
    }

    // Type filter
    if (filters.type !== 'all') {
      result = result.filter(req => req.type === filters.type);
    }

    // Team filter
    if (filters.team !== 'all') {
      result = result.filter(req => req.team?.name === filters.team);
    }

    // Sorting
    switch (sortBy) {
      case 'recent':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priority':
        const priorityOrder = { High: 0, Medium: 1, Normal: 2, Low: 3 };
        result.sort((a, b) => (priorityOrder[a.priority] || 999) - (priorityOrder[b.priority] || 999));
        break;
      case 'status':
        const statusOrder = { New: 0, 'In Progress': 1, Repaired: 2, Completed: 3 };
        result.sort((a, b) => (statusOrder[a.status] || 999) - (statusOrder[b.status] || 999));
        break;
      default:
        break;
    }

    setFilteredRequests(result);
  }, [requests, searchQuery, filters, sortBy]);

  const getStatusColor = (status) => {
    const colors = {
      'New': { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', icon: AlertCircle },
      'In Progress': { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: Clock },
      'Completed': { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', icon: CheckCircle },
      'Repaired': { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', icon: CheckCircle },
      'Scrap': { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', icon: Zap }
    };
    return colors[status] || colors['New'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'text-red-400 bg-red-500/10',
      'Medium': 'text-yellow-400 bg-yellow-500/10',
      'Low': 'text-green-400 bg-green-500/10',
      'Normal': 'text-blue-400 bg-blue-500/10'
    };
    return colors[priority] || colors['Normal'];
  };

  const uniqueTeams = [...new Set(requests.map(r => r.team?.name).filter(Boolean))];
  const stats = {
    total: requests.length,
    new: requests.filter(r => r.status === 'New').length,
    inProgress: requests.filter(r => r.status === 'In Progress').length,
    completed: requests.filter(r => r.status === 'Completed' || r.status === 'Repaired').length
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">Maintenance Requests</h1>
              <p className="text-slate-400">View and manage all maintenance requests across your organization</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-green-500/30"
            >
              <Zap size={20} />
              New Request
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm">Total Requests</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-400 text-sm">New</p>
              <p className="text-2xl font-bold text-blue-400">{stats.new}</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-400 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.inProgress}</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-24 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
          {/* Search + Sort */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by subject, equipment, or technician..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value="recent">Recent First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">High Priority First</option>
                <option value="status">By Status</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2.5 rounded-lg border flex items-center gap-2 transition ${
                  showFilters
                    ? 'bg-green-500/20 border-green-500/30 text-green-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Filter size={20} />
                Filters
                <ChevronDown size={16} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white flex items-center gap-2 transition"
              >
                <Download size={20} />
              </motion.button>
            </div>
          </div>

          {/* Filters Collapse */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-700"
              >
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Repaired">Repaired</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Priority</label>
                  <select
                    value={filters.priority}
                    onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
                  >
                    <option value="all">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
                  >
                    <option value="all">All Types</option>
                    <option value="Corrective">Corrective</option>
                    <option value="Preventive">Preventive</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Team</label>
                  <select
                    value={filters.team}
                    onChange={(e) => setFilters({ ...filters, team: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
                  >
                    <option value="all">All Teams</option>
                    {uniqueTeams.map(team => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Requests List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader className="animate-spin text-green-500" size={40} />
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No requests found matching your criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request, idx) => {
              const statusColor = getStatusColor(request.status);
              const StatusIcon = statusColor.icon;

              return (
                <motion.div
                  key={request.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left: Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg flex-shrink-0 ${statusColor.bg}`}>
                          <StatusIcon className={`${statusColor.text}`} size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-display font-bold text-white group-hover:text-green-400 transition truncate">
                            {request.subject}
                          </h3>
                          <p className="text-slate-400 text-sm mt-1">{request.equipment?.name}</p>
                          <div className="flex gap-2 mt-3 flex-wrap">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColor.bg} ${statusColor.border} ${statusColor.text}`}>
                              {request.status}
                            </span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getPriorityColor(request.priority)}`}>
                              {request.priority}
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-400">
                              {request.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Technician & Team */}
                    <div className="flex flex-col gap-3">
                      <div className="text-right">
                        <p className="text-slate-400 text-xs uppercase tracking-wide">Technician</p>
                        <div className="flex items-center justify-end gap-2 mt-1">
                          {request.technician?.avatar && (
                            <img
                              src={request.technician.avatar}
                              alt={request.technician.name}
                              className="w-6 h-6 rounded-full"
                            />
                          )}
                          <p className="text-white font-medium">{request.technician?.name || 'Unassigned'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-xs uppercase tracking-wide">Team</p>
                        <p className="text-white font-medium">{request.team?.name || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Right: Dates & Actions */}
                    <div className="flex flex-col gap-3 md:items-end">
                      <div className="text-right">
                        <p className="text-slate-400 text-xs uppercase tracking-wide">Created</p>
                        <p className="text-white font-medium">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowDetailModal(true);
                          }}
                          className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/20 transition"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/20 transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {filteredRequests.length > 0 && (
          <div className="mt-8 flex justify-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition"
            >
              Previous
            </motion.button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(page => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.05 }}
                  className={`w-10 h-10 rounded-lg transition ${
                    page === 1
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-800 border border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  {page}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition"
            >
              Next
            </motion.button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <RequestDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        request={selectedRequest}
      />
    </div>
  );
}
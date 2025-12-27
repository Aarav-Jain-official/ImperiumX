import React, { useState, useEffect } from 'react';
import api from '../lib/Axios';
import { 
  Plus, 
  Search, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  User, 
  Settings, 
  ChevronDown,
  Building2,
  Users,
  HardDrive,
  Wrench,
  Calendar,
  AlertTriangle
} from 'lucide-react';

// Create Request Page with REAL API integration
const CreateMaintenanceRequest = () => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    equipmentId: '',
    type: '',
    priority: '',
    scheduledDate: ''
  });
  const [equipment, setEquipment] = useState(null);
  const [allEquipment, setAllEquipment] = useState([]);
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [equipmentLoading, setEquipmentLoading] = useState(true);

  // Fetch equipment and teams on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setEquipmentLoading(true);
        
        // Fetch all equipment
        const equipmentRes = await api.get('/core/equipment');
        setAllEquipment(equipmentRes.data.data || []);
        
        // Fetch all teams
        const teamsRes = await api.get('/core/teams');
        setTeams(teamsRes.data.data || []);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load equipment and teams');
      } finally {
        setEquipmentLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredEquipment = allEquipment.filter(eq =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleEquipmentSearch = (term) => {
    setSearchTerm(term);
  };

  const handleEquipmentSelect = (selectedEquipment) => {
    setEquipment(selectedEquipment);
    setFormData(prev => ({
      ...prev,
      equipmentId: selectedEquipment.id
    }));
    setSearchTerm('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!equipment) {
      setError('Please select equipment first');
      return;
    }

    if (!formData.subject || !formData.description || !formData.type || !formData.priority) {
      setError('Please fill all required fields');
      return;
    }

    setSubmitLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        subject: formData.subject,
        description: formData.description,
        equipmentId: formData.equipmentId,
        type: formData.type,
        priority: formData.priority,
        scheduledDate: formData.scheduledDate || null
      };

      const response = await api.post('/core/requests', payload);
      
      setSuccess('✅ Maintenance request created successfully!');
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({ 
          subject: '', 
          description: '', 
          equipmentId: '', 
          type: '', 
          priority: '', 
          scheduledDate: '' 
        });
        setEquipment(null);
        setSearchTerm('');
        setSuccess('');
      }, 2000);

      console.log('Request created:', response.data);

    } catch (err) {
      console.error('Submit error:', err);
      if (err.response?.status === 400) {
        setError(err.response.data.message || 'Invalid data provided');
      } else if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError('Failed to create request. Please try again.');
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'border-red-500 bg-red-500/10 text-red-300';
      case 'Medium': return 'border-amber-500 bg-amber-500/10 text-amber-300';
      case 'Low': return 'border-green-500 bg-green-500/10 text-green-300';
      default: return 'border-slate-500 bg-slate-500/10 text-slate-300';
    }
  };

  const requestTypes = ['Corrective', 'Preventive'];
  const priorities = ['High', 'Medium', 'Low'];

  if (equipmentLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-700/50 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-lg">Loading equipment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
                New Request
              </h1>
              <p className="text-slate-400 text-lg">Create a new maintenance request</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success/Error Messages */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-300 flex items-center gap-2 animate-pulse">
                <CheckCircle size={20} />
                {success}
              </div>
            )}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 flex items-center gap-2 animate-pulse">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            {/* Equipment Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <HardDrive size={18} className="text-blue-400" />
                Select Equipment <span className="text-red-400">*</span>
              </label>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="🔍 Search equipment by name or serial number..."
                  value={searchTerm}
                  onChange={(e) => handleEquipmentSearch(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              
              {filteredEquipment.length > 0 && searchTerm && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 max-h-60 overflow-y-auto mt-2 space-y-2">
                  {filteredEquipment.slice(0, 5).map(eq => (
                    <button
                      key={eq.id}
                      type="button"
                      onClick={() => handleEquipmentSelect(eq)}
                      className={`w-full p-3 rounded-lg text-left transition-all hover:bg-slate-700/50 ${
                        equipment?.id === eq.id
                          ? 'bg-blue-500/20 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20'
                          : 'hover:border-slate-600/50 border border-slate-700/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <HardDrive size={18} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white text-sm truncate">{eq.name}</div>
                          <div className="text-xs text-slate-400 font-mono truncate">#{eq.serialNumber}</div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                            <Building2 size={12} />
                            <span className="truncate">{eq.location}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-blue-400">
                            <Users size={12} />
                            <span>{eq.maintenanceTeam?.name}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {equipment && (
                <div className="mt-3 p-4 bg-blue-500/10 border-2 border-blue-500/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HardDrive size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg text-white">{equipment.name}</div>
                      <div className="text-sm text-slate-300">#{equipment.serialNumber}</div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                        <span>📍 {equipment.location}</span>
                        <span>🏢 {equipment.department}</span>
                        <span className="text-blue-400 font-semibold">
                          👥 {equipment.maintenanceTeam?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Wrench size={16} className="text-amber-400" />
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="e.g., Printer not responding"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Clock size={16} className="text-purple-400" />
                  Type <span className="text-red-400">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                  required
                >
                  <option value="">Select type</option>
                  {requestTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-orange-400" />
                  Priority <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {priorities.map(priority => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => handleChange({ target: { name: 'priority', value: priority } })}
                      className={`p-3 rounded-xl border-2 font-semibold transition-all flex items-center justify-center gap-2 text-sm ${
                        formData.priority === priority
                          ? getPriorityColor(priority) + ' shadow-lg shadow-[red|amber|green]-500/25'
                          : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-700/50'
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-400" />
                  Scheduled Date (Preventive)
                </label>
                <input
                  type="date"
                  name="scheduledDate"
                  value={formData.scheduledDate}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <User size={16} className="text-emerald-400" />
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all resize-vertical"
                placeholder="Describe the issue in detail..."
                required
              />
            </div>

            <div className="pt-6 border-t border-slate-700/50">
              <button
                type="submit"
                disabled={submitLoading || !equipment || !formData.subject || !formData.description}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-slate-700 disabled:to-slate-800 text-white font-black py-4 px-8 rounded-2xl text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-3"
              >
                {submitLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Request...
                  </>
                ) : (
                  <>
                    <Plus size={24} />
                    Create Maintenance Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMaintenanceRequest;

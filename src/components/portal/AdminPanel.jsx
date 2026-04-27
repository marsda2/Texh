import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Users, BarChart3, CheckSquare, FileText, ChevronRight, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPanel = ({ onBack }) => {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics'); // metrics, tasks, documents, status

  // Form states
  const [newMetric, setNewMetric] = useState({ label: '', value: '', trend: '', icon_name: 'TrendingUp' });
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'PENDING', type: 'info' });
  const [newDoc, setNewDoc] = useState({ name: '', size: '', file_url: '' });
  const [projectStatus, setProjectStatus] = useState({ current_phase: 1, total_phases: 4, next_milestone_title: '' });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data, error } = await supabase.from('clients').select('*').order('full_name');
    if (!error) {
      setClients(data);
      if (data.length > 0) setSelectedClientId(data[0].id);
    }
  };

  const handleAddMetric = async () => {
    if (!selectedClientId) return;
    const { error } = await supabase.from('metrics').insert([{ ...newMetric, client_id: selectedClientId }]);
    if (!error) {
      setNewMetric({ label: '', value: '', trend: '', icon_name: 'TrendingUp' });
      alert('Metric added!');
    }
  };

  const handleAddTask = async () => {
    if (!selectedClientId) return;
    const { error } = await supabase.from('tasks').insert([{ ...newTask, client_id: selectedClientId }]);
    if (!error) {
      setNewTask({ title: '', description: '', status: 'PENDING', type: 'info' });
      alert('Task added!');
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedClientId) return;
    const { error } = await supabase.from('clients').update(projectStatus).eq('id', selectedClientId);
    if (!error) alert('Status updated!');
  };

  return (
    <div className="min-h-screen bg-neutral p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-obsidian tracking-tight mb-2 uppercase">TexhCo Admin</h1>
            <p className="text-obsidian/60 font-medium">Control Center for Client Portals</p>
          </div>
          <button 
            onClick={onBack}
            className="px-6 py-3 bg-obsidian text-white rounded-2xl font-bold hover:bg-obsidian/80 transition-all flex items-center gap-2"
          >
            Exit Admin View
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Client Selection */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-obsidian/40 ml-2">Select Client</h3>
            <div className="space-y-2">
              {clients.map(client => (
                <button
                  key={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className={`w-full p-4 rounded-2xl text-left transition-all flex items-center justify-between group ${selectedClientId === client.id ? 'bg-chartreuse text-obsidian shadow-lg' : 'bg-white hover:bg-neutral-100'}`}
                >
                  <div>
                    <div className="font-bold text-sm">{client.full_name}</div>
                    <div className={`text-[10px] uppercase font-black tracking-wider ${selectedClientId === client.id ? 'text-obsidian/60' : 'text-obsidian/30'}`}>{client.company_name}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedClientId === client.id ? 'translate-x-1' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Main Content - Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-obsidian/5 overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-obsidian/5">
                {[
                  { id: 'metrics', icon: BarChart3, label: 'Metrics' },
                  { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
                  { id: 'status', icon: Plus, label: 'Status' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-6 font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-obsidian text-chartreuse' : 'text-obsidian/40 hover:text-obsidian hover:bg-neutral/30'}`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-10">
                <AnimatePresence mode="wait">
                  {activeTab === 'metrics' && (
                    <motion.div 
                      key="metrics"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Metric Label</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Monthly Revenue"
                            className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none"
                            value={newMetric.label}
                            onChange={e => setNewMetric({...newMetric, label: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Value</label>
                          <input 
                            type="text" 
                            placeholder="e.g. $12,000"
                            className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none"
                            value={newMetric.value}
                            onChange={e => setNewMetric({...newMetric, value: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Trend Text</label>
                          <input 
                            type="text" 
                            placeholder="e.g. +12% vs last month"
                            className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none"
                            value={newMetric.trend}
                            onChange={e => setNewMetric({...newMetric, trend: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Icon (Lucide Name)</label>
                          <select 
                            className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none"
                            value={newMetric.icon_name}
                            onChange={e => setNewMetric({...newMetric, icon_name: e.target.value})}
                          >
                            <option value="TrendingUp">Trending Up</option>
                            <option value="Users">Users</option>
                            <option value="MousePointer2">Clicks</option>
                            <option value="Zap">Zap</option>
                            <option value="Target">Target</option>
                          </select>
                        </div>
                      </div>
                      <button 
                        onClick={handleAddMetric}
                        className="w-full bg-chartreuse text-obsidian py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:brightness-105 transition-all shadow-lg shadow-chartreuse/20"
                      >
                        Add Metric to Dashboard
                      </button>
                    </motion.div>
                  )}

                  {activeTab === 'tasks' && (
                    <motion.div 
                      key="tasks"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Task Title</label>
                        <input 
                          type="text" 
                          placeholder="What needs to be done?"
                          className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none"
                          value={newTask.title}
                          onChange={e => setNewTask({...newTask, title: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Description</label>
                        <textarea 
                          placeholder="Provide details for the client..."
                          rows="3"
                          className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none resize-none"
                          value={newTask.description}
                          onChange={e => setNewTask({...newTask, description: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Type</label>
                          <select 
                            className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none"
                            value={newTask.type}
                            onChange={e => setNewTask({...newTask, type: e.target.value})}
                          >
                            <option value="info">Information only</option>
                            <option value="upload">Requires File Upload</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Initial Status</label>
                          <select 
                            className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none"
                            value={newTask.status}
                            onChange={e => setNewTask({...newTask, status: e.target.value})}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="DONE">Done</option>
                          </select>
                        </div>
                      </div>
                      <button 
                        onClick={handleAddTask}
                        className="w-full bg-obsidian text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-obsidian/90 transition-all shadow-lg"
                      >
                        Push Task to Client desk
                      </button>
                    </motion.div>
                  )}

                  {activeTab === 'status' && (
                    <motion.div 
                      key="status"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Current Phase</label>
                          <input 
                            type="number" 
                            className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none"
                            value={projectStatus.current_phase}
                            onChange={e => setProjectStatus({...projectStatus, current_phase: parseInt(e.target.value)})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Total Phases</label>
                          <input 
                            type="number" 
                            className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none"
                            value={projectStatus.total_phases}
                            onChange={e => setProjectStatus({...projectStatus, total_phases: parseInt(e.target.value)})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Next Milestone Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Beta Launch"
                          className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none"
                          value={projectStatus.next_milestone_title}
                          onChange={e => setProjectStatus({...projectStatus, next_milestone_title: e.target.value})}
                        />
                      </div>
                      <button 
                        onClick={handleUpdateStatus}
                        className="w-full bg-chartreuse text-obsidian py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:brightness-105 transition-all shadow-lg"
                      >
                        Update Project Progress
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

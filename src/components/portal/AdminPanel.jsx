import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Plus, 
  Trash2, 
  Users, 
  BarChart3, 
  CheckSquare, 
  FileText, 
  ChevronRight, 
  Save, 
  X,
  UserPlus,
  RefreshCcw,
  ExternalLink,
  Settings,
  ChevronLeft
} from 'lucide-react';


import { motion, AnimatePresence } from 'framer-motion';

const AdminPanel = ({ onBack }) => {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics'); // metrics, tasks, documents, status, clients

  // Current data for selected client
  const [currentMetrics, setCurrentMetrics] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [currentDocs, setCurrentDocs] = useState([]);

  // Form states
  const [newMetric, setNewMetric] = useState({ label: '', value: '', trend: '', icon_name: 'TrendingUp' });
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'PENDING', type: 'info' });
  const [newDoc, setNewDoc] = useState({ name: '', size: '', file_url: '' });
  const [newClient, setNewClient] = useState({ full_name: '', company_name: '', email: '' });
  const [projectStatus, setProjectStatus] = useState({ current_phase: 1, total_phases: 4, next_milestone_title: '' });

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (selectedClientId) {
      fetchClientData();
    }
  }, [selectedClientId]);

  const fetchClients = async () => {
    const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    if (!error) {
      setClients(data);
      if (data.length > 0 && !selectedClientId) setSelectedClientId(data[0].id);
    }
  };

  const fetchClientData = async () => {
    setLoading(true);
    // Fetch metrics
    const { data: metrics } = await supabase.from('metrics').select('*').eq('client_id', selectedClientId).order('order_index');
    setCurrentMetrics(metrics || []);

    // Fetch tasks
    const { data: tasks } = await supabase.from('tasks').select('*').eq('client_id', selectedClientId).order('created_at', { ascending: false });
    setCurrentTasks(tasks || []);

    // Fetch docs
    const { data: docs } = await supabase.from('documents').select('*').eq('client_id', selectedClientId).order('created_at', { ascending: false });
    setCurrentDocs(docs || []);

    // Fetch client for status
    const client = clients.find(c => c.id === selectedClientId);
    if (client) {
      setProjectStatus({
        current_phase: client.current_phase || 1,
        total_phases: client.total_phases || 4,
        next_milestone_title: client.next_milestone_title || ''
      });
    }
    setLoading(false);
  };

  // Actions
  const handleAddMetric = async () => {
    if (!selectedClientId) return;
    const { error } = await supabase.from('metrics').insert([{ ...newMetric, client_id: selectedClientId }]);
    if (!error) {
      setNewMetric({ label: '', value: '', trend: '', icon_name: 'TrendingUp' });
      fetchClientData();
    }
  };

  const handleDeleteMetric = async (id) => {
    const { error } = await supabase.from('metrics').delete().eq('id', id);
    if (!error) fetchClientData();
  };

  const handleAddTask = async () => {
    if (!selectedClientId) return;
    const { error } = await supabase.from('tasks').insert([{ ...newTask, client_id: selectedClientId }]);
    if (!error) {
      setNewTask({ title: '', description: '', status: 'PENDING', type: 'info' });
      fetchClientData();
    }
  };

  const handleDeleteTask = async (id) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (!error) fetchClientData();
  };

  const handleAddDoc = async () => {
    if (!selectedClientId) return;
    const { error } = await supabase.from('documents').insert([{ ...newDoc, client_id: selectedClientId }]);
    if (!error) {
      setNewDoc({ name: '', size: '', file_url: '' });
      fetchClientData();
    }
  };

  const handleDeleteDoc = async (id) => {
    const { error } = await supabase.from('documents').delete().eq('id', id);
    if (!error) fetchClientData();
  };

  const handleUpdateStatus = async () => {
    if (!selectedClientId) return;
    const { error } = await supabase.from('clients').update(projectStatus).eq('id', selectedClientId);
    if (!error) alert('Project status updated!');
  };

  const handleCreateClient = async () => {
    const { error } = await supabase.from('clients').insert([newClient]);
    if (!error) {
      setNewClient({ full_name: '', company_name: '', email: '' });
      fetchClients();
      setActiveTab('metrics');
      alert('Client profile created!');
    } else {
      alert('Error creating client: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-neutral p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <div className="grid-bg-overlay opacity-5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-chartreuse p-3 rounded-2xl shadow-xl shadow-chartreuse/20">
              <Settings className="text-obsidian w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-obsidian tracking-tighter uppercase leading-none">TexhCo Admin</h1>
              <p className="text-obsidian/40 font-bold text-xs uppercase tracking-widest mt-1">Portal Management Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('clients')}
              className={`flex-1 md:flex-none px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'clients' ? 'bg-chartreuse text-obsidian' : 'bg-white text-obsidian border border-obsidian/5 hover:bg-neutral-50'}`}
            >
              <UserPlus className="w-4 h-4" />
              New Client
            </button>
            <button 
              onClick={onBack}
              className="flex-1 md:flex-none px-6 py-4 bg-obsidian text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-obsidian/80 transition-all flex items-center justify-center gap-2 shadow-xl shadow-obsidian/20"
            >
              <ChevronLeft className="w-4 h-4" />
              Exit Admin
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar - Client Selection */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/30">Select Target</h3>
              <button onClick={fetchClients} className="text-obsidian/30 hover:text-obsidian transition-colors">
                <RefreshCcw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {clients.map(client => (
                <button
                  key={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className={`w-full p-5 rounded-[1.5rem] text-left transition-all flex items-center justify-between group relative overflow-hidden ${selectedClientId === client.id ? 'bg-obsidian text-white shadow-2xl' : 'bg-white hover:bg-neutral-50 border border-obsidian/5'}`}
                >
                  <div className="relative z-10">
                    <div className="font-black text-sm tracking-tight">{client.full_name}</div>
                    <div className={`text-[10px] uppercase font-black tracking-widest mt-0.5 ${selectedClientId === client.id ? 'text-chartreuse' : 'text-obsidian/30'}`}>
                      {client.company_name}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform relative z-10 ${selectedClientId === client.id ? 'translate-x-1 text-chartreuse' : 'opacity-20'}`} />
                  {selectedClientId === client.id && (
                    <motion.div layoutId="active-client" className="absolute inset-0 bg-obsidian" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content - Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-obsidian/5 border border-obsidian/5 overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-obsidian/5 bg-neutral/30">
                {[
                  { id: 'metrics', icon: BarChart3, label: 'Metrics' },
                  { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
                  { id: 'documents', icon: FileText, label: 'Docs' },
                  { id: 'status', icon: RefreshCcw, label: 'Phase' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex flex-col items-center justify-center gap-2 py-6 font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-obsidian border-b-4 border-chartreuse' : 'text-obsidian/30 hover:text-obsidian hover:bg-white/50'}`}
                  >
                    <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-obsidian' : 'text-obsidian/20'}`} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-8 lg:p-12">
                <AnimatePresence mode="wait">
                  {activeTab === 'clients' ? (
                    <motion.div key="new-client" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                      <div className="space-y-4">
                        <h2 className="text-2xl font-black text-obsidian tracking-tight uppercase">New Client Profile</h2>
                        <p className="text-obsidian/50 text-sm">Create a profile first, then manage their data.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Full Name</label>
                          <input type="text" value={newClient.full_name} onChange={e => setNewClient({...newClient, full_name: e.target.value})} className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" placeholder="e.g. John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Company Name</label>
                          <input type="text" value={newClient.company_name} onChange={e => setNewClient({...newClient, company_name: e.target.value})} className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" placeholder="e.g. Acme Corp" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Client Email (MUST MATCH AUTH EMAIL)</label>
                          <input type="email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} className="w-full bg-neutral/50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" placeholder="e.g. client@company.com" />
                        </div>
                      </div>
                      <button onClick={handleCreateClient} className="w-full bg-obsidian text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-obsidian/90 transition-all shadow-xl">
                        Initialize Client Profile
                      </button>
                    </motion.div>
                  ) : activeTab === 'metrics' ? (
                    <motion.div key="metrics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                      {/* Form */}
                      <div className="bg-neutral/30 p-8 rounded-[2rem] space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <input type="text" placeholder="Label (e.g. MRR)" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" value={newMetric.label} onChange={e => setNewMetric({...newMetric, label: e.target.value})} />
                          <input type="text" placeholder="Value (e.g. $10k)" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" value={newMetric.value} onChange={e => setNewMetric({...newMetric, value: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <input type="text" placeholder="Trend (e.g. +5%)" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" value={newMetric.trend} onChange={e => setNewMetric({...newMetric, trend: e.target.value})} />
                          <select className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" value={newMetric.icon_name} onChange={e => setNewMetric({...newMetric, icon_name: e.target.value})}>
                            <option value="TrendingUp">Trending Up</option>
                            <option value="Users">Users</option>
                            <option value="MousePointer2">Clicks</option>
                            <option value="Zap">Zap</option>
                          </select>
                        </div>
                        <button onClick={handleAddMetric} className="w-full bg-chartreuse text-obsidian py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:brightness-105 transition-all">
                          Add Metric
                        </button>
                      </div>

                      {/* List */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/30 ml-4">Current Metrics</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentMetrics.map(m => (
                            <div key={m.id} className="bg-white border border-obsidian/5 p-5 rounded-2xl flex justify-between items-center group">
                              <div>
                                <div className="font-black text-sm">{m.label}</div>
                                <div className="text-xs text-obsidian/40">{m.value} ({m.trend})</div>
                              </div>
                              <button onClick={() => handleDeleteMetric(m.id)} className="p-2 text-red-500/20 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-all">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : activeTab === 'tasks' ? (
                    <motion.div key="tasks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                      {/* Form */}
                      <div className="bg-neutral/30 p-8 rounded-[2rem] space-y-6">
                        <input type="text" placeholder="Task Title" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
                        <textarea placeholder="Description" rows="2" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none resize-none" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} />
                        <div className="grid grid-cols-2 gap-6">
                          <select className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" value={newTask.type} onChange={e => setNewTask({...newTask, type: e.target.value})}>
                            <option value="info">Info</option>
                            <option value="upload">Upload</option>
                          </select>
                          <select className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" value={newTask.status} onChange={e => setNewTask({...newTask, status: e.target.value})}>
                            <option value="PENDING">Pending</option>
                            <option value="DONE">Done</option>
                          </select>
                        </div>
                        <button onClick={handleAddTask} className="w-full bg-obsidian text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-obsidian/80 transition-all">
                          Push Task
                        </button>
                      </div>

                      {/* List */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/30 ml-4">Current Tasks</h4>
                        <div className="space-y-3">
                          {currentTasks.map(t => (
                            <div key={t.id} className="bg-white border border-obsidian/5 p-5 rounded-2xl flex justify-between items-center group">
                              <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${t.status === 'DONE' ? 'bg-green-500' : 'bg-chartreuse'}`} />
                                <div>
                                  <div className="font-black text-sm">{t.title}</div>
                                  <div className="text-[10px] text-obsidian/40 uppercase font-bold tracking-widest">{t.type} | {t.status}</div>
                                </div>
                              </div>
                              <button onClick={() => handleDeleteTask(t.id)} className="p-2 text-red-500/20 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-all">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : activeTab === 'documents' ? (
                    <motion.div key="docs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                      {/* Form */}
                      <div className="bg-neutral/30 p-8 rounded-[2rem] space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <input type="text" placeholder="Doc Name" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" value={newDoc.name} onChange={e => setNewDoc({...newDoc, name: e.target.value})} />
                          <input type="text" placeholder="Size (e.g. 2.4MB)" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" value={newDoc.size} onChange={e => setNewDoc({...newDoc, size: e.target.value})} />
                        </div>
                        <input type="text" placeholder="File URL (External Link)" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" value={newDoc.file_url} onChange={e => setNewDoc({...newDoc, file_url: e.target.value})} />
                        <button onClick={handleAddDoc} className="w-full bg-obsidian text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-obsidian/80 transition-all">
                          Add Document
                        </button>
                      </div>

                      {/* List */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/30 ml-4">Vault Assets</h4>
                        <div className="space-y-3">
                          {currentDocs.map(d => (
                            <div key={d.id} className="bg-white border border-obsidian/5 p-5 rounded-2xl flex justify-between items-center group">
                              <div className="flex items-center gap-4">
                                <FileText className="w-5 h-5 text-obsidian/20" />
                                <div>
                                  <div className="font-black text-sm">{d.name}</div>
                                  <div className="text-[10px] text-obsidian/40 uppercase font-bold tracking-widest">{d.size}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <a href={d.file_url} target="_blank" rel="noreferrer" className="p-2 text-obsidian/20 hover:text-obsidian rounded-lg transition-all">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                                <button onClick={() => handleDeleteDoc(d.id)} className="p-2 text-red-500/20 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-all">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10 text-center py-10">
                      <div className="max-w-md mx-auto space-y-8">
                        <div className="grid grid-cols-2 gap-6 text-left">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Phase</label>
                            <input type="number" value={projectStatus.current_phase} onChange={e => setProjectStatus({...projectStatus, current_phase: parseInt(e.target.value)})} className="w-full bg-neutral/50 border-none rounded-2xl p-6 text-xl font-black focus:ring-2 ring-chartreuse outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Total</label>
                            <input type="number" value={projectStatus.total_phases} onChange={e => setProjectStatus({...projectStatus, total_phases: parseInt(e.target.value)})} className="w-full bg-neutral/50 border-none rounded-2xl p-6 text-xl font-black focus:ring-2 ring-chartreuse outline-none" />
                          </div>
                        </div>
                        <div className="space-y-2 text-left">
                          <label className="text-[10px] font-black uppercase text-obsidian/40 ml-4">Next Milestone</label>
                          <input type="text" value={projectStatus.next_milestone_title} onChange={e => setProjectStatus({...projectStatus, next_milestone_title: e.target.value})} className="w-full bg-neutral/50 border-none rounded-2xl p-5 text-sm font-bold focus:ring-2 ring-chartreuse outline-none" placeholder="e.g. Design Handover" />
                        </div>
                        <button onClick={handleUpdateStatus} className="w-full bg-chartreuse text-obsidian py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:brightness-105 transition-all shadow-xl shadow-chartreuse/20 flex items-center justify-center gap-3">
                          <Save className="w-5 h-5" />
                          Update Project Timeline
                        </button>
                      </div>
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

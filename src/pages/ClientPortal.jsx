import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, 
  ArrowRight, 
  LayoutDashboard,
  Settings,
  ChevronLeft
} from 'lucide-react';

// Portal Components
import PulseCards from '../components/portal/PulseCards';
import StatusBar from '../components/portal/StatusBar';
import ActionDesk from '../components/portal/ActionDesk';
import Vault from '../components/portal/Vault';
import AdminPanel from '../components/portal/AdminPanel';

const ClientPortal = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [clientData, setClientData] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const { t } = useLanguage();

  const isAdmin = session?.user?.email?.endsWith('@texhco.com') || session?.user?.email === 'prueba@portal.com';


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchPortalData();
    }
  }, [session]);

  const fetchPortalData = async () => {
    setDataLoading(true);
    try {
      // 1. Fetch Client Profile
      const { data: client, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .single();

      if (clientError) throw clientError;
      setClientData(client);

      // 2. Fetch related data
      const [metricsRes, docsRes, tasksRes] = await Promise.all([
        supabase.from('metrics').select('*').order('order_index', { ascending: true }),
        supabase.from('documents').select('*').order('created_at', { ascending: false }),
        supabase.from('tasks').select('*').order('created_at', { ascending: false })
      ]);

      setMetrics(metricsRes.data || []);
      setDocuments(docsRes.data || []);
      setTasks(tasksRes.data || []);
    } catch (error) {
      console.error('Error fetching portal data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Login successful!');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setClientData(null);
    setMetrics([]);
    setDocuments([]);
    setTasks([]);
    setPassword('');
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-chartreuse/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-chartreuse/5 rounded-full blur-[120px]"></div>
        
        <div className="grid-bg-overlay opacity-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/[0.08] backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative z-10"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="logo-main text-chartreuse text-4xl mb-1 tracking-tighter">TEXH</div>
            <div className="logo-sub text-white/50 tracking-[0.2em] uppercase text-[10px] font-bold">Command Center</div>

          </div>
          
          <h2 className="text-3xl font-black text-white mb-3 text-center tracking-tight">Access Portal</h2>
          <p className="text-white/40 text-center mb-10 text-sm font-medium leading-relaxed">
            Enter your credentials to manage your digital system.
          </p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-black text-white/50 ml-4">Email Address</label>
              <input
                type="email"
                placeholder="sofia@tu-negocio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-chartreuse/50 focus:bg-white/[0.08] transition-all"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-black text-white/50 ml-4">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-chartreuse/50 focus:bg-white/[0.08] transition-all"
                required
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-chartreuse text-obsidian rounded-2xl py-5 font-black text-sm uppercase tracking-widest hover:brightness-110 hover:shadow-[0_20px_40px_-10px_rgba(201,255,31,0.3)] transform active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </div>
          </form>
          
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 p-4 rounded-2xl text-center text-xs font-bold ${message.includes('Error') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-chartreuse/10 text-chartreuse border border-chartreuse/20'}`}
            >
              {message}
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }


  if (dataLoading) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-obsidian/10 border-t-chartreuse rounded-full animate-spin"></div>
          <p className="text-obsidian/40 font-bold tracking-widest uppercase text-xs">Accessing Command Center...</p>
        </div>
      </div>
    );
  }

  if (showAdmin && isAdmin) {
    return <AdminPanel onBack={() => setShowAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-neutral pt-24 pb-20 px-6 lg:px-12 relative overflow-hidden">
      <div className="grid-bg-overlay opacity-5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!clientData ? (
            <motion.div 
              key="no-access"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-20 h-20 bg-obsidian/5 rounded-full flex items-center justify-center mb-6">
                <LayoutDashboard className="w-10 h-10 text-obsidian/20" />
              </div>
              <h2 className="text-4xl font-black text-obsidian mb-4 tracking-tight uppercase">No Access Found</h2>
              <p className="text-obsidian/60 mb-10 max-w-md mx-auto leading-relaxed">
                It seems your account isn't associated with a client profile yet. Please contact the TexhCo team.
              </p>
              <button 
                onClick={handleLogout} 
                className="bg-obsidian text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-obsidian/80 transition-all shadow-xl shadow-obsidian/10"
              >
                Logout Account
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-obsidian p-2.5 rounded-xl shadow-lg shadow-obsidian/10">
                      <LayoutDashboard className="text-chartreuse w-5 h-5" />
                    </div>
                    <span className="text-obsidian/40 font-black text-[10px] uppercase tracking-[0.2em]">Client Command Center</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-black text-obsidian tracking-tighter uppercase leading-[0.85]">
                    Welcome, {clientData.full_name.split(' ')[0]}
                  </h1>
                  <p className="text-obsidian/60 text-lg font-medium">
                    Managing <span className="text-obsidian font-bold border-b-2 border-chartreuse pb-0.5">{clientData.company_name}</span> ecosystem.
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  {isAdmin && (
                    <button 
                      onClick={() => setShowAdmin(true)}
                      className="flex items-center gap-2 bg-white text-obsidian border border-obsidian/10 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-neutral/50 transition-all shadow-sm"
                    >
                      <Settings className="w-4 h-4 text-obsidian/40" />
                      Admin Panel
                    </button>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-obsidian text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-obsidian/80 transition-all shadow-xl shadow-obsidian/20"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </header>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Metrics & Documents */}
                <div className="lg:col-span-2 space-y-10">
                  <StatusBar 
                    currentPhase={clientData.current_phase} 
                    totalPhases={clientData.total_phases} 
                    nextMilestone={clientData.next_milestone_title} 
                  />
                  
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/30 ml-2">Live Performance Pulse</h3>
                    <PulseCards metrics={metrics} />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/30 ml-2">Asset Vault</h3>
                    <Vault documents={documents} />
                  </div>
                </div>

                {/* Right Column: Actions & Support */}
                <div className="space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/30 ml-2">Action Items</h3>
                    <ActionDesk tasks={tasks} onRefresh={fetchPortalData} />
                  </div>


                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-obsidian rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-chartreuse/10 rounded-full blur-3xl group-hover:bg-chartreuse/20 transition-all"></div>
                    <h3 className="text-2xl font-black mb-3 text-chartreuse tracking-tight">Need Support?</h3>
                    <p className="text-white/60 text-sm font-medium leading-relaxed mb-8">
                      Your project strategist is available 24/7 for urgent consultations.
                    </p>
                    <button className="w-full bg-white text-obsidian py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-chartreuse transition-all flex items-center justify-center gap-2 group">
                      Message TexhCo
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

};


export default ClientPortal;

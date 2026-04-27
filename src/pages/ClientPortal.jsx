import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/i18n';
import { 
  LogOut, 
  ArrowRight, 
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';

// Portal Components
import PulseCards from '../components/portal/PulseCards';
import StatusBar from '../components/portal/StatusBar';
import ActionDesk from '../components/portal/ActionDesk';
import Vault from '../components/portal/Vault';

const ClientPortal = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [clientData, setClientData] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const { t } = useLanguage();

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

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/portal',
      },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Check your email for the login link!');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setClientData(null);
    setMetrics([]);
    setDocuments([]);
    setTasks([]);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center p-6">
        <div className="grid-bg-overlay opacity-20"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="logo-main text-chartreuse text-3xl mb-1">TEXH</div>
            <div className="logo-sub text-white/50 tracking-widest uppercase">Command Center</div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Welcome Back</h2>
          <p className="text-white/60 text-center mb-8 text-sm">Enter your email to receive a magic link. No password required.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="sofia@tu-negocio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-chartreuse/50 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-accent radius-extreme py-4 font-bold disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
          
          {message && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-6 text-center text-sm ${message.includes('Error') ? 'text-red-400' : 'text-chartreuse'}`}
            >
              {message}
            </motion.p>
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
          <p className="text-obsidian/40 font-bold tracking-widest uppercase text-xs">Loading Command Center...</p>
        </div>
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-obsidian mb-4">No Access Found</h2>
          <p className="text-obsidian/60 mb-8">It seems your account isn't associated with a client profile yet. Please contact support.</p>
          <button onClick={handleLogout} className="btn btn-primary radius-extreme px-8 py-3">Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-obsidian p-2 rounded-lg">
                <LayoutDashboard className="text-chartreuse w-5 h-5" />
              </div>
              <span className="text-obsidian/50 font-bold text-sm tracking-widest uppercase">Client Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-obsidian">Welcome, {clientData.full_name}</h1>
            <p className="text-obsidian/60 mt-2">Here's how {clientData.company_name} is performing today.</p>
          </motion.div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-obsidian/50 hover:text-obsidian font-bold text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <StatusBar 
              currentPhase={clientData.current_phase} 
              totalPhases={clientData.total_phases} 
              nextMilestone={clientData.next_milestone_title ? { 
                title: clientData.next_milestone_title, 
                date: clientData.next_milestone_date 
              } : null} 
            />
            
            <PulseCards metrics={metrics} />

            <Vault documents={documents} />
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            <ActionDesk tasks={tasks} />

            {/* Support/Contact */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-chartreuse rounded-3xl p-8 text-obsidian shadow-lg shadow-chartreuse/10"
            >
              <h3 className="text-xl font-black mb-2">Need help?</h3>
              <p className="text-obsidian/70 text-sm mb-6">Your dedicated strategist is available for any questions.</p>
              <button className="w-full btn btn-primary radius-extreme py-3 text-sm flex items-center justify-center gap-2">
                Message Support
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ClientPortal;

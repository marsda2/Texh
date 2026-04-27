import React, { useState } from 'react';
import { Activity, Upload, CheckCircle2, Check, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ActionDesk = ({ tasks = [], onRefresh }) => {
  const [completing, setCompleting] = useState(null);

  const handleCompleteTask = async (taskId) => {
    setCompleting(taskId);
    const { error } = await supabase
      .from('tasks')
      .update({ status: 'DONE' })
      .eq('id', taskId);
    
    if (!error) {
      setTimeout(() => {
        setCompleting(null);
        if (onRefresh) onRefresh();
      }, 800);
    } else {
      setCompleting(null);
    }
  };

  return (
    <div className="bg-obsidian rounded-[2.5rem] p-10 text-white h-full shadow-2xl">
      <h3 className="text-2xl font-black flex items-center gap-3 mb-4 text-chartreuse tracking-tighter uppercase">
        <Activity className="w-6 h-6" />
        Action Desk
      </h3>
      <p className="text-white/40 text-sm font-medium mb-10 leading-relaxed">We need these items from you to keep the momentum going.</p>
      
      <div className="space-y-8">
        {tasks.map((task, i) => (
          <div key={task.id || i} className={`p-8 bg-white/5 border border-white/10 rounded-[2.5rem] transition-all hover:bg-white/[0.08] relative group ${task.status === 'DONE' ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-black text-lg text-white tracking-tight leading-none">{task.title}</h4>
              <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg ${task.status === 'DONE' ? 'bg-green-500/20 text-green-400' : 'bg-chartreuse text-obsidian'}`}>
                {task.status}
              </span>
            </div>
            <p className="text-sm text-white/60 font-medium leading-relaxed mb-8">{task.description}</p>
            
            {task.status !== 'DONE' && (
              <button 
                onClick={() => handleCompleteTask(task.id)}
                disabled={completing === task.id}
                className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl ${
                  task.type === 'upload' 
                    ? 'bg-white text-obsidian hover:bg-chartreuse' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {completing === task.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : task.type === 'upload' ? (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Assets
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Mark as Done
                  </>
                )}
              </button>
            )}

            {task.status === 'DONE' && (
              <div className="flex items-center gap-2 text-green-400 text-[10px] font-black uppercase tracking-widest mt-2">
                <Check className="w-4 h-4" />
                Task Completed
              </div>
            )}
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
            <CheckCircle2 className="w-12 h-12 text-chartreuse/20 mx-auto mb-4" />
            <p className="text-xs text-white/40 font-black uppercase tracking-widest">All tasks completed</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default ActionDesk;


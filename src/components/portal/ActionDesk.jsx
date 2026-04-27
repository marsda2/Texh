import React from 'react';
import { Activity, Upload } from 'lucide-react';

const ActionDesk = ({ tasks = [] }) => {
  return (
    <div className="bg-obsidian rounded-3xl p-8 text-white h-full">
      <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-chartreuse">
        <Activity className="w-5 h-5" />
        Action Desk
      </h3>
      <p className="text-white/60 text-sm mb-6">We need these items from you to keep the momentum going.</p>
      
      <div className="space-y-6">
        {tasks.map((task, i) => (
          <div key={i} className={`p-6 bg-white/5 border border-white/10 rounded-[2rem] transition-all hover:bg-white/[0.08] ${task.status === 'DONE' ? 'opacity-40 grayscale' : ''}`}>
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-extrabold text-base text-white tracking-tight">{task.title}</h4>
              <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${task.status === 'DONE' ? 'bg-green-500/20 text-green-400' : 'bg-chartreuse text-obsidian'}`}>
                {task.status}
              </span>
            </div>
            <p className="text-sm text-white/70 font-medium leading-relaxed mb-6">{task.description}</p>
            {task.status !== 'DONE' && task.type === 'upload' && (
              <button className="w-full flex items-center justify-center gap-2 bg-white text-obsidian py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-chartreuse transition-all shadow-xl shadow-black/20">
                <Upload className="w-4 h-4" />
                Upload Files
              </button>
            )}
          </div>
        ))}

        {tasks.length === 0 && (
          <p className="text-xs text-white/40 text-center py-4">No pending actions. You're all set!</p>
        )}
      </div>
    </div>
  );
};

export default ActionDesk;


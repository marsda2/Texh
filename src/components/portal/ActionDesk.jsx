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
          <div key={i} className={`p-4 bg-white/5 border border-white/10 rounded-2xl ${task.status === 'DONE' ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-sm">{task.title}</h4>
              <span className={`text-[10px] font-bold px-2 py-1 rounded ${task.status === 'DONE' ? 'bg-green-500/20 text-green-400' : 'bg-white/10'}`}>
                {task.status}
              </span>
            </div>
            <p className="text-xs text-white/50 mb-4">{task.description}</p>
            {task.status !== 'DONE' && task.type === 'upload' && (
              <button className="w-full flex items-center justify-center gap-2 bg-chartreuse text-obsidian py-2 rounded-xl text-xs font-bold hover:brightness-110 transition-all">
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


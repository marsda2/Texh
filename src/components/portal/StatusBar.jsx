import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2 } from 'lucide-react';

const StatusBar = ({ currentPhase = 2, totalPhases = 4, nextMilestone }) => {
  const percentage = (currentPhase / totalPhases) * 100;
  
  const phases = ['Audit', 'Setup', 'Automation', 'Growth'];

  return (
    <div className="bg-white rounded-3xl p-8 border border-obsidian/5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-chartreuse" />
          Project Status
        </h3>
        <span className="text-xs font-bold bg-chartreuse/10 text-obsidian px-3 py-1 rounded-full uppercase tracking-wider">
          Phase {currentPhase} of {totalPhases}
        </span>
      </div>
      
      <div className="relative h-3 bg-neutral rounded-full overflow-hidden mb-4">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-obsidian rounded-full"
        ></motion.div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 text-[10px] md:text-xs font-bold uppercase tracking-tighter md:tracking-widest text-obsidian/40">
        {phases.map((phase, i) => (
          <div key={i} className={i < currentPhase ? "text-obsidian" : ""}>
            {phase}
          </div>
        ))}
      </div>
      
      {nextMilestone && (
        <div className="mt-8 pt-8 border-t border-neutral">
          <p className="text-sm font-bold text-obsidian/40 mb-4 uppercase tracking-widest">Next Milestone</p>
          <div className="flex items-start gap-4">
            <div className="bg-chartreuse rounded-full p-2 mt-1">
              <CheckCircle2 className="w-4 h-4 text-obsidian" />
            </div>
            <div>
              <h4 className="font-bold text-obsidian">{nextMilestone.title}</h4>
              <p className="text-sm text-obsidian/60">Estimated completion: {nextMilestone.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusBar;

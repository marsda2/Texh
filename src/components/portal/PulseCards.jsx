import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MousePointer2, Users, Layout, Zap, Target, Activity } from 'lucide-react';

const iconMap = {
  Users,
  MousePointer2,
  TrendingUp,
  Layout,
  Zap,
  Target,
  Activity
};


const PulseCards = ({ metrics = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, i) => {
        const Icon = iconMap[metric.icon_name] || Activity;
        return (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-3xl p-6 border border-obsidian/5 shadow-sm hover:shadow-xl hover:shadow-obsidian/5 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-neutral p-3 rounded-2xl group-hover:bg-obsidian group-hover:text-chartreuse transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                {metric.trend}
              </span>
            </div>
            <div className="text-3xl font-black text-obsidian mb-1">{metric.value}</div>
            <div className="text-sm font-bold text-obsidian/40 uppercase tracking-widest">{metric.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PulseCards;


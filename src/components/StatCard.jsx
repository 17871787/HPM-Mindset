import React from 'react';

export default function StatCard({ icon, label, value, gradient, darkMode }) {
  return (
    <div className={`rounded-xl p-4 backdrop-blur-md ${
      darkMode ? 'bg-white/10' : 'bg-white/70'
    } border ${darkMode ? 'border-white/20' : 'border-white/50'} hover:scale-105 transition-transform`}>
      <div className={`flex items-center gap-2 mb-2 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
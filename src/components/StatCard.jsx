import React from 'react';

const StatCard = ({ label, value, subvalue, change, icon, iconBg = 'rgba(255, 255, 255, 0.1)' }) => {
  return (
    <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl shadow-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-5">
        <div className="text-sm uppercase tracking-wider font-bold text-white">
          {label}
        </div>
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl text-white"
          style={{ backgroundColor: iconBg }}
        >
          <i className={icon}></i>
        </div>
      </div>
      
      <div className="text-4xl font-extrabold text-white mb-2">
        {value}
      </div>
      
      <div className="text-sm font-semibold text-white/90 mb-3">
        {subvalue}
      </div>
      
      <div className="flex items-center gap-1.5 text-sm font-bold text-white/90">
        <i className="fas fa-arrow-up text-green-400"></i>
        <span>{change}</span>
      </div>
    </div>
  );
};

export default StatCard;
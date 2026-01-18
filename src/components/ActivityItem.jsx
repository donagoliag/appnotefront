import React from 'react';

const ActivityItem = ({ icon, title, time, iconColor = 'rgba(255, 255, 255, 0.1)' }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/15 hover:translate-x-1">
      <div 
        className="w-11 h-11 rounded-xl flex items-center justify-center text-lg text-white flex-shrink-0"
        style={{ backgroundColor: iconColor }}
      >
        <i className={icon}></i>
      </div>
      
      <div className="flex-1">
        <div className="text-sm font-bold text-white mb-1">
          {title}
        </div>
        <div className="text-xs text-white/70 font-medium">
          {time}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
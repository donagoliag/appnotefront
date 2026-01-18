import React from 'react';

const StudentRow = ({ name, level, matricule, filiere, moyenne, rang, initials }) => {
  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 hover:translate-x-1">
      <td className="py-4 px-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
            {initials}
          </div>
          <div>
            <div className="text-sm font-bold text-white">{name}</div>
            <div className="text-xs text-white/70">{level}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-3 text-sm text-white/90">{matricule}</td>
      <td className="py-4 px-3 text-sm text-white/90">{filiere}</td>
      <td className="py-4 px-3">
        <span className="inline-block px-3 py-1.5 rounded-lg bg-white/15 border border-white/20 text-sm font-bold text-white">
          {moyenne}/20
        </span>
      </td>
      <td className="py-4 px-3 text-sm font-bold text-white">{rang}</td>
    </tr>
  );
};

export default StudentRow;
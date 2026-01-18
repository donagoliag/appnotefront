// src/components/teachers/TeacherCard.jsx
import React from 'react';
import { Edit2, Trash2, Mail, GraduationCap, UserCircle } from 'lucide-react';

const TeacherCard = ({ teacher }) => {
  return (
    <div className="bg-black/50 backdrop-blur-xl border border-white/15 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 flex flex-col">
      {/* Header */}
      <div className="bg-white/10 p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-white/10 rounded-full shadow-lg flex items-center justify-center text-white text-4xl">
          <UserCircle size={36} />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{teacher.name}</h3>
        <p className="text-[13px] text-white/80 font-semibold">{teacher.code}</p>
      </div>

      {/* Info Section - flex-1 pour pousser les actions en bas */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Email */}
        <div className="flex items-start mb-3 text-[13px]">
          <div className="w-8 flex-shrink-0">
            <Mail size={14} className="text-white/80" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] text-white/80 font-medium uppercase tracking-wide mb-1">Email</div>
            <div className="text-white font-semibold">{teacher.email}</div>
          </div>
        </div>

        {/* Grade */}
        <div className="flex items-start mb-3 text-[13px]">
          <div className="w-8 flex-shrink-0">
            <GraduationCap size={14} className="text-white/80" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] text-white/80 font-medium uppercase tracking-wide mb-1">Grade</div>
            <div className="text-white font-semibold">{teacher.grade}</div>
          </div>
        </div>

        <div className="h-px bg-white/15 my-4"></div>

        {/* Courses Section - flex-1 pour occuper l'espace disponible */}
        <div className="flex-1">
          <div className="text-[11px] text-white/80 font-semibold uppercase tracking-wide mb-2.5">
            Cours enseignés ({teacher.courses.length})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {teacher.courses.map((course, idx) => (
              <span 
                key={idx} 
                className="inline-block px-3 py-1.5 bg-white/10 rounded-lg text-xs font-semibold text-white"
              >
                {course}
              </span>
            ))}
          </div>
        </div>

        {/* Actions - toujours en bas grâce au flex-col parent */}
        <div className="flex gap-2 mt-5">
          <button className="flex-1 p-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 transition-all flex items-center justify-center gap-2 text-white text-[13px] font-semibold">
            <Edit2 size={14} />
            <span>Modifier</span>
          </button>
          <button className="flex-1 p-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-[#ff6b6b] hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 text-[13px] font-semibold">
            <Trash2 size={14} />
            <span>Supprimer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
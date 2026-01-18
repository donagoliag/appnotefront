// src/components/students/StudentCard.jsx
import React from 'react';
import { Edit2, Trash2, User } from 'lucide-react';

const StudentCard = ({ student, onEdit, onDelete }) => {
  const getProgressClass = (percentage) => {
    if (percentage >= 80) return 'bg-white/90';
    if (percentage >= 70) return 'bg-white/60';
    if (percentage > 0) return 'bg-white/40';
    return '';
  };

  return (
    <div className="bg-black/50 backdrop-blur-xl border border-white/15 p-6 rounded-3xl shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5">
      <div className="w-[100px] h-[100px] mx-auto mb-5 bg-white/10 rounded-2xl flex items-center justify-center text-white text-4xl">
        <User size={36} />
      </div>

      <div className="text-center">
        <h3 className="text-lg font-bold mb-1 text-white">{student.name}</h3>
        <p className="text-[0.85rem] text-white/80 mb-5">{student.matricule}</p>

        {[
          { label: 'Email', value: student.email },
          { label: 'Téléphone', value: student.phone },
          { label: 'Date de naissance', value: student.birthdate },
          { label: 'Genre', value: student.genre },
          { label: 'Filière', value: student.filiere },
        ].map((info, idx) => (
          <div key={idx} className="flex justify-between items-center mb-2 text-[0.85rem]">
            <span className="text-white/80 font-medium">{info.label}</span>
            <span className="text-white font-semibold">{info.value}</span>
          </div>
        ))}

        <div className="h-px bg-white/10 my-5"></div>

        <div className="my-5 space-y-3">
          {student.semesters.map((sem, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-[0.8rem] font-semibold mb-1.5 text-white">
                <span>{sem.name}</span>
                <span>{sem.grade ? `${sem.grade}/20` : '-'}</span>
              </div>
              <div className="h-2 bg-white/5 rounded overflow-hidden">
                <div
                  className={`h-full rounded transition-all duration-300 ${getProgressClass(sem.percentage)}`}
                  style={{ width: `${sem.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={() => onEdit && onEdit(student)}
            className="flex-1 p-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-white text-[0.85rem] font-semibold"
          >
            <Edit2 size={14} />
            <span>Modifier</span>
          </button>
          <button
            onClick={() => onDelete && onDelete(student)}
            className="flex-1 p-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-[#ff6b6b] hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 text-[0.85rem] font-semibold"
          >
            <Trash2 size={14} />
            <span>Supprimer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
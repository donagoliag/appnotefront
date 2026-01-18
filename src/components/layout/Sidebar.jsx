import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  const navItems = [
    { id: 'home', path: '/', icon: 'fas fa-home', label: 'Tableau de bord' },
    { id: 'students', path: '/students', icon: 'fas fa-user-graduate', label: 'Étudiants' },
    { id: 'grades', path: '/grades', icon: 'fas fa-clipboard-list', label: 'Gestion Notes' },
    { id: 'teachers', path: '/teachers', icon: 'fas fa-chalkboard-teacher', label: 'Enseignants' },
    { id: 'ecues', path: '/ecues', icon: 'fas fa-book-open', label: 'ECUEs-UEs' },
    { id: 'bulletins', path: '/bulletins', icon: 'fas fa-file-alt', label: 'Bulletins' },
    { id: 'settings', path: '/settings', icon: 'fas fa-cog', label: 'Paramètres' },
  ];

  return (
    <aside className="fixed left-5 top-5 bottom-5 w-72 bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl shadow-2xl p-6 flex flex-col z-10">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center font-black text-black text-lg">
          GF
        </div>
        <h2 className="text-xl font-bold text-white">GradeFlow</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                ? 'bg-white/10 border border-white/20 text-white translate-x-1'
                : 'text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
              }`
            }
          >
            <i className={`${item.icon} w-5 text-center`}></i>
            <span className="text-sm font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="mt-auto bg-black/50 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-black text-sm">
          PA
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Prof. Amoussou</h4>
          <p className="text-xs text-gray-400">Admin</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
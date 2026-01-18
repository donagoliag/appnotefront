// src/components/teachers/TeachersToolbar.jsx
import React, { useState } from 'react';
import { Search, ChevronDown, Check, Plus, ArrowUpDown } from 'lucide-react';

const TeachersToolbar = ({ sortOrder, onSortChange, onSearch, onAddClick, showForm }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sortOptions = [
    { value: 'asc', label: 'A-Z (Nom)' },
    { value: 'desc', label: 'Z-A (Nom)' },
  ];

  return (
    <div className="flex gap-3 mb-8 flex-wrap items-center">
      {/* Search */}
      <div className="flex-1 min-w-[300px] relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80" />
        <input
          type="text"
          placeholder="Rechercher par nom, prénom ou code..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm text-white placeholder-white/80 text-sm font-medium focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="relative min-w-[200px]">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full p-3 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all flex items-center justify-between text-white font-semibold text-sm"
        >
          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} />
            <span>Tri: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
          </div>
          <ChevronDown size={12} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute top-full mt-2 w-full bg-black/40 backdrop-blur-2xl rounded-xl border border-white/15 shadow-2xl z-50 p-2">
            {sortOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setDropdownOpen(false);
                }}
                className={`p-3 rounded-lg cursor-pointer flex items-center justify-between transition-all ${sortOrder === option.value
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <span className="text-sm font-semibold">{option.label}</span>
                {sortOrder === option.value && <Check size={12} />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Button */}
      <button
        onClick={onAddClick}
        className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 font-semibold text-sm ${showForm ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-white/90'}`}
      >
        {showForm ? <i className="fas fa-times" /> : <Plus size={16} />}
        {showForm ? 'Annuler' : 'Nouvel Enseignant'}
      </button>
    </div>
  );
};

export default TeachersToolbar;
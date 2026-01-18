// src/components/students/FiltersBar.jsx
import React, { useState } from 'react';
import { Filter, Search, ChevronDown, Check, UserCircle } from 'lucide-react';

const FiltersBar = ({ filters, onFilterChange, onSearch }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const filiereOptions = [
    { value: 'all', label: 'Toutes les filières' },
    { value: 'GL', label: 'Génie Logiciel (GL)' },
    { value: 'SI', label: 'Systèmes d\'Information (SI)' },
    { value: 'SIRI', label: 'Sécurité Informatique (SIRI)' },
  ];

  const genreOptions = [
    { value: 'all', label: 'Tous les genres' },
    { value: 'Masculin', label: 'Masculin' },
    { value: 'Féminin', label: 'Féminin' },
  ];

  const Dropdown = ({ id, icon, label, options, value, onChange }) => (
    <div className="relative min-w-[200px]">
      <button
        className="w-full p-3 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all flex items-center justify-between text-white font-semibold text-sm"
        onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        <ChevronDown size={12} className={`transition-transform ${openDropdown === id ? 'rotate-180' : ''}`} />
      </button>

      {openDropdown === id && (
        <div className="absolute top-full mt-2 w-full bg-black/40 backdrop-blur-2xl rounded-xl border border-white/15 shadow-2xl z-50 p-2">
          {options.map((option) => (
            <div
              key={option.value}
              className={`p-3 rounded-lg cursor-pointer flex items-center justify-between transition-all ${
                value === option.value ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`}
              onClick={() => {
                onChange(option.value);
                setOpenDropdown(null);
              }}
            >
              <span className="text-sm font-semibold">{option.label}</span>
              {value === option.value && <Check size={12} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex gap-4 mb-8 flex-wrap items-center">
      {/* Master Filter */}
      <div className="bg-white/5 border border-white/15 rounded-xl p-1.5 flex gap-2">
        {[1, 2].map((master) => (
          <button
            key={master}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              filters.master === master
                ? 'bg-white/10 text-white'
                : 'text-white/80 hover:text-white'
            }`}
            onClick={() => onFilterChange('master', master)}
          >
            Master {master}
          </button>
        ))}
      </div>

      <Dropdown
        id="filiere"
        icon={<Filter size={16} />}
        label={`Filière: ${filters.filiere === 'all' ? 'Toutes' : filters.filiere}`}
        options={filiereOptions}
        value={filters.filiere}
        onChange={(value) => onFilterChange('filiere', value)}
      />

      <Dropdown
        id="genre"
        icon={<UserCircle size={16} />}
        label={`Genre: ${filters.genre === 'all' ? 'Tous' : filters.genre}`}
        options={genreOptions}
        value={filters.genre}
        onChange={(value) => onFilterChange('genre', value)}
      />

      {/* Search */}
      <div className="flex-1 max-w-[400px] relative">
        <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80" />
        <input
          type="text"
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm text-white placeholder-white/80 text-sm font-medium focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
          placeholder="Rechercher par nom, prénom ou matricule..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FiltersBar;
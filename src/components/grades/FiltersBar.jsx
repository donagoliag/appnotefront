import { useState } from 'react';

const FiltersBar = ({ 
  currentMaster, 
  onMasterChange, 
  currentFiliere, 
  onFiliereChange,
  currentSemestre,
  onSemestreChange,
  currentSort,
  onSortChange,
  onSearch
}) => {
  const [showFiliereMenu, setShowFiliereMenu] = useState(false);
  const [showSemestreMenu, setShowSemestreMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filieres = [
    { value: 'GL', label: 'Génie Logiciel (GL)' },
    { value: 'SI', label: 'Systèmes d\'Information (SI)' },
    { value: 'SIRI', label: 'Sécurité Informatique (SIRI)' }
  ];

  const getSemestreOptions = () => {
    if (currentMaster === 1) {
      return [
        { value: '1', label: 'Semestre 1' },
        { value: '2', label: 'Semestre 2' },
        { value: 'recap', label: 'Récapitulatif Annuel' }
      ];
    }
    return [
      { value: '3', label: 'Semestre 3' },
      { value: '4', label: 'Semestre 4' },
      { value: 'recap', label: 'Récapitulatif Annuel' }
    ];
  };

  const sortOptions = [
    { value: 'alpha', label: 'Ordre Alphabétique' },
    { value: 'grade', label: 'Ordre par Moyenne' }
  ];

  return (
    <div className="flex gap-3 mb-8 flex-wrap items-center">
      {/* Master Filter */}
      <div className="flex gap-2 bg-white/5 p-1.5 rounded-xl border border-white/15">
        <button
          onClick={() => onMasterChange(1)}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            currentMaster === 1
              ? 'bg-white/10 text-white'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Master 1
        </button>
        <button
          onClick={() => onMasterChange(2)}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            currentMaster === 2
              ? 'bg-white/10 text-white'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Master 2
        </button>
      </div>

      {/* Filiere Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setShowFiliereMenu(!showFiliereMenu);
            setShowSemestreMenu(false);
            setShowSortMenu(false);
          }}
          className="px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm font-semibold flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
        >
          <i className="fas fa-graduation-cap"></i>
          <span>Filière: {currentFiliere}</span>
          <i className="fas fa-chevron-down"></i>
        </button>
        {showFiliereMenu && (
          <div className="absolute top-full left-0 mt-2 bg-black/40 backdrop-blur-3xl rounded-xl border border-white/15 shadow-2xl p-2 min-w-[200px] z-10">
            {filieres.map(filiere => (
              <div
                key={filiere.value}
                onClick={() => {
                  onFiliereChange(filiere.value);
                  setShowFiliereMenu(false);
                }}
                className={`px-4 py-2.5 rounded-lg cursor-pointer text-sm font-semibold transition-all ${
                  currentFiliere === filiere.value
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:bg-white/8 hover:text-white'
                }`}
              >
                {filiere.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Semestre Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setShowSemestreMenu(!showSemestreMenu);
            setShowFiliereMenu(false);
            setShowSortMenu(false);
          }}
          className="px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm font-semibold flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
        >
          <i className="fas fa-calendar-alt"></i>
          <span>
            {currentSemestre === 'recap' 
              ? 'Récapitulatif Annuel' 
              : `Semestre ${currentSemestre}`}
          </span>
          <i className="fas fa-chevron-down"></i>
        </button>
        {showSemestreMenu && (
          <div className="absolute top-full left-0 mt-2 bg-black/40 backdrop-blur-3xl rounded-xl border border-white/15 shadow-2xl p-2 min-w-[200px] z-10">
            {getSemestreOptions().map(sem => (
              <div
                key={sem.value}
                onClick={() => {
                  onSemestreChange(sem.value);
                  setShowSemestreMenu(false);
                }}
                className={`px-4 py-2.5 rounded-lg cursor-pointer text-sm font-semibold transition-all ${
                  currentSemestre === sem.value
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:bg-white/8 hover:text-white'
                }`}
              >
                {sem.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setShowSortMenu(!showSortMenu);
            setShowFiliereMenu(false);
            setShowSemestreMenu(false);
          }}
          className="px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-sm font-semibold flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
        >
          <i className="fas fa-sort"></i>
          <span>{sortOptions.find(s => s.value === currentSort)?.label}</span>
          <i className="fas fa-chevron-down"></i>
        </button>
        {showSortMenu && (
          <div className="absolute top-full left-0 mt-2 bg-black/40 backdrop-blur-3xl rounded-xl border border-white/15 shadow-2xl p-2 min-w-[200px] z-10">
            {sortOptions.map(sort => (
              <div
                key={sort.value}
                onClick={() => {
                  onSortChange(sort.value);
                  setShowSortMenu(false);
                }}
                className={`px-4 py-2.5 rounded-lg cursor-pointer text-sm font-semibold transition-all ${
                  currentSort === sort.value
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:bg-white/8 hover:text-white'
                }`}
              >
                {sort.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Box */}
      <div className="flex-1 max-w-md relative">
        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/80"></i>
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Rechercher par nom, prénom ou matricule..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white text-sm font-medium placeholder-white/80 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all backdrop-blur-sm"
        />
      </div>
    </div>
  );
};

export default FiltersBar;
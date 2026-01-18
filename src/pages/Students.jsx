// src/pages/Students.jsx
import React, { useState, useMemo } from 'react';
import Sidebar from '../components/layout/Sidebar';
import StudentCard from '../components/students/StudentCard';
import FiltersBar from '../components/students/FiltersBar';
import { Download, Plus, UserX } from 'lucide-react';

const Students = () => {
  const [filters, setFilters] = useState({
    master: 1,
    filiere: 'all',
    genre: 'all',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const studentsData = [
    {
      name: 'Kouadio Ama',
      matricule: 'IFRI2024M001',
      email: 'ama.k@ifri.edu',
      phone: '+229 97 12 34 56',
      birthdate: '15/03/2001',
      genre: 'Féminin',
      filiere: 'SI',
      master: 1,
      semesters: [
        { name: 'Semestre 1', grade: 17.8, percentage: 89 },
        { name: 'Semestre 2', grade: 16.5, percentage: 83 },
        { name: 'Semestre 3', grade: 15.2, percentage: 76 },
        { name: 'Semestre 4', grade: null, percentage: 0 }
      ]
    },
    {
      name: 'Yao Koffi',
      matricule: 'IFRI2024M002',
      email: 'koffi.y@ifri.edu',
      phone: '+229 96 45 67 89',
      birthdate: '22/07/2000',
      genre: 'Masculin',
      filiere: 'GL',
      master: 1,
      semesters: [
        { name: 'Semestre 1', grade: 16.2, percentage: 81 },
        { name: 'Semestre 2', grade: 15.8, percentage: 79 },
        { name: 'Semestre 3', grade: 14.5, percentage: 73 },
        { name: 'Semestre 4', grade: null, percentage: 0 }
      ]
    },
    {
      name: 'Bah Aminata',
      matricule: 'IFRI2024M003',
      email: 'aminata.b@ifri.edu',
      phone: '+229 95 78 90 12',
      birthdate: '10/11/2001',
      genre: 'Féminin',
      filiere: 'SIRI',
      master: 1,
      semesters: [
        { name: 'Semestre 1', grade: 15.9, percentage: 80 },
        { name: 'Semestre 2', grade: 16.8, percentage: 84 },
        { name: 'Semestre 3', grade: 13.2, percentage: 66 },
        { name: 'Semestre 4', grade: null, percentage: 0 }
      ]
    },
    {
      name: 'Soro Oumar',
      matricule: 'IFRI2024M004',
      email: 'oumar.s@ifri.edu',
      phone: '+229 94 23 45 67',
      birthdate: '05/09/2000',
      genre: 'Masculin',
      filiere: 'SI',
      master: 1,
      semesters: [
        { name: 'Semestre 1', grade: 14.3, percentage: 72 },
        { name: 'Semestre 2', grade: 15.1, percentage: 76 },
        { name: 'Semestre 3', grade: 13.9, percentage: 69 },
        { name: 'Semestre 4', grade: null, percentage: 0 }
      ]
    }
  ];

  const filteredStudents = useMemo(() => {
    return studentsData.filter(student => {
      const matchMaster = student.master === filters.master;
      const matchFiliere = filters.filiere === 'all' || student.filiere === filters.filiere;
      const matchGenre = filters.genre === 'all' || student.genre === filters.genre;
      const matchSearch = searchQuery === '' || 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.matricule.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchMaster && matchFiliere && matchGenre && matchSearch;
    });
  }, [filters, searchQuery]);

  return (
    <div 
      className="flex min-h-screen bg-cover bg-center bg-no-repeat bg-fixed overflow-x-hidden"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/image1.jpg')`
      }}
    >
      <Sidebar />
      
      <main className="flex-1 p-10 pr-10 overflow-y-auto h-screen">
        {/* Header */}
        <header className="flex justify-between items-start mb-9">
          <div>
            <h1 className="text-[2.2rem] font-bold tracking-tight mb-1 text-white">Étudiants</h1>
            <p className="text-white/80 text-[15px]">Gestion des étudiants et leurs informations</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-black/50 border border-white/15 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-all hover:bg-white/15 hover:border-white/30">
              <Download size={16} />
              Exporter
            </button>
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2.5 transition-all hover:bg-white/90">
              <Plus size={16} />
              Nouvel Étudiant
            </button>
          </div>
        </header>

        <FiltersBar 
          filters={filters}
          onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
          onSearch={setSearchQuery}
        />

        {/* Students Grid */}
        <div className="grid grid-cols-4 gap-6">
          {filteredStudents.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-black/50 backdrop-blur-xl border border-white/15 rounded-3xl">
              <UserX size={48} className="mx-auto mb-4 text-white opacity-30" />
              <p className="text-lg font-semibold text-white mb-2">Aucun étudiant trouvé</p>
              <span className="text-sm text-white/80">Essayez de modifier vos filtres</span>
            </div>
          ) : (
            filteredStudents.map((student, index) => (
              <StudentCard key={index} student={student} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Students;
// src/pages/Teachers.jsx
import React, { useState, useMemo } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TeacherCard from '../components/teachers/TeacherCard';
import TeachersToolbar from '../components/teachers/TeachersToolbar';
import { UserX } from 'lucide-react';

const Teachers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const teachersData = [
    {
      name: 'HOUNKONNOU Marc',
      code: 'ENS001',
      email: 'marc.hounkonnou@ifri.edu',
      grade: 'Professeur Titulaire',
      courses: ['Algorithmique Avancée', 'Structures de Données', 'Intelligence Artificielle']
    },
    {
      name: 'GLELE KAKAI Romain',
      code: 'ENS002',
      email: 'romain.glele@ifri.edu',
      grade: 'Professeur',
      courses: ['Base de Données', 'Systèmes d\'Information']
    },
    {
      name: 'AMOUSSOU Jean',
      code: 'ENS003',
      email: 'jean.amoussou@ifri.edu',
      grade: 'Maître de Conférences',
      courses: ['Programmation Web', 'Développement Mobile', 'Architecture Logicielle']
    },
    {
      name: 'DOSSOU Marie',
      code: 'ENS004',
      email: 'marie.dossou@ifri.edu',
      grade: 'Maître Assistant',
      courses: ['Réseaux Informatiques', 'Sécurité des Systèmes']
    },
    {
      name: 'KOUDJO Pierre',
      code: 'ENS005',
      email: 'pierre.koudjo@ifri.edu',
      grade: 'Professeur',
      courses: ['Génie Logiciel', 'Gestion de Projets', 'UML']
    },
    {
      name: 'SOSSOU Élise',
      code: 'ENS006',
      email: 'elise.sossou@ifri.edu',
      grade: 'Maître de Conférences',
      courses: ['Cryptographie', 'Blockchain', 'Sécurité Informatique']
    }
  ];

  const filteredTeachers = useMemo(() => {
    // Filter
    let filtered = teachersData.filter(teacher => {
      const matchSearch = searchQuery === '' || 
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchSearch;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    return filtered;
  }, [searchQuery, sortOrder]);

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
        <header className="mb-9">
          <div className="mb-6">
            <h1 className="text-[2.2rem] font-bold tracking-tight mb-1 text-white">Enseignants</h1>
            <p className="text-white/80 text-[15px]">Gestion des enseignants et leurs cours</p>
          </div>

          <TeachersToolbar 
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            onSearch={setSearchQuery}
          />
        </header>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-black/50 backdrop-blur-xl border border-white/15 rounded-3xl">
              <UserX size={48} className="mx-auto mb-4 text-white opacity-30" />
              <p className="text-lg font-semibold text-white mb-2">Aucun enseignant trouvé</p>
              <span className="text-sm text-white/80">Essayez de modifier votre recherche</span>
            </div>
          ) : (
            filteredTeachers.map((teacher, index) => (
              <TeacherCard key={index} teacher={teacher} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Teachers;
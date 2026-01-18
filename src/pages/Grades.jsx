import { useState, useMemo } from 'react';
import FiltersBar from '../components/grades/FiltersBar';
import StudentRow from '../components/grades/StudentRow';

const studentsData = [
  {
    name: 'Kouadio Ama',
    matricule: 'IFRI2024M001',
    master: 1,
    filiere: 'SI',
    semesters: {
      1: { percentage: 89, moyenne: 17.8, ues: [
        { name: 'UE1: Programmation Avancée', ecues: [
          { name: 'POO Java', note: 18.5 },
          { name: 'C++', note: 17.0 }
        ]},
        { name: 'UE2: Base de Données', ecues: [
          { name: 'SQL', note: 19.0 },
          { name: 'NoSQL', note: 16.5 }
        ]},
        { name: 'UE3: Réseaux', ecues: [
          { name: 'TCP/IP', note: 18.0 },
          { name: 'Sécurité', note: 17.5 }
        ]}
      ]},
      2: { percentage: 83, moyenne: 16.5, ues: [
        { name: 'UE1: Développement Web', ecues: [
          { name: 'HTML/CSS', note: 17.0 },
          { name: 'JavaScript', note: 16.0 }
        ]},
        { name: 'UE2: Architecture', ecues: [
          { name: 'MVC', note: 16.5 },
          { name: 'Microservices', note: 16.0 }
        ]},
        { name: 'UE3: Cloud', ecues: [
          { name: 'AWS', note: 17.0 },
          { name: 'Docker', note: 16.5 }
        ]}
      ]}
    }
  },
  {
    name: 'Yao Koffi',
    matricule: 'IFRI2024M002',
    master: 1,
    filiere: 'GL',
    semesters: {
      1: { percentage: 81, moyenne: 16.2, ues: [
        { name: 'UE1: Programmation Avancée', ecues: [
          { name: 'POO Java', note: 16.5 },
          { name: 'C++', note: 15.5 }
        ]},
        { name: 'UE2: Base de Données', ecues: [
          { name: 'SQL', note: 17.0 },
          { name: 'NoSQL', note: 15.0 }
        ]},
        { name: 'UE3: Réseaux', ecues: [
          { name: 'TCP/IP', note: 16.5 },
          { name: 'Sécurité', note: 16.0 }
        ]}
      ]},
      2: { percentage: 79, moyenne: 15.8, ues: [
        { name: 'UE1: Développement Web', ecues: [
          { name: 'HTML/CSS', note: 16.0 },
          { name: 'JavaScript', note: 15.5 }
        ]},
        { name: 'UE2: Architecture', ecues: [
          { name: 'MVC', note: 15.5 },
          { name: 'Microservices', note: 16.0 }
        ]},
        { name: 'UE3: Cloud', ecues: [
          { name: 'AWS', note: 15.5 },
          { name: 'Docker', note: 16.0 }
        ]}
      ]}
    }
  },
  {
    name: 'Bah Aminata',
    matricule: 'IFRI2024M003',
    master: 1,
    filiere: 'SIRI',
    semesters: {
      1: { percentage: 80, moyenne: 15.9, ues: [
        { name: 'UE1: Programmation Avancée', ecues: [
          { name: 'POO Java', note: 16.0 },
          { name: 'C++', note: 15.5 }
        ]},
        { name: 'UE2: Base de Données', ecues: [
          { name: 'SQL', note: 16.5 },
          { name: 'NoSQL', note: 15.0 }
        ]},
        { name: 'UE3: Réseaux', ecues: [
          { name: 'TCP/IP', note: 16.0 },
          { name: 'Sécurité', note: 15.5 }
        ]}
      ]},
      2: { percentage: 84, moyenne: 16.8, ues: [
        { name: 'UE1: Développement Web', ecues: [
          { name: 'HTML/CSS', note: 17.0 },
          { name: 'JavaScript', note: 16.5 }
        ]},
        { name: 'UE2: Architecture', ecues: [
          { name: 'MVC', note: 16.5 },
          { name: 'Microservices', note: 17.0 }
        ]},
        { name: 'UE3: Cloud', ecues: [
          { name: 'AWS', note: 17.0 },
          { name: 'Docker', note: 16.5 }
        ]}
      ]}
    }
  },
  {
    name: 'Traoré Fatoumata',
    matricule: 'IFRI2024M005',
    master: 1,
    filiere: 'GL',
    semesters: {
      1: { percentage: 76, moyenne: 15.2, ues: [
        { name: 'UE1: Programmation Avancée', ecues: [
          { name: 'POO Java', note: 15.5 },
          { name: 'C++', note: 14.5 }
        ]},
        { name: 'UE2: Base de Données', ecues: [
          { name: 'SQL', note: 16.0 },
          { name: 'NoSQL', note: 14.0 }
        ]},
        { name: 'UE3: Réseaux', ecues: [
          { name: 'TCP/IP', note: 15.5 },
          { name: 'Sécurité', note: 15.0 }
        ]}
      ]},
      2: { percentage: 73, moyenne: 14.6, ues: [
        { name: 'UE1: Développement Web', ecues: [
          { name: 'HTML/CSS', note: 15.0 },
          { name: 'JavaScript', note: 14.0 }
        ]},
        { name: 'UE2: Architecture', ecues: [
          { name: 'MVC', note: 14.5 },
          { name: 'Microservices', note: 15.0 }
        ]},
        { name: 'UE3: Cloud', ecues: [
          { name: 'AWS', note: 14.5 },
          { name: 'Docker', note: 15.0 }
        ]}
      ]}
    }
  },
  {
    name: 'Diallo Mamadou',
    matricule: 'IFRI2024M006',
    master: 1,
    filiere: 'GL',
    semesters: {
      1: { percentage: 71, moyenne: 14.1, ues: [
        { name: 'UE1: Programmation Avancée', ecues: [
          { name: 'POO Java', note: 14.5 },
          { name: 'C++', note: 13.5 }
        ]},
        { name: 'UE2: Base de Données', ecues: [
          { name: 'SQL', note: 15.0 },
          { name: 'NoSQL', note: 13.0 }
        ]},
        { name: 'UE3: Réseaux', ecues: [
          { name: 'TCP/IP', note: 14.0 },
          { name: 'Sécurité', note: 14.5 }
        ]}
      ]},
      2: { percentage: 68, moyenne: 13.6, ues: [
        { name: 'UE1: Développement Web', ecues: [
          { name: 'HTML/CSS', note: 14.0 },
          { name: 'JavaScript', note: 13.0 }
        ]},
        { name: 'UE2: Architecture', ecues: [
          { name: 'MVC', note: 13.5 },
          { name: 'Microservices', note: 14.0 }
        ]},
        { name: 'UE3: Cloud', ecues: [
          { name: 'AWS', note: 13.5 },
          { name: 'Docker', note: 14.0 }
        ]}
      ]}
    }
  },
  {
    name: 'Sanogo Ibrahim',
    matricule: 'IFRI2024M007',
    master: 1,
    filiere: 'GL',
    semesters: {
      1: { percentage: 45, moyenne: 9.0, ues: [
        { name: 'UE1: Programmation Avancée', ecues: [
          { name: 'POO Java', note: 9.5 },
          { name: 'C++', note: 8.5 }
        ]},
        { name: 'UE2: Base de Données', ecues: [
          { name: 'SQL', note: 10.0 },
          { name: 'NoSQL', note: 8.0 }
        ]},
        { name: 'UE3: Réseaux', ecues: [
          { name: 'TCP/IP', note: 9.0 },
          { name: 'Sécurité', note: 9.0 }
        ]}
      ]},
      2: { percentage: 42, moyenne: 8.4, ues: [
        { name: 'UE1: Développement Web', ecues: [
          { name: 'HTML/CSS', note: 9.0 },
          { name: 'JavaScript', note: 8.0 }
        ]},
        { name: 'UE2: Architecture', ecues: [
          { name: 'MVC', note: 8.5 },
          { name: 'Microservices', note: 8.0 }
        ]},
        { name: 'UE3: Cloud', ecues: [
          { name: 'AWS', note: 8.5 },
          { name: 'Docker', note: 8.5 }
        ]}
      ]}
    }
  }
];

const Grades = () => {
  const [currentMaster, setCurrentMaster] = useState(1);
  const [currentFiliere, setCurrentFiliere] = useState('GL');
  const [currentSemestre, setCurrentSemestre] = useState('1');
  const [currentSort, setCurrentSort] = useState('alpha');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = studentsData.filter(student => {
      const matchMaster = student.master === currentMaster;
      const matchFiliere = student.filiere === currentFiliere;
      const matchSearch = searchQuery === '' || 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.matricule.toLowerCase().includes(searchQuery.toLowerCase());
      return matchMaster && matchFiliere && matchSearch;
    });

    filtered.sort((a, b) => {
      if (currentSort === 'alpha') {
        return a.name.localeCompare(b.name);
      } else {
        if (currentSemestre === 'recap') {
          const avgA = (a.semesters[1].moyenne + a.semesters[2].moyenne) / 2;
          const avgB = (b.semesters[1].moyenne + b.semesters[2].moyenne) / 2;
          return avgB - avgA;
        } else {
          return b.semesters[currentSemestre].moyenne - a.semesters[currentSemestre].moyenne;
        }
      }
    });

    return filtered;
  }, [currentMaster, currentFiliere, currentSemestre, currentSort, searchQuery]);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getPercentageClass = (percentage) => {
    if (percentage >= 80) return 'bg-white/20 text-white';
    if (percentage >= 70) return 'bg-white/10 text-white';
    return 'bg-white/5 text-white/80';
  };

  const getGradeClass = (note) => {
    if (note >= 16) return 'text-white/90';
    if (note >= 14) return 'text-white/70';
    if (note >= 10) return 'text-white/50';
    return 'text-red-400';
  };

  const getAlertIcon = (percentage) => {
    if (percentage < 50) {
      return <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>;
    }
    if (percentage >= 80) {
      return <i className="fas fa-check-circle text-green-500 text-xl"></i>;
    }
    return <i className="fas fa-exclamation-circle text-yellow-500 text-xl"></i>;
  };

  const renderTableHeaders = () => {
    if (currentSemestre === 'recap') {
      return (
        <>
          <th className="bg-white/8 text-center font-bold text-white text-xs px-4 py-4 border-b-2 border-white/15" colSpan={2}>
            Semestre 1
          </th>
          <th className="bg-white/8 text-center font-bold text-white text-xs px-4 py-4 border-b-2 border-white/15" colSpan={2}>
            Semestre 2
          </th>
          <th className="bg-white/8 text-center font-bold text-white text-xs px-4 py-4 border-b-2 border-white/15" colSpan={2}>
            Année
          </th>
        </>
      );
    }

    const sampleStudent = filteredAndSortedStudents[0];
    if (!sampleStudent) return null;
    
    const ues = sampleStudent.semesters[currentSemestre].ues;

    return ues.map((ue, index) => (
      <th 
        key={index}
        className="bg-white/8 text-center font-bold text-white text-xs px-4 py-4 border-b-2 border-white/15"
        colSpan={ue.ecues.length}
      >
        {ue.name}
      </th>
    ));
  };

  const renderSubHeaders = () => {
    if (currentSemestre === 'recap') {
      return (
        <>
          <th className="bg-white/5 px-4 py-4 text-left text-[10px] font-bold text-white/80 uppercase tracking-wider border-b-2 border-white/15">
            Pourcentage
          </th>
          <th className="bg-white/5 px-4 py-4 text-left text-[10px] font-bold text-white/80 uppercase tracking-wider border-b-2 border-white/15">
            Moyenne
          </th>
          <th className="bg-white/5 px-4 py-4 text-left text-[10px] font-bold text-white/80 uppercase tracking-wider border-b-2 border-white/15">
            Pourcentage
          </th>
          <th className="bg-white/5 px-4 py-4 text-left text-[10px] font-bold text-white/80 uppercase tracking-wider border-b-2 border-white/15">
            Moyenne
          </th>
          <th className="bg-white/5 px-4 py-4 text-left text-[10px] font-bold text-white/80 uppercase tracking-wider border-b-2 border-white/15">
            Pourcentage
          </th>
          <th className="bg-white/5 px-4 py-4 text-left text-[10px] font-bold text-white/80 uppercase tracking-wider border-b-2 border-white/15">
            Moyenne
          </th>
        </>
      );
    }

    const sampleStudent = filteredAndSortedStudents[0];
    if (!sampleStudent) return null;
    
    const ues = sampleStudent.semesters[currentSemestre].ues;

    return ues.map((ue) => 
      ue.ecues.map((ecue, idx) => (
        <th 
          key={`${ue.name}-${idx}`}
          className="bg-white/5 px-4 py-4 text-left text-[10px] font-bold text-white/80 uppercase tracking-wider border-b-2 border-white/15 whitespace-nowrap"
        >
          {ecue.name}
        </th>
      ))
    );
  };

  return (
    <div className="flex-1 p-10 overflow-y-auto h-screen bg-gradient-to-br from-black/20 to-black/20" 
         style={{ 
           backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url("/api/placeholder/1920/1080")',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      {/* Header */}
      <header className="flex justify-between items-start mb-9">
        <div>
          <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
            Gestion des Notes
          </h1>
          <p className="text-white/80 text-base">
            Saisie et consultation des notes par semestre
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-black/50 border border-white/15 backdrop-blur-sm text-white px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2.5 hover:bg-white/15 hover:border-white/30 transition-all">
            <i className="fas fa-download"></i>
            Exporter
          </button>
          <button className="bg-white text-black px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2.5 hover:bg-white/90 transition-all">
            <i className="fas fa-plus"></i>
            Saisir Notes
          </button>
        </div>
      </header>

      {/* Filters */}
      <FiltersBar
        currentMaster={currentMaster}
        onMasterChange={setCurrentMaster}
        currentFiliere={currentFiliere}
        onFiliereChange={setCurrentFiliere}
        currentSemestre={currentSemestre}
        onSemestreChange={setCurrentSemestre}
        currentSort={currentSort}
        onSortChange={setCurrentSort}
        onSearch={setSearchQuery}
      />

      {/* Table */}
      <div className="rounded-3xl border border-white/15 shadow-2xl overflow-hidden bg-black/20 backdrop-blur-3xl">
        <div className="overflow-x-scroll">
          <table className="w-full border-collapse" style={{ minWidth: '1400px' }}>
            <thead>
              <tr>
                <th className="bg-white/5 px-4 py-5 border-b-2 border-white/15 sticky left-0 z-20 bg-black/30 backdrop-blur-3xl" style={{ minWidth: '280px' }}></th>
                <th className="bg-white/5 px-3 py-5 border-b-2 border-white/15 sticky left-[280px] z-20 bg-black/30 backdrop-blur-3xl" style={{ minWidth: '100px' }}></th>
                <th className="bg-white/5 px-4 py-5 border-b-2 border-white/15 sticky left-[380px] z-20 bg-black/30 backdrop-blur-3xl" style={{ minWidth: '100px' }}></th>
                <th className="bg-white/5 px-4 py-5 border-b-2 border-white/15 sticky left-[480px] z-20 bg-black/30 backdrop-blur-3xl" style={{ minWidth: '80px' }}></th>
                {renderTableHeaders()}
                {currentSemestre !== 'recap' && (
                  <th className="bg-white/5 px-4 py-5 border-b-2 border-white/15 sticky right-0 z-20 bg-black/30 backdrop-blur-3xl" style={{ minWidth: '280px' }}></th>
                )}
              </tr>
              <tr>
                <th className="bg-white/5 px-4 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider border-b-2 border-white/15 sticky left-0 z-20 bg-black/30 backdrop-blur-3xl" style={{ minWidth: '280px' }}>
                  Étudiant
                </th>
                <th className="bg-white/5 px-3 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider border-b-2 border-white/15 sticky left-[280px] z-20 bg-black/30 backdrop-blur-3xl" style={{ minWidth: '100px' }}>
                  %
                </th>
                <th className="bg-white/5 px-4 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider border-b-2 border-white/15 sticky left-[380px] z-20 bg-black/30 backdrop-blur-3xl" style={{ minWidth: '100px' }}>
                  Moy
                </th>
                <th className="bg-white/5 px-4 py-4 text-center text-xs font-bold text-white/80 uppercase tracking-wider border-b-2 border-white/15 sticky left-[480px] z-20 bg-black/30 backdrop-blur-3xl" style={{ minWidth: '80px' }}>
                  Alert
                </th>
                {renderSubHeaders()}
                {currentSemestre !== 'recap' && (
                  <th className="bg-white/5 px-4 py-4 text-left text-xs font-bold text-white/80 uppercase tracking-wider border-b-2 border-white/15 sticky right-0 z-20 bg-black/30 backdrop-blur-3xl" style={{ minWidth: '280px' }}>
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedStudents.length === 0 ? (
                <tr>
                  <td colSpan={20} className="text-center py-10 text-white/80">
                    Aucun étudiant trouvé
                  </td>
                </tr>
              ) : (
                filteredAndSortedStudents.map((student, index) => (
                  <StudentRow
                    key={index}
                    student={student}
                    currentSemestre={currentSemestre}
                    isRecap={currentSemestre === 'recap'}
                    getInitials={getInitials}
                    getPercentageClass={getPercentageClass}
                    getGradeClass={getGradeClass}
                    getAlertIcon={getAlertIcon}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Grades;
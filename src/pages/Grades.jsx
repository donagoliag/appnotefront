import { useState, useMemo, useEffect } from 'react';
import FiltersBar from '../components/grades/FiltersBar';
import StudentRow from '../components/grades/StudentRow';
import { studentApi, noteApi, structureApi, teacherApi, resultApi } from '../services/api';

const Grades = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMaster, setCurrentMaster] = useState(1);
  const [currentFiliere, setCurrentFiliere] = useState('M-INFO');
  const [currentSemestre, setCurrentSemestre] = useState('1');
  const [currentSort, setCurrentSort] = useState('alpha');
  const [searchQuery, setSearchQuery] = useState('');
  const [filieres, setFilieres] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [activeAnnee, setActiveAnnee] = useState(null);
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);
  const [newNote, setNewNote] = useState({
    etudiantUri: '',
    ecueUri: '',
    enseignantUri: '',
    valeurNote: 10,
    typeEvaluation: 'Examen',
    session: 'normale'
  });
  const [teachers, setTeachers] = useState([]);
  const [allEcues, setAllEcues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [studentsRes, filieresRes, niveauxRes, anneesRes, teachersRes, ecuesRes] = await Promise.all([
          studentApi.getAll(),
          structureApi.getFilieres(),
          structureApi.getNiveaux(),
          structureApi.getAnnees(),
          teacherApi.getAll(),
          structureApi.getAllEcues()
        ]);

        if (filieresRes.data.success) setFilieres(filieresRes.data.data);
        if (niveauxRes.data.success) setNiveaux(niveauxRes.data.data);
        if (teachersRes.data.success) setTeachers(teachersRes.data.data);
        if (ecuesRes.data.success) setAllEcues(ecuesRes.data.data);
        if (anneesRes.data.success) {
          setActiveAnnee(anneesRes.data.data.find(a => a.estActive) || anneesRes.data.data[0]);
        }

        console.log('Filieres data:', filieresRes.data.data);
        console.log('Niveaux data:', niveauxRes.data.data);

        if (studentsRes.data.success) {
          const students = studentsRes.data.data.map(s => ({
            ...s,
            name: `${s.nom} ${s.prenom}`,
            master: s.niveauUri?.includes('M1') ? 1 : 2,
            filiere: s.filiereUri?.split('/').pop() || 'GL',
            semesters: {
              1: { percentage: 0, moyenne: 0, ues: [] },
              2: { percentage: 0, moyenne: 0, ues: [] }
            }
          }));

          const studentsWithGrades = await Promise.all(students.map(async (student) => {
            try {
              // Find matching filiere and niveau URIs
              const filiere = filieresRes.data.data.find(f =>
                f.code === currentFiliere ||
                f.uri.endsWith(`/${currentFiliere}`) ||
                f.uri.endsWith(`#${currentFiliere}`) ||
                f.uri.includes(`/${currentFiliere}_`)
              );
              const niveau = niveauxRes.data.data.find(n => n.ordre === currentMaster || n.code?.includes(`M${currentMaster}`));

              console.log(`Matching for student ${student.name}:`, { currentFiliere, currentMaster, filiereFound: !!filiere, niveauFound: !!niveau });

              if (filiere && niveau) {
                const gradesRes = await noteApi.getGrades(student.uri, filiere.uri, niveau.uri);
                if (gradesRes.data.success) {
                  return {
                    ...student,
                    semesters: gradesRes.data.data
                  };
                }
              }
              return student;
            } catch (err) {
              console.error(`Error fetching grades for ${student.name}:`, err);
              return student;
            }
          }));

          setStudentsData(studentsWithGrades);
        }
      } catch (error) {
        console.error('Error fetching grades data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentMaster, currentFiliere]);

  const handleConsult = async (student) => {
    try {
      const filiere = filieres.find(f => f.code === currentFiliere || f.uri.endsWith(currentFiliere));
      const niveau = niveaux.find(n => n.ordre === currentMaster);

      if (!filiere || !niveau || !activeAnnee) {
        alert('Informations de structure manquantes');
        return;
      }

      const res = await resultApi.calculate({
        etudiantUri: student.uri,
        filiereUri: filiere.uri,
        niveauUri: niveau.uri,
        anneeUri: activeAnnee.uri
      });

      if (res.data.success) {
        alert(`Bulletin généré pour ${student.name}. Moyenne: ${res.data.data.moyenne}`);
        // Here you could open a PDF or a detailed view
      }
    } catch (error) {
      alert(`Erreur lors de la génération du bulletin: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEdit = (student) => {
    alert(`Modification des notes pour ${student.name} (Fonctionnalité en cours d'implémentation)`);
  };

  const handleDelete = (student) => {
    alert(`Suppression des notes pour ${student.name} (Fonctionnalité en cours d'implémentation)`);
  };

  const handleSubmitNote = async (e) => {
    e.preventDefault();
    try {
      await noteApi.create(newNote);
      alert('Note ajoutée avec succès');
      setShowAddNoteForm(false);
      setNewNote({
        etudiantUri: '',
        ecueUri: '',
        enseignantUri: '',
        valeurNote: 10,
        typeEvaluation: 'Examen',
        session: 'normale'
      });
      // Refresh data
      window.location.reload();
    } catch (error) {
      alert(`Erreur lors de l'ajout de la note: ${error.response?.data?.message || error.message}`);
    }
  };

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
  }, [currentMaster, currentFiliere, currentSemestre, currentSort, searchQuery, studentsData]);

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
          <button
            onClick={() => setShowAddNoteForm(!showAddNoteForm)}
            className="bg-white text-black px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2.5 hover:bg-white/90 transition-all"
          >
            <i className={`fas fa-${showAddNoteForm ? 'times' : 'plus'}`}></i>
            {showAddNoteForm ? 'Annuler' : 'Saisir Notes'}
          </button>
        </div>
      </header>

      {showAddNoteForm && (
        <div className="mb-8 bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-xl font-bold text-white mb-4">Saisir une nouvelle note</h2>
          <form onSubmit={handleSubmitNote} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-white/70">Étudiant</label>
              <select
                value={newNote.etudiantUri}
                onChange={(e) => setNewNote({ ...newNote, etudiantUri: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                required
              >
                <option value="" className="bg-gray-900">Sélectionner un étudiant</option>
                {studentsData.map(s => (
                  <option key={s.uri} value={s.uri} className="bg-gray-900">{s.name} ({s.matricule})</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">ECUE</label>
              <select
                value={newNote.ecueUri}
                onChange={(e) => setNewNote({ ...newNote, ecueUri: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                required
              >
                <option value="" className="bg-gray-900">Sélectionner un ECUE</option>
                {allEcues.map(e => (
                  <option key={e.uri} value={e.uri} className="bg-gray-900">{e.codeECUE} - {e.libelleECUE}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Enseignant</label>
              <select
                value={newNote.enseignantUri}
                onChange={(e) => setNewNote({ ...newNote, enseignantUri: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                required
              >
                <option value="" className="bg-gray-900">Sélectionner un enseignant</option>
                {teachers.map(t => (
                  <option key={t.uri} value={t.uri} className="bg-gray-900">{t.nom} {t.prenom}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Valeur Note</label>
              <input
                type="number"
                step="0.25"
                min="0"
                max="20"
                value={newNote.valeurNote}
                onChange={(e) => setNewNote({ ...newNote, valeurNote: parseFloat(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Type Évaluation</label>
              <select
                value={newNote.typeEvaluation}
                onChange={(e) => setNewNote({ ...newNote, typeEvaluation: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                required
              >
                <option value="Examen" className="bg-gray-900">Examen</option>
                <option value="Contrôle Continu" className="bg-gray-900">Contrôle Continu</option>
                <option value="TP" className="bg-gray-900">TP</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Session</label>
              <select
                value={newNote.session}
                onChange={(e) => setNewNote({ ...newNote, session: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                required
              >
                <option value="normale" className="bg-gray-900">Normale</option>
                <option value="rattrapage" className="bg-gray-900">Rattrapage</option>
              </select>
            </div>
            <div className="lg:col-span-3 flex justify-end">
              <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all">
                Enregistrer la Note
              </button>
            </div>
          </form>
        </div>
      )}

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
        filieres={filieres}
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
              {loading ? (
                <tr>
                  <td colSpan={20} className="text-center py-10 text-white/80">
                    Chargement des données...
                  </td>
                </tr>
              ) : filteredAndSortedStudents.length === 0 ? (
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
                    onConsult={handleConsult}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
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
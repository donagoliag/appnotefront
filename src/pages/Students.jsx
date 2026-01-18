import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import StudentCard from '../components/students/StudentCard';
import FiltersBar from '../components/students/FiltersBar';
import { Download, Plus, UserX } from 'lucide-react';
import { studentApi } from '../services/api';

const Students = () => {
  const [filters, setFilters] = useState({
    master: 1,
    filiere: 'all',
    genre: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    nom: '',
    prenom: '',
    email: '',
    matricule: '',
    genre: 'M'
  });
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentApi.getAll();
      console.log('Students API response:', response.data);
      if (response.data.success) {
        const mappedStudents = response.data.data.map(s => ({
          ...s,
          name: `${s.nom} ${s.prenom}`,
          genre: s.genre || 'Non spécifié',
          filiere: s.filiere || 'Non spécifié',
          master: 1,
          status: 'Actif',
          moyenne: s.moyenne || '0.0',
          absences: 0,
          image: `https://ui-avatars.com/api/?name=${s.nom}+${s.prenom}&background=random`,
          semesters: s.semesters || [
            { name: 'Semestre 1', grade: null, percentage: 0 },
            { name: 'Semestre 2', grade: null, percentage: 0 }
          ]
        }));
        setStudentsData(mappedStudents);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await studentApi.update(editingStudent.uri, newStudent);
        alert('Étudiant modifié avec succès');
      } else {
        await studentApi.create(newStudent);
        alert('Étudiant ajouté avec succès');
      }
      setShowForm(false);
      setEditingStudent(null);
      setNewStudent({ nom: '', prenom: '', email: '', matricule: '', genre: 'M' });
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
      const message = error.response?.data?.message || error.response?.data?.error || 'Erreur lors de l\'opération';
      alert(message);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setNewStudent({
      nom: student.nom,
      prenom: student.prenom,
      email: student.email,
      matricule: student.matricule,
      genre: student.genre
    });
    setShowForm(true);
  };

  const handleDelete = async (student) => {
    if (window.confirm(`Supprimer l'étudiant ${student.name} ?`)) {
      try {
        await studentApi.delete(student.uri);
        fetchStudents();
        alert('Étudiant supprimé avec succès');
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

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
  }, [filters, searchQuery, studentsData]);

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
            <button
              onClick={() => setShowForm(!showForm)}
              className={`${showForm ? 'bg-red-500 text-white' : 'bg-white text-black'} px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all flex items-center gap-2 font-semibold text-sm`}
            >
              {showForm ? <i className="fas fa-times" /> : <Plus size={16} />}
              {showForm ? 'Annuler' : 'Nouvel Étudiant'}
            </button>
          </div>
        </header>

        {showForm && (
          <div className="mb-8 bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-xl font-bold text-white mb-4">Ajouter un nouvel étudiant</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-white/70">Nom</label>
                <input
                  type="text"
                  value={newStudent.nom}
                  onChange={(e) => setNewStudent({ ...newStudent, nom: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                  placeholder="DOE"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Prénom</label>
                <input
                  type="text"
                  value={newStudent.prenom}
                  onChange={(e) => setNewStudent({ ...newStudent, prenom: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Email</label>
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                  placeholder="john.doe@ifri.bj"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Matricule</label>
                <input
                  type="text"
                  value={newStudent.matricule}
                  onChange={(e) => setNewStudent({ ...newStudent, matricule: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                  placeholder="M1-2024-002"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Genre</label>
                <select
                  value={newStudent.genre}
                  onChange={(e) => setNewStudent({ ...newStudent, genre: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                  required
                >
                  <option value="M" className="bg-gray-900">Masculin</option>
                  <option value="F" className="bg-gray-900">Féminin</option>
                </select>
              </div>
              <div className="lg:col-span-3 flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all">
                  Enregistrer l'Étudiant
                </button>
              </div>
            </form>
          </div>
        )}

        <FiltersBar
          filters={filters}
          onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
          onSearch={setSearchQuery}
        />

        {/* Students Grid */}
        <div className="grid grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-20 text-white">Chargement des étudiants...</div>
          ) : filteredStudents.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-black/50 backdrop-blur-xl border border-white/15 rounded-3xl">
              <UserX size={48} className="mx-auto mb-4 text-white opacity-30" />
              <p className="text-lg font-semibold text-white mb-2">Aucun étudiant trouvé</p>
              <span className="text-sm text-white/80">Essayez de modifier vos filtres</span>
            </div>
          ) : (
            filteredStudents.map((student, index) => (
              <StudentCard key={index} student={student} onEdit={handleEdit} onDelete={handleDelete} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Students;
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TeacherCard from '../components/teachers/TeacherCard';
import TeachersToolbar from '../components/teachers/TeachersToolbar';
import { UserX } from 'lucide-react';
import { teacherApi } from '../services/api';

const Teachers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [teachersData, setTeachersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // false, 'add', 'edit'
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [newTeacher, setNewTeacher] = useState({
    nom: '',
    prenom: '',
    email: '',
    code: '',
    grade: 'Assistant'
  });

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await teacherApi.getAll();
      if (response.data.success) {
        setTeachersData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (showForm === 'edit') {
        await teacherApi.update(editingTeacher.uri, newTeacher);
        alert('Enseignant mis à jour avec succès');
      } else {
        await teacherApi.create(newTeacher);
        alert('Enseignant ajouté avec succès');
      }
      setShowForm(false);
      setEditingTeacher(null);
      setNewTeacher({ nom: '', prenom: '', email: '', code: '', grade: 'Assistant' });
      fetchTeachers();
    } catch (error) {
      alert(`Erreur lors de l'opération: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setNewTeacher({
      nom: teacher.nom,
      prenom: teacher.prenom,
      email: teacher.email,
      code: teacher.code,
      grade: teacher.grade
    });
    setShowForm('edit');
  };

  const handleDelete = async (uri) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
      try {
        await teacherApi.delete(uri);
        fetchTeachers();
        alert('Enseignant supprimé avec succès');
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

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
  }, [searchQuery, sortOrder, teachersData]);

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
            onAddClick={() => {
              if (showForm) {
                setShowForm(false);
                setEditingTeacher(null);
                setNewTeacher({ nom: '', prenom: '', email: '', code: '', grade: 'Assistant' });
              } else {
                setShowForm('add');
              }
            }}
            showForm={!!showForm}
          />
        </header>

        {showForm && (
          <div className="mb-8 bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-xl font-bold text-white mb-4">
              {showForm === 'edit' ? 'Modifier l\'enseignant' : 'Ajouter un nouvel enseignant'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-white/70">Nom</label>
                <input
                  type="text"
                  value={newTeacher.nom}
                  onChange={(e) => setNewTeacher({ ...newTeacher, nom: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                  placeholder="DOE"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Prénom</label>
                <input
                  type="text"
                  value={newTeacher.prenom}
                  onChange={(e) => setNewTeacher({ ...newTeacher, prenom: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Email</label>
                <input
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                  placeholder="john.doe@ifri.bj"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Code Enseignant</label>
                <input
                  type="text"
                  value={newTeacher.code}
                  onChange={(e) => setNewTeacher({ ...newTeacher, code: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                  placeholder="ENS-001"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Grade</label>
                <select
                  value={newTeacher.grade}
                  onChange={(e) => setNewTeacher({ ...newTeacher, grade: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                  required
                >
                  <option value="Assistant" className="bg-gray-900">Assistant</option>
                  <option value="Maître de Conférences" className="bg-gray-900">Maître de Conférences</option>
                  <option value="Professeur Titulaire" className="bg-gray-900">Professeur Titulaire</option>
                </select>
              </div>
              <div className="lg:col-span-3 flex justify-end gap-3">
                {showForm === 'edit' && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingTeacher(null);
                      setNewTeacher({ nom: '', prenom: '', email: '', code: '', grade: 'Assistant' });
                    }}
                    className="bg-white/10 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all"
                  >
                    Annuler
                  </button>
                )}
                <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all">
                  {showForm === 'edit' ? 'Mettre à jour' : 'Enregistrer l\'Enseignant'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-20 text-white">Chargement des enseignants...</div>
          ) : filteredTeachers.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-black/50 backdrop-blur-xl border border-white/15 rounded-3xl">
              <UserX size={48} className="mx-auto mb-4 text-white opacity-30" />
              <p className="text-lg font-semibold text-white mb-2">Aucun enseignant trouvé</p>
              <span className="text-sm text-white/80">Essayez de modifier votre recherche</span>
            </div>
          ) : (
            filteredTeachers.map((teacher, index) => (
              <TeacherCard
                key={index}
                teacher={teacher}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Teachers;
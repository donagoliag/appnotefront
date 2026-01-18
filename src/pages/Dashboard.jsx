import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import ActivityItem from '../components/ActivityItem';
import StudentRow from '../components/StudentRow';
import { LineChartComponent, DoughnutChartComponent } from '../components/ChartComponent';
import { dashboardApi, studentApi, structureApi, noteApi } from '../services/api';

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('30j');
  const [stats, setStats] = useState([]);
  const [topStudents, setTopStudents] = useState([]);
  const [successByFiliere, setSuccessByFiliere] = useState({ labels: [], data: [] });
  const [gradeTrend, setGradeTrend] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [newNote, setNewNote] = useState({
    etudiantUri: '',
    ecueUri: '',
    valeurNote: '',
    session: 'normale',
    typeEvaluation: 'Examen'
  });
  const [students, setStudents] = useState([]);
  const [ecues, setEcues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, studentsRes, ecuesRes] = await Promise.all([
          dashboardApi.getStats(),
          studentApi.getAll(),
          structureApi.getAllEcues()
        ]);

        if (statsRes.data.success) {
          const data = statsRes.data.data;
          setStats(data.stats);
          setTopStudents(data.topStudents);
          setSuccessByFiliere({
            labels: data.successByFiliere.map(f => f.filiere),
            data: data.successByFiliere.map(f => f.rate)
          });
          setGradeTrend({
            labels: data.gradeTrend.map(t => t.period),
            data: data.gradeTrend.map(t => t.average)
          });
        }

        if (studentsRes.data.success) setStudents(studentsRes.data.data);
        if (ecuesRes.data.success) setEcues(ecuesRes.data.data);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmitNote = async (e) => {
    e.preventDefault();
    try {
      await noteApi.create({
        ...newNote,
        valeurNote: parseFloat(newNote.valeurNote)
      });
      setShowNoteForm(false);
      setNewNote({ etudiantUri: '', ecueUri: '', valeurNote: '', session: 'normale', typeEvaluation: 'Examen' });
      // Refresh stats
      const response = await dashboardApi.getStats();
      if (response.data.success) {
        const data = response.data.data;
        setStats(data.stats);
      }
      alert('Note enregistrée avec succès');
    } catch (error) {
      alert('Erreur lors de l\'enregistrement de la note');
    }
  };

  const activities = [
    {
      icon: "fas fa-check-circle",
      title: "Notes publiées - Mathématiques L3",
      time: "45 étudiants notés • Il y a 12 min"
    },
    {
      icon: "fas fa-user-plus",
      title: "Nouveaux étudiants inscrits",
      time: "8 nouveaux en L1 Info • Il y a 1h"
    },
    {
      icon: "fas fa-file-alt",
      title: "Bulletins générés",
      time: "L2 Commerce - 52 bulletins • Il y a 2h"
    },
    {
      icon: "fas fa-exclamation-triangle",
      title: "Alerte: Étudiants en difficulté",
      time: "18 étudiants < 10/20 • Il y a 3h"
    }
  ];

  const filters = ['7j', '30j', 'Trimestre', 'Année'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Gestion des Notes</h1>
          <p className="text-white/70">Tableau de bord et statistiques</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-black/50 backdrop-blur-sm border border-white/15 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-semibold hover:bg-white/10 hover:border-white/25 transition-all duration-300">
            <i className="fas fa-download"></i>
            Exporter
          </button>
          <button
            onClick={() => setShowNoteForm(!showNoteForm)}
            className={`${showNoteForm ? 'bg-red-500 text-white' : 'bg-white text-black'} px-5 py-3 rounded-xl flex items-center gap-2 font-semibold hover:bg-opacity-90 transition-all duration-300`}
          >
            <i className={`fas fa-${showNoteForm ? 'times' : 'plus'}`}></i>
            {showNoteForm ? 'Annuler' : 'Nouvelle Note'}
          </button>
        </div>
      </header>

      {showNoteForm && (
        <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-xl font-bold text-white mb-4">Saisir une nouvelle note</h2>
          <form onSubmit={handleSubmitNote} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-white/70">Étudiant</label>
              <select
                value={newNote.etudiantUri}
                onChange={(e) => setNewNote({ ...newNote, etudiantUri: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                required
              >
                <option value="" className="bg-gray-900">Sélectionner un étudiant</option>
                {students.map(s => (
                  <option key={s.uri} value={s.uri} className="bg-gray-900">{s.nom} {s.prenom} ({s.matricule})</option>
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
                <option value="" className="bg-gray-900">Sélectionner une matière</option>
                {ecues.map(e => (
                  <option key={e.uri} value={e.uri} className="bg-gray-900">{e.libelleECUE}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Note (0-20)</label>
              <input
                type="number"
                step="0.25"
                min="0"
                max="20"
                value={newNote.valeurNote}
                onChange={(e) => setNewNote({ ...newNote, valeurNote: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                placeholder="15.5"
                required
              />
            </div>
            <div className="md:col-span-3 flex justify-end">
              <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all">
                Enregistrer la Note
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading ? (
          <div className="col-span-4 text-center py-10 text-white">Chargement des statistiques...</div>
        ) : (
          stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))
        )}
      </div>

      {/* Chart Section */}
      <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Statistiques</h2>
          <div className="flex gap-1 bg-white/5 border border-white/15 rounded-xl p-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeFilter === filter
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="h-80">
          <LineChartComponent
            labels={gradeTrend.labels}
            datasets={[{
              label: 'Moyenne Générale',
              data: gradeTrend.data,
              borderColor: 'rgba(255, 255, 255, 0.8)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              tension: 0.4,
              fill: true,
              borderWidth: 2,
              pointRadius: 4,
              pointBackgroundColor: '#ffffff'
            }]}
          />
        </div>
      </div>

      {/* Grid of 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Chart */}
        <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl shadow-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Distribution des Notes</h2>
          <div className="h-72">
            <DoughnutChartComponent
              labels={successByFiliere.labels}
              data={successByFiliere.data}
            />
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl shadow-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Activités Récentes</h2>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <ActivityItem key={index} {...activity} />
            ))}
          </div>
        </div>
      </div>

      {/* Top Students Table */}
      <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Meilleurs Étudiants</h2>
          <button className="bg-black/50 backdrop-blur-sm border border-white/15 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-white/10 hover:border-white/25 transition-all duration-300">
            <i className="fas fa-eye"></i>
            Voir tout
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/15">
                <th className="text-left py-3 px-3 text-xs uppercase tracking-wider font-bold text-white/80">Étudiant</th>
                <th className="text-left py-3 px-3 text-xs uppercase tracking-wider font-bold text-white/80">Matricule</th>
                <th className="text-left py-3 px-3 text-xs uppercase tracking-wider font-bold text-white/80">Filière</th>
                <th className="text-left py-3 px-3 text-xs uppercase tracking-wider font-bold text-white/80">Moyenne</th>
                <th className="text-left py-3 px-3 text-xs uppercase tracking-wider font-bold text-white/80">Rang</th>
              </tr>
            </thead>
            <tbody>
              {topStudents.map((student, index) => (
                <StudentRow key={index} {...student} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import ActivityItem from '../components/ActivityItem';
import StudentRow from '../components/StudentRow';
import { LineChartComponent, DoughnutChartComponent } from '../components/ChartComponent';

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('30j');

  const statsData = [
    {
      label: "Total Étudiants",
      value: "1,247",
      subvalue: "Tous niveaux confondus",
      change: "+15% vs Année dernière",
      icon: "fas fa-user-graduate"
    },
    {
      label: "Notes Saisies",
      value: "8,942",
      subvalue: "Ce trimestre",
      change: "+24% vs mois dernier",
      icon: "fas fa-clipboard-check"
    },
    {
      label: "Moyenne Générale",
      value: "13.8",
      subvalue: "/ 20 points",
      change: "+0.7 pts ce mois-ci",
      icon: "fas fa-chart-line"
    },
    {
      label: "Taux de Réussite",
      value: "91%",
      subvalue: "Admis (≥10/20)",
      change: "+4.5% d'amélioration",
      icon: "fas fa-graduation-cap"
    }
  ];

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

  const topStudents = [
    {
      initials: "AK",
      name: "Kouadio Ama",
      level: "L3 Informatique",
      matricule: "ETU2024001",
      filiere: "Informatique",
      moyenne: "17.8",
      rang: "1er"
    },
    {
      initials: "YK",
      name: "Yao Koffi",
      level: "L2 Commerce",
      matricule: "ETU2024045",
      filiere: "Commerce",
      moyenne: "17.2",
      rang: "2ème"
    },
    {
      initials: "BA",
      name: "Bah Aminata",
      level: "L3 Mathématiques",
      matricule: "ETU2024012",
      filiere: "Mathématiques",
      moyenne: "16.9",
      rang: "3ème"
    },
    {
      initials: "SO",
      name: "Soro Oumar",
      level: "L1 Physique",
      matricule: "ETU2024089",
      filiere: "Physique",
      moyenne: "16.5",
      rang: "4ème"
    },
    {
      initials: "TF",
      name: "Traoré Fatoumata",
      level: "L2 Biologie",
      matricule: "ETU2024034",
      filiere: "Biologie",
      moyenne: "16.1",
      rang: "5ème"
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
          <button className="bg-white text-black px-5 py-3 rounded-xl flex items-center gap-2 font-semibold hover:bg-gray-100 transition-all duration-300">
            <i className="fas fa-plus"></i>
            Nouvelle Note
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
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
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeFilter === filter
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
          <LineChartComponent />
        </div>
      </div>

      {/* Grid of 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Chart */}
        <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl shadow-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Distribution des Notes</h2>
          <div className="h-72">
            <DoughnutChartComponent />
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
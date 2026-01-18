import React, { useState, useEffect } from 'react';
import { studentApi, structureApi, resultApi } from '../services/api';

const Bulletins = () => {
  const [students, setStudents] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [annees, setAnnees] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [selectedAnnee, setSelectedAnnee] = useState('');

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, filieresRes, niveauxRes, anneesRes] = await Promise.all([
          studentApi.getAll(),
          structureApi.getFilieres(),
          structureApi.getNiveaux(),
          structureApi.getAnnees()
        ]);

        if (studentsRes.data.success) setStudents(studentsRes.data.data);
        if (filieresRes.data.success) setFilieres(filieresRes.data.data);
        if (niveauxRes.data.success) setNiveaux(niveauxRes.data.data);
        if (anneesRes.data.success) setAnnees(anneesRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCalculate = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !selectedFiliere || !selectedNiveau || !selectedAnnee) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const response = await resultApi.calculate({
        etudiantUri: selectedStudent,
        filiereUri: selectedFiliere,
        niveauUri: selectedNiveau,
        anneeUri: selectedAnnee
      });

      if (response.data.success) {
        setResult(response.data.data);
      }
    } catch (error) {
      console.error('Error calculating result:', error);
      alert('Erreur lors du calcul du résultat. Vérifiez que toutes les notes sont saisies.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="p-10 text-center text-white">Chargement des données...</div>;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white">Génération de Bulletins</h1>
        <p className="text-white/70">Calculez et visualisez les résultats académiques</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulaire de sélection */}
        <div className="lg:col-span-1 bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl p-6 shadow-2xl h-fit">
          <h2 className="text-xl font-semibold text-white mb-6">Paramètres</h2>
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1">Étudiant</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Sélectionner un étudiant</option>
                {students.map(s => (
                  <option key={s.uri} value={s.uri}>{s.nom} {s.prenom} ({s.matricule})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-1">Filière</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedFiliere}
                onChange={(e) => setSelectedFiliere(e.target.value)}
              >
                <option value="">Sélectionner une filière</option>
                {filieres.map(f => (
                  <option key={f.uri} value={f.uri}>{f.libelle}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-1">Niveau</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedNiveau}
                onChange={(e) => setSelectedNiveau(e.target.value)}
              >
                <option value="">Sélectionner un niveau</option>
                {niveaux.map(n => (
                  <option key={n.uri} value={n.uri}>{n.libelle}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/60 mb-1">Année Académique</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedAnnee}
                onChange={(e) => setSelectedAnnee(e.target.value)}
              >
                <option value="">Sélectionner une année</option>
                {annees.map(a => (
                  <option key={a.uri} value={a.uri}>{a.libelle}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {loading ? 'Calcul en cours...' : 'Générer le Bulletin'}
            </button>
          </form>
        </div>

        {/* Affichage du résultat */}
        <div className="lg:col-span-2 space-y-6">
          {result ? (
            <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">Bulletin de Notes</h3>
                  <p className="text-white/60">{result.anneeLibelle} - {result.filiereLibelle}</p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-black ${parseFloat(result.moyenne) >= 10 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(result.moyenne).toFixed(2)}/20
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest text-white/40">{result.decision}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="text-xs text-white/40 uppercase font-bold mb-1">Crédits Validés</div>
                  <div className="text-xl text-white font-bold">{result.creditsValides} / {result.totalCredits}</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="text-xs text-white/40 uppercase font-bold mb-1">Mention</div>
                  <div className="text-xl text-white font-bold">{result.mention || 'Passable'}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider">Détails par Unité d'Enseignement</h4>
                <div className="space-y-2">
                  {result.detailsUE?.map((ue, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                      <div>
                        <div className="text-white font-medium">{ue.ueLibelle}</div>
                        <div className="text-xs text-white/40">{ue.creditsValidesUE} / {ue.creditsTotalUE} crédits</div>
                      </div>
                      <div className={`font-bold ${ue.moyenneUE >= 10 ? 'text-white' : 'text-red-400'}`}>
                        {parseFloat(ue.moyenneUE).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-black/30 border border-dashed border-white/10 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-file-invoice text-2xl text-white/20"></i>
              </div>
              <h3 className="text-xl font-medium text-white/40">Aucun bulletin généré</h3>
              <p className="text-white/20 max-w-xs">Sélectionnez un étudiant et les paramètres pour calculer son résultat.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bulletins;
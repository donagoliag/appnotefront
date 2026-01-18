import React, { useState, useEffect } from 'react';
import { structureApi } from '../services/api';

const Ecues = () => {
  const [ecues, setEcues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // 'ecue', 'ue', 'editEcue', 'editUe' or false
  const [editingEcue, setEditingEcue] = useState(null);
  const [editingUe, setEditingUe] = useState(null);
  const [newEcue, setNewEcue] = useState({
    codeECUE: '',
    libelleECUE: '',
    creditECUE: 3,
    ueUri: ''
  });
  const [newUe, setNewUe] = useState({
    codeUE: '',
    libelleUE: '',
    creditUE: 6,
    filiereUri: '',
    niveauUri: ''
  });
  const [ues, setUes] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [niveaux, setNiveaux] = useState([]);

  const fetchEcues = async () => {
    setLoading(true);
    try {
      const response = await structureApi.getAllEcues();
      if (response.data.success) {
        setEcues(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching ECUEs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUes = async () => {
    try {
      const [filieresRes, uesRes, niveauxRes] = await Promise.all([
        structureApi.getFilieres(),
        structureApi.getAllUes(),
        structureApi.getNiveaux()
      ]);

      if (filieresRes.data.success) setFilieres(filieresRes.data.data);
      if (uesRes.data.success) setUes(uesRes.data.data);
      if (niveauxRes.data.success) setNiveaux(niveauxRes.data.data);
    } catch (error) {
      console.error('Error fetching UEs/Filieres/Niveaux:', error);
    }
  };

  useEffect(() => {
    fetchEcues();
    fetchUes();
  }, []);

  const handleSubmitEcue = async (e) => {
    e.preventDefault();
    try {
      if (showForm === 'editEcue') {
        await structureApi.updateEcue(editingEcue.uri, newEcue);
        alert('ECUE mis à jour avec succès');
      } else {
        await structureApi.createEcue(newEcue);
        alert('ECUE créé avec succès');
      }
      setShowForm(false);
      setEditingEcue(null);
      setNewEcue({ codeECUE: '', libelleECUE: '', creditECUE: 3, ueUri: '' });
      fetchEcues();
    } catch (error) {
      alert('Erreur lors de l\'opération sur l\'ECUE');
    }
  };

  const handleEditEcue = (ecue) => {
    setEditingEcue(ecue);
    setNewEcue({
      codeECUE: ecue.codeECUE,
      libelleECUE: ecue.libelleECUE,
      creditECUE: ecue.creditECUE,
      ueUri: ecue.ueUri
    });
    setShowForm('editEcue');
  };

  const handleDeleteEcue = async (uri) => {
    if (window.confirm('Supprimer cet ECUE ?')) {
      try {
        await structureApi.deleteEcue(uri);
        fetchEcues();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleSubmitUe = async (e) => {
    e.preventDefault();
    try {
      if (showForm === 'editUe') {
        await structureApi.updateUe(editingUe.uri, newUe);
        alert('UE mise à jour avec succès');
      } else {
        await structureApi.createUe(newUe);
        alert('UE créée avec succès');
      }
      setShowForm(false);
      setEditingUe(null);
      setNewUe({ codeUE: '', libelleUE: '', creditUE: 6, filiereUri: '', niveauUri: '' });
      fetchUes();
    } catch (error) {
      alert('Erreur lors de l\'opération sur l\'UE');
    }
  };

  const handleEditUe = (ue) => {
    setEditingUe(ue);
    setNewUe({
      codeUE: ue.codeUE,
      libelleUE: ue.libelleUE,
      creditUE: ue.creditUE,
      filiereUri: ue.filiereUri,
      niveauUri: ue.niveauUri
    });
    setShowForm('editUe');
  };

  const handleDeleteUe = async (uri) => {
    if (window.confirm('Supprimer cette UE ?')) {
      try {
        await structureApi.deleteUe(uri);
        fetchUes();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white">Unités d'Enseignement Constitutives (ECUE)</h1>
          <p className="text-white/70">Liste exhaustive des matières et leurs crédits</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(showForm === 'ue' ? false : 'ue')}
            className={`px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${showForm === 'ue' ? 'bg-red-500 text-white' : 'bg-white/10 text-white border border-white/15'}`}
          >
            <i className={`fas fa-${showForm === 'ue' ? 'times' : 'plus'}`}></i>
            {showForm === 'ue' ? 'Annuler' : 'Nouvelle UE'}
          </button>
          <button
            onClick={() => setShowForm(showForm === 'ecue' ? false : 'ecue')}
            className={`px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${showForm === 'ecue' ? 'bg-red-500 text-white' : 'bg-white text-black'}`}
          >
            <i className={`fas fa-${showForm === 'ecue' ? 'times' : 'plus'}`}></i>
            {showForm === 'ecue' ? 'Annuler' : 'Nouvel ECUE'}
          </button>
        </div>
      </header>

      {showForm && (showForm === 'ue' || showForm === 'editUe') && (
        <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-xl font-bold text-white mb-4">
            {showForm === 'editUe' ? "Modifier l'Unité d'Enseignement (UE)" : "Ajouter une Unité d'Enseignement (UE)"}
          </h2>
          <form onSubmit={handleSubmitUe} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-white/70">Code UE</label>
              <input
                type="text"
                value={newUe.codeUE}
                onChange={(e) => setNewUe({ ...newUe, codeUE: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                placeholder="ex: UE-101"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Libellé</label>
              <input
                type="text"
                value={newUe.libelleUE}
                onChange={(e) => setNewUe({ ...newUe, libelleUE: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                placeholder="ex: Fondamentaux de l'Informatique"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Crédits</label>
              <input
                type="number"
                value={newUe.creditUE}
                onChange={(e) => setNewUe({ ...newUe, creditUE: parseInt(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Filière</label>
              <select
                value={newUe.filiereUri}
                onChange={(e) => setNewUe({ ...newUe, filiereUri: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                required
              >
                <option value="" className="bg-gray-900">Sélectionner une Filière</option>
                {filieres.map(f => (
                  <option key={f.uri} value={f.uri} className="bg-gray-900">{f.libelle}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Niveau</label>
              <select
                value={newUe.niveauUri}
                onChange={(e) => setNewUe({ ...newUe, niveauUri: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                required
              >
                <option value="" className="bg-gray-900">Sélectionner un Niveau</option>
                {niveaux.map(n => (
                  <option key={n.uri} value={n.uri} className="bg-gray-900">{n.libelle}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end gap-3">
              {(showForm === 'editUe' || showForm === 'ue') && (
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingUe(null);
                    setNewUe({ codeUE: '', libelleUE: '', creditUE: 6, filiereUri: '', niveauUri: '' });
                  }}
                  className="bg-white/10 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all"
                >
                  Annuler
                </button>
              )}
              <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all">
                {showForm === 'editUe' ? 'Mettre à jour' : 'Enregistrer l\'UE'}
              </button>
            </div>
          </form>
        </div>
      )}

      {showForm && (showForm === 'ecue' || showForm === 'editEcue') && (
        <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-xl font-bold text-white mb-4">
            {showForm === 'editEcue' ? 'Modifier l\'ECUE' : 'Ajouter un ECUE'}
          </h2>
          <form onSubmit={handleSubmitEcue} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-white/70">Code ECUE</label>
              <input
                type="text"
                value={newEcue.codeECUE}
                onChange={(e) => setNewEcue({ ...newEcue, codeECUE: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                placeholder="ex: ECUE-101"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Libellé</label>
              <input
                type="text"
                value={newEcue.libelleECUE}
                onChange={(e) => setNewEcue({ ...newEcue, libelleECUE: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                placeholder="ex: Algorithmique"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Crédits</label>
              <input
                type="number"
                value={newEcue.creditECUE}
                onChange={(e) => setNewEcue({ ...newEcue, creditECUE: parseInt(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">UE Parente</label>
              <select
                value={newEcue.ueUri}
                onChange={(e) => setNewEcue({ ...newEcue, ueUri: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                required
              >
                <option value="" className="bg-gray-900">Sélectionner une UE</option>
                {ues.map(ue => (
                  <option key={ue.uri} value={ue.uri} className="bg-gray-900">{ue.codeUE} - {ue.libelleUE}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end gap-3">
              {(showForm === 'editEcue' || showForm === 'ecue') && (
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEcue(null);
                    setNewEcue({ codeECUE: '', libelleECUE: '', creditECUE: 3, ueUri: '' });
                  }}
                  className="bg-white/10 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all"
                >
                  Annuler
                </button>
              )}
              <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all">
                {showForm === 'editEcue' ? 'Mettre à jour' : 'Enregistrer l\'ECUE'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* UEs Table */}
        <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Unités d'Enseignement (UE)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-sm font-semibold text-white/60 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-4 text-sm font-semibold text-white/60 uppercase tracking-wider">Libellé</th>
                  <th className="px-6 py-4 text-sm font-semibold text-white/60 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ues.map((ue) => (
                  <tr key={ue.uri} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{ue.codeUE}</td>
                    <td className="px-6 py-4 text-white/80">{ue.libelleUE}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditUe(ue)}
                          className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
                        >
                          <i className="fas fa-edit text-xs"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteUe(ue.uri)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                        >
                          <i className="fas fa-trash text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ECUEs Table */}
        <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Éléments Constitutifs (ECUE)</h2>
          </div>
          {loading ? (
            <div className="p-10 text-center text-white">Chargement des ECUEs...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-sm font-semibold text-white/60 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white/60 uppercase tracking-wider">Libellé</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white/60 uppercase tracking-wider">Crédits</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white/60 uppercase tracking-wider">UE Parente</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white/60 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {ecues.map((ecue) => (
                    <tr key={ecue.uri} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{ecue.codeECUE}</td>
                      <td className="px-6 py-4 text-white/80">{ecue.libelleECUE}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">
                          {ecue.creditECUE} pts
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/60 text-sm">
                        {ecue.ueLibelle || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditEcue(ecue)}
                            className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
                          >
                            <i className="fas fa-edit text-xs"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteEcue(ecue.uri)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                          >
                            <i className="fas fa-trash text-xs"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ecues;
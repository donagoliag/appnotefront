import React from 'react';

const NomPage = () => {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white">Nom de la Page</h1>
          <p className="text-white/70">Description de la page</p>
        </div>
      </header>
      
      <div className="bg-black/50 backdrop-blur-md border border-white/15 rounded-3xl shadow-2xl p-8">
        <p className="text-white/80">Contenu à venir...</p>
      </div>
    </div>
  );
};

export default NomPage;
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const dashboardApi = {
    getStats: () => api.get('/dashboard/stats'),
};

export const studentApi = {
    getAll: () => api.get('/etudiants'),
    getByMatricule: (matricule) => api.get(`/etudiants/matricule/${matricule}`),
    getByUri: (uri) => api.get(`/etudiants/${encodeURIComponent(uri)}`),
    create: (data) => api.post('/etudiants', data),
    update: (uri, data) => api.put(`/etudiants/${encodeURIComponent(uri)}`, data),
    delete: (uri) => api.delete(`/etudiants/${encodeURIComponent(uri)}`),
};

export const teacherApi = {
    getAll: () => api.get('/enseignants'),
    getByUri: (uri) => api.get(`/enseignants/${encodeURIComponent(uri)}`),
    create: (data) => api.post('/enseignants', data),
    update: (uri, data) => api.put(`/enseignants/${encodeURIComponent(uri)}`, data),
    delete: (uri) => api.delete(`/enseignants/${encodeURIComponent(uri)}`),
};

export const noteApi = {
    getByEtudiant: (etudiantUri) => api.get(`/notes/etudiant/${encodeURIComponent(etudiantUri)}`),
    getGrades: (etudiantUri, filiereUri, niveauUri) => api.get(`/notes/etudiant/${encodeURIComponent(etudiantUri)}/grades`, { params: { filiereUri, niveauUri } }),
    getByEcue: (ecueUri) => api.get(`/notes/ecue/${encodeURIComponent(ecueUri)}`),
    create: (data) => api.post('/notes', data),
    update: (uri, data) => api.put(`/notes/${encodeURIComponent(uri)}`, data),
    delete: (uri) => api.delete(`/notes/${encodeURIComponent(uri)}`),
};

export const resultApi = {
    calculate: (data) => api.post('/resultats/calculate', data),
    getByEtudiant: (etudiantUri) => api.get(`/resultats/etudiant/${encodeURIComponent(etudiantUri)}`),
};

export const structureApi = {
    getFilieres: () => api.get('/structure/filieres'),
    getNiveaux: () => api.get('/structure/niveaux'),
    getAllUes: () => api.get('/structure/ues'),
    getUesByFiliere: (filiereUri) => api.get(`/structure/filieres/${encodeURIComponent(filiereUri)}/ues`),
    getEcuesByUe: (ueUri) => api.get(`/structure/ues/${encodeURIComponent(ueUri)}/ecues`),
    getAllEcues: () => api.get('/structure/ecues'),
    getAnnees: () => api.get('/structure/annees'),
    createUe: (data) => api.post('/structure/ues', data),
    updateUe: (uri, data) => api.put(`/structure/ues/${encodeURIComponent(uri)}`, data),
    deleteUe: (uri) => api.delete(`/structure/ues/${encodeURIComponent(uri)}`),
    createEcue: (data) => api.post('/structure/ecues', data),
    updateEcue: (uri, data) => api.put(`/structure/ecues/${encodeURIComponent(uri)}`, data),
    deleteEcue: (uri) => api.delete(`/structure/ecues/${encodeURIComponent(uri)}`),
};

export default api;

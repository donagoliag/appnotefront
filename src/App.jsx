import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Grades from './pages/Grades';
import Teachers from './pages/Teachers';
import Ecues from './pages/Ecues';
import Bulletins from './pages/Bulletins';
import Settings from './pages/Settings';
import './index.css';

function App() {
  return (
    <Router>
      {/* BACKGROUND GLOBAL (UNE SEULE FOIS) */}
      <div
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/un.jpg')"
        }}
      >
        {/* LAYOUT */}
        <div className="flex min-h-screen">
          <Sidebar />

          <main className="flex-1 ml-0 lg:ml-[310px] p-5 lg:p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/grades" element={<Grades />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/ecues" element={<Ecues />} />
              <Route path="/bulletins" element={<Bulletins />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

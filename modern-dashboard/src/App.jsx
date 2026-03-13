import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import NewsDetail from './pages/NewsDetail';
import RamuxAcademy from './pages/RamuxAcademy';
import Library from './pages/Library';
import Ranking from './pages/Ranking';
import Institucional from './pages/Institucional';
import Servicios from './pages/Servicios';
import RadarLaboral from './pages/RadarLaboral';
import ExpansionGlobal from './pages/ExpansionGlobal';

// Protected Route Wrapper using Supabase Auth
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quienes-somos" element={<Institucional />} />
        <Route path="/servicios" element={<Servicios />} />
        
        {/* Dashboard principal */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        
        <Route
          path="/noticias"
          element={<Dashboard />} 
        />
        
        <Route
          path="/news/:id"
          element={
            <ProtectedRoute>
              <NewsDetail />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/academy"
          element={<RamuxAcademy />}
        />
        
        <Route
          path="/library"
          element={<Library />}
        />
        
        <Route
          path="/radar-laboral"
          element={<RadarLaboral />}
        />
        
        <Route
          path="/expansion-global"
          element={<ExpansionGlobal />}
        />
        
        <Route
          path="/ranking"
          element={
            <ProtectedRoute>
              <Ranking />
            </ProtectedRoute>
          }
        />

        {/* Ruta para el perfil de usuario */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

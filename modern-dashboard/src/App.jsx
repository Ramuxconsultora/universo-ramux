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
import Opinion from './pages/Opinion';
import ArticleLaboral from './pages/ArticleLaboral';
import Compromiso from './pages/Compromiso';
import CapitalWealth from './pages/CapitalWealth';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#F76B1C] animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public & Core Routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quienes-somos" element={<Institucional />} />
        <Route path="/servicios" element={<Servicios />} />

        {/* Dashboard & Feed - Protegidos para asegurar sincronización con Supabase */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/noticias"
          element={<Navigate to="/dashboard" replace />} 
        />
        
        {/* Detalle de Noticia */}
        <Route
          path="/news/:id"
          element={
            <ProtectedRoute>
              <NewsDetail />
            </ProtectedRoute>
          }
        />

        {/* Ramux Ecosystem Routes */}
        <Route
          path="/academy"
          element={
            <ProtectedRoute>
              <RamuxAcademy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />
        <Route
          path="/radar-laboral"
          element={
            <ProtectedRoute>
              <RadarLaboral />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expansion-global"
          element={
            <ProtectedRoute>
              <ExpansionGlobal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/opinion"
          element={
            <ProtectedRoute>
              <Opinion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/opinion/laboral"
          element={
            <ProtectedRoute>
              <ArticleLaboral />
            </ProtectedRoute>
          }
        />
        <Route
          path="/compromiso-social"
          element={
            <ProtectedRoute>
              <Compromiso />
            </ProtectedRoute>
          }
        />
        <Route
          path="/capital-wealth"
          element={
            <ProtectedRoute>
              <CapitalWealth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ranking"
          element={
            <ProtectedRoute>
              <Ranking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Fallback para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

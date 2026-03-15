
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
        {/* We keep Dashboard for the main view which will include widgets and news */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/noticias"
          element={<Dashboard />} // Reusing Dashboard for now, we can create a dedicated Noticias page or just keep Dashboard as the main feed
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
          path="/opinion"
          element={<Opinion />}
        />
        <Route
          path="/opinion/laboral"
          element={<ArticleLaboral />}
        />
        <Route
          path="/compromiso-social"
          element={<Compromiso />}
        />
        <Route
          path="/capital-wealth"
          element={<CapitalWealth />}
        />
        <Route
          path="/ranking"
          element={
            <ProtectedRoute>
              <Ranking />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

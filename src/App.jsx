import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './pages/Dashboard';
import CreditScore from './pages/CreditScore';
import Insights from './pages/Insights';
import LoanEligibility from './pages/LoanEligibility';
import ScoreSimulator from './pages/ScoreSimulator';
import AICoach from './pages/AICoach';
import Report from './pages/Report';
import ExplainScore from './pages/ExplainScore';
import Goals from './pages/Goals';
import Login from './pages/Login';
import DataInput from './pages/DataInput';

function AppContent() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="flex">
        {!hideSidebar && <Sidebar />}
        <main className={`${hideSidebar ? 'flex-1 p-0' : 'flex-1 p-4 sm:p-6'}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/credit-score" element={<CreditScore />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/loan-eligibility" element={<LoanEligibility />} />
            <Route path="/score-simulator" element={<ScoreSimulator />} />
            <Route path="/input" element={<DataInput />} />
            <Route path="/ai-coach" element={<AICoach />} />
            <Route path="/report" element={<Report />} />
            <Route path="/explain-score" element={<ExplainScore />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

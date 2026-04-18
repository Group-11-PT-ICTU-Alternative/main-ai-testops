import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import StudentDashboard from './components/StudentDashboard';
import AccountantDashboard from './components/AccountantDashboard';
import CTSVDashboard from './components/CTSVDashboard';
import DebtDetails from './components/DebtDetails';
import QRPayment from './components/QRPayment';
import PaymentReceipt from './components/PaymentReceipt';
import PaymentHistory from './components/PaymentHistory';
import FeeManagement from './components/FeeManagement';
import Sidebar from './components/Sidebar';
import DebugMode from './components/DebugMode';
import RoadmapModal from './components/RoadmapModal';
import Introduction from './components/Introduction';
import TraceabilityMatrix from './components/TraceabilityMatrix';
import BGHDashboard from './components/BGHDashboard';
import ExtensionRequest from './components/ExtensionRequest';
import FeeWaiverRequest from './components/FeeWaiverRequest';
import ReminderSettings from './components/ReminderSettings';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('STUDENT');
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const previousRoleRef = useRef(userRole);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('dashboard');
    setUserRole('STUDENT');
  };

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  // Auto-navigate to correct dashboard when role changes
  useEffect(() => {
    if (isAuthenticated && previousRoleRef.current !== userRole) {
      switch (userRole) {
        case 'STUDENT':
          navigate('/dashboard');
          break;
        case 'ACCOUNTANT':
          navigate('/dashboard');
          break;
        case 'CTSV':
          navigate('/ctsv-dashboard');
          break;
        case 'BGH':
          navigate('/bgh-dashboard');
          break;
        default:
          navigate('/dashboard');
      }
      previousRoleRef.current = userRole;
    }
  }, [userRole, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          userRole={userRole}
          setUserRole={setUserRole}
          currentScreen={currentScreen}
          onNavigate={handleNavigation}
          onLogout={handleLogout}
          onShowRoadmap={() => setShowRoadmapModal(true)}
          debugMode={debugMode}
        />
        
        <main className="flex-1 overflow-y-auto">
          <DebugMode debugMode={debugMode} setDebugMode={setDebugMode} />
          
          {userRole === 'STUDENT' ? (
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<StudentDashboard onNavigate={handleNavigation} debugMode={debugMode} />} />
              <Route path="/debt-details" element={<DebtDetails onNavigate={handleNavigation} debugMode={debugMode} />} />
              <Route path="/qr-payment" element={<QRPayment onNavigate={handleNavigation} debugMode={debugMode} />} />
              <Route path="/payment-receipt" element={<PaymentReceipt onNavigate={handleNavigation} debugMode={debugMode} />} />
              <Route path="/payment-history" element={<PaymentHistory onNavigate={handleNavigation} debugMode={debugMode} />} />
              <Route path="/extension-request" element={<ExtensionRequest debugMode={debugMode} />} />
              <Route path="/fee-waiver-request" element={<FeeWaiverRequest debugMode={debugMode} />} />
              <Route path="/introduction" element={<Introduction debugMode={debugMode} />} />
            </Routes>
          ) : userRole === 'CTSV' ? (
            <Routes>
              <Route path="/" element={<Navigate to="/ctsv-dashboard" replace />} />
              <Route path="/ctsv-dashboard" element={<CTSVDashboard debugMode={debugMode} />} />
              <Route path="/loan-requests" element={<CTSVDashboard debugMode={debugMode} />} />
              <Route path="/student-support" element={<CTSVDashboard debugMode={debugMode} />} />
              <Route path="/ctsv-reports" element={<CTSVDashboard debugMode={debugMode} />} />
            </Routes>
          ) : userRole === 'BGH' ? (
            <Routes>
              <Route path="/" element={<Navigate to="/bgh-dashboard" replace />} />
              <Route path="/bgh-dashboard" element={<BGHDashboard debugMode={debugMode} />} />
              <Route path="/ai-insights" element={<BGHDashboard debugMode={debugMode} />} />
              <Route path="/risk-analysis" element={<BGHDashboard debugMode={debugMode} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<AccountantDashboard debugMode={debugMode} />} />
              <Route path="/fee-management" element={<FeeManagement debugMode={debugMode} />} />
              <Route path="/traceability-matrix" element={<TraceabilityMatrix debugMode={debugMode} />} />
              <Route path="/reminder-settings" element={<ReminderSettings debugMode={debugMode} />} />
              <Route path="/extension-request" element={<ExtensionRequest debugMode={debugMode} />} />
            </Routes>
          )}
        </main>
        
        <RoadmapModal 
          isOpen={showRoadmapModal}
          onClose={() => setShowRoadmapModal(false)}
        />
      </div>
  );
}

export default App;

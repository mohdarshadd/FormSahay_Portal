import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NoticeAnalysis from './pages/NoticeAnalysis';
import EligibilityPage from './pages/EligibilityPage';
import DocumentVerification from './pages/DocumentVerification';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analyze" element={<NoticeAnalysis />} />
            <Route path="/eligibility" element={<EligibilityPage />} />
            <Route path="/verify" element={<DocumentVerification />} />
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0F172A',
              color: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.08)'
            },
            success: {
              iconTheme: {
                primary: '#138808',
                secondary: '#F8FAFC',
              },
            },
            error: {
              iconTheme: {
                primary: '#DC2626',
                secondary: '#F8FAFC',
              },
            }
          }}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;

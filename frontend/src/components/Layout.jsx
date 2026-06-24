import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  FileText, 
  LayoutDashboard, 
  UserCheck, 
  ShieldCheck, 
  HelpCircle,
  Flag,
  FileCheck,
  LogOut
} from 'lucide-react';

const Layout = ({ children }) => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Analyze Notice', path: '/analyze', icon: FileText },
    { name: 'Check Eligibility', path: '/eligibility', icon: UserCheck },
    { name: 'Verify Documents', path: '/verify', icon: ShieldCheck }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-slate-50 dark:bg-slate-950">
      
      {/* 1. Official Header */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* National Banner Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-600"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Government Utility Branding */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <FileCheck className="w-5 h-5 text-blue-900 dark:text-slate-300" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                    FormSahay
                  </span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    National Citizen Form & Welfare Audit Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links (Underline Style) */}
            <nav className="hidden md:flex space-x-1 h-full">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-4 h-16 text-xs font-bold transition-all border-b-2 ${
                      active 
                        ? 'border-blue-800 text-blue-900 dark:text-blue-400 dark:border-blue-400 font-extrabold' 
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Utilities */}
            <div className="flex items-center gap-2">
              {/* Auth Section */}
              {user ? (
                <div className="hidden sm:flex items-center gap-2 mr-1">
                  <div className="w-7 h-7 rounded-full bg-blue-800 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 max-w-[100px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <button
                    onClick={logOut}
                    className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-1.5 mr-1">
                  <Link
                    to="/login"
                    className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-400 px-2 py-1 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="text-xs font-semibold text-white bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-button transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Discreet Dark Mode Switcher */}
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-all"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 md:hidden text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-xs font-bold transition-all rounded ${
                      active
                        ? 'bg-slate-50 dark:bg-slate-800 text-blue-900 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
              {/* Mobile Auth Section */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                {user ? (
                  <div className="px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-800 flex items-center justify-center text-white text-[10px] font-bold">
                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                      </div>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {user.displayName || user.email}
                      </span>
                    </div>
                    <button
                      onClick={() => { logOut(); setMobileMenuOpen(false); }}
                      className="text-xs text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 px-3 py-2 rounded-button hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 text-center text-xs font-semibold text-white bg-blue-800 hover:bg-blue-900 px-3 py-2 rounded-button transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      {/* 2. Official Utility Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-[#1e293b] text-slate-300 dark:bg-slate-950">
        
        {/* National Banner Line */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-600"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
            
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2 text-white font-extrabold text-sm">
                <Flag className="w-4 h-4 text-amber-500" />
                <span>FormSahay Portal</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
                FormSahay is an independent civic utility portal. It provides automated OCR text extraction, citizen eligibility audits, and file verification reports to assist with document preparation.
              </p>
            </div>
            
            <div className="md:col-span-3 space-y-3">
              <h3 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                Portal Navigation
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="text-slate-400 hover:text-white transition-all">Citizen Dashboard</Link>
                </li>
                <li>
                  <Link to="/analyze" className="text-slate-400 hover:text-white transition-all">Analyze Form Notice</Link>
                </li>
                <li>
                  <Link to="/eligibility" className="text-slate-400 hover:text-white transition-all">Check Eligibility</Link>
                </li>
                <li>
                  <Link to="/verify" className="text-slate-400 hover:text-white transition-all">Verify Documents</Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h3 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                Disclaimer & Compliance
              </h3>
              <p className="text-[10px] text-slate-400 leading-normal">
                This website is not directly associated with the Ministry of Electronics and Information Technology (MeitY), National Informatics Centre (NIC), or any other administrative department of the Government of India. It is a utility tool designed to help citizens understand and audit applications.
              </p>
            </div>
          </div>
          
          <div className="border-t border-slate-800 dark:border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-400">
            <span>© {new Date().getFullYear()} FormSahay. Built for Indian Citizen Welfare Accessibility.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white flex items-center gap-1"><HelpCircle className="w-3 h-3" /> Citizen Helpdesk</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

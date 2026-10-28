import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  ShieldCheck, 
  LogOut, 
  UserCheck, 
  FileText, 
  HelpCircle,
  Stethoscope
} from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const { currentDoctor, isAuthenticated, logout, setIsFacultyGuideOpen } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActivePage('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-xs group-hover:bg-teal-700 transition-colors">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
                  MediRecord
                </span>
                <span className="text-[11px] font-medium text-teal-700 -mt-1 hidden sm:block whitespace-nowrap">
                  Patient Records Management
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActivePage('home')}
              className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activePage === 'home' ? 'text-teal-700 font-semibold border-b-2 border-teal-600' : ''
              }`}
            >
              Project Overview
            </button>
            <button
              onClick={() => setActivePage('search')}
              className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 py-1 ${
                ['search', 'patient-dashboard', 'reports', 'prescriptions', 'consultations', 'consent'].includes(activePage)
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                  : ''
              }`}
            >
              Patient Records
            </button>
            <button
              onClick={() => setActivePage('register')}
              className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activePage === 'register' ? 'text-teal-700 font-semibold border-b-2 border-teal-600' : ''
              }`}
            >
              Register Patient
            </button>
            <button
              onClick={() => setActivePage('design-thinking')}
              className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
                activePage === 'design-thinking' ? 'text-teal-700 font-semibold border-b-2 border-teal-600' : ''
              }`}
            >
              <span>Design Thinking</span>
              <span className="text-[10px] bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded font-bold">5 Stages</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action / account state */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsFacultyGuideOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors whitespace-nowrap"
              title="Open College Faculty Demonstration Checklist & Walkthrough"
            >
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>Demo Guide</span>
            </button>

            {isAuthenticated && currentDoctor ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <button
                  onClick={() => setActivePage('search')}
                  className="flex items-center gap-2 text-left hover:opacity-80 transition-opacity"
                  title={`Logged in as ${currentDoctor.name} (${currentDoctor.specialty})`}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700">
                    <Stethoscope className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                      {currentDoctor.name}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[120px]">
                      {currentDoctor.specialty}
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setActivePage('login');
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Sign Out Doctor Session"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActivePage('login')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors whitespace-nowrap shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Doctor Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight, 
  ShieldAlert, 
  FileCheck, 
  Search, 
  UserPlus, 
  Key,
  GraduationCap
} from 'lucide-react';

interface FacultyGuideModalProps {
  onNavigateTo: (page: string, patientId?: string) => void;
}

export const FacultyGuideModal: React.FC<FacultyGuideModalProps> = ({ onNavigateTo }) => {
  const { isFacultyGuideOpen, setIsFacultyGuideOpen, resetAllDemoData, currentDoctor, quickLogin, availableDoctors } = useAuth();

  if (!isFacultyGuideOpen) return null;

  const testSteps = [
    {
      step: '01',
      title: 'Doctor Authentication & Role Clearance',
      description: 'Login as an authorized medical practitioner or switch between Cardiology, Internal Medicine, and Endocrinology specialties.',
      actionLabel: 'Go to Doctor Login',
      onClick: () => {
        onNavigateTo('login');
        setIsFacultyGuideOpen(false);
      },
      icon: Key,
    },
    {
      step: '02',
      title: 'Lookup Patient by Unique ID',
      description: 'Search for fictional patient "PAT1001" (Ravi Kumar) or choose from the 5 pre-loaded clinical case studies.',
      actionLabel: 'Search Records',
      onClick: () => {
        onNavigateTo('search', 'PAT1001');
        setIsFacultyGuideOpen(false);
      },
      icon: Search,
    },
    {
      step: '03',
      title: 'Clinical Overview & Real-Time Vitals',
      description: 'View hemodynamic vitals, BMI, documented chronic illnesses, and critical drug allergy alert badges.',
      actionLabel: 'View PAT1001 Dashboard',
      onClick: () => {
        onNavigateTo('patient-dashboard', 'PAT1001');
        setIsFacultyGuideOpen(false);
      },
      icon: FileCheck,
    },
    {
      step: '04',
      title: 'Diagnostic Lab Slip & Normal Ranges',
      description: 'Open the NABL accredited HbA1c or Lipid Profile report to see reference ranges, out-of-range flags, and doctor notes.',
      actionLabel: 'View Lab Reports',
      onClick: () => {
        onNavigateTo('reports', 'PAT1001');
        setIsFacultyGuideOpen(false);
      },
      icon: FileCheck,
    },
    {
      step: '05',
      title: 'Electronic Prescriptions & Issue New Rx',
      description: 'Examine active medications and click "Issue New Prescription" to prescribe a new drug with dosage instructions.',
      actionLabel: 'Manage Prescriptions',
      onClick: () => {
        onNavigateTo('prescriptions', 'PAT1001');
        setIsFacultyGuideOpen(false);
      },
      icon: CheckCircle2,
    },
    {
      step: '06',
      title: 'Test Consent Enforcement & Privacy Gate',
      description: 'Simulate patient revoking access in the Consent tab. Watch the clinical system immediately block unauthorized records with an audit trail!',
      actionLabel: 'Test Consent Controls',
      onClick: () => {
        onNavigateTo('consent', 'PAT1001');
        setIsFacultyGuideOpen(false);
      },
      icon: ShieldAlert,
    },
    {
      step: '07',
      title: 'Register New Patient (Auto-ID Allocation)',
      description: 'Submit the registration form. The system allocates a unique ID (e.g. PAT1006) with initial consent verification.',
      actionLabel: 'Patient Registration Form',
      onClick: () => {
        onNavigateTo('register');
        setIsFacultyGuideOpen(false);
      },
      icon: UserPlus,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 rounded-t-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                College Faculty Demonstration & Testing Guide
              </h2>
              <p className="text-xs text-slate-500">
                Design Thinking Evaluation Framework for "MediRecord"
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFacultyGuideOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          {/* Quick notice */}
          <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-lg text-xs leading-relaxed text-teal-900">
            <p className="font-semibold text-teal-950 mb-1">
              Academic Demonstration Architecture:
            </p>
            <p>
              This prototype demonstrates a centralized, consent-driven medical records system developed using the 
              <strong> 5-Stage Design Thinking methodology</strong>. All clinical data is 100% fictional to protect medical privacy while fulfilling real college project rubric criteria.
            </p>
          </div>

          {/* Quick Doctor Switcher for Testing */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700">
                Current Active Session: {currentDoctor ? `${currentDoctor.name} (${currentDoctor.specialty})` : 'Not Logged In'}
              </span>
              <span className="text-[11px] text-slate-500">Quick Switch Doctor for Testing</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {availableDoctors.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => quickLogin(doc.id)}
                  className={`text-left p-2 rounded border text-xs transition-colors ${
                    currentDoctor?.id === doc.id
                      ? 'bg-teal-600 text-white border-teal-700 font-medium'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400'
                  }`}
                >
                  <p className="font-bold truncate">{doc.name}</p>
                  <p className={`text-[10px] truncate ${currentDoctor?.id === doc.id ? 'text-teal-100' : 'text-slate-500'}`}>
                    {doc.specialty}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step-by-Step Test Scenarios */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Recommended Test Scenarios for Faculty Review:
            </h3>
            <div className="space-y-3">
              {testSteps.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-slate-200 bg-white hover:border-teal-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={item.onClick}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-md transition-colors whitespace-nowrap self-end sm:self-center shrink-0"
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Design Thinking Context */}
          <div className="border-t border-slate-200 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Design Thinking Alignment:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <span className="font-bold text-teal-800 block">1. Empathize</span>
                <span className="text-[11px] text-slate-500">Doctors lose 35m/day chasing paper files</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <span className="font-bold text-teal-800 block">2. Define</span>
                <span className="text-[11px] text-slate-500">Fast ID search with patient-led consent</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <span className="font-bold text-teal-800 block">3. Ideate</span>
                <span className="text-[11px] text-slate-500">Unified EHR dashboard & audit logs</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <span className="font-bold text-teal-800 block">4. Prototype</span>
                <span className="text-[11px] text-slate-500">Interactive MediRecord web platform</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded col-span-2 sm:col-span-1">
                <span className="font-bold text-teal-800 block">5. Test</span>
                <span className="text-[11px] text-slate-500">Clinical role-based demonstration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 bg-slate-50 rounded-b-xl">
          <button
            onClick={() => {
              if (confirm('Reset database back to the original 5 fictional patients and reports?')) {
                resetAllDemoData();
                alert('Database successfully restored to default demo state.');
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-900 font-medium py-1 px-2 rounded hover:bg-rose-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={() => setIsFacultyGuideOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

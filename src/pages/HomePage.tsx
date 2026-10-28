import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  ShieldCheck, 
  Search, 
  FileText, 
  Pill, 
  Users, 
  ArrowRight, 
  Lock, 
  HelpCircle,
  Clock,
  Sparkles,
  Stethoscope
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, patientId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { currentDoctor, setIsFacultyGuideOpen } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* College Project Disclaimer Bar */}
      <div className="bg-teal-900 text-teal-100 text-xs px-4 py-2 border-b border-teal-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white bg-teal-800 px-2 py-0.5 rounded text-[11px]">
              Academic Prototype
            </span>
            <span>
              Design Thinking Project: MediRecord — Patient Medical Records Management System
            </span>
          </div>
          <button
            onClick={() => setIsFacultyGuideOpen(true)}
            className="underline hover:text-white text-[11px] font-medium"
          >
            Open Faculty Demonstration Walkthrough &rarr;
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Briefing & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Centralized Electronic Healthcare Record (EHR) Portal</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 text-balance leading-tight">
                One unified platform for authorized doctors to organize and locate patient records.
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                MediRecord bridges the critical gap in modern clinical workflows. Developed as a 
                <strong> college Design Thinking project</strong>, it replaces fragmented physical paper files with 
                instant patient ID lookups, synchronized laboratory reports, active e-prescriptions, and rigorous patient consent safeguards.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('search', 'PAT1001')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span>Demonstrate Patient Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('register')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
                >
                  <Users className="w-4 h-4 text-teal-600" />
                  <span>Register Patient</span>
                </button>

                <button
                  onClick={() => onNavigate('design-thinking')}
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-teal-800 hover:text-teal-900 transition-colors"
                >
                  <span>View 5-Stage Methodology</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Real Doctor Session status */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-teal-600" />
                  <span>Demonstration Officer: </span>
                  <strong className="text-slate-800">
                    {currentDoctor ? currentDoctor.name : 'Guest Doctor'}
                  </strong>
                </div>
                <span>·</span>
                <span>Fictional Clinical Dataset</span>
              </div>
            </div>

            {/* Right Column: Hero Image Container */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
                <img
                  src="/src/assets/images/hospital_doctor_records_1793158038719.jpg"
                  alt="Doctor reviewing electronic health records on digital tablet in hospital"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-teal-600/90 backdrop-blur-xs px-2.5 py-1 rounded w-fit mb-2">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Secure Medical Records Vault</span>
                  </div>
                  <p className="text-sm font-medium text-slate-100">
                    Instant access to diagnostic lab values, prescriptions, and historical hospital encounters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Thinking Core Objectives Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-teal-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">1. Unique Patient ID Lookup</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Eliminates paperwork confusion by indexing records under unique alphanumeric patient identifiers.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-teal-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">2. Synchronized Diagnostic Labs</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Standardized laboratory slips with reference ranges, abnormality flags, and pathologist signatures.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-teal-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Pill className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">3. Active E-Prescriptions</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Tracks active medications, dosages, refill quotas, and cross-checks against patient drug allergies.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-teal-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">4. Patient Consent & Audit Logs</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Full patient autonomy with toggleable consent, specialty restrictions, and timestamped access logs.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Fictional Patients Showcase (For Demonstration Ease) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs uppercase tracking-wider text-teal-700">Pre-Configured Case Studies</span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">1-Click Launch for Faculty Review</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
              Select a Fictional Patient Record to Test
            </h2>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            <span>Open Advanced Directory Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Patient 1 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  PAT1001
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Blood: O+
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Ravi Kumar</h3>
              <p className="text-xs text-slate-500 mt-0.5">35 Years · Male · Bengaluru</p>
              
              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <p>
                  <strong className="text-slate-800">Primary Diagnosis:</strong> Type 2 Diabetes, Stage 1 Hypertension
                </p>
                <p>
                  <strong className="text-slate-800">Key Lab Report:</strong> HbA1c (7.4% High) & Lipid Profile
                </p>
                <p>
                  <strong className="text-slate-800">Consent State:</strong> Granted (Full Access)
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">3 Consultations · 3 Rx</span>
              <button
                onClick={() => onNavigate('patient-dashboard', 'PAT1001')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-md transition-colors"
              >
                <span>Open Record</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Patient 2 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  PAT1002
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Blood: B+
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Anita Desai</h3>
              <p className="text-xs text-slate-500 mt-0.5">42 Years · Female · Mumbai</p>
              
              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <p>
                  <strong className="text-slate-800">Primary Diagnosis:</strong> Hypothyroidism & Bronchial Asthma
                </p>
                <p>
                  <strong className="text-slate-800">Key Lab Report:</strong> TSH (6.82 µIU/mL High) & CBC
                </p>
                <p>
                  <strong className="text-slate-800">Consent State:</strong> Granted (Endocrine / Pulmonary)
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">2 Consultations · 2 Rx</span>
              <button
                onClick={() => onNavigate('patient-dashboard', 'PAT1002')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-md transition-colors"
              >
                <span>Open Record</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Patient 3 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  PAT1003
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Blood: A+
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Vikram Singh</h3>
              <p className="text-xs text-slate-500 mt-0.5">58 Years · Male · New Delhi</p>
              
              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <p>
                  <strong className="text-slate-800">Primary Diagnosis:</strong> Post-LAD Stenting & Dyslipidemia
                </p>
                <p>
                  <strong className="text-slate-800">Key Lab Report:</strong> Doppler Echo (LVEF 55%) & Statin Panel
                </p>
                <p>
                  <strong className="text-slate-800">Consent State:</strong> Granted (Cardiology Track)
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">4 Consultations · 3 Rx</span>
              <button
                onClick={() => onNavigate('patient-dashboard', 'PAT1003')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-md transition-colors"
              >
                <span>Open Record</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Patient 4 (Sneha Reddy - Restricted Consent) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  PAT1004
                </span>
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  Restricted Privacy
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Sneha Reddy</h3>
              <p className="text-xs text-slate-500 mt-0.5">27 Years · Female · Hyderabad</p>
              
              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <p>
                  <strong className="text-slate-800">Primary Diagnosis:</strong> Chronic Migraine & Iron Deficiency
                </p>
                <p>
                  <strong className="text-rose-700 font-bold">Critical Alert:</strong> Penicillin Anaphylaxis Warning
                </p>
                <p>
                  <strong className="text-slate-800">Consent State:</strong> Restricted (Internal Med / Neurology)
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Test Privacy Security Gate</span>
              <button
                onClick={() => onNavigate('patient-dashboard', 'PAT1004')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-md transition-colors"
              >
                <span>Open Record</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Patient 5 (Mohammed Farooq) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  PAT1005
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Blood: O-
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Mohammed Farooq</h3>
              <p className="text-xs text-slate-500 mt-0.5">64 Years · Male · Chennai</p>
              
              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <p>
                  <strong className="text-slate-800">Primary Diagnosis:</strong> Chronic Kidney Disease (Stage 2) & Knee OA
                </p>
                <p>
                  <strong className="text-slate-800">Key Lab Report:</strong> Serum Creatinine (1.48) & Knee X-Rays
                </p>
                <p>
                  <strong className="text-slate-800">Contraindication:</strong> Avoid all NSAIDs (Renal toxicity)
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">3 Consultations · 2 Rx</span>
              <button
                onClick={() => onNavigate('patient-dashboard', 'PAT1005')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-md transition-colors"
              >
                <span>Open Record</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Register New Patient CTA Card */}
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-5 rounded-xl border border-teal-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Register New Patient</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Demonstrate the intake workflow. Enter patient demographics, blood group, and emergency contacts to auto-allocate <strong>PAT1006</strong>.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-teal-200/50">
              <button
                onClick={() => onNavigate('register')}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-xs"
              >
                <span>Open Registration Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* College Project Architecture & Hospital Context */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Design Thinking Framework
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Engineered for Clinical Velocity & Privacy
              </h2>
              <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong>1. The Empathize Discovery:</strong> Doctors frequently spend 20 to 35 minutes searching for prior physical files, resulting in redundant lab tests and delayed diagnosis.
                </p>
                <p>
                  <strong>2. The Defined Solution:</strong> A unified digital hub keyed to an unambiguous Patient ID (PATxxxx), allowing doctors across departments to review validated lab slips and medication timelines in seconds.
                </p>
                <p>
                  <strong>3. Privacy & Autonomy by Design:</strong> Patients retain sovereign control over their records. If consent is revoked or limited to specific specialties, unauthorized access attempts are blocked and logged into an immutable audit trail.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('design-thinking')}
                  className="px-4 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors"
                >
                  Read Full Project Documentation
                </button>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <img
                src="/src/assets/images/medical_center_exterior_1793158038148.jpg"
                alt="Modern hospital medical center campus"
                className="w-full h-72 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex justify-between items-center">
                <span>Apex University Medical Center Campus</span>
                <span className="font-semibold text-teal-700">Digital Health Division</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

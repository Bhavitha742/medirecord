import React from 'react';
import { 
  Heart, 
  Target, 
  Lightbulb, 
  Layers, 
  CheckCircle, 
  GraduationCap, 
  ArrowRight,
  ShieldCheck,
  Search,
  FileText,
  UserCheck
} from 'lucide-react';

interface DesignThinkingPageProps {
  onStartDemo: () => void;
}

export const DesignThinkingPage: React.FC<DesignThinkingPageProps> = ({ onStartDemo }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 mb-4">
          <GraduationCap className="w-4 h-4 text-teal-600" />
          <span>Academic Project Presentation & Rubric</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Design Thinking Project Documentation
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
          <strong>Project Title:</strong> MediRecord — Patient Medical Records Management System.
          <br />
          <strong>Domain:</strong> Healthcare Informatics & Clinical Decision Support.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onStartDemo}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors"
          >
            <span>Launch Interactive Demonstration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5 Stages Grid */}
      <div className="space-y-8">
        {/* Stage 1: Empathize */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">Stage 01</span>
              <h2 className="text-xl font-bold text-slate-900">Empathize: Understanding Healthcare Frustrations</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="block text-slate-900 font-bold mb-1 text-sm">Physician Pain Points</strong>
              <p className="leading-relaxed">
                Hospital doctors lose an average of 25–35 minutes per shift searching through uncollated physical paper folders. In emergency situations, lack of prior medication history poses fatal contraindication risks.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="block text-slate-900 font-bold mb-1 text-sm">Patient Vulnerability</strong>
              <p className="leading-relaxed">
                Patients are forced to physically carry heavy binders of laboratory reports and historical discharge slips from clinic to clinic, often losing critical diagnostic sheets between appointments.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="block text-slate-900 font-bold mb-1 text-sm">Privacy & Trust Deficit</strong>
              <p className="leading-relaxed">
                Traditional hospital physical files have zero access accountability: anyone holding the paper file can read sensitive psychological, reproductive, or oncological history without patient consent.
              </p>
            </div>
          </div>
        </div>

        {/* Stage 2: Define */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Stage 02</span>
              <h2 className="text-xl font-bold text-slate-900">Define: Problem Statement & Point of View (POV)</h2>
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-xl text-xs text-amber-950 mb-4 leading-relaxed">
            <strong className="text-sm block text-amber-900 mb-1">Core Problem Statement:</strong>
            "Authorised hospital physicians need a secure, instantaneous method to retrieve and verify patients' complete longitudinal clinical histories (labs, prescriptions, encounters) using a single unique ID, while ensuring patients maintain granular, sovereign consent over which departments can access their health data."
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 text-sm block mb-1">User Persona: Dr. Ananya Sharma</span>
              <p className="text-slate-600">
                Senior Cardiologist treating 40+ outpatients daily. Needs to check renal creatinine before ordering contrast angiograms in under 10 seconds.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 text-sm block mb-1">User Persona: Ravi Kumar (PAT1001)</span>
              <p className="text-slate-600">
                Working professional with chronic Type 2 Diabetes. Wants his endocrinologist and cardiologist to collaborate on his medications without carrying paper folders.
              </p>
            </div>
          </div>
        </div>

        {/* Stage 3: Ideate */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center font-bold">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">Stage 03</span>
              <h2 className="text-xl font-bold text-slate-900">Ideate: Brainstormed Solutions & Architectural Decisions</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-teal-800 block font-bold mb-1">Unique Patient ID (PATxxxx)</strong>
              <p className="text-slate-600">
                Fictionalized identifier replacing paper tokens and sensitive national IDs to preserve privacy during demonstration.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-teal-800 block font-bold mb-1">Standardized Diagnostic Slips</strong>
              <p className="text-slate-600">
                Parses lab parameters against biological reference intervals with automated high/low abnormality flags.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-teal-800 block font-bold mb-1">Dynamic Consent Gate</strong>
              <p className="text-slate-600">
                Instant locking of records if patient revokes access, backed by emergency glass-break logging.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-teal-800 block font-bold mb-1">Live Audit Trail</strong>
              <p className="text-slate-600">
                Records timestamp, doctor identity, and specific resource accessed for non-repudiation.
              </p>
            </div>
          </div>
        </div>

        {/* Stage 4: Prototype */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Stage 04</span>
              <h2 className="text-xl font-bold text-slate-900">Prototype: MediRecord System Architecture</h2>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <p>
              The prototype is implemented as a responsive single-page web application in React 19, TypeScript, and Tailwind CSS.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-[11px]">
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="text-teal-700 font-bold block">Presentation Layer</span>
                <span>Hospital Dashboard, Lab Viewer, Rx Pad, Responsive Navbar</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="text-teal-700 font-bold block">Business & Security Engine</span>
                <span>Permission guard, Specialty matching, Emergency override</span>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="text-teal-700 font-bold block">Storage Engine</span>
                <span>Persistent LocalStorage with pre-seeded 5 fictional patients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 5: Test */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Stage 05</span>
              <h2 className="text-xl font-bold text-slate-900">Test: Verification & Evaluation Scenarios</h2>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg">
              <strong className="text-emerald-950 font-semibold block mb-0.5">Faculty Evaluation Checklist:</strong>
              <ul className="list-disc list-inside space-y-1 text-emerald-900">
                <li>Doctor authentication with 1-click test profiles (Cardiology, Internal Medicine, Endocrinology).</li>
                <li>Patient search via unique ID (PAT1001) returning clinical history and vitals in 0.1s.</li>
                <li>Interactive lab reports displaying reference intervals and flagged abnormal values.</li>
                <li>Electronic prescription writing with automated allergy alert checks.</li>
                <li>Enforced consent rules: Revoking consent triggers real access-blocked security barriers.</li>
                <li>New patient registration auto-assigning next ID (PAT1006).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

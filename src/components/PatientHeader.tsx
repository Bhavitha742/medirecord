import React from 'react';
import { Patient, ConsentStatus } from '../types';
import { 
  FileText, 
  Pill, 
  ClipboardList, 
  ShieldCheck, 
  Activity, 
  Phone, 
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';

interface PatientHeaderProps {
  patient: Patient;
  activeSubTab: 'overview' | 'reports' | 'prescriptions' | 'consultations' | 'consent';
  onSubTabChange: (tab: 'overview' | 'reports' | 'prescriptions' | 'consultations' | 'consent') => void;
  reportCount: number;
  prescriptionCount: number;
  consultationCount: number;
  onBackToSearch: () => void;
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({
  patient,
  activeSubTab,
  onSubTabChange,
  reportCount,
  prescriptionCount,
  consultationCount,
  onBackToSearch,
}) => {
  const getConsentBadge = (status: ConsentStatus) => {
    switch (status) {
      case 'Granted':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            Consent Active (Granted)
          </span>
        );
      case 'Restricted':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            Restricted Specialty Access
          </span>
        );
      case 'Revoked':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            Consent Revoked
          </span>
        );
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Breadcrumb & back button */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBackToSearch}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Patient Search Directory</span>
          </button>

          <div className="flex items-center gap-2">
            {getConsentBadge(patient.consent.status)}
            <span className="text-[11px] text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-mono">
              Registered: {patient.registeredDate}
            </span>
          </div>
        </div>

        {/* Patient Profile Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold text-xl shrink-0">
              {patient.bloodGroup}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  {patient.name}
                </h1>
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {patient.id}
                </span>
                <span className="text-xs text-slate-500">
                  {patient.age} Yrs · {patient.gender} · {patient.city}
                </span>
              </div>

              {/* Patient Allergies / Critical alerts */}
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                {patient.allergies.length > 0 && (
                  <div className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-medium">
                    <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                    <span>Allergies: {patient.allergies.join(', ')}</span>
                  </div>
                )}
                <div className="text-slate-500 flex items-center gap-1">
                  <span>Emergency:</span>
                  <span className="font-medium text-slate-700">
                    {patient.emergencyContact.name} ({patient.emergencyContact.relationship}) - {patient.emergencyContact.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick vital summary pill */}
          <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs shrink-0">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Blood Pressure</span>
              <span className="font-mono font-bold text-slate-800">{patient.vitals.bloodPressure}</span>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Heart Rate</span>
              <span className="font-mono font-bold text-slate-800">{patient.vitals.heartRate} bpm</span>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Blood Glucose</span>
              <span className="font-mono font-bold text-slate-800">{patient.vitals.glucose} mg/dL</span>
            </div>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-1 sm:gap-2 mt-4 overflow-x-auto pb-1 text-xs font-medium">
          <button
            onClick={() => onSubTabChange('overview')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'overview'
                ? 'bg-teal-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Clinical Overview</span>
          </button>

          <button
            onClick={() => onSubTabChange('reports')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'reports'
                ? 'bg-teal-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Diagnostic Reports</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeSubTab === 'reports' ? 'bg-teal-700 text-teal-100' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {reportCount}
            </span>
          </button>

          <button
            onClick={() => onSubTabChange('prescriptions')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'prescriptions'
                ? 'bg-teal-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Prescriptions</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeSubTab === 'prescriptions' ? 'bg-teal-700 text-teal-100' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {prescriptionCount}
            </span>
          </button>

          <button
            onClick={() => onSubTabChange('consultations')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'consultations'
                ? 'bg-teal-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Consultation History</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeSubTab === 'consultations' ? 'bg-teal-700 text-teal-100' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {consultationCount}
            </span>
          </button>

          <button
            onClick={() => onSubTabChange('consent')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'consent'
                ? 'bg-teal-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Consent & Access Logs</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Patient, Doctor, LabReport, Prescription, ConsultationVisit } from '../types';
import { 
  Heart, 
  Activity, 
  Droplet, 
  Wind, 
  Thermometer, 
  Scale, 
  AlertTriangle, 
  Phone, 
  Calendar, 
  FileText, 
  Pill, 
  ClipboardList, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  UserCheck
} from 'lucide-react';

interface PatientDashboardPageProps {
  patient: Patient;
  doctor: Doctor | null;
  labReports: LabReport[];
  prescriptions: Prescription[];
  consultations: ConsultationVisit[];
  onNavigateTab: (tab: 'overview' | 'reports' | 'prescriptions' | 'consultations' | 'consent') => void;
  onOpenNewPrescription: () => void;
  onOpenNewConsultation: () => void;
}

export const PatientDashboardPage: React.FC<PatientDashboardPageProps> = ({
  patient,
  doctor,
  labReports,
  prescriptions,
  consultations,
  onNavigateTab,
  onOpenNewPrescription,
  onOpenNewConsultation,
}) => {
  const activePrescriptions = prescriptions.filter((p) => p.status === 'Active');
  const abnormalReports = labReports.filter((r) => r.flaggedAbnormal);

  return (
    <div className="space-y-6">
      {/* Top Notification / Allergy Warning Bar if present */}
      {patient.allergies.length > 0 && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-rose-900 block text-sm">
              Critical Patient Allergy Warning
            </span>
            <p className="text-rose-800 mt-0.5">
              Documented severe sensitivity to: <strong>{patient.allergies.join(', ')}</strong>. Do not administer or prescribe without verifying pharmaceutical cross-reactivity.
            </p>
          </div>
        </div>
      )}

      {/* Primary Vitals Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              Hemodynamic Vitals & Physiological Measurements
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              (Updated: {patient.vitals.lastUpdated})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* BP */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">Blood Pressure</span>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>
            <p className="font-mono text-xl font-bold text-slate-900 tabular-nums">
              {patient.vitals.bloodPressure}
            </p>
            <span className="text-[10px] text-slate-500">mmHg (Resting)</span>
          </div>

          {/* Heart Rate */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">Heart Rate</span>
              <Activity className="w-4 h-4 text-teal-600" />
            </div>
            <p className="font-mono text-xl font-bold text-slate-900 tabular-nums">
              {patient.vitals.heartRate}
            </p>
            <span className="text-[10px] text-slate-500">beats per min</span>
          </div>

          {/* Blood Glucose */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">Glucose</span>
              <Droplet className="w-4 h-4 text-blue-500" />
            </div>
            <p className="font-mono text-xl font-bold text-slate-900 tabular-nums">
              {patient.vitals.glucose}
            </p>
            <span className="text-[10px] text-slate-500">mg/dL (Fasting)</span>
          </div>

          {/* SpO2 */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">Oxygen SpO2</span>
              <Wind className="w-4 h-4 text-cyan-600" />
            </div>
            <p className="font-mono text-xl font-bold text-slate-900 tabular-nums">
              {patient.vitals.spo2}%
            </p>
            <span className="text-[10px] text-slate-500">Room Air Saturation</span>
          </div>

          {/* Body Temperature */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">Temp</span>
              <Thermometer className="w-4 h-4 text-amber-500" />
            </div>
            <p className="font-mono text-xl font-bold text-slate-900 tabular-nums">
              {patient.vitals.temperature}°F
            </p>
            <span className="text-[10px] text-slate-500">Oral Tympanic</span>
          </div>

          {/* BMI & Weight */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">BMI / Weight</span>
              <Scale className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="font-mono text-xl font-bold text-slate-900 tabular-nums">
              {patient.vitals.bmi}
            </p>
            <span className="text-[10px] text-slate-500">{patient.vitals.weightKg} kg</span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Conditions & Emergency + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Clinical Conditions & Diagnostics Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chronic Medical Conditions Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Chronic Medical History & Diagnoses
            </h3>
            <div className="space-y-2.5">
              {patient.chronicConditions.map((condition, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    <span className="font-bold text-slate-800">{condition}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Active Clinical Management</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Prescriptions Preview Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Active Medications ({activePrescriptions.length})
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('prescriptions')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
              >
                <span>View All & Prescribe</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {activePrescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start justify-between"
                >
                  <div>
                    <h4 className="font-bold text-slate-900">{rx.medicationName}</h4>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {rx.dosage} · {rx.frequency}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-1 italic">
                      Instructions: {rx.instructions}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active Rx
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">{rx.doctorSpecialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Consultation History Snapshot */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Recent Hospital Consultations ({consultations.length})
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('consultations')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
              >
                <span>View Full Encounter Logs</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {consultations.slice(0, 2).map((visit) => (
                <div
                  key={visit.id}
                  className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1.5"
                >
                  <div className="flex justify-between items-center text-slate-500 text-[11px]">
                    <span className="font-bold text-teal-800 font-mono">{visit.date}</span>
                    <span>{visit.department} · {visit.doctorName}</span>
                  </div>
                  <p className="font-semibold text-slate-900">
                    {visit.chiefComplaint}
                  </p>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    <strong>Diagnosis & Plan:</strong> {visit.diagnosis} · {visit.treatmentPlan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Quick Clinical Actions, Emergency Contacts & Privacy Status */}
        <div className="space-y-6">
          {/* Action Center */}
          <div className="bg-teal-900 text-white p-5 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Physician Workflow Actions
            </h3>
            <p className="text-xs text-teal-100 leading-relaxed">
              Authorized clinical tools for {patient.name} ({patient.id})
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={onOpenNewPrescription}
                className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-teal-800 hover:bg-teal-700 text-xs font-semibold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-teal-300" />
                  <span>Issue New Prescription</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
              </button>

              <button
                onClick={onOpenNewConsultation}
                className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-teal-800 hover:bg-teal-700 text-xs font-semibold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-teal-300" />
                  <span>Document New Visit Note</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
              </button>

              <button
                onClick={() => onNavigateTab('reports')}
                className="w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-teal-800 hover:bg-teal-700 text-xs font-semibold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-300" />
                  <span>View Diagnostic Lab Slips</span>
                </div>
                <span className="text-[10px] bg-teal-950 px-2 py-0.5 rounded font-mono">
                  {labReports.length}
                </span>
              </button>
            </div>
          </div>

          {/* Emergency Contact Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-xs space-y-3">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>Next of Kin / Emergency Contact</span>
            </h3>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
              <p className="font-bold text-slate-900 text-sm">
                {patient.emergencyContact.name}
              </p>
              <p className="text-slate-500">
                Relationship: <span className="text-slate-700 font-medium">{patient.emergencyContact.relationship}</span>
              </p>
              <p className="font-mono text-teal-800 font-bold">
                {patient.emergencyContact.phone}
              </p>
            </div>
          </div>

          {/* Consent Policy Summary */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Patient Privacy Guard</span>
              </h3>
              <button
                onClick={() => onNavigateTab('consent')}
                className="text-[11px] font-semibold text-teal-700 hover:underline"
              >
                Manage
              </button>
            </div>

            <div className="space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Status:</span>
                <strong className="text-slate-800">{patient.consent.status}</strong>
              </div>
              <div className="flex justify-between">
                <span>Emergency Override:</span>
                <span className="text-slate-800 font-medium">
                  {patient.consent.allowEmergencyOverride ? 'Permitted' : 'Disabled'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Permitted Specialties:</span>
                <span className="text-slate-800 font-medium text-right max-w-[140px] truncate">
                  {patient.consent.allowedSpecialties.join(', ')}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              {patient.consent.notes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

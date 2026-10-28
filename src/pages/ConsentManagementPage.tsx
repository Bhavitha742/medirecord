import React, { useState } from 'react';
import { Patient, Doctor, ConsentStatus } from '../types';
import { StorageService } from '../services/storageService';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertTriangle, 
  History, 
  RefreshCw,
  Info
} from 'lucide-react';

interface ConsentManagementPageProps {
  patient: Patient;
  doctor: Doctor | null;
  onConsentUpdated: () => void;
}

export const ConsentManagementPage: React.FC<ConsentManagementPageProps> = ({
  patient,
  doctor,
  onConsentUpdated,
}) => {
  const [status, setStatus] = useState<ConsentStatus>(patient.consent.status);
  const [allowEmergency, setAllowEmergency] = useState(patient.consent.allowEmergencyOverride);
  const [specialties, setSpecialties] = useState<string[]>(patient.consent.allowedSpecialties);
  const [notes, setNotes] = useState(patient.consent.notes);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const auditLogs = StorageService.getAuditLogs(patient.id);

  const allAvailableSpecialties = [
    'Internal Medicine',
    'Cardiology',
    'Endocrinology & Diabetology',
    'Pulmonology',
    'Nephrology',
    'Neurology',
    'Orthopedics',
    'Emergency Medicine',
  ];

  const handleToggleSpecialty = (spec: string) => {
    if (specialties.includes(spec)) {
      setSpecialties(specialties.filter((s) => s !== spec));
    } else {
      setSpecialties([...specialties, spec]);
    }
  };

  const handleSaveConsent = () => {
    StorageService.updatePatientConsent(
      patient.id,
      {
        status,
        allowedSpecialties: specialties,
        allowEmergencyOverride: allowEmergency,
        lastUpdated: new Date().toISOString().split('T')[0],
        authorizedRepresentative: patient.consent.authorizedRepresentative,
        notes,
      },
      doctor ? doctor.name : 'Hospital Privacy Officer'
    );

    setSaveSuccess(true);
    onConsentUpdated();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs uppercase tracking-wider text-teal-700">
            Patient Autonomy & Data Governance
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500">Security Gate & Audit Trail</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-0.5">
          Patient Consent & Access Management Interface
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Design Thinking focal feature: Empowers {patient.name} to control which medical departments can decrypt electronic records.
        </p>
      </div>

      {/* College Project Interactive Testing Callout */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-teal-900 block">
              Faculty Demonstration Test:
            </span>
            <p className="text-teal-800">
              Toggle the status below to <strong>"Revoked"</strong> and click "Save Consent Policy". Then try opening any protected clinical record—the system will enforce an access denial screen and log the violation!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const nextStatus: ConsentStatus = status === 'Granted' ? 'Revoked' : 'Granted';
            setStatus(nextStatus);
            StorageService.updatePatientConsent(
              patient.id,
              {
                ...patient.consent,
                status: nextStatus,
                lastUpdated: new Date().toISOString().split('T')[0],
              },
              doctor ? doctor.name : 'Attending Physician'
            );
            onConsentUpdated();
            alert(`Demonstration Consent switched to: "${nextStatus}".`);
          }}
          className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg text-xs shrink-0 whitespace-nowrap shadow-xs transition-colors"
        >
          {status === 'Granted' ? 'Simulate Revoking Consent' : 'Restore Consent (Granted)'}
        </button>
      </div>

      {/* Consent Configuration Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {saveSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Consent settings saved successfully. Security rules & audit log updated.</span>
          </div>
        )}

        {/* 1. Status selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Record Sharing Authorization Level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setStatus('Granted')}
              className={`p-4 rounded-xl border text-left transition-all ${
                status === 'Granted'
                  ? 'bg-emerald-50 border-emerald-500 shadow-2xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 text-sm">Granted (Full)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Authorized medical personnel in the hospital network can review lab slips and consultations.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setStatus('Restricted')}
              className={`p-4 rounded-xl border text-left transition-all ${
                status === 'Restricted'
                  ? 'bg-amber-50 border-amber-500 shadow-2xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 text-sm">Restricted</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Only doctors belonging to approved medical departments may inspect diagnostic files.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setStatus('Revoked')}
              className={`p-4 rounded-xl border text-left transition-all ${
                status === 'Revoked'
                  ? 'bg-rose-50 border-rose-500 shadow-2xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 text-sm">Revoked (Locked)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                All electronic access blocked immediately. Unlocks only via Emergency Glass-Break protocol.
              </p>
            </button>
          </div>
        </div>

        {/* 2. Department clearances */}
        {status !== 'Revoked' && (
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Authorized Hospital Departments ({specialties.length} Permitted)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              {allAvailableSpecialties.map((spec) => {
                const isChecked = specialties.includes(spec);
                return (
                  <button
                    type="button"
                    key={spec}
                    onClick={() => handleToggleSpecialty(spec)}
                    className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                      isChecked
                        ? 'bg-teal-50 border-teal-300 text-teal-900 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{spec}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      readOnly
                      className="accent-teal-600 rounded"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Emergency Glass-Break checkbox */}
        <div className="pt-2 border-t border-slate-100 flex items-start gap-3">
          <input
            id="emergencyToggle"
            type="checkbox"
            checked={allowEmergency}
            onChange={(e) => setAllowEmergency(e.target.checked)}
            className="w-4 h-4 accent-teal-600 mt-0.5 rounded"
          />
          <label htmlFor="emergencyToggle" className="text-xs text-slate-700 cursor-pointer">
            <strong className="block text-slate-900">
              Permit Emergency "Glass Break" Override
            </strong>
            <span>
              If patient is unconscious or in life-threatening trauma, emergency physicians may bypass normal consent locks. Every override requires clinical justification and notifies the hospital ethics board.
            </span>
          </label>
        </div>

        {/* 4. Consent notes */}
        <div className="pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Patient Directive & Legal Representation Notes
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-xs text-slate-900"
          />
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={handleSaveConsent}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors"
          >
            Save Consent Policy & Update Access Rules
          </button>
        </div>
      </div>

      {/* Live Access Audit Trail Log (Real security feature!) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-teal-600" />
              <h3 className="text-base font-bold text-slate-900">
                Patient Access Security Audit Trail
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Immutable record of every practitioner access event, prescription dispensed, and consent modification.
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {auditLogs.length} Events Logged
          </span>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">Medical Officer</th>
                <th className="py-2.5 px-4">Action</th>
                <th className="py-2.5 px-4">Resource Accessed</th>
                <th className="py-2.5 px-4">Security Clearance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-normal">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-mono text-slate-500 tabular-nums whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="font-semibold text-slate-900 block">{log.actorName}</span>
                    <span className="text-[10px] text-slate-500">{log.actorRole}</span>
                  </td>
                  <td className="py-2.5 px-4 font-medium text-slate-800">
                    {log.action}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-[11px] text-teal-700">
                    {log.resourceAccessed}
                  </td>
                  <td className="py-2.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border ${
                        log.accessStatus === 'Authorized'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : log.accessStatus === 'Emergency-Override'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {log.accessStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

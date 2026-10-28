import React from 'react';
import { Patient, Doctor } from '../types';
import { StorageService } from '../services/storageService';
import { ShieldAlert, Lock, AlertTriangle, ArrowLeft } from 'lucide-react';

interface ConsentBlockedViewProps {
  patient: Patient;
  currentDoctor: Doctor | null;
  reason: string;
  canEmergencyOverride: boolean;
  onOverrideSuccess?: () => void;
  onBackToSearch: () => void;
}

export const ConsentBlockedView: React.FC<ConsentBlockedViewProps> = ({
  patient,
  currentDoctor,
  reason,
  canEmergencyOverride,
  onOverrideSuccess,
  onBackToSearch,
}) => {
  const handleEmergencyOverride = () => {
    if (!currentDoctor) return;
    const justification = prompt(
      'EMERGENCY OVERRIDE PROTOCOL:\nPlease enter the clinical justification for breaking the glass access policy (e.g., "Acute ER chest pain evaluation", "Unconscious patient trauma screen"):'
    );

    if (justification && justification.trim().length > 5) {
      StorageService.addAuditLog({
        patientId: patient.id,
        actorName: currentDoctor.name,
        actorRole: currentDoctor.role,
        action: 'Emergency Glass Break Override',
        resourceAccessed: `${patient.id} Clinical Vault`,
        accessStatus: 'Emergency-Override',
        details: `Emergency access triggered by ${currentDoctor.name} (${currentDoctor.specialty}). Clinical Justification: "${justification}". Hospital ethics committee notified.`,
      });

      alert(
        `Emergency Override Granted for 2 hours.\nAudit Log AUD-${Date.now().toString().slice(-4)} generated and transmitted to hospital security officer.`
      );

      if (onOverrideSuccess) {
        onOverrideSuccess();
      }
    } else if (justification !== null) {
      alert('Override aborted: A clinically valid justification of at least 6 characters is legally required.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-white border border-rose-200 rounded-xl shadow-xs text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-full flex items-center justify-center">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
        Access Authorization Restricted
      </span>

      <h2 className="text-2xl font-bold text-slate-900 mt-3 mb-2">
        Patient Record Privacy Guard
      </h2>

      <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed mb-6">
        {reason}
      </p>

      {/* Security Context Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-xl mx-auto text-left text-xs space-y-2 mb-6">
        <div className="flex justify-between border-b border-slate-200 pb-2">
          <span className="text-slate-500">Target Patient:</span>
          <span className="font-semibold text-slate-800">{patient.name} ({patient.id})</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-2">
          <span className="text-slate-500">Patient Consent State:</span>
          <span className="font-semibold text-rose-700">{patient.consent.status}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-2">
          <span className="text-slate-500">Accessing Medical Officer:</span>
          <span className="font-semibold text-slate-800">
            {currentDoctor ? `${currentDoctor.name} (${currentDoctor.specialty})` : 'Unauthenticated Guest'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Emergency Protocol:</span>
          <span className="font-semibold text-slate-800">
            {canEmergencyOverride ? 'Permitted under clinical duress' : 'Disallowed by patient consent directive'}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onBackToSearch}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Patient Lookup</span>
        </button>

        {canEmergencyOverride && (
          <button
            onClick={handleEmergencyOverride}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors w-full sm:w-auto justify-center shadow-xs"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Invoke Emergency Override (Glass Break)</span>
          </button>
        )}
      </div>

      <p className="text-[11px] text-slate-500 mt-6">
        College Design Thinking Notice: Real access restrictions enforce that only granted specialties or emergency authorizations can view diagnostic files.
      </p>
    </div>
  );
};

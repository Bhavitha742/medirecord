import React, { useState } from 'react';
import { Patient, Doctor, Prescription } from '../types';
import { NewPrescriptionModal } from '../components/NewPrescriptionModal';
import { 
  Pill, 
  Plus, 
  Calendar, 
  Printer, 
  AlertTriangle, 
  CheckCircle, 
  RotateCw,
  Clock,
  ShieldAlert
} from 'lucide-react';

interface PrescriptionsPageProps {
  patient: Patient;
  doctor: Doctor | null;
  prescriptions: Prescription[];
  onRefresh: () => void;
}

export const PrescriptionsPage: React.FC<PrescriptionsPageProps> = ({
  patient,
  doctor,
  prescriptions,
  onRefresh,
}) => {
  const [isNewRxModalOpen, setIsNewRxModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'Active' | 'Completed'>('ALL');

  const filteredPrescriptions = prescriptions.filter((rx) => {
    if (filterStatus === 'ALL') return true;
    return rx.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs uppercase tracking-wider text-teal-700">
              Electronic Formulary & Pharmacy Orders
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500">Live Active Orders</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-0.5">
            Prescriptions & Medication Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Active pharmacological regimens, dispensing schedules, and clinical precautions for {patient.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {doctor && (
            <button
              onClick={() => setIsNewRxModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Issue New Prescription</span>
            </button>
          )}
        </div>
      </div>

      {/* Drug Allergy Warning Strip if applicable */}
      {patient.allergies.length > 0 && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-900">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong>Documented Drug Allergies:</strong> {patient.allergies.join(', ')}. Double check chemical cross-reactivity before prescribing.
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
            Safety Checked
          </span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setFilterStatus('ALL')}
          className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
            filterStatus === 'ALL'
              ? 'bg-slate-900 text-white font-semibold'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Prescriptions ({prescriptions.length})
        </button>
        <button
          onClick={() => setFilterStatus('Active')}
          className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
            filterStatus === 'Active'
              ? 'bg-slate-900 text-white font-semibold'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Active Regimens ({prescriptions.filter((p) => p.status === 'Active').length})
        </button>
        <button
          onClick={() => setFilterStatus('Completed')}
          className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
            filterStatus === 'Completed'
              ? 'bg-slate-900 text-white font-semibold'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Completed Courses ({prescriptions.filter((p) => p.status === 'Completed').length})
        </button>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((rx) => (
          <div
            key={rx.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-teal-300 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                      rx.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {rx.status}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Rx ID: {rx.id}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Prescribed: {rx.prescribedDate}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {rx.medicationName}
                  </h3>
                  <p className="text-xs text-slate-500 italic">
                    Generic: {rx.genericName}
                  </p>
                </div>

                {/* Dosage & Timing grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs mt-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Strength & Dosage
                    </span>
                    <span className="font-mono font-bold text-teal-800 text-sm">
                      {rx.dosage}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Schedule & Frequency
                    </span>
                    <span className="font-medium text-slate-800">
                      {rx.frequency}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Duration & Refills
                    </span>
                    <span className="font-medium text-slate-800">
                      {rx.duration} · ({rx.refillsAllowed} Refills Remaining)
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-700">
                  <strong>Patient Instructions:</strong> {rx.instructions}
                </div>
              </div>

              {/* Doctor Stamp Column */}
              <div className="sm:text-right shrink-0 bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-lg text-xs space-y-1 border sm:border-0 border-slate-200">
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                  Prescribing Physician
                </span>
                <p className="font-bold text-slate-900">{rx.doctorName}</p>
                <p className="text-slate-500 text-[11px]">{rx.doctorSpecialty}</p>
                <div className="pt-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-teal-700 bg-white sm:bg-slate-50 px-2.5 py-1 rounded border border-slate-200"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Print Rx Slip</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for new Rx */}
      {isNewRxModalOpen && doctor && (
        <NewPrescriptionModal
          patient={patient}
          doctor={doctor}
          onClose={() => setIsNewRxModalOpen(false)}
          onPrescriptionAdded={onRefresh}
        />
      )}
    </div>
  );
};

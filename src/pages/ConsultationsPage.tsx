import React, { useState } from 'react';
import { Patient, Doctor, ConsultationVisit } from '../types';
import { NewConsultationModal } from '../components/NewConsultationModal';
import { 
  ClipboardList, 
  Calendar, 
  Plus, 
  Stethoscope, 
  Clock, 
  ArrowRight,
  Activity,
  CheckCircle2
} from 'lucide-react';

interface ConsultationsPageProps {
  patient: Patient;
  doctor: Doctor | null;
  consultations: ConsultationVisit[];
  onRefresh: () => void;
}

export const ConsultationsPage: React.FC<ConsultationsPageProps> = ({
  patient,
  doctor,
  consultations,
  onRefresh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs uppercase tracking-wider text-teal-700">
              Inpatient & Outpatient Clinical Encounters
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500">Historical Visit Log</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-0.5">
            Consultation History & Examination Records
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Documented clinical encounters across hospital departments for {patient.name}.
          </p>
        </div>

        {doctor && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Document New Visit Note</span>
          </button>
        )}
      </div>

      {/* Consultations Timeline */}
      <div className="space-y-5">
        {consultations.map((visit, index) => (
          <div
            key={visit.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-teal-300 transition-colors relative"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {visit.department}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      ({visit.id})
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Attending: <strong>{visit.doctorName}</strong> · {visit.doctorSpecialty}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                  {visit.date}
                </span>
                {visit.followUpDate && (
                  <p className="text-[11px] text-slate-500 mt-1">
                    Next Follow-up: <strong>{visit.followUpDate}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Visit Details */}
            <div className="pt-4 space-y-3 text-xs">
              <div>
                <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-0.5">
                  Chief Complaint & Presenting Symptoms
                </span>
                <p className="font-semibold text-slate-800 text-sm">
                  {visit.chiefComplaint}
                </p>
              </div>

              {/* Vitals at encounter */}
              {visit.vitalSummary && (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-600 font-mono text-[11px]">
                  <strong>Recorded Vitals:</strong> {visit.vitalSummary}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-0.5">
                    Clinical Assessment & Diagnosis
                  </span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {visit.diagnosis}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-0.5">
                    Treatment Plan & Interventions
                  </span>
                  <p className="text-slate-800 leading-relaxed">
                    {visit.treatmentPlan}
                  </p>
                </div>
              </div>

              {visit.clinicalNotes && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-0.5">
                    Detailed Examination & Progress Notes
                  </span>
                  <p className="text-slate-600 leading-relaxed italic bg-slate-50/60 p-3 rounded-lg border border-slate-100">
                    "{visit.clinicalNotes}"
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && doctor && (
        <NewConsultationModal
          patient={patient}
          doctor={doctor}
          onClose={() => setIsModalOpen(false)}
          onConsultationAdded={onRefresh}
        />
      )}
    </div>
  );
};

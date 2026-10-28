import React, { useState } from 'react';
import { Patient, Doctor } from '../types';
import { StorageService } from '../services/storageService';
import { X, ClipboardCheck, Check } from 'lucide-react';

interface NewConsultationModalProps {
  patient: Patient;
  doctor: Doctor;
  onClose: () => void;
  onConsultationAdded: () => void;
}

export const NewConsultationModal: React.FC<NewConsultationModalProps> = ({
  patient,
  doctor,
  onClose,
  onConsultationAdded,
}) => {
  const [department, setDepartment] = useState(doctor.specialty);
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [vitalSummary, setVitalSummary] = useState(
    `BP: ${patient.vitals.bloodPressure} mmHg, HR: ${patient.vitals.heartRate} bpm, SpO2: ${patient.vitals.spo2}%`
  );
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [followUpWeeks, setFollowUpWeeks] = useState('4');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chiefComplaint.trim() || !diagnosis.trim()) {
      alert('Please fill in chief complaint and diagnosis.');
      return;
    }

    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + parseInt(followUpWeeks, 10) * 7);

    StorageService.addConsultation(
      {
        patientId: patient.id,
        date: new Date().toISOString().split('T')[0],
        department,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        chiefComplaint,
        diagnosis,
        clinicalNotes: clinicalNotes || 'Clinical examination conducted. No acute distress observed.',
        vitalSummary,
        treatmentPlan: treatmentPlan || 'Continue current medication regimen with advised lifestyle modifications.',
        followUpDate: followUpDate.toISOString().split('T')[0],
      },
      doctor.name
    );

    onConsultationAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Document Clinical Encounter
              </h2>
              <p className="text-xs text-slate-500">
                Patient: {patient.name} ({patient.id}) · Attending: {doctor.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Clinical Department *
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Vitals Recorded at Visit
              </label>
              <input
                type="text"
                value={vitalSummary}
                onChange={(e) => setVitalSummary(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Chief Complaint & Symptoms *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Follow-up for blood glucose check, occasional dizziness"
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Clinical Assessment & Diagnosis *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Type 2 Diabetes Mellitus with good compliance"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Clinical Examination & Progress Notes
            </label>
            <textarea
              rows={3}
              placeholder="Detail heart sounds, respiratory findings, physical exam observations..."
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Treatment Plan & Care Instructions
              </label>
              <input
                type="text"
                placeholder="e.g. Low sodium diet, maintain daily glucose logs, continue Rx"
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Follow-Up Timing
              </label>
              <select
                value={followUpWeeks}
                onChange={(e) => setFollowUpWeeks(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900 bg-white"
              >
                <option value="1">1 Week</option>
                <option value="2">2 Weeks</option>
                <option value="4">4 Weeks (1 Month)</option>
                <option value="8">8 Weeks (2 Months)</option>
                <option value="12">12 Weeks (3 Months)</option>
                <option value="24">24 Weeks (6 Months)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Clinical Note</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Patient, Doctor } from '../types';
import { StorageService } from '../services/storageService';
import { X, Pill, Plus, Check } from 'lucide-react';

interface NewPrescriptionModalProps {
  patient: Patient;
  doctor: Doctor;
  onClose: () => void;
  onPrescriptionAdded: () => void;
}

const COMMON_MEDS = [
  { name: 'Metformin XR', generic: 'Metformin Hydrochloride', defaultDosage: '500 mg' },
  { name: 'Atorvastatin', generic: 'Atorvastatin Calcium', defaultDosage: '20 mg' },
  { name: 'Telmisartan', generic: 'Telmisartan ARB', defaultDosage: '40 mg' },
  { name: 'Pantoprazole', generic: 'Pantoprazole Sodium', defaultDosage: '40 mg' },
  { name: 'Paracetamol', generic: 'Acetaminophen', defaultDosage: '650 mg' },
  { name: 'Amlodipine', generic: 'Amlodipine Besylate', defaultDosage: '5 mg' },
  { name: 'Levothyroxine', generic: 'Levothyroxine Sodium', defaultDosage: '50 mcg' },
];

export const NewPrescriptionModal: React.FC<NewPrescriptionModalProps> = ({
  patient,
  doctor,
  onClose,
  onPrescriptionAdded,
}) => {
  const [medicationName, setMedicationName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Once Daily (OD) in morning');
  const [duration, setDuration] = useState('30 Days');
  const [instructions, setInstructions] = useState('Take after food with plenty of water.');
  const [refillsAllowed, setRefillsAllowed] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectQuickMed = (med: typeof COMMON_MEDS[0]) => {
    setMedicationName(med.name);
    setGenericName(med.generic);
    setDosage(med.defaultDosage);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicationName.trim() || !dosage.trim()) {
      alert('Please fill in medication name and dosage.');
      return;
    }

    setIsSubmitting(true);
    StorageService.addPrescription(
      {
        patientId: patient.id,
        prescribedDate: new Date().toISOString().split('T')[0],
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        medicationName,
        genericName: genericName || medicationName,
        dosage,
        frequency,
        duration,
        instructions,
        status: 'Active',
        refillsAllowed,
      },
      doctor.name
    );

    setIsSubmitting(false);
    onPrescriptionAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Issue Electronic Prescription
              </h2>
              <p className="text-xs text-slate-500">
                Prescribing for {patient.name} ({patient.id})
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
          {/* Quick medicine chips */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Quick Formulary Suggestions:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_MEDS.map((med) => (
                <button
                  type="button"
                  key={med.name}
                  onClick={() => handleSelectQuickMed(med)}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-teal-50 hover:text-teal-700 border border-slate-200 text-slate-700 transition-colors font-medium text-[11px]"
                >
                  + {med.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Medication Brand Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Glucophage XR"
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Generic Composition
              </label>
              <input
                type="text"
                placeholder="e.g. Metformin Extended Release"
                value={genericName}
                onChange={(e) => setGenericName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Dosage & Strength *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 500 mg / 10 ml"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Administration Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900 bg-white"
              >
                <option value="Once Daily (OD) in morning">Once Daily (OD) in morning</option>
                <option value="Once Daily (OD) at bedtime">Once Daily (OD) at bedtime</option>
                <option value="Twice Daily (BD) morning and evening">Twice Daily (BD) morning and evening</option>
                <option value="Thrice Daily (TDS) with meals">Thrice Daily (TDS) with meals</option>
                <option value="Every 8 Hours (q8h)">Every 8 Hours (q8h)</option>
                <option value="PRN / SOS (As needed for pain or fever)">PRN / SOS (As needed for symptoms)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Course Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900 bg-white"
              >
                <option value="5 Days">5 Days</option>
                <option value="7 Days">7 Days</option>
                <option value="14 Days">14 Days</option>
                <option value="30 Days">30 Days (1 Month)</option>
                <option value="60 Days">60 Days (2 Months)</option>
                <option value="90 Days">90 Days (Chronic Regimen)</option>
                <option value="180 Days">180 Days (Long-term Maintenance)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Allowed Refills
              </label>
              <input
                type="number"
                min={0}
                max={6}
                value={refillsAllowed}
                onChange={(e) => setRefillsAllowed(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Dispensing & Patient Precautions
            </label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Take with food. Do not skip doses."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
            />
          </div>

          {/* Allergy warning check */}
          {patient.allergies.length > 0 && (
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px]">
              <span className="font-bold">Patient Allergy Alert:</span> {patient.allergies.join('; ')}. Ensure drug has no cross-reactivity.
            </div>
          )}

          {/* Doctor Signature Stamp */}
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] text-slate-600 flex justify-between items-center">
            <div>
              <span>Prescribing Doctor: </span>
              <strong className="text-slate-800">{doctor.name}</strong>
              <span className="text-slate-500"> ({doctor.specialty})</span>
            </div>
            <span className="font-mono text-slate-500">{doctor.regNumber}</span>
          </div>

          {/* Actions */}
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
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Issue Prescription</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

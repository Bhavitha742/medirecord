import React, { useState } from 'react';
import { StorageService } from '../services/storageService';
import { useAuth } from '../context/AuthContext';
import { Patient, BloodGroup, Gender, ConsentStatus } from '../types';
import { 
  UserPlus, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  HeartPulse,
  PhoneCall
} from 'lucide-react';

interface RegisterPageProps {
  onRegistrationComplete: (newPatientId: string) => void;
  onCancel: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegistrationComplete,
  onCancel,
}) => {
  const { availableDoctors } = useAuth();

  // Form states
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<number | ''>(29);
  const [gender, setGender] = useState<Gender>('Female');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('B+');
  const [phone, setPhone] = useState('+91 98451-22998');
  const [email, setEmail] = useState('divya.n@example.com');
  const [city, setCity] = useState('Bengaluru');

  const [emergencyName, setEmergencyName] = useState('Ramesh N.');
  const [emergencyRel, setEmergencyRel] = useState('Father');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 98451-22999');

  const [chronicConditions, setChronicConditions] = useState('Polycystic Ovary Syndrome (PCOS), Mild Migraine');
  const [allergies, setAllergies] = useState('Ceftriaxone, Peanuts');

  const [primaryDoctorId, setPrimaryDoctorId] = useState(
    availableDoctors[0]?.id || 'DOC-101'
  );
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('Granted');

  // Baseline vitals
  const [bp, setBp] = useState('118/76');
  const [hr, setHr] = useState(72);
  const [glucose, setGlucose] = useState(94);
  const [spo2, setSpo2] = useState(99);

  const [registeredSuccessPatient, setRegisteredSuccessPatient] = useState<Patient | null>(null);

  // Quick auto-fill button for effortless college faculty demonstration!
  const handleAutoFillSample = () => {
    setFullName('Divya Nair');
    setAge(29);
    setGender('Female');
    setBloodGroup('B+');
    setPhone('+91 98451-22998');
    setEmail('divya.nair@example.com');
    setCity('Bengaluru');
    setEmergencyName('Ramesh Nair');
    setEmergencyRel('Father');
    setEmergencyPhone('+91 98451-22999');
    setChronicConditions('Polycystic Ovary Syndrome (PCOS), Mild Tension Headache');
    setAllergies('Ceftriaxone (Urticaria)');
    setBp('118/76');
    setHr(72);
    setGlucose(94);
    setSpo2(99);
    setConsentStatus('Granted');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !age) {
      alert('Please fill in required fields: Patient Name and Age.');
      return;
    }

    const conditionsArray = chronicConditions
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const allergiesArray = allergies
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const newPatient = StorageService.registerPatient({
      name: fullName.trim(),
      age: Number(age),
      gender,
      bloodGroup,
      phone,
      email,
      city,
      emergencyContact: {
        name: emergencyName,
        relationship: emergencyRel,
        phone: emergencyPhone,
      },
      chronicConditions: conditionsArray,
      allergies: allergiesArray,
      primaryDoctorId,
      vitals: {
        bloodPressure: bp,
        heartRate: Number(hr),
        glucose: Number(glucose),
        spo2: Number(spo2),
        temperature: 98.6,
        respiratoryRate: 16,
        bmi: 22.4,
        weightKg: 58,
        lastUpdated: new Date().toISOString().split('T')[0],
      },
      consent: {
        status: consentStatus,
        allowedSpecialties: ['Internal Medicine', 'Cardiology', 'Endocrinology & Diabetology', 'Emergency'],
        allowEmergencyOverride: true,
        lastUpdated: new Date().toISOString().split('T')[0],
        authorizedRepresentative: `${emergencyName} (${emergencyRel})`,
        notes: 'Informed electronic consent provided at outpatient registration desk.',
      },
    });

    setRegisteredSuccessPatient(newPatient);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {registeredSuccessPatient ? (
        <div className="bg-white rounded-2xl border border-teal-200 p-8 shadow-md text-center max-w-xl mx-auto space-y-5 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
              Registration Complete
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Patient Enrolled in MediRecord
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Electronic medical file generated with unique permanent hospital identifier.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Allocated Patient ID:</span>
              <span className="font-mono font-bold text-teal-800 text-sm">
                {registeredSuccessPatient.id}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Full Name:</span>
              <span className="font-semibold text-slate-800">{registeredSuccessPatient.name}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Demographics:</span>
              <span className="font-medium text-slate-700">
                {registeredSuccessPatient.age} Yrs · {registeredSuccessPatient.gender} · {registeredSuccessPatient.bloodGroup}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Consent Policy:</span>
              <span className="font-semibold text-emerald-700">{registeredSuccessPatient.consent.status}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onRegistrationComplete(registeredSuccessPatient.id)}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors"
            >
              <span>Open Patient Clinical Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs uppercase tracking-wider text-teal-700">
                  New Patient Intake
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500">Outpatient Registration</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-0.5">
                Patient Registration Form
              </h1>
            </div>

            {/* Quick Demo Pre-fill */}
            <button
              type="button"
              onClick={handleAutoFillSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Auto-Fill Demonstration Patient</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-xs">
            {/* 1. Basic Demographics */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5 text-teal-600" />
                <span>1. Personal & Contact Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Name (Fictional) *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Divya Nair"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={120}
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value, 10) || '')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Gender *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Blood Group *
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900 bg-white font-mono font-semibold"
                  >
                    <option value="O+">O+ (Universal Red Cell Donor)</option>
                    <option value="O-">O- (Universal Emergency Donor)</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+ (Universal Recipient)</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    City / Residence
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Bengaluru"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone (Fictional)
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98451-22998"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="divya.nair@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* 2. Emergency Contact */}
            <div className="border-t border-slate-200 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
                <span>2. Emergency Contact Guardian</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    placeholder="e.g. Ramesh Nair"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Relationship
                  </label>
                  <input
                    type="text"
                    value={emergencyRel}
                    onChange={(e) => setEmergencyRel(e.target.value)}
                    placeholder="e.g. Father, Spouse, Sibling"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Emergency Phone
                  </label>
                  <input
                    type="text"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="+91 98451-22999"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* 3. Clinical Baseline & Allergies */}
            <div className="border-t border-slate-200 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
                <span>3. Clinical Profile & Baseline Vitals</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Pre-existing / Chronic Conditions
                  </label>
                  <input
                    type="text"
                    value={chronicConditions}
                    onChange={(e) => setChronicConditions(e.target.value)}
                    placeholder="Comma-separated: e.g. Hypertension, PCOS"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Known Drug & Environmental Allergies
                  </label>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="Comma-separated: e.g. Penicillin, Sulfa"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
                  />
                </div>
              </div>

              {/* Vitals row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    placeholder="120/80"
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Pulse (bpm)
                  </label>
                  <input
                    type="number"
                    value={hr}
                    onChange={(e) => setHr(parseInt(e.target.value, 10) || 72)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Blood Glucose (mg/dL)
                  </label>
                  <input
                    type="number"
                    value={glucose}
                    onChange={(e) => setGlucose(parseInt(e.target.value, 10) || 90)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    SpO2 Oxygen (%)
                  </label>
                  <input
                    type="number"
                    value={spo2}
                    onChange={(e) => setSpo2(parseInt(e.target.value, 10) || 98)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 4. Privacy & Consent Preference */}
            <div className="border-t border-slate-200 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>4. Privacy & Consent Preference</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Initial Electronic Consent Status
                  </label>
                  <select
                    value={consentStatus}
                    onChange={(e) => setConsentStatus(e.target.value as ConsentStatus)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900 bg-white"
                  >
                    <option value="Granted">Granted (Permit Hospital Medical Staff)</option>
                    <option value="Restricted">Restricted (Assigned Specialty Only)</option>
                    <option value="Revoked">Revoked (Full Privacy Lock)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Assigned Primary Physician
                  </label>
                  <select
                    value={primaryDoctorId}
                    onChange={(e) => setPrimaryDoctorId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900 bg-white"
                  >
                    {availableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} ({doc.specialty})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register & Generate Patient ID</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

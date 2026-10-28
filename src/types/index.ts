export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export type Gender = 'Male' | 'Female' | 'Other';

export type ConsentStatus = 'Granted' | 'Restricted' | 'Revoked';

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  hospital: string;
  regNumber: string;
  avatarUrl?: string;
  passkey: string;
  role: 'Attending Physician' | 'Chief of Medicine' | 'Consultant Specialist';
}

export interface VitalSignRecord {
  bloodPressure: string; // e.g. "128/84"
  heartRate: number; // bpm
  glucose: number; // mg/dL
  spo2: number; // %
  temperature: number; // °F
  respiratoryRate: number; // breaths/min
  bmi: number;
  weightKg: number;
  lastUpdated: string;
}

export interface LabTestParameter {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'Normal' | 'High' | 'Low' | 'Critical';
}

export interface LabReport {
  id: string;
  patientId: string;
  title: string;
  category: 'Hematology' | 'Biochemistry' | 'Radiology' | 'Cardiology' | 'Pathology';
  testDate: string;
  reportingDate: string;
  labTechnician: string;
  pathologist: string;
  diagnosticCenter: string;
  summary: string;
  parameters: LabTestParameter[];
  flaggedAbnormal: boolean;
  status: 'Final Report' | 'Pending Review';
  doctorNotes?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  prescribedDate: string;
  doctorName: string;
  doctorSpecialty: string;
  medicationName: string;
  genericName: string;
  dosage: string;
  frequency: string; // e.g. "Once Daily (OD) after breakfast"
  duration: string; // e.g. "30 Days"
  instructions: string;
  status: 'Active' | 'Completed' | 'Discontinued';
  refillsAllowed: number;
}

export interface ConsultationVisit {
  id: string;
  patientId: string;
  date: string;
  department: string;
  doctorName: string;
  doctorSpecialty: string;
  chiefComplaint: string;
  diagnosis: string;
  clinicalNotes: string;
  vitalSummary: string;
  treatmentPlan: string;
  followUpDate: string;
}

export interface AccessAuditLog {
  id: string;
  patientId: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  resourceAccessed: string;
  accessStatus: 'Authorized' | 'Emergency-Override' | 'Blocked';
  details: string;
}

export interface PatientConsentSettings {
  status: ConsentStatus;
  allowedSpecialties: string[];
  allowEmergencyOverride: boolean;
  lastUpdated: string;
  authorizedRepresentative?: string;
  notes: string;
}

export interface Patient {
  id: string; // e.g. "PAT1001"
  name: string;
  age: number;
  gender: Gender;
  bloodGroup: BloodGroup;
  phone: string;
  email?: string;
  city: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  chronicConditions: string[];
  allergies: string[];
  primaryDoctorId: string;
  registeredDate: string;
  vitals: VitalSignRecord;
  consent: PatientConsentSettings;
}

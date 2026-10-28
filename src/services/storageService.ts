import {
  Patient,
  Doctor,
  LabReport,
  Prescription,
  ConsultationVisit,
  AccessAuditLog,
  PatientConsentSettings,
} from '../types';
import {
  INITIAL_PATIENTS,
  INITIAL_LAB_REPORTS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_CONSULTATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_DOCTORS,
} from '../data/initialData';

const KEYS = {
  PATIENTS: 'medirecord_patients_v1',
  LAB_REPORTS: 'medirecord_lab_reports_v1',
  PRESCRIPTIONS: 'medirecord_prescriptions_v1',
  CONSULTATIONS: 'medirecord_consultations_v1',
  AUDIT_LOGS: 'medirecord_audit_logs_v1',
  DOCTORS: 'medirecord_doctors_v1',
  CURRENT_DOCTOR: 'medirecord_session_doctor_v1',
};

// Safe JSON parser with fallback
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save to localStorage key "${key}"`, err);
  }
}

export const StorageService = {
  init(): void {
    if (!localStorage.getItem(KEYS.PATIENTS)) {
      this.resetDatabase();
    }
  },

  resetDatabase(): void {
    localStorage.setItem(KEYS.PATIENTS, JSON.stringify(INITIAL_PATIENTS));
    localStorage.setItem(KEYS.LAB_REPORTS, JSON.stringify(INITIAL_LAB_REPORTS));
    localStorage.setItem(KEYS.PRESCRIPTIONS, JSON.stringify(INITIAL_PRESCRIPTIONS));
    localStorage.setItem(KEYS.CONSULTATIONS, JSON.stringify(INITIAL_CONSULTATIONS));
    localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
    localStorage.setItem(KEYS.DOCTORS, JSON.stringify(INITIAL_DOCTORS));
  },

  getDoctors(): Doctor[] {
    return loadFromStorage<Doctor[]>(KEYS.DOCTORS, INITIAL_DOCTORS);
  },

  getPatients(): Patient[] {
    return loadFromStorage<Patient[]>(KEYS.PATIENTS, INITIAL_PATIENTS);
  },

  getPatientById(id: string): Patient | undefined {
    const patients = this.getPatients();
    return patients.find(
      (p) => p.id.toUpperCase() === id.trim().toUpperCase()
    );
  },

  searchPatients(query: string): Patient[] {
    const clean = query.trim().toLowerCase();
    if (!clean) return this.getPatients();
    const patients = this.getPatients();
    return patients.filter((p) => {
      const matchId = p.id.toLowerCase().includes(clean);
      const matchName = p.name.toLowerCase().includes(clean);
      const matchBlood = p.bloodGroup.toLowerCase().includes(clean);
      const matchCondition = p.chronicConditions.some((c) =>
        c.toLowerCase().includes(clean)
      );
      const matchCity = p.city.toLowerCase().includes(clean);
      return matchId || matchName || matchBlood || matchCondition || matchCity;
    });
  },

  registerPatient(data: Omit<Patient, 'id' | 'registeredDate'>): Patient {
    const patients = this.getPatients();
    
    // Auto-generate next incremental Patient ID
    let maxNum = 1005;
    patients.forEach((p) => {
      const numMatch = p.id.match(/\d+/);
      if (numMatch) {
        const parsed = parseInt(numMatch[0], 10);
        if (parsed > maxNum) maxNum = parsed;
      }
    });

    const newId = `PAT${maxNum + 1}`;
    const newPatient: Patient = {
      ...data,
      id: newId,
      registeredDate: new Date().toISOString().split('T')[0],
    };

    const updated = [newPatient, ...patients];
    saveToStorage(KEYS.PATIENTS, updated);

    // Initial audit log
    this.addAuditLog({
      patientId: newId,
      actorName: 'Registration Desk System',
      actorRole: 'System Administrator',
      action: 'Patient Registered',
      resourceAccessed: `Demographic & Baseline File (${newId})`,
      accessStatus: 'Authorized',
      details: `New digital record created for ${newPatient.name}. Initial consent: ${newPatient.consent.status}.`,
    });

    return newPatient;
  },

  updatePatientConsent(patientId: string, consent: PatientConsentSettings, actorDoctorName = 'Attending Doctor'): void {
    const patients = this.getPatients();
    const updated = patients.map((p) => {
      if (p.id === patientId) {
        return {
          ...p,
          consent: {
            ...consent,
            lastUpdated: new Date().toISOString().split('T')[0],
          },
        };
      }
      return p;
    });
    saveToStorage(KEYS.PATIENTS, updated);

    this.addAuditLog({
      patientId,
      actorName: actorDoctorName,
      actorRole: 'Hospital Privacy Officer',
      action: 'Consent Preference Updated',
      resourceAccessed: `Consent Policy (${patientId})`,
      accessStatus: 'Authorized',
      details: `Patient consent updated to: ${consent.status}. Emergency override: ${consent.allowEmergencyOverride ? 'Enabled' : 'Disabled'}.`,
    });
  },

  // Lab reports
  getLabReports(patientId?: string): LabReport[] {
    const reports = loadFromStorage<LabReport[]>(KEYS.LAB_REPORTS, INITIAL_LAB_REPORTS);
    if (!patientId) return reports;
    return reports.filter((r) => r.patientId.toUpperCase() === patientId.toUpperCase());
  },

  getLabReportById(id: string): LabReport | undefined {
    const reports = this.getLabReports();
    return reports.find((r) => r.id === id);
  },

  addLabReport(report: LabReport, actorName = 'Laboratory Registrar'): void {
    const reports = this.getLabReports();
    const updated = [report, ...reports];
    saveToStorage(KEYS.LAB_REPORTS, updated);

    this.addAuditLog({
      patientId: report.patientId,
      actorName,
      actorRole: 'Pathology Lab Specialist',
      action: 'Diagnostic Report Uploaded',
      resourceAccessed: `${report.title} (${report.id})`,
      accessStatus: 'Authorized',
      details: `Diagnostic parameters recorded for ${report.patientId}. Flagged abnormal: ${report.flaggedAbnormal ? 'Yes' : 'No'}.`,
    });
  },

  // Prescriptions
  getPrescriptions(patientId?: string): Prescription[] {
    const rxs = loadFromStorage<Prescription[]>(KEYS.PRESCRIPTIONS, INITIAL_PRESCRIPTIONS);
    if (!patientId) return rxs;
    return rxs.filter((r) => r.patientId.toUpperCase() === patientId.toUpperCase());
  },

  addPrescription(rx: Omit<Prescription, 'id'>, actorDoctorName: string): Prescription {
    const rxs = this.getPrescriptions();
    const newRx: Prescription = {
      ...rx,
      id: `RX-${rx.patientId}-${Date.now().toString().slice(-4)}`,
    };
    const updated = [newRx, ...rxs];
    saveToStorage(KEYS.PRESCRIPTIONS, updated);

    this.addAuditLog({
      patientId: rx.patientId,
      actorName: actorDoctorName,
      actorRole: 'Authorized Physician',
      action: 'Prescription Issued',
      resourceAccessed: `${newRx.medicationName} (${newRx.id})`,
      accessStatus: 'Authorized',
      details: `Prescribed dosage: ${newRx.dosage}, frequency: ${newRx.frequency}. Duration: ${newRx.duration}.`,
    });

    return newRx;
  },

  // Consultations
  getConsultations(patientId?: string): ConsultationVisit[] {
    const visits = loadFromStorage<ConsultationVisit[]>(KEYS.CONSULTATIONS, INITIAL_CONSULTATIONS);
    if (!patientId) return visits;
    return visits.filter((v) => v.patientId.toUpperCase() === patientId.toUpperCase());
  },

  addConsultation(visit: Omit<ConsultationVisit, 'id'>, actorDoctorName: string): ConsultationVisit {
    const visits = this.getConsultations();
    const newVisit: ConsultationVisit = {
      ...visit,
      id: `CON-${visit.patientId}-${Date.now().toString().slice(-4)}`,
    };
    const updated = [newVisit, ...visits];
    saveToStorage(KEYS.CONSULTATIONS, updated);

    this.addAuditLog({
      patientId: visit.patientId,
      actorName: actorDoctorName,
      actorRole: 'Consulting Physician',
      action: 'Consultation Recorded',
      resourceAccessed: `${newVisit.department} Visit Note`,
      accessStatus: 'Authorized',
      details: `Diagnosis: ${newVisit.diagnosis}. Treatment plan updated.`,
    });

    return newVisit;
  },

  // Audit Logs
  getAuditLogs(patientId?: string): AccessAuditLog[] {
    const logs = loadFromStorage<AccessAuditLog[]>(KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    if (!patientId) return logs;
    return logs.filter((l) => l.patientId.toUpperCase() === patientId.toUpperCase());
  },

  addAuditLog(entry: Omit<AccessAuditLog, 'id' | 'timestamp'>): AccessAuditLog {
    const logs = loadFromStorage<AccessAuditLog[]>(KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    const dateStr = new Date();
    const formattedDate = dateStr.toISOString().replace('T', ' ').slice(0, 19);

    const newLog: AccessAuditLog = {
      ...entry,
      id: `AUD-${Date.now().toString().slice(-5)}`,
      timestamp: formattedDate,
    };
    const updated = [newLog, ...logs].slice(0, 100); // keep last 100
    saveToStorage(KEYS.AUDIT_LOGS, updated);
    return newLog;
  },

  // Session Doctor
  getCurrentDoctor(): Doctor | null {
    return loadFromStorage<Doctor | null>(KEYS.CURRENT_DOCTOR, null);
  },

  setCurrentDoctor(doctor: Doctor | null): void {
    if (!doctor) {
      localStorage.removeItem(KEYS.CURRENT_DOCTOR);
    } else {
      saveToStorage(KEYS.CURRENT_DOCTOR, doctor);
    }
  },

  // Enforces real permissions & consent gate
  checkAccess(
    doctor: Doctor | null,
    patient: Patient
  ): {
    granted: boolean;
    reason: string;
    canEmergencyOverride: boolean;
  } {
    if (!doctor) {
      return {
        granted: false,
        reason: 'Unauthorized access. A valid medical practitioner session token is required to view protected electronic records.',
        canEmergencyOverride: false,
      };
    }

    // Check patient consent
    if (patient.consent.status === 'Revoked') {
      return {
        granted: false,
        reason: `Access blocked by patient. ${patient.name} has revoked medical record sharing permissions. Contact patient or legal guardian to renew authorization.`,
        canEmergencyOverride: patient.consent.allowEmergencyOverride,
      };
    }

    if (patient.consent.status === 'Restricted') {
      const doctorSpecialty = doctor.specialty;
      const isAllowedSpecialty = patient.consent.allowedSpecialties.some(
        (s) => doctorSpecialty.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(doctorSpecialty.toLowerCase())
      );
      const isPrimaryDoctor = patient.primaryDoctorId === doctor.id;

      if (!isAllowedSpecialty && !isPrimaryDoctor) {
        return {
          granted: false,
          reason: `Department clearance restricted. ${patient.name} has limited record access to [${patient.consent.allowedSpecialties.join(
            ', '
          )}]. Your department (${doctor.specialty}) requires patient authorization.`,
          canEmergencyOverride: patient.consent.allowEmergencyOverride,
        };
      }
    }

    return {
      granted: true,
      reason: 'Authorized medical record clearance verified.',
      canEmergencyOverride: false,
    };
  },
};

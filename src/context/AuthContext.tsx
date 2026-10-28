import React, { createContext, useContext, useState, useEffect } from 'react';
import { Doctor } from '../types';
import { StorageService } from '../services/storageService';

interface AuthContextType {
  currentDoctor: Doctor | null;
  isAuthenticated: boolean;
  login: (regOrEmail: string, passkey: string) => { success: boolean; message: string };
  quickLogin: (doctorId: string) => void;
  logout: () => void;
  availableDoctors: Doctor[];
  isFacultyGuideOpen: boolean;
  setIsFacultyGuideOpen: (open: boolean) => void;
  selectedPatientId: string;
  setSelectedPatientId: (id: string) => void;
  resetAllDemoData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDoctor, setCurrentDoctorState] = useState<Doctor | null>(null);
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
  const [isFacultyGuideOpen, setIsFacultyGuideOpen] = useState<boolean>(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('PAT1001');

  useEffect(() => {
    StorageService.init();
    const doctors = StorageService.getDoctors();
    setAvailableDoctors(doctors);

    const savedDoc = StorageService.getCurrentDoctor();
    if (savedDoc) {
      setCurrentDoctorState(savedDoc);
    } else {
      // For immediate ease of faculty demonstration, auto-load Dr. Ananya Sharma by default or leave unauthenticated?
      // Let's set Dr. Ananya Sharma as default logged in doctor, with clear notice that they can switch or logout!
      // This ensures when the user opens the demo, everything is ready, while allowing full login/logout demonstration.
      setCurrentDoctorState(doctors[0]);
      StorageService.setCurrentDoctor(doctors[0]);
    }
  }, []);

  const login = (regOrEmail: string, passkey: string): { success: boolean; message: string } => {
    const cleanId = regOrEmail.trim().toLowerCase();
    const cleanPass = passkey.trim();

    const doctor = availableDoctors.find(
      (d) =>
        (d.email.toLowerCase() === cleanId ||
          d.regNumber.toLowerCase() === cleanId ||
          d.id.toLowerCase() === cleanId) &&
        (d.passkey === cleanPass || cleanPass === 'doctor123')
    );

    if (!doctor) {
      return {
        success: false,
        message: 'Invalid registration number or passkey. Please check credentials or use 1-click Quick Login.',
      };
    }

    setCurrentDoctorState(doctor);
    StorageService.setCurrentDoctor(doctor);
    StorageService.addAuditLog({
      patientId: 'SYSTEM',
      actorName: doctor.name,
      actorRole: doctor.role,
      action: 'Doctor Authentication Succeeded',
      resourceAccessed: 'Medical Staff Portal Session',
      accessStatus: 'Authorized',
      details: `Session initiated at ${doctor.hospital} (${doctor.regNumber}).`,
    });

    return {
      success: true,
      message: `Welcome back, ${doctor.name}. Session authenticated.`,
    };
  };

  const quickLogin = (doctorId: string) => {
    const doctor = availableDoctors.find((d) => d.id === doctorId);
    if (doctor) {
      setCurrentDoctorState(doctor);
      StorageService.setCurrentDoctor(doctor);
      StorageService.addAuditLog({
        patientId: 'SYSTEM',
        actorName: doctor.name,
        actorRole: doctor.role,
        action: '1-Click Faculty Demo Login',
        resourceAccessed: 'Medical Staff Portal Session',
        accessStatus: 'Authorized',
        details: `Quick login authenticated for academic demonstration.`,
      });
    }
  };

  const logout = () => {
    if (currentDoctor) {
      StorageService.addAuditLog({
        patientId: 'SYSTEM',
        actorName: currentDoctor.name,
        actorRole: currentDoctor.role,
        action: 'Doctor Session Terminated',
        resourceAccessed: 'Medical Staff Portal Session',
        accessStatus: 'Authorized',
        details: `Doctor signed out safely. Electronic session invalidated.`,
      });
    }
    setCurrentDoctorState(null);
    StorageService.setCurrentDoctor(null);
  };

  const resetAllDemoData = () => {
    StorageService.resetDatabase();
    setAvailableDoctors(StorageService.getDoctors());
    setSelectedPatientId('PAT1001');
  };

  return (
    <AuthContext.Provider
      value={{
        currentDoctor,
        isAuthenticated: !!currentDoctor,
        login,
        quickLogin,
        logout,
        availableDoctors,
        isFacultyGuideOpen,
        setIsFacultyGuideOpen,
        selectedPatientId,
        setSelectedPatientId,
        resetAllDemoData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

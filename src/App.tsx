import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StorageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { PatientHeader } from './components/PatientHeader';
import { ConsentBlockedView } from './components/ConsentBlockedView';
import { FacultyGuideModal } from './components/FacultyGuideModal';
import { NewPrescriptionModal } from './components/NewPrescriptionModal';
import { NewConsultationModal } from './components/NewConsultationModal';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SearchPage } from './pages/SearchPage';
import { RegisterPage } from './pages/RegisterPage';
import { PatientDashboardPage } from './pages/PatientDashboardPage';
import { ReportsPage } from './pages/ReportsPage';
import { PrescriptionsPage } from './pages/PrescriptionsPage';
import { ConsultationsPage } from './pages/ConsultationsPage';
import { ConsentManagementPage } from './pages/ConsentManagementPage';
import { DesignThinkingPage } from './pages/DesignThinkingPage';

type MainView =
  | 'home'
  | 'login'
  | 'search'
  | 'register'
  | 'patient-dashboard'
  | 'reports'
  | 'prescriptions'
  | 'consultations'
  | 'consent'
  | 'design-thinking';

type PatientSubTab = 'overview' | 'reports' | 'prescriptions' | 'consultations' | 'consent';

function MainAppContent() {
  const { currentDoctor, isAuthenticated } = useAuth();

  const [activePage, setActivePage] = useState<MainView>('home');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('PAT1001');
  const [activeSubTab, setActiveSubTab] = useState<PatientSubTab>('overview');

  // Modals
  const [isNewRxModalOpen, setIsNewRxModalOpen] = useState(false);
  const [isNewConsultationModalOpen, setIsNewConsultationModalOpen] = useState(false);

  // Data reload trigger
  const [dataVersion, setDataVersion] = useState(0);

  const refreshData = () => {
    setDataVersion((v) => v + 1);
  };

  const currentPatient = StorageService.getPatientById(selectedPatientId);
  const labReports = StorageService.getLabReports(selectedPatientId);
  const prescriptions = StorageService.getPrescriptions(selectedPatientId);
  const consultations = StorageService.getConsultations(selectedPatientId);

  // Security and access check for protected records
  const accessCheck = currentPatient
    ? StorageService.checkAccess(currentDoctor, currentPatient)
    : { granted: true, reason: '', canEmergencyOverride: false };

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setActivePage('patient-dashboard');
    setActiveSubTab('overview');

    // Audit log for accessing patient
    if (currentDoctor) {
      StorageService.addAuditLog({
        patientId,
        actorName: currentDoctor.name,
        actorRole: currentDoctor.role,
        action: 'Patient File Lookup',
        resourceAccessed: `${patientId} Clinical Master Record`,
        accessStatus: 'Authorized',
        details: `Access logged via Medical Directory search.`,
      });
    }
  };

  const handleNavigateTo = (page: string, patientId?: string) => {
    if (patientId) {
      setSelectedPatientId(patientId);
    }

    if (['patient-dashboard', 'reports', 'prescriptions', 'consultations', 'consent'].includes(page)) {
      setActivePage('patient-dashboard');
      if (page === 'reports') setActiveSubTab('reports');
      else if (page === 'prescriptions') setActiveSubTab('prescriptions');
      else if (page === 'consultations') setActiveSubTab('consultations');
      else if (page === 'consent') setActiveSubTab('consent');
      else setActiveSubTab('overview');
    } else {
      setActivePage(page as MainView);
    }
  };

  const handleSubTabChange = (tab: PatientSubTab) => {
    setActiveSubTab(tab);
    if (tab === 'overview') setActivePage('patient-dashboard');
    else if (tab === 'reports') setActivePage('reports');
    else if (tab === 'prescriptions') setActivePage('prescriptions');
    else if (tab === 'consultations') setActivePage('consultations');
    else if (tab === 'consent') setActivePage('consent');
  };

  const isPatientView = [
    'patient-dashboard',
    'reports',
    'prescriptions',
    'consultations',
    'consent',
  ].includes(activePage);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Navbar */}
      <Navbar activePage={activePage} setActivePage={(page) => setActivePage(page as MainView)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If user is inside a patient record, show the unified Patient Header */}
        {isPatientView && currentPatient && (
          <PatientHeader
            patient={currentPatient}
            activeSubTab={activeSubTab}
            onSubTabChange={handleSubTabChange}
            reportCount={labReports.length}
            prescriptionCount={prescriptions.length}
            consultationCount={consultations.length}
            onBackToSearch={() => setActivePage('search')}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Check permissions on protected patient sub-pages (except consent management, so user/patient can adjust consent!) */}
          {isPatientView && currentPatient && !accessCheck.granted && activeSubTab !== 'consent' ? (
            <ConsentBlockedView
              patient={currentPatient}
              currentDoctor={currentDoctor}
              reason={accessCheck.reason}
              canEmergencyOverride={accessCheck.canEmergencyOverride}
              onOverrideSuccess={refreshData}
              onBackToSearch={() => setActivePage('search')}
            />
          ) : (
            <>
              {activePage === 'home' && (
                <HomePage onNavigate={handleNavigateTo} />
              )}

              {activePage === 'login' && (
                <LoginPage onLoginSuccess={() => setActivePage('search')} />
              )}

              {activePage === 'search' && (
                <SearchPage
                  onSelectPatient={handleSelectPatient}
                  onNavigateToRegister={() => setActivePage('register')}
                />
              )}

              {activePage === 'register' && (
                <RegisterPage
                  onRegistrationComplete={(newId) => {
                    refreshData();
                    handleSelectPatient(newId);
                  }}
                  onCancel={() => setActivePage('search')}
                />
              )}

              {activePage === 'design-thinking' && (
                <DesignThinkingPage onStartDemo={() => setActivePage('search')} />
              )}

              {/* Patient sub-views */}
              {isPatientView && currentPatient && (
                <>
                  {activeSubTab === 'overview' && (
                    <PatientDashboardPage
                      patient={currentPatient}
                      doctor={currentDoctor}
                      labReports={labReports}
                      prescriptions={prescriptions}
                      consultations={consultations}
                      onNavigateTab={handleSubTabChange}
                      onOpenNewPrescription={() => setIsNewRxModalOpen(true)}
                      onOpenNewConsultation={() => setIsNewConsultationModalOpen(true)}
                    />
                  )}

                  {activeSubTab === 'reports' && (
                    <ReportsPage
                      patient={currentPatient}
                      doctor={currentDoctor}
                      labReports={labReports}
                      onReportAdded={refreshData}
                    />
                  )}

                  {activeSubTab === 'prescriptions' && (
                    <PrescriptionsPage
                      patient={currentPatient}
                      doctor={currentDoctor}
                      prescriptions={prescriptions}
                      onRefresh={refreshData}
                    />
                  )}

                  {activeSubTab === 'consultations' && (
                    <ConsultationsPage
                      patient={currentPatient}
                      doctor={currentDoctor}
                      consultations={consultations}
                      onRefresh={refreshData}
                    />
                  )}

                  {activeSubTab === 'consent' && (
                    <ConsentManagementPage
                      patient={currentPatient}
                      doctor={currentDoctor}
                      onConsentUpdated={refreshData}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* Interactive New Prescription Modal */}
      {isNewRxModalOpen && currentPatient && currentDoctor && (
        <NewPrescriptionModal
          patient={currentPatient}
          doctor={currentDoctor}
          onClose={() => setIsNewRxModalOpen(false)}
          onPrescriptionAdded={refreshData}
        />
      )}

      {/* Interactive New Consultation Modal */}
      {isNewConsultationModalOpen && currentPatient && currentDoctor && (
        <NewConsultationModal
          patient={currentPatient}
          doctor={currentDoctor}
          onClose={() => setIsNewConsultationModalOpen(false)}
          onConsultationAdded={refreshData}
        />
      )}

      {/* College Faculty Demonstration Walkthrough Drawer / Modal */}
      <FacultyGuideModal onNavigateTo={handleNavigateTo} />

      {/* Quiet Academic Project Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-700">MediRecord</span> · College Design Thinking Prototype
            <p className="text-[11px] text-slate-400 mt-0.5">
              Developed for clinical evaluation. Fictional sample patient records only.
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <button
              onClick={() => setActivePage('home')}
              className="hover:text-teal-700"
            >
              Project Overview
            </button>
            <button
              onClick={() => setActivePage('search')}
              className="hover:text-teal-700"
            >
              Patient Directory
            </button>
            <button
              onClick={() => setActivePage('design-thinking')}
              className="hover:text-teal-700"
            >
              Design Thinking
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}

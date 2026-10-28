import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Key, 
  Stethoscope, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Lock
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { login, quickLogin, availableDoctors, currentDoctor, isAuthenticated, logout } = useAuth();
  const [identifier, setIdentifier] = useState('ananya.sharma@medirecord.org');
  const [passkey, setPasskey] = useState('doctor123');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(identifier, passkey);
    if (result.success) {
      setStatusMessage({ type: 'success', text: result.message });
      setTimeout(() => {
        onLoginSuccess();
      }, 700);
    } else {
      setStatusMessage({ type: 'error', text: result.message });
    }
  };

  const handleQuickSelect = (docId: string) => {
    quickLogin(docId);
    setStatusMessage({ type: 'success', text: 'Quick demo login authenticated successfully.' });
    setTimeout(() => {
      onLoginSuccess();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        {/* Card Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Medical Staff Portal Login
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Authorised Healthcare Practitioner Verification & Access Control
          </p>
        </div>

        {/* Currently active session notice */}
        {isAuthenticated && currentDoctor && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-teal-900">
                  Active Session: {currentDoctor.name}
                </span>
              </div>
              <button
                onClick={logout}
                className="text-[11px] text-rose-600 hover:text-rose-800 font-medium underline"
              >
                Sign Out
              </button>
            </div>
            <p className="text-teal-800 mt-1">
              Specialty: {currentDoctor.specialty} · Reg: {currentDoctor.regNumber}
            </p>
            <button
              onClick={onLoginSuccess}
              className="mt-3 w-full py-1.5 px-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded text-center transition-colors block"
            >
              Continue to Patient Records Directory &rarr;
            </button>
          </div>
        )}

        {/* Login Form Box */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          {statusMessage && (
            <div
              className={`p-3 rounded-lg text-xs mb-4 flex items-center gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Medical Email or Council Registration No.
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. ananya.sharma@medirecord.org or MCI-CARD-99421"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">
                  Doctor Passkey
                </label>
                <span className="text-[11px] text-teal-700 font-mono">Demo: doctor123</span>
              </div>
              <input
                type="password"
                required
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter password (default: doctor123)"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:border-teal-500 text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors shadow-xs"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Verify Credentials & Enter System</span>
            </button>
          </form>

          {/* Quick 1-Click Demo Profiles */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1-Click Faculty Demo Credentials:
              </span>
              <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-1.5 py-0.5 rounded">
                Pre-authorized
              </span>
            </div>

            <div className="space-y-2">
              {availableDoctors.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => handleQuickSelect(doc.id)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-teal-50/50 text-left transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-white border border-slate-300 flex items-center justify-center text-teal-700">
                      <Stethoscope className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-teal-900">
                        {doc.name}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {doc.specialty} · {doc.regNumber}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    Login &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Prototype Notice */}
        <div className="text-center text-[11px] text-slate-500 space-y-1">
          <p>MediRecord College Design Thinking Project Demo</p>
          <p>Enforces role clearance and audit trail on all protected electronic records.</p>
        </div>
      </div>
    </div>
  );
};

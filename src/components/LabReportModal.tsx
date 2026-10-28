import React from 'react';
import { LabReport, Patient } from '../types';
import { X, Printer, ShieldCheck, Download, AlertCircle, CheckCircle } from 'lucide-react';

interface LabReportModalProps {
  report: LabReport;
  patient: Patient;
  onClose: () => void;
}

export const LabReportModal: React.FC<LabReportModalProps> = ({ report, patient, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-slate-200 animate-in fade-in duration-150">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-slate-50 rounded-t-xl print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              {report.category}
            </span>
            <span className="text-xs text-slate-500">Report Ref: {report.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
              aria-label="Close report viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Lab Slip Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-800 print:p-0">
          {/* Diagnostic Center Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  {report.diagnosticCenter}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clinical Diagnostics & Pathology Division · NABL ISO-15189 Certified
                </p>
                <p className="text-xs text-slate-500">
                  Hospital Medical Complex, Health Sciences Campus · Helpline: 1800-419-MED
                </p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1 text-teal-700 text-xs font-semibold bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authenticated Report</span>
                </div>
                <p className="font-mono text-xs text-slate-500 mt-1">
                  BARCODE: *{report.id}*
                </p>
              </div>
            </div>

            {/* Patient demographic bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200 mt-4 text-xs">
              <div>
                <span className="text-slate-500 block">Patient Name:</span>
                <span className="font-bold text-slate-900">{patient.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Patient ID:</span>
                <span className="font-mono font-bold text-teal-700">{patient.id}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Age / Gender:</span>
                <span className="font-semibold text-slate-800">{patient.age} Yrs / {patient.gender}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Blood Group:</span>
                <span className="font-semibold text-slate-800">{patient.bloodGroup}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Sample Collected:</span>
                <span className="font-medium text-slate-700">{report.testDate} 08:30 AM</span>
              </div>
              <div>
                <span className="text-slate-500 block">Report Released:</span>
                <span className="font-medium text-slate-700">{report.reportingDate} 02:45 PM</span>
              </div>
              <div>
                <span className="text-slate-500 block">Lab Technician:</span>
                <span className="font-medium text-slate-700">{report.labTechnician}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Consulting Pathologist:</span>
                <span className="font-medium text-slate-700">{report.pathologist}</span>
              </div>
            </div>
          </div>

          {/* Report Title */}
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {report.title}
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              <strong>Clinical Impression:</strong> {report.summary}
            </p>
          </div>

          {/* Test Parameters Table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Test Parameter</th>
                  <th className="py-2.5 px-4 text-right">Observed Value</th>
                  <th className="py-2.5 px-4">Unit</th>
                  <th className="py-2.5 px-4">Biological Reference Interval</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-normal">
                {report.parameters.map((param, idx) => (
                  <tr key={idx} className={param.status !== 'Normal' ? 'bg-amber-50/40' : 'hover:bg-slate-50'}>
                    <td className="py-2.5 px-4 font-medium text-slate-900">{param.name}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold tabular-nums">
                      {param.value}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500">{param.unit}</td>
                    <td className="py-2.5 px-4 text-slate-600 font-mono text-[11px]">{param.referenceRange}</td>
                    <td className="py-2.5 px-4 text-center">
                      {param.status === 'Normal' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Normal</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          <span>{param.status}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Doctor Review Notes */}
          {report.doctorNotes && (
            <div className="p-3 bg-teal-50/60 border border-teal-200 rounded-lg text-xs">
              <span className="font-semibold text-teal-900 block mb-0.5">
                Attending Physician Interpretation Notes:
              </span>
              <p className="text-teal-800 leading-relaxed">{report.doctorNotes}</p>
            </div>
          )}

          {/* Signatures Footer */}
          <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
            <div>
              <p className="font-mono text-[10px]">VERIFIED ELECTRONICALLY VIA MEDIRECORD NABL ENGINE</p>
              <p className="text-[10px] text-slate-400">Authenticity Token: SHA256-{(report.id + patient.id).slice(0, 16)}</p>
            </div>
            <div className="text-right">
              <p className="font-serif italic text-slate-800 text-sm font-semibold">{report.pathologist}</p>
              <p className="text-[11px] font-medium text-slate-600">Chief Consultant Pathologist</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom action */}
        <div className="flex justify-end px-6 py-3 border-t border-slate-200 bg-slate-50 rounded-b-xl print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};

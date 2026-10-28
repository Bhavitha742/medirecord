import React, { useState } from 'react';
import { Patient, Doctor, LabReport } from '../types';
import { LabReportModal } from '../components/LabReportModal';
import { 
  FileText, 
  Filter, 
  AlertCircle, 
  CheckCircle, 
  Printer, 
  ExternalLink,
  ShieldCheck,
  Plus
} from 'lucide-react';

interface ReportsPageProps {
  patient: Patient;
  doctor: Doctor | null;
  labReports: LabReport[];
  onReportAdded?: () => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({
  patient,
  doctor,
  labReports,
  onReportAdded,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [viewingReport, setViewingReport] = useState<LabReport | null>(null);

  const categories = ['ALL', 'Biochemistry', 'Hematology', 'Cardiology', 'Radiology'];

  const filteredReports = labReports.filter((r) => {
    if (selectedCategory === 'ALL') return true;
    return r.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs uppercase tracking-wider text-teal-700">
              Diagnostic Pathology & Radiology Archive
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500">NABL Accredited</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-0.5">
            Laboratory & Diagnostic Test Reports
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified electronic laboratory slips with biological reference intervals and pathologist verification.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700">No Reports in this Category</h3>
          <p className="text-xs text-slate-500 mt-1">
            No diagnostic tests matching "{selectedCategory}" were found for {patient.name}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-teal-300 transition-colors flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                      {report.category}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {report.id}
                    </span>
                  </div>

                  {report.flaggedAbnormal ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <AlertCircle className="w-3 h-3 text-amber-600" />
                      <span>Values Out of Range</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Within Normal Limits</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {report.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Collected: {report.testDate} · Released: {report.reportingDate}
                </p>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  <strong>Clinical Summary:</strong> {report.summary}
                </p>

                {/* Key parameters preview */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Diagnostic Parameters ({report.parameters.length} Analyzed)
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {report.parameters.slice(0, 4).map((p, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded border ${
                          p.status !== 'Normal'
                            ? 'bg-amber-50/70 border-amber-200'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex justify-between items-baseline">
                          <span className="text-slate-600 font-medium truncate text-[11px]">
                            {p.name}
                          </span>
                          <span className="font-mono font-bold text-slate-900 text-xs">
                            {p.value} {p.unit !== '-' ? p.unit : ''}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block truncate">
                          Ref: {p.referenceRange}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-500">
                  <span>Sign-off: </span>
                  <strong className="text-slate-700">{report.pathologist}</strong>
                </div>

                <button
                  onClick={() => setViewingReport(report)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Full Lab Slip</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal viewer */}
      {viewingReport && (
        <LabReportModal
          report={viewingReport}
          patient={patient}
          onClose={() => setViewingReport(null)}
        />
      )}
    </div>
  );
};

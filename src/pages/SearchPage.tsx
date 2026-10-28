import React, { useState } from 'react';
import { StorageService } from '../services/storageService';
import { Patient, BloodGroup } from '../types';
import { 
  Search, 
  UserPlus, 
  Filter, 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react';

interface SearchPageProps {
  onSelectPatient: (patientId: string) => void;
  onNavigateToRegister: () => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  onSelectPatient,
  onNavigateToRegister,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodFilter, setSelectedBloodFilter] = useState<string>('ALL');

  const patients = StorageService.getPatients();

  // Filter patients based on search and blood filter
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.id.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      patient.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      patient.city.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      patient.chronicConditions.some((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );

    const matchesBlood =
      selectedBloodFilter === 'ALL' || patient.bloodGroup === selectedBloodFilter;

    return matchesSearch && matchesBlood;
  });

  const bloodGroupOptions = ['ALL', 'O+', 'B+', 'A+', 'AB-', 'O-'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs uppercase tracking-wider text-teal-700">
              Electronic Health Records Directory
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500">Central Master Index</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Patient Medical Records Search
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Look up patient files instantly using their unique Patient ID (e.g., PAT1001) or full name.
          </p>
        </div>

        <button
          onClick={onNavigateToRegister}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Search Bar & Filters Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Unique Patient ID (PAT1001), Name (Ravi Kumar), Condition (Diabetes), or City..."
            className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-500 text-sm text-slate-900 placeholder:text-slate-400 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Search Chips & Filter tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-slate-100 text-xs">
          {/* 1-Click Patient ID shortcuts */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 font-medium">Quick Demo IDs:</span>
            {patients.slice(0, 5).map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSearchQuery(p.id);
                  onSelectPatient(p.id);
                }}
                className="font-mono text-[11px] font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 px-2 py-1 rounded border border-teal-200 transition-colors"
                title={`${p.name} (${p.bloodGroup})`}
              >
                {p.id} ({p.name.split(' ')[0]})
              </button>
            ))}
          </div>

          {/* Blood group filter control */}
          <div className="flex items-center gap-1">
            <span className="text-slate-500 font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-slate-400" />
              <span>Blood Group:</span>
            </span>
            {bloodGroupOptions.map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedBloodFilter(bg)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  selectedBloodFilter === bg
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
        <span>
          Showing <strong className="text-slate-800">{filteredPatients.length}</strong> patient records
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        <span className="text-[11px] text-teal-700">
          Click any card to open clinical dashboard
        </span>
      </div>

      {/* Patient Cards Grid */}
      {filteredPatients.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <Users className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Patient Record Found</h3>
          <p className="text-xs text-slate-500 mt-1">
            No patient matching "{searchQuery}" exists in the clinical database.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBloodFilter('ALL');
              }}
              className="px-3.5 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={onNavigateToRegister}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
            >
              Register This Patient
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPatients.map((patient) => {
            return (
              <div
                key={patient.id}
                onClick={() => onSelectPatient(patient.id)}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Top ID bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                      {patient.id}
                    </span>
                    <span className="text-xs font-bold text-teal-900 bg-teal-50/80 px-2 py-0.5 rounded">
                      Blood: {patient.bloodGroup}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {patient.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {patient.age} Yrs · {patient.gender} · {patient.city}
                  </p>

                  {/* Conditions & Allergies */}
                  <div className="mt-3.5 space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                        Documented Conditions
                      </span>
                      <p className="font-medium text-slate-800 truncate">
                        {patient.chronicConditions.join(', ') || 'None recorded'}
                      </p>
                    </div>

                    {patient.allergies.length > 0 && (
                      <div className="flex items-center gap-1.5 text-rose-700 bg-rose-50/80 px-2 py-1 rounded text-[11px] font-medium border border-rose-100">
                        <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                        <span className="truncate">{patient.allergies.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card footer */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        patient.consent.status === 'Granted'
                          ? 'bg-emerald-500'
                          : patient.consent.status === 'Restricted'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                    />
                    <span className="text-slate-500">Consent: {patient.consent.status}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 group-hover:translate-x-0.5 transition-transform">
                    <span>View File</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

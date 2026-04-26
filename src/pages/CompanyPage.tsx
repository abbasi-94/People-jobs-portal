import { useParams, Link } from 'react-router-dom';
import { getCompanyById, getJobs } from '../lib/data';
import { formatSalary, timeAgo } from '../components/UI';
import {
  Building2, Globe, MapPin, Users, Briefcase, ExternalLink,
  ArrowLeft, Clock, Tag,
} from 'lucide-react';

export default function CompanyPage() {
  const { id } = useParams<{ id: string }>();
  const company = id ? getCompanyById(id) : undefined;
  const activeJobs = getJobs().filter(j => j.isActive && j.companyId === id);

  if (!company) {
    return (
      <div className="text-center py-20 bg-gray-50 min-h-screen">
        <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Company not found</h3>
        <p className="text-gray-500 mb-6">This company profile may not exist or has been removed.</p>
        <Link to="/jobs" className="text-[#2554a7] font-semibold hover:text-[#1d3f8a]">Browse all jobs</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Company Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-[#2554a7] rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0">
              {company.logo || company.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{company.industry}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500">
                {company.location && (
                  <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400" />{company.location}, {company.country}</span>
                )}
                {company.size && (
                  <span className="inline-flex items-center gap-1.5"><Users className="w-4 h-4 text-gray-400" />{company.size} employees</span>
                )}
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#2554a7] hover:underline">
                    <Globe className="w-4 h-4" />Visit website <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* About */}
        {company.description && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About the Company</h2>
            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{company.description}</p>
          </div>
        )}

        {/* Company Details */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center"><Building2 className="w-4 h-4 text-[#2554a7]" /></div>
              <div><p className="text-xs text-gray-400">Industry</p><p className="text-sm font-medium text-gray-700">{company.industry || 'Not specified'}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center"><MapPin className="w-4 h-4 text-green-600" /></div>
              <div><p className="text-xs text-gray-400">Location</p><p className="text-sm font-medium text-gray-700">{company.location}, {company.country}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center"><Users className="w-4 h-4 text-amber-600" /></div>
              <div><p className="text-xs text-gray-400">Company Size</p><p className="text-sm font-medium text-gray-700">{company.size || 'Not specified'}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center"><Globe className="w-4 h-4 text-purple-600" /></div>
              <div><p className="text-xs text-gray-400">Website</p>
                {company.website ? (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#2554a7] hover:underline">{company.website}</a>
                ) : (
                  <p className="text-sm font-medium text-gray-700">Not specified</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Active Jobs */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#2554a7]" />
            Active Jobs ({activeJobs.length})
          </h2>
          {activeJobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No active job listings from this company</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeJobs.map(job => (
                <Link key={job.id} to={`/jobs/${job.id}`}
                  className="group bg-white rounded-xl border border-gray-100 p-5 hover:border-[#2554a7]/30 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200 block">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#2554a7] transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                        <span className="inline-flex items-center gap-1"><Tag className="w-3 h-3" />{job.category}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(job.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                      <span className="text-sm font-semibold text-gray-700">{formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod)}</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#2554a7]">{job.type}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

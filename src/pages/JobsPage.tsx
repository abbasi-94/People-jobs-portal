import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { filterJobs, CATEGORY_LIST, JOB_TYPES, EXPERIENCE_LEVELS, isJobSaved, toggleSaveJob, getSession } from '../lib/data';
import { Pagination, formatSalary, timeAgo } from '../components/UI';
import {
  Search, MapPin, Briefcase, SlidersHorizontal, Globe, Clock,
  Bookmark, BookmarkCheck, ArrowUpDown,
} from 'lucide-react';

const PER_PAGE = 10;

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [locationInput, setLocationInput] = useState(searchParams.get('location') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [, setSavedRefresh] = useState(0);
  const session = getSession();

  const category = searchParams.get('category') || '';
  const jobType = searchParams.get('type') || '';
  const salaryMin = searchParams.get('salaryMin') || '';
  const salaryMax = searchParams.get('salaryMax') || '';
  const experience = searchParams.get('experience') || '';
  const datePosted = searchParams.get('datePosted') || '';
  const sort = searchParams.get('sort') || 'relevance';
  const q = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  const jobs = useMemo(() => filterJobs({
    q: q || undefined,
    location: location || undefined,
    category: category || undefined,
    type: jobType || undefined,
    salaryMin: salaryMin ? parseInt(salaryMin) : undefined,
    salaryMax: salaryMax ? parseInt(salaryMax) : undefined,
    experience: experience || undefined,
    datePosted: datePosted || undefined,
    sort: sort === 'relevance' ? undefined : sort,
  }), [q, location, category, jobType, salaryMin, salaryMax, experience, datePosted, sort]);

  const paginatedJobs = jobs.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => { setPage(1); }, [category, jobType, salaryMin, salaryMax, experience, datePosted, sort, q, location]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value); else params.delete(key);
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (search) params.set('q', search); else params.delete('q');
    if (locationInput) params.set('location', locationInput); else params.delete('location');
    setSearchParams(params);
  };

  const handleSave = (e: React.MouseEvent, jobId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) return;
    toggleSaveJob(session.id, jobId);
    setSavedRefresh(r => r + 1);
  };

  const clearFilters = () => {
    setSearch('');
    setLocationInput('');
    setSearchParams({});
  };

  const hasFilters = q || location || category || jobType || salaryMin || salaryMax || experience || datePosted;

  const jobTypeChecks = JOB_TYPES as readonly string[];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Find Jobs</h1>
          <p className="text-gray-500 text-sm mb-5">{jobs.length} jobs available</p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, keyword, or company"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={locationInput} onChange={(e) => setLocationInput(e.target.value)}
                placeholder="City, country, or 'remote'"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
            </div>
            <button type="submit" className="bg-[#2554a7] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors shrink-0">
              Search
            </button>
            <button type="button" onClick={() => setShowFilters(!showFilters)}
              className={`md:hidden p-3 rounded-xl border transition-colors ${showFilters ? 'bg-blue-50 border-blue-200 text-[#2554a7]' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0 space-y-4`}>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm">Filters</h3>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-600 font-medium">Clear all</button>
                )}
              </div>

              {/* Category */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                <select value={category} onChange={(e) => updateParam('category', e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
                  <option value="">All Categories</option>
                  {CATEGORY_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Job Type */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Job Type</label>
                <div className="space-y-2">
                  {jobTypeChecks.map(t => (
                    <label key={t} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={jobType === t}
                        onChange={() => updateParam('type', jobType === t ? '' : t)}
                        className="w-4 h-4 rounded border-gray-300 text-[#2554a7] focus:ring-[#2554a7]"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Salary Range</label>
                <div className="flex gap-2">
                  <input type="number" value={salaryMin} onChange={(e) => updateParam('salaryMin', e.target.value)}
                    placeholder="Min" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
                  <input type="number" value={salaryMax} onChange={(e) => updateParam('salaryMax', e.target.value)}
                    placeholder="Max" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Experience Level</label>
                <select value={experience} onChange={(e) => updateParam('experience', e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
                  <option value="">Any Experience</option>
                  {EXPERIENCE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {/* Date Posted */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Date Posted</label>
                <div className="space-y-2">
                  {[
                    { value: '', label: 'Any' },
                    { value: 'today', label: 'Today' },
                    { value: '3days', label: 'Last 3 days' },
                    { value: 'week', label: 'Last week' },
                    { value: 'month', label: 'Last month' },
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="datePosted"
                        checked={datePosted === opt.value}
                        onChange={() => updateParam('datePosted', opt.value)}
                        className="w-4 h-4 border-gray-300 text-[#2554a7] focus:ring-[#2554a7]"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="flex-1 min-w-0">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-4 bg-white rounded-xl border border-gray-100 px-4 py-3">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{jobs.length}</span> jobs found
              </p>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <select value={sort} onChange={(e) => updateParam('sort', e.target.value)}
                  className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
                  <option value="relevance">Relevance</option>
                  <option value="date">Date</option>
                  <option value="salary">Salary</option>
                </select>
              </div>
            </div>

            {paginatedJobs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <button onClick={clearFilters} className="text-[#2554a7] font-semibold text-sm hover:text-[#1d3f8a]">Clear all filters</button>
              </div>
            ) : (
              <div className="space-y-3">
                {paginatedJobs.map((job) => {
                  const saved = session ? isJobSaved(session.id, job.id) : false;
                  return (
                    <Link key={job.id} to={`/jobs/${job.id}`}
                      className="group bg-white rounded-xl border border-gray-100 p-5 hover:border-[#2554a7]/30 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200 block">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[#2554a7] font-bold text-sm shrink-0">
                          {job.companyName.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 group-hover:text-[#2554a7] transition-colors truncate">{job.title}</h3>
                          <p className="text-sm text-gray-500 mt-0.5">{job.companyName}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-400">
                            <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="inline-flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{job.country}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{timeAgo(job.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                          <span className="text-sm font-semibold text-gray-700">
                            {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod)}
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#2554a7]">{job.type}</span>
                        </div>
                        <button onClick={(e) => handleSave(e, job.id)}
                          className="p-2 rounded-lg text-gray-300 hover:bg-gray-50 transition-colors shrink-0"
                          title={saved ? 'Unsave job' : 'Save job'}>
                          {saved ? <BookmarkCheck className="w-5 h-5 text-[#2554a7]" /> : <Bookmark className="w-5 h-5" />}
                        </button>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <Pagination page={page} total={jobs.length} perPage={PER_PAGE} onChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

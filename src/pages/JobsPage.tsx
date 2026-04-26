import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { filterJobs, CATEGORY_LIST, JOB_TYPES, COUNTRIES } from '../lib/data';
import { Search, MapPin, Briefcase, X, SlidersHorizontal, Globe, Clock } from 'lucide-react';

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [country, setCountry] = useState(searchParams.get('country') || '');
  const [jobType, setJobType] = useState(searchParams.get('type') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [, setJobsVersion] = useState(0);

  useEffect(() => {
    const handler = () => setJobsVersion((v) => v + 1);
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const jobs = filterJobs({
    q: searchParams.get('q') || undefined,
    category: searchParams.get('category') || undefined,
    country: searchParams.get('country') || undefined,
    type: searchParams.get('type') || undefined,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (search) params.set('q', search); else params.delete('q');
    setSearchParams(params);
  };

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    const newCat = cat === category ? '' : cat;
    if (newCat) params.set('category', newCat); else params.delete('category');
    setCategory(newCat);
    setSearchParams(params);
  };

  const handleCountryChange = (c: string) => {
    const params = new URLSearchParams(searchParams);
    const newCountry = c === country ? '' : c;
    if (newCountry) params.set('country', newCountry); else params.delete('country');
    setCountry(newCountry);
    setSearchParams(params);
  };

  const handleJobTypeChange = (t: string) => {
    const params = new URLSearchParams(searchParams);
    const newType = t === jobType ? '' : t;
    if (newType) params.set('type', newType); else params.delete('type');
    setJobType(newType);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearch(''); setCategory(''); setCountry(''); setJobType('');
    setSearchParams({});
  };

  const hasFilters = searchParams.get('q') || searchParams.get('category') || searchParams.get('country') || searchParams.get('type');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Jobs</h1>
          <p className="text-gray-500">Browse {jobs.length} available positions worldwide</p>

          <form onSubmit={handleSearch} className="mt-6 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, company, location, or specialization..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shrink-0">Search</button>
            <button type="button" onClick={() => setShowFilters(!showFilters)}
              className={`md:hidden p-3.5 rounded-xl border transition-colors ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </form>

          <div className={`mt-5 ${showFilters ? 'block' : 'hidden'} md:block space-y-4`}>
            {/* Category */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Category</p>
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORY_LIST.map((cat) => (
                  <button key={cat} onClick={() => handleCategoryChange(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${category === cat ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Type */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Job Type</p>
              <div className="flex flex-wrap items-center gap-2">
                {JOB_TYPES.map((t) => (
                  <button key={t} onClick={() => handleJobTypeChange(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${jobType === t ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Country */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Country</p>
              <div className="flex flex-wrap items-center gap-2">
                {COUNTRIES.slice(0, 10).map((c) => (
                  <button key={c} onClick={() => handleCountryChange(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${country === c ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                    {c}
                  </button>
                ))}
                <select value={country && !COUNTRIES.slice(0, 10).includes(country) ? country : ''}
                  onChange={(e) => { if (e.target.value) handleCountryChange(e.target.value); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">More countries...</option>
                  {COUNTRIES.slice(10).map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="inline-flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <X className="w-4 h-4" /> Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {jobs.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button onClick={clearFilters} className="text-blue-600 font-semibold text-sm hover:text-blue-700">Clear all filters</button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Link key={job.id} to={`/jobs/${job.id}`}
                className="group bg-white rounded-xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200 block">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                    {job.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{job.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="inline-flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{job.country}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{job.category}</span>
                      {job.subcategory && <><span className="w-1 h-1 bg-gray-300 rounded-full" /><span>{job.subcategory}</span></>}
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                    {job.salary_max > 0 && (
                      <span className="text-sm font-semibold text-gray-700">${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}</span>
                    )}
                    <span className="text-xs text-gray-400">{new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

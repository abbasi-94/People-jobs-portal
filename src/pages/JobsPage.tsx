import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Job, CATEGORIES } from '../lib/types';
import { Search, MapPin, Briefcase, X, SlidersHorizontal } from 'lucide-react';

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      let query = supabase.from('jobs').select('*').eq('is_active', true).order('created_at', { ascending: false });

      const cat = searchParams.get('category');
      if (cat) query = query.eq('category', cat);

      const { data } = await query;
      let results = data || [];

      const q = searchParams.get('q');
      if (q) {
        const lower = q.toLowerCase();
        results = results.filter(
          (j) =>
            j.title.toLowerCase().includes(lower) ||
            j.company.toLowerCase().includes(lower) ||
            j.location.toLowerCase().includes(lower) ||
            j.description.toLowerCase().includes(lower)
        );
      }

      setJobs(results);
      setLoading(false);
    }
    fetchJobs();
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (search) params.set('q', search);
    else params.delete('q');
    setSearchParams(params);
  };

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    const newCat = cat === category ? '' : cat;
    if (newCat) params.set('category', newCat);
    else params.delete('category');
    setCategory(newCat);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSearchParams({});
  };

  const hasFilters = searchParams.get('q') || searchParams.get('category');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Jobs</h1>
          <p className="text-gray-500">Browse {jobs.length} available positions</p>

          <form onSubmit={handleSearch} className="mt-6 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, company, or location..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shrink-0"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`md:hidden p-3.5 rounded-xl border transition-colors ${
                showFilters ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-gray-50 border-gray-200 text-gray-500'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </form>

          {/* Category filters */}
          <div className={`mt-4 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="text-blue-600 font-semibold text-sm hover:text-blue-700"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="group bg-white rounded-xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200 block"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                    {job.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{job.category}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                    {job.salary_max > 0 && (
                      <span className="text-sm font-semibold text-gray-700">
                        ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
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

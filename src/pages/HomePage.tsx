import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Job, CATEGORIES } from '../lib/types';
import {
  Search,
  ArrowRight,
  TrendingUp,
  Users,
  Building2,
  Globe,
  Code,
  BarChart3,
  Megaphone,
  GraduationCap,
  HeartPulse,
  Wrench,
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  IT: <Code className="w-6 h-6" />,
  Sales: <BarChart3 className="w-6 h-6" />,
  Marketing: <Megaphone className="w-6 h-6" />,
  Teaching: <GraduationCap className="w-6 h-6" />,
  Healthcare: <HeartPulse className="w-6 h-6" />,
  Engineering: <Wrench className="w-6 h-6" />,
};

export default function HomePage() {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      const [jobsRes, countRes] = await Promise.all([
        supabase.from('jobs').select('*').eq('is_active', true).order('created_at', { ascending: false }).limit(6),
        supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('is_active', true),
      ]);
      if (jobsRes.data) setFeaturedJobs(jobsRes.data);
      if (countRes.count !== null) setJobCount(countRes.count);
    }
    loadData();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <TrendingUp className="w-4 h-4 text-blue-200" />
              <span className="text-sm text-blue-100 font-medium">{jobCount}+ active job listings</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Find Your<br />
              <span className="text-blue-200">Dream Job</span>
            </h1>
            <p className="text-lg text-blue-100 mb-10 max-w-xl leading-relaxed">
              Discover opportunities that match your skills and passion. Connect with top employers and take the next step in your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20"
              >
                <Search className="w-5 h-5" />
                Browse Jobs
              </Link>
              <Link
                to="/post-job"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors"
              >
                Post a Job
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Building2 className="w-5 h-5" />, value: '500+', label: 'Companies' },
              { icon: <Users className="w-5 h-5" />, value: '10K+', label: 'Job Seekers' },
              { icon: <Globe className="w-5 h-5" />, value: '50+', label: 'Locations' },
              { icon: <TrendingUp className="w-5 h-5" />, value: '95%', label: 'Success Rate' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-50 text-blue-600 rounded-lg mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Browse by Category</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Explore opportunities across the industries that matter most to you</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/jobs?category=${cat}`}
                className="group bg-white rounded-xl p-6 text-center border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-xl mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {categoryIcons[cat]}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{cat}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Jobs</h2>
              <p className="text-gray-500">Latest opportunities from top employers</p>
            </div>
            <Link
              to="/jobs"
              className="hidden sm:inline-flex items-center gap-1 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors"
            >
              View all jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredJobs.map((job) => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="group bg-white rounded-xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                    {job.company.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {job.type}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{job.company}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{job.location}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{job.category}</span>
                </div>
                {job.salary_max > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-50 text-sm font-semibold text-gray-700">
                    ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm hover:text-blue-700"
            >
              View all jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to hire top talent?
          </h2>
          <p className="text-blue-100 max-w-lg mx-auto mb-8 leading-relaxed">
            Post your job listing and reach thousands of qualified professionals looking for their next opportunity.
          </p>
          <Link
            to="/post-job"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Post a Job Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

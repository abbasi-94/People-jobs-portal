import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getJobs, CATEGORY_LIST } from '../lib/data';
import { formatSalary, timeAgo } from '../components/UI';
import {
  Search, MapPin, ArrowRight, Users, Building2, Globe,
  Monitor, Wrench, HeartPulse, GraduationCap, Briefcase, Megaphone,
  Newspaper, Scale, Home, Truck, Utensils, Factory, Sprout, Landmark,
  HandHeart, Palette, FlaskConical, Headphones, UserCog, ShoppingCart,
  Wifi, Droplets, ShieldCheck, Plane, Dumbbell,
  CheckCircle, Clock, Zap,
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'Information Technology': <Monitor className="w-5 h-5" />,
  'Engineering': <Wrench className="w-5 h-5" />,
  'Healthcare & Medical': <HeartPulse className="w-5 h-5" />,
  'Education & Teaching': <GraduationCap className="w-5 h-5" />,
  'Business & Finance': <Briefcase className="w-5 h-5" />,
  'Sales & Marketing': <Megaphone className="w-5 h-5" />,
  'Media & Communications': <Newspaper className="w-5 h-5" />,
  'Legal & Law': <Scale className="w-5 h-5" />,
  'Construction & Real Estate': <Home className="w-5 h-5" />,
  'Transportation & Logistics': <Truck className="w-5 h-5" />,
  'Hospitality & Tourism': <Utensils className="w-5 h-5" />,
  'Manufacturing & Production': <Factory className="w-5 h-5" />,
  'Agriculture & Farming': <Sprout className="w-5 h-5" />,
  'Government & Public Sector': <Landmark className="w-5 h-5" />,
  'Social Work & NGO': <HandHeart className="w-5 h-5" />,
  'Arts & Design': <Palette className="w-5 h-5" />,
  'Science & Research': <FlaskConical className="w-5 h-5" />,
  'Customer Service': <Headphones className="w-5 h-5" />,
  'Human Resources': <UserCog className="w-5 h-5" />,
  'Retail & E-commerce': <ShoppingCart className="w-5 h-5" />,
  'Telecom': <Wifi className="w-5 h-5" />,
  'Oil & Gas': <Droplets className="w-5 h-5" />,
  'Security': <ShieldCheck className="w-5 h-5" />,
  'Aviation': <Plane className="w-5 h-5" />,
  'Sports & Fitness': <Dumbbell className="w-5 h-5" />,
};

export default function HomePage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const allJobs = getJobs();
  const activeJobs = allJobs.filter(j => j.isActive);
  const featuredJobs = activeJobs.filter(j => j.isFeatured).slice(0, 6);
  const recentJobs = [...activeJobs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6);

  const companies = new Set(allJobs.map(j => j.companyId)).size;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set('q', keyword);
    if (location) params.set('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="bg-white">
      {/* Hero Section - Indeed Style */}
      <section className="bg-[#2554a7] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Find Your Next Career Move
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Search thousands of job listings from top employers across the globe
            </p>
          </div>

          {/* Big Search Bar */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-2 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Job title, keyword, or company"
                  className="w-full pl-10 pr-4 py-3.5 rounded-lg text-sm bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, country, or 'remote'"
                  className="w-full pl-10 pr-4 py-3.5 rounded-lg text-sm bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="bg-[#2554a7] text-white px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-[#1d3f8a] transition-colors shrink-0"
              >
                Find Jobs
              </button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="max-w-4xl mx-auto mt-6 flex flex-wrap justify-center gap-2">
            <Link to="/jobs" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
              Browse All Jobs
            </Link>
            <Link to="/jobs?type=Remote" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
              Remote Jobs
            </Link>
            <Link to="/jobs?type=Full-time" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
              Full-time
            </Link>
            <Link to="/post-job" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Counter */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-[#2554a7] rounded-xl mb-3">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{activeJobs.length}+</div>
              <div className="text-sm text-gray-500 mt-1">Jobs Posted</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 text-green-600 rounded-xl mb-3">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{companies}+</div>
              <div className="text-sm text-gray-500 mt-1">Companies</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-50 text-amber-600 rounded-xl mb-3">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-500 mt-1">Candidates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Browse by Category</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Explore opportunities across 25 industries and hundreds of specializations</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {CATEGORY_LIST.map((cat) => {
              const count = allJobs.filter(j => j.isActive && j.category === cat).length;
              return (
                <Link
                  key={cat}
                  to={`/jobs?category=${encodeURIComponent(cat)}`}
                  className="group bg-white rounded-xl p-4 text-center border border-gray-100 hover:border-[#2554a7]/30 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-50 text-[#2554a7] rounded-lg mb-2 group-hover:bg-[#2554a7] group-hover:text-white transition-colors">
                    {categoryIcons[cat] || <Briefcase className="w-5 h-5" />}
                  </div>
                  <h3 className="font-medium text-gray-900 text-xs leading-tight mb-1">{cat}</h3>
                  <p className="text-[10px] text-gray-400">{count} jobs</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Featured Jobs</h2>
              <p className="text-gray-500">Premium opportunities from top employers</p>
            </div>
            <Link to="/jobs" className="hidden sm:inline-flex items-center gap-1 text-[#2554a7] font-semibold text-sm hover:text-[#1d3f8a] transition-colors">
              View all jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(featuredJobs.length > 0 ? featuredJobs : recentJobs).map((job) => (
              <Link key={job.id} to={`/jobs/${job.id}`}
                className="group bg-white rounded-xl border border-gray-100 p-6 hover:border-[#2554a7]/30 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center text-[#2554a7] font-bold text-sm">
                    {job.companyName.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-[#2554a7]">{job.type}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#2554a7] transition-colors">{job.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{job.companyName}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="inline-flex items-center gap-1"><Globe className="w-3 h-3" />{job.country}</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                  <span className="text-sm font-semibold text-gray-700">
                    {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod)}
                  </span>
                  <span className="text-xs text-gray-400 inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />{timeAgo(job.createdAt)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/jobs" className="inline-flex items-center gap-1 text-[#2554a7] font-semibold text-sm hover:text-[#1d3f8a]">
              View all jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Find and land your dream job in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-7 h-7" />,
                step: '1',
                title: 'Search',
                desc: 'Browse thousands of job listings by title, location, category, or company. Filter results to find exactly what you are looking for.',
              },
              {
                icon: <Zap className="w-7 h-7" />,
                step: '2',
                title: 'Apply',
                desc: 'Submit your application with a single click. Upload your resume and cover letter directly to the employer.',
              },
              {
                icon: <CheckCircle className="w-7 h-7" />,
                step: '3',
                title: 'Get Hired',
                desc: 'Connect with employers, attend interviews, and receive job offers. Your next career move starts here.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl border border-gray-100 p-8 text-center hover:shadow-lg hover:shadow-blue-50 transition-all duration-200">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#2554a7] text-white rounded-2xl mb-5">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-[#2554a7] mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2554a7] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to hire top talent?</h2>
          <p className="text-blue-100 max-w-lg mx-auto mb-8 leading-relaxed">
            Post your job listing and reach thousands of qualified professionals worldwide.
          </p>
          <Link to="/post-job" className="inline-flex items-center gap-2 bg-white text-[#2554a7] px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
            Post a Job Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

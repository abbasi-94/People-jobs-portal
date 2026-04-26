import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  getSession, getJobs, getApplications, getCompanies, saveJob, deleteJob,
  toggleJobActive, updateApplicationStatus, saveCompany, updateCompany,
  getChatPartners, getChatThread, sendChat, markChatsRead,
  CATEGORIES, CATEGORY_LIST, JOB_TYPES, EXPERIENCE_LEVELS, EDUCATION_LEVELS,
  SALARY_CURRENCIES, SALARY_PERIODS, COUNTRIES, COMPANY_SIZES,
} from '../lib/data';
import { formatSalary, timeAgo } from '../components/UI';
import {
  Briefcase, FileText, MessageSquare, Building2, Plus, Trash2,
  Pause, Play, Eye, MapPin, DollarSign, Send,
  CheckCircle, XCircle, Search, Globe, Mail, GraduationCap,
  ListChecks, CalendarDays,
} from 'lucide-react';

type Tab = 'my-jobs' | 'post-job' | 'applications' | 'messages' | 'company-profile';

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const session = getSession();
  const [tab, setTab] = useState<Tab>('my-jobs');
  const [, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!session || session.role !== 'employer') {
      navigate('/auth');
    }
  }, [session, navigate]);

  if (!session || session.role !== 'employer') return null;

  const refresh = () => setRefreshKey(k => k + 1);

  const myJobs = getJobs().filter(j => j.companyId === session.companyId || j.employerEmail === session.email);
  const myApps = getApplications().filter(a => myJobs.some(j => j.id === a.jobId));
  const myCompany = session.companyId ? getCompanies().find(c => c.id === session.companyId) : null;
  const chatPartners = getChatPartners(session.id);

  const [activeJobCount, postedJobCount] = [myJobs.filter(j => j.isActive).length, myJobs.length];
  const pendingApps = myApps.filter(a => a.status === 'pending').length;

  const tabs: { key: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: 'my-jobs', label: 'My Jobs', icon: <Briefcase className="w-4 h-4" />, badge: postedJobCount },
    { key: 'post-job', label: 'Post Job', icon: <Plus className="w-4 h-4" /> },
    { key: 'applications', label: 'Applications', icon: <FileText className="w-4 h-4" />, badge: pendingApps },
    { key: 'messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
    { key: 'company-profile', label: 'Company Profile', icon: <Building2 className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-[#2554a7] rounded-xl flex items-center justify-center text-white font-bold">
              {session.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Employer Dashboard</h1>
              <p className="text-sm text-gray-500">{session.name} &middot; {session.email}</p>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-[#2554a7]">{postedJobCount}</p>
              <p className="text-xs text-gray-500">Jobs Posted</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-green-600">{activeJobCount}</p>
              <p className="text-xs text-gray-500">Active Jobs</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-amber-600">{pendingApps}</p>
              <p className="text-xs text-gray-500">Pending Apps</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 mb-6 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.key ? 'bg-[#2554a7] text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}>
              {t.icon} {t.label}
              {t.badge !== undefined && t.badge > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-white/20' : 'bg-gray-100'}`}>{t.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* My Jobs Tab */}
        {tab === 'my-jobs' && <MyJobs jobs={myJobs} refresh={refresh} />}

        {/* Post Job Tab */}
        {tab === 'post-job' && <PostJobForm session={session} refresh={refresh} onPosted={() => setTab('my-jobs')} />}

        {/* Applications Tab */}
        {tab === 'applications' && <Applications apps={myApps} refresh={refresh} />}

        {/* Messages Tab */}
        {tab === 'messages' && <Messages userId={session.id} userName={session.name} partners={chatPartners} refresh={refresh} />}

        {/* Company Profile Tab */}
        {tab === 'company-profile' && <CompanyProfile session={session} company={myCompany} refresh={refresh} />}
      </div>
    </div>
  );
}

/* ===== My Jobs ===== */
function MyJobs({ jobs, refresh }: { jobs: any[]; refresh: () => void }) {
  const [search, setSearch] = useState('');
  const filtered = search ? jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase())) : jobs;

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search your jobs..." className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No jobs posted yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(job => (
            <div key={job.id} className={`bg-white rounded-xl border p-5 ${job.isActive ? 'border-gray-100' : 'border-red-100 bg-red-50/30'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{job.title}</h3>
                    <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${job.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {job.isActive ? 'Active' : 'Paused'}
                    </span>
                    {job.isFeatured && <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">Featured</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{job.category} &middot; {job.type} &middot; {job.location}, {job.country}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod)} &middot; {timeAgo(job.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => { toggleJobActive(job.id); refresh(); }}
                    className={`p-2 rounded-lg transition-colors ${job.isActive ? 'text-orange-500 hover:bg-orange-50' : 'text-green-500 hover:bg-green-50'}`}
                    title={job.isActive ? 'Pause' : 'Activate'}>
                    {job.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <Link to={`/jobs/${job.id}`} className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors" title="View">
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button onClick={() => { if (confirm('Delete this job?')) { deleteJob(job.id); refresh(); } }}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===== Post Job Form ===== */
function PostJobForm({ session, refresh, onPosted }: { session: any; refresh: () => void; onPosted: () => void }) {
  const [form, setForm] = useState({
    title: '', category: CATEGORY_LIST[0], subcategory: CATEGORIES[CATEGORY_LIST[0]][0] || '',
    type: 'Full-time', location: '', country: 'Bahrain',
    salaryMin: '', salaryMax: '', salaryCurrency: 'USD', salaryPeriod: 'Per Month',
    experience: EXPERIENCE_LEVELS[0], education: EDUCATION_LEVELS[0],
    skills: '', description: '', responsibilities: '', benefits: '',
    deadline: '', employerEmail: session.email,
  });
  const [submitted, setSubmitted] = useState(false);

  const subcategories = CATEGORIES[form.category] || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'category') updated.subcategory = (CATEGORIES[value] || [])[0] || '';
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let companyId = session.companyId || '';
    if (!companyId) {
      const company = saveCompany({
        name: session.name + "'s Company",
        logo: session.name.slice(0, 2).toUpperCase(),
        description: '',
        website: '',
        industry: form.category,
        location: form.location,
        country: form.country,
        size: '1-10',
        ownerId: session.id,
      });
      companyId = company.id;
    }
    saveJob({
      title: form.title,
      companyId,
      companyName: session.name + "'s Company",
      category: form.category,
      subcategory: form.subcategory,
      type: form.type,
      location: form.location,
      country: form.country,
      salaryMin: parseInt(form.salaryMin) || 0,
      salaryMax: parseInt(form.salaryMax) || 0,
      salaryCurrency: form.salaryCurrency,
      salaryPeriod: form.salaryPeriod,
      experienceRequired: form.experience,
      educationRequired: form.education,
      skillsRequired: form.skills,
      description: form.description,
      responsibilities: form.responsibilities,
      benefits: form.benefits,
      deadline: form.deadline,
      employerEmail: form.employerEmail,
    });
    setSubmitted(true);
    refresh();
  };

  if (submitted) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">Job Posted Successfully!</h3>
        <p className="text-gray-500 text-sm mb-6">Your job listing is now live and visible to job seekers.</p>
        <button onClick={() => { setSubmitted(false); onPosted(); }}
          className="bg-[#2554a7] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors">
          View My Jobs
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Job Details */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6"><FileText className="w-5 h-5 text-[#2554a7]" /><h2 className="font-semibold text-gray-900">Job Details</h2></div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Senior Frontend Developer"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
                {CATEGORY_LIST.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subcategory *</label>
              <select name="subcategory" value={form.subcategory} onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
                {subcategories.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Type *</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
              {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6"><Globe className="w-5 h-5 text-[#2554a7]" /><h2 className="font-semibold text-gray-900">Location</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">City / Region *</label>
            <div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="e.g. Manama"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Country *</label>
            <select name="country" value={form.country} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Salary */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6"><DollarSign className="w-5 h-5 text-[#2554a7]" /><h2 className="font-semibold text-gray-900">Salary</h2></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Min</label>
            <input type="number" name="salaryMin" value={form.salaryMin} onChange={handleChange} placeholder="4000"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Max</label>
            <input type="number" name="salaryMax" value={form.salaryMax} onChange={handleChange} placeholder="7000"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
            <select name="salaryCurrency" value={form.salaryCurrency} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
              {SALARY_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Period</label>
            <select name="salaryPeriod" value={form.salaryPeriod} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
              {SALARY_PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Experience & Education */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6"><GraduationCap className="w-5 h-5 text-[#2554a7]" /><h2 className="font-semibold text-gray-900">Requirements</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience</label>
            <select name="experience" value={form.experience} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
              {EXPERIENCE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Education</label>
            <select name="education" value={form.education} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
              {EDUCATION_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Skills Required</label>
          <input type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="React, TypeScript, CSS (comma separated)"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
        </div>
      </div>

      {/* Description, Responsibilities, Benefits */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6"><ListChecks className="w-5 h-5 text-[#2554a7]" /><h2 className="font-semibold text-gray-900">Details</h2></div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={6}
              placeholder="Describe the role..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Responsibilities</label>
            <textarea name="responsibilities" value={form.responsibilities} onChange={handleChange} rows={4}
              placeholder="List key responsibilities, one per line..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Benefits</label>
            <textarea name="benefits" value={form.benefits} onChange={handleChange} rows={3}
              placeholder="List benefits, one per line..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent resize-none" />
          </div>
        </div>
      </div>

      {/* Deadline & Email */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6"><CalendarDays className="w-5 h-5 text-[#2554a7]" /><h2 className="font-semibold text-gray-900">Deadline & Contact</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Application Deadline</label>
            <input type="date" name="deadline" value={form.deadline} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Email *</label>
            <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="email" name="employerEmail" value={form.employerEmail} onChange={handleChange} required
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className="w-full bg-[#2554a7] text-white py-4 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors flex items-center justify-center gap-2">
        <Send className="w-4 h-4" /> Publish Job Listing
      </button>
    </form>
  );
}

/* ===== Applications ===== */
function Applications({ apps, refresh }: { apps: any[]; refresh: () => void }) {
  const [search, setSearch] = useState('');
  const filtered = search ? apps.filter(a => a.seekerName.toLowerCase().includes(search.toLowerCase()) || a.jobTitle.toLowerCase().includes(search.toLowerCase())) : apps;

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search applications..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No applications received yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(app => (
            <div key={app.id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#2554a7] font-bold text-xs shrink-0">
                  {app.seekerName.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">{app.seekerName}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{app.seekerEmail} &middot; {app.seekerPhone}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Applied for: <span className="font-medium text-gray-700">{app.jobTitle}</span></p>
                  {app.coverLetter && <p className="text-xs text-gray-500 mt-2 line-clamp-2 bg-gray-50 rounded-lg p-2">{app.coverLetter}</p>}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      app.status === 'shortlisted' ? 'bg-green-50 text-green-700' : app.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                    }`}>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                    <span className="text-xs text-gray-400">{timeAgo(app.createdAt)}</span>
                  </div>
                </div>
                {app.status === 'pending' && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => { updateApplicationStatus(app.id, 'shortlisted'); refresh(); }}
                      className="p-2 rounded-lg text-green-500 hover:bg-green-50 transition-colors" title="Shortlist">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button onClick={() => { updateApplicationStatus(app.id, 'rejected'); refresh(); }}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Reject">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===== Messages ===== */
function Messages({ userId, userName, partners, refresh }: { userId: string; userName: string; partners: any[]; refresh: () => void }) {
  const [activePartner, setActivePartner] = useState<{ partnerId: string; jobId: string } | null>(null);
  const [message, setMessage] = useState('');
  const [thread, setThread] = useState<any[]>([]);

  useEffect(() => {
    if (activePartner) {
      setThread(getChatThread(userId, activePartner.partnerId, activePartner.jobId));
      markChatsRead(userId, activePartner.partnerId);
      refresh();
    }
  }, [activePartner, userId, refresh]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activePartner) return;
    const partner = partners.find(p => p.partnerId === activePartner.partnerId && p.jobId === activePartner.jobId);
    sendChat({
      fromId: userId,
      fromName: userName,
      toId: activePartner.partnerId,
      toName: partner?.partnerName || '',
      jobId: activePartner.jobId,
      jobTitle: partner?.jobTitle || '',
      text: message.trim(),
    });
    setMessage('');
    setThread(getChatThread(userId, activePartner.partnerId, activePartner.jobId));
    refresh();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden" style={{ minHeight: 500 }}>
      <div className="flex h-[500px]">
        {/* Partners list */}
        <div className="w-64 border-r border-gray-100 overflow-y-auto shrink-0 hidden sm:block">
          <div className="p-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm">Conversations</h3>
          </div>
          {partners.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-400">No conversations</div>
          ) : (
            partners.map((p, i) => (
              <button key={i} onClick={() => setActivePartner({ partnerId: p.partnerId, jobId: p.jobId })}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                  activePartner?.partnerId === p.partnerId && activePartner?.jobId === p.jobId ? 'bg-blue-50' : ''
                }`}>
                <p className="text-sm font-medium text-gray-900 truncate">{p.partnerName}</p>
                <p className="text-xs text-gray-400 truncate">{p.jobTitle}</p>
                <p className="text-xs text-gray-300 truncate mt-0.5">{p.lastMessage}</p>
                {p.unread > 0 && <span className="inline-flex items-center justify-center w-5 h-5 bg-[#2554a7] text-white text-xs rounded-full mt-1">{p.unread}</span>}
              </button>
            ))
          )}
        </div>
        {/* Chat thread */}
        <div className="flex-1 flex flex-col">
          {activePartner ? (
            <>
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">
                  {partners.find(p => p.partnerId === activePartner.partnerId && p.jobId === activePartner.jobId)?.partnerName}
                </p>
                <p className="text-xs text-gray-400">{partners.find(p => p.partnerId === activePartner.partnerId && p.jobId === activePartner.jobId)?.jobTitle}</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {thread.map(msg => (
                  <div key={msg.id} className={`flex ${msg.fromId === userId ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-4 py-2.5 rounded-xl text-sm ${
                      msg.fromId === userId ? 'bg-[#2554a7] text-white' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {msg.text}
                      <p className={`text-[10px] mt-1 ${msg.fromId === userId ? 'text-blue-200' : 'text-gray-400'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSend} className="p-3 border-t border-gray-100 flex gap-2">
                <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
                <button type="submit" className="bg-[#2554a7] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1d3f8a] transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===== Company Profile ===== */
function CompanyProfile({ session, company, refresh }: { session: any; company: any; refresh: () => void }) {
  const [form, setForm] = useState({
    name: company?.name || '', description: company?.description || '',
    website: company?.website || '', industry: company?.industry || '',
    location: company?.location || '', country: company?.country || 'Bahrain',
    size: company?.size || '1-10',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (company) {
      updateCompany({ ...company, ...form });
    } else {
      const c = saveCompany({
        name: form.name,
        logo: form.name.slice(0, 2).toUpperCase(),
        description: form.description,
        website: form.website,
        industry: form.industry,
        location: form.location,
        country: form.country,
        size: form.size,
        ownerId: session.id,
      });
      // Update user with company ID
      const { updateUser } = require('../lib/data') as typeof import('../lib/data');
      updateUser({ ...session, companyId: c.id });
    }
    setSaved(true);
    refresh();
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
      <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2"><Building2 className="w-5 h-5 text-[#2554a7]" /> Company Profile</h2>
      {saved && <p className="text-sm text-green-600 bg-green-50 rounded-lg px-4 py-2">Profile saved successfully!</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Website</label>
          <input type="url" name="website" value={form.website} onChange={handleChange} placeholder="https://..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Industry</label>
          <input type="text" name="industry" value={form.industry} onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Size</label>
          <select name="size" value={form.size} onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
            {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
          <input type="text" name="location" value={form.location} onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
          <select name="country" value={form.country} onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={4}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent resize-none" />
      </div>
      <button type="submit" className="bg-[#2554a7] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors">
        Save Company Profile
      </button>
    </form>
  );
}

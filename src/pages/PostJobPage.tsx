import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveJob, CATEGORIES, CATEGORY_LIST, JOB_TYPES, COUNTRIES, SALARY_CURRENCIES, SALARY_PERIODS, EXPERIENCE_LEVELS, EDUCATION_LEVELS } from '../lib/data';
import {
  Briefcase, CheckCircle, ArrowLeft, Globe, MapPin, DollarSign,
  Building2, Mail, FileText, ListChecks, Send, GraduationCap, CalendarDays,
} from 'lucide-react';

export default function PostJobPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '', companyName: '', location: '', country: 'Bahrain',
    category: 'Information Technology', subcategory: 'Software',
    type: 'Full-time', salaryMin: '', salaryMax: '', salaryCurrency: 'USD', salaryPeriod: 'Per Month',
    experience: 'No Experience', education: 'Any',
    skills: '', description: '', responsibilities: '', benefits: '',
    deadline: '', employerEmail: '',
  });

  const subcategories = CATEGORIES[form.category] || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'category') {
        const subs = CATEGORIES[value] || [];
        updated.subcategory = subs[0] || '';
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveJob({
      title: form.title,
      companyId: '',
      companyName: form.companyName,
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
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Job Posted Successfully!</h2>
          <p className="text-gray-500 mb-8">Your job listing is now live and visible to job seekers worldwide.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate('/jobs')} className="bg-[#2554a7] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors">View All Jobs</button>
            <button onClick={() => {
              setSubmitted(false);
              setForm({
                title: '', companyName: '', location: '', country: 'Bahrain',
                category: 'Information Technology', subcategory: 'Software',
                type: 'Full-time', salaryMin: '', salaryMax: '', salaryCurrency: 'USD', salaryPeriod: 'Per Month',
                experience: 'No Experience', education: 'Any',
                skills: '', description: '', responsibilities: '', benefits: '',
                deadline: '', employerEmail: '',
              });
            }}
              className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">Post Another Job</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-[#2554a7] to-[#1d3f8a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-blue-200 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center"><Briefcase className="w-6 h-6 text-white" /></div>
            <div><h1 className="text-2xl font-bold text-white">Post a Job</h1><p className="text-blue-200 text-sm">Reach talent across the globe</p></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Details */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6"><FileText className="w-5 h-5 text-[#2554a7]" /><h2 className="font-semibold text-gray-900">Job Details</h2></div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title *</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name *</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" name="companyName" value={form.companyName} onChange={handleChange} required placeholder="e.g. TechCorp Inc."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6"><Globe className="w-5 h-5 text-[#2554a7]" /><h2 className="font-semibold text-gray-900">Location</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City / Region *</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="e.g. Manama"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Country *</label>
                <select name="country" value={form.country} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
                  {COUNTRIES.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>
            </div>
          </div>

          {/* Category & Type */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6"><ListChecks className="w-5 h-5 text-[#2554a7]" /><h2 className="font-semibold text-gray-900">Category & Job Type</h2></div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
                  {CATEGORY_LIST.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Specialization *</label>
                <select name="subcategory" value={form.subcategory} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent">
                  {subcategories.map((sub) => (<option key={sub} value={sub}>{sub}</option>))}
                </select>
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

          {/* Salary */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6"><DollarSign className="w-5 h-5 text-[#2554a7]" /><h2 className="font-semibold text-gray-900">Salary Range</h2></div>
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
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
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

          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6"><FileText className="w-5 h-5 text-[#2554a7]" /><h2 className="font-semibold text-gray-900">Job Description</h2></div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} required rows={6}
                  placeholder="Describe the role, responsibilities, and what makes it a great opportunity..."
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

          {/* Deadline & Contact */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6"><CalendarDays className="w-5 h-5 text-[#2554a7]" /><h2 className="font-semibold text-gray-900">Deadline & Contact</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Application Deadline</label>
                <input type="date" name="deadline" value={form.deadline} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Employer Email *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" name="employerEmail" value={form.employerEmail} onChange={handleChange} required placeholder="e.g. hr@company.com"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#2554a7] text-white py-4 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Send className="w-4 h-4" /> Publish Job Listing
          </button>
        </form>
      </div>
    </div>
  );
}

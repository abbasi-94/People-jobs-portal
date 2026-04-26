import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, JOB_TYPES, COUNTRIES } from '../lib/data';
import {
  Briefcase,
  CheckCircle,
  ArrowLeft,
  Globe,
  MapPin,
  DollarSign,
  Building2,
  Mail,
  FileText,
  ListChecks,
  Send,
} from 'lucide-react';

export default function PostJobPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    country: 'Bahrain',
    category: 'IT',
    type: 'Full-time',
    salary_min: '',
    salary_max: '',
    description: '',
    requirements: '',
    how_to_apply: '',
    employer_email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <p className="text-gray-500 mb-8">Your job listing has been submitted. In a production environment, it would be reviewed and published within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/jobs')}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              View All Jobs
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  title: '', company: '', location: '', country: 'Bahrain', category: 'IT',
                  type: 'Full-time', salary_min: '', salary_max: '', description: '',
                  requirements: '', how_to_apply: '', employer_email: '',
                });
              }}
              className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Post Another Job
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-blue-200 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Post a Job</h1>
              <p className="text-blue-200 text-sm">Reach talent across the globe</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Details */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Job Details</h2>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title *</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name *</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" name="company" value={form.company} onChange={handleChange} required
                    placeholder="e.g. TechCorp Inc."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Location</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City / Region *</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" name="location" value={form.location} onChange={handleChange} required
                    placeholder="e.g. Manama"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Country *</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select name="country" value={form.country} onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-shadow">
                    {COUNTRIES.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Category & Type */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <ListChecks className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Category & Job Type</h2>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Category *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => (
                    <label key={cat}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                        form.category === cat ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}>
                      <input type="radio" name="category" value={cat} checked={form.category === cat} onChange={handleChange} className="sr-only" />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${form.category === cat ? 'border-blue-600' : 'border-gray-300'}`}>
                        {form.category === cat && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                      </div>
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Job Type *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {JOB_TYPES.map((t) => (
                    <label key={t}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                        form.type === t ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}>
                      <input type="radio" name="type" value={t} checked={form.type === t} onChange={handleChange} className="sr-only" />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${form.type === t ? 'border-blue-600' : 'border-gray-300'}`}>
                        {form.type === t && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                      </div>
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Salary Range</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Minimum Salary</label>
                <input type="number" name="salary_min" value={form.salary_min} onChange={handleChange}
                  placeholder="e.g. 4000"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Maximum Salary</label>
                <input type="number" name="salary_max" value={form.salary_max} onChange={handleChange}
                  placeholder="e.g. 7000"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Job Description</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} required rows={6}
                  placeholder="Describe the role, responsibilities, and what makes it a great opportunity..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Requirements</label>
                <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={4}
                  placeholder="List the key requirements, separated by commas..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">How to Apply</label>
                <textarea name="how_to_apply" value={form.how_to_apply} onChange={handleChange} rows={2}
                  placeholder="e.g. Send your resume to careers@company.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-shadow" />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Contact Information</h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Employer Email *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="email" name="employer_email" value={form.employer_email} onChange={handleChange} required
                  placeholder="e.g. hr@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
              </div>
            </div>
          </div>

          <button type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Send className="w-4 h-4" />
            Publish Job Listing
          </button>
        </form>
      </div>
    </div>
  );
}

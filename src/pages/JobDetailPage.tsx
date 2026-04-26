import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getJobById, getSimilarJobs, toggleSaveJob, isJobSaved, hasApplied,
  applyForJob, addRecentlyViewed, getSession
} from '../lib/data';
import { formatSalary, timeAgo } from '../components/UI';
import {
  ArrowLeft, MapPin, Briefcase, Clock, DollarSign,
  Mail, CheckCircle2, Globe, Tag, Bookmark, BookmarkCheck,
  Copy, MessageCircle, Send, X, ListChecks, Gift, GraduationCap,
  CalendarDays, Users
} from 'lucide-react';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = id ? getJobById(id) : undefined;
  const session = getSession();
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applyError, setApplyError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (job && session) {
      setSaved(isJobSaved(session.id, job.id));
      setApplied(hasApplied(job.id, session.id));
      addRecentlyViewed(session.id, job.id);
    }
  }, [job, session]);

  if (!job) {
    return (
      <div className="text-center py-20 bg-gray-50 min-h-screen">
        <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Job not found</h3>
        <p className="text-gray-500 mb-6">This job may have been removed or is no longer available.</p>
        <Link to="/jobs" className="text-[#2554a7] font-semibold hover:text-[#1d3f8a]">Browse all jobs</Link>
      </div>
    );
  }

  const similarJobs = getSimilarJobs(job);

  const handleSave = () => {
    if (!session) return;
    toggleSaveJob(session.id, job.id);
    setSaved(!saved);
  };

  const handleApply = () => {
    if (!session || session.role !== 'seeker') {
      navigate('/auth');
      return;
    }
    setShowApplyModal(true);
  };

  const submitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    try {
      applyForJob({
        jobId: job.id,
        jobTitle: job.title,
        companyName: job.companyName,
        seekerId: session.id,
        seekerName: session.name,
        seekerEmail: session.email,
        seekerPhone: session.phone || '',
        coverLetter,
        resumeData: session.resumeData || '',
        resumeName: session.resumeName || '',
      });
      setApplied(true);
      setShowApplyModal(false);
      setCoverLetter('');
    } catch (err: any) {
      setApplyError(err.message || 'Failed to apply');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${job.title} at ${job.companyName} - ${window.location.href}`)}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-[#2554a7] font-bold shrink-0">
              {job.companyName.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <Link to={`/company/${job.companyId}`} className="text-[#2554a7] hover:underline text-sm font-medium">{job.companyName}</Link>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400" />{job.location}</span>
                <span className="inline-flex items-center gap-1.5"><Globe className="w-4 h-4 text-gray-400" />{job.country}</span>
                <span className="inline-flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-gray-400" />{job.type}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400" />{timeAgo(job.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{job.description}</div>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ListChecks className="w-5 h-5 text-[#2554a7]" />
                  <h2 className="text-lg font-semibold text-gray-900">Responsibilities</h2>
                </div>
                <ul className="space-y-2.5">
                  {job.responsibilities.split('\n').filter(Boolean).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-[#2554a7] mt-0.5 shrink-0" />
                      {item.replace(/^[-•]\s*/, '').trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-5 h-5 text-[#2554a7]" />
                  <h2 className="text-lg font-semibold text-gray-900">Benefits</h2>
                </div>
                <ul className="space-y-2.5">
                  {job.benefits.split('\n').filter(Boolean).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {item.replace(/^[-•]\s*/, '').trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.skillsRequired && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-[#2554a7]" />
                  <h2 className="text-lg font-semibold text-gray-900">Required Skills</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.skillsRequired.split(',').map((skill, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-[#2554a7] rounded-lg text-xs font-medium">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Job Overview */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Job Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center"><DollarSign className="w-4 h-4 text-green-600" /></div>
                  <div><p className="text-xs text-gray-400">Salary</p><p className="text-sm font-semibold text-gray-700">{formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod)}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center"><Briefcase className="w-4 h-4 text-blue-600" /></div>
                  <div><p className="text-xs text-gray-400">Job Type</p><p className="text-sm font-semibold text-gray-700">{job.type}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center"><MapPin className="w-4 h-4 text-orange-600" /></div>
                  <div><p className="text-xs text-gray-400">Location</p><p className="text-sm font-semibold text-gray-700">{job.location}, {job.country}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center"><Users className="w-4 h-4 text-purple-600" /></div>
                  <div><p className="text-xs text-gray-400">Experience</p><p className="text-sm font-semibold text-gray-700">{job.experienceRequired}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center"><GraduationCap className="w-4 h-4 text-amber-600" /></div>
                  <div><p className="text-xs text-gray-400">Education</p><p className="text-sm font-semibold text-gray-700">{job.educationRequired}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center"><CalendarDays className="w-4 h-4 text-teal-600" /></div>
                  <div><p className="text-xs text-gray-400">Deadline</p><p className="text-sm font-semibold text-gray-700">{job.deadline ? new Date(job.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Open'}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-rose-50 rounded-lg flex items-center justify-center"><Tag className="w-4 h-4 text-rose-600" /></div>
                  <div><p className="text-xs text-gray-400">Category</p><p className="text-sm font-semibold text-gray-700">{job.category}</p></div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
              <a href={`mailto:${job.employerEmail}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#2554a7] transition-colors">
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center"><Mail className="w-4 h-4 text-[#2554a7]" /></div>
                {job.employerEmail}
              </a>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleApply}
                disabled={applied}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                  applied ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-[#2554a7] text-white hover:bg-[#1d3f8a]'
                }`}
              >
                {applied ? <><CheckCircle2 className="w-4 h-4" /> Applied</> : 'Apply Now'}
              </button>
              <button
                onClick={handleSave}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 border ${
                  saved ? 'bg-blue-50 text-[#2554a7] border-[#2554a7]/30' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {saved ? <><BookmarkCheck className="w-4 h-4" /> Saved</> : <><Bookmark className="w-4 h-4" /> Save Job</>}
              </button>
            </div>

            {/* Share */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Share This Job</h3>
              <div className="flex gap-2">
                <button onClick={handleCopyLink}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-green-200 bg-green-50 text-sm text-green-700 hover:bg-green-100 transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Similar Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {similarJobs.map(sj => (
                <Link key={sj.id} to={`/jobs/${sj.id}`}
                  className="group bg-white rounded-xl border border-gray-100 p-5 hover:border-[#2554a7]/30 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#2554a7] font-bold text-xs shrink-0">
                      {sj.companyName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#2554a7] transition-colors truncate">{sj.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{sj.companyName}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{sj.location}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(sj.createdAt)}</span>
                      </div>
                      <p className="text-xs font-semibold text-gray-700 mt-2">
                        {formatSalary(sj.salaryMin, sj.salaryMax, sj.salaryCurrency, sj.salaryPeriod)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Apply for {job.title}</h2>
              <button onClick={() => setShowApplyModal(false)} className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={submitApplication} className="p-6 space-y-4">
              {applyError && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{applyError}</p>}
              <div>
                <p className="text-sm text-gray-600"><span className="font-medium">Company:</span> {job.companyName}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Position:</span> {job.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Letter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                  placeholder="Tell the employer why you are a great fit for this role..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent resize-none"
                />
              </div>
              {session?.resumeName && (
                <p className="text-sm text-gray-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Your resume "{session.resumeName}" will be attached
                </p>
              )}
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-[#2554a7] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Submit Application
                </button>
                <button type="button" onClick={() => setShowApplyModal(false)} className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

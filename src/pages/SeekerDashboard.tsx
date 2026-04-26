import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  getSession, getJobs, updateUser, getSavedJobs, toggleSaveJob,
  getApplicationsForSeeker, getJobAlerts, addJobAlert, deleteJobAlert, getMatchingAlerts,
  getChatPartners, getChatThread, sendChat, markChatsRead,
  type Job, type JobAlert,
} from '../lib/data';
import { formatSalary, timeAgo } from '../components/UI';
import { User, Bookmark, FileText, Bell, Upload, MessageSquare, MapPin, Clock, Trash2, Send, Plus, CheckCircle, XCircle, CreditCard as Edit3, Save } from 'lucide-react';

type Tab = 'profile' | 'saved-jobs' | 'applied-jobs' | 'alerts' | 'resume' | 'messages';

export default function SeekerDashboard() {
  const navigate = useNavigate();
  const session = getSession();
  const [tab, setTab] = useState<Tab>('profile');
  const [, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!session || session.role !== 'seeker') {
      navigate('/auth');
    }
  }, [session, navigate]);

  if (!session || session.role !== 'seeker') return null;

  const refresh = () => setRefreshKey(k => k + 1);

  const savedJobIds = getSavedJobs(session.id);
  const savedJobs = getJobs().filter(j => savedJobIds.includes(j.id));
  const appliedApps = getApplicationsForSeeker(session.id);
  const alerts = getJobAlerts(session.id);
  const matchingAlerts = getMatchingAlerts(session.id);
  const chatPartners = getChatPartners(session.id);

  const tabs: { key: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { key: 'saved-jobs', label: 'Saved Jobs', icon: <Bookmark className="w-4 h-4" />, badge: savedJobs.length },
    { key: 'applied-jobs', label: 'Applied Jobs', icon: <FileText className="w-4 h-4" />, badge: appliedApps.length },
    { key: 'alerts', label: 'Job Alerts', icon: <Bell className="w-4 h-4" />, badge: alerts.length },
    { key: 'resume', label: 'Resume', icon: <Upload className="w-4 h-4" /> },
    { key: 'messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#2554a7] rounded-xl flex items-center justify-center text-white font-bold">
              {session.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-sm text-gray-500">{session.name} &middot; {session.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-[#2554a7]">{appliedApps.length}</p>
              <p className="text-xs text-gray-500">Applied</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-green-600">{savedJobs.length}</p>
              <p className="text-xs text-gray-500">Saved</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-amber-600">{alerts.length}</p>
              <p className="text-xs text-gray-500">Alerts</p>
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

        {tab === 'profile' && <ProfileTab session={session} refresh={refresh} />}
        {tab === 'saved-jobs' && <SavedJobsTab session={session} jobs={savedJobs} refresh={refresh} />}
        {tab === 'applied-jobs' && <AppliedJobsTab apps={appliedApps} />}
        {tab === 'alerts' && <AlertsTab session={session} alerts={alerts} matchingAlerts={matchingAlerts} refresh={refresh} />}
        {tab === 'resume' && <ResumeTab session={session} refresh={refresh} />}
        {tab === 'messages' && <MessagesTab userId={session.id} userName={session.name} partners={chatPartners} refresh={refresh} />}
      </div>
    </div>
  );
}

/* ===== Profile Tab ===== */
function ProfileTab({ session, refresh }: { session: any; refresh: () => void }) {
  const [form, setForm] = useState({
    name: session.name || '',
    email: session.email || '',
    phone: session.phone || '',
    skills: session.skills || '',
    experience: session.experience || '',
    education: session.education || '',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ ...session, ...form });
    setSaved(true);
    refresh();
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
      <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2"><Edit3 className="w-5 h-5 text-[#2554a7]" /> Edit Profile</h2>
      {saved && <p className="text-sm text-green-600 bg-green-50 rounded-lg px-4 py-2">Profile updated successfully!</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Skills</label>
        <input type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="React, TypeScript, Python (comma separated)"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience</label>
        <textarea name="experience" value={form.experience} onChange={handleChange} rows={3} placeholder="Describe your work experience..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent resize-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Education</label>
        <textarea name="education" value={form.education} onChange={handleChange} rows={3} placeholder="Your education background..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent resize-none" />
      </div>
      <button type="submit" className="bg-[#2554a7] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors flex items-center gap-2">
        <Save className="w-4 h-4" /> Save Changes
      </button>
    </form>
  );
}

/* ===== Saved Jobs Tab ===== */
function SavedJobsTab({ session, jobs, refresh }: { session: any; jobs: any[]; refresh: () => void }) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
        <Bookmark className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">No saved jobs yet</p>
        <Link to="/jobs" className="text-[#2554a7] text-sm font-medium mt-2 inline-block">Browse jobs</Link>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {jobs.map(job => (
        <div key={job.id} className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link to={`/jobs/${job.id}`} className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm hover:text-[#2554a7] transition-colors">{job.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{job.companyName}</p>
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-gray-400">
                <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(job.createdAt)}</span>
              </div>
              <p className="text-xs font-semibold text-gray-700 mt-1">{formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod)}</p>
            </Link>
            <button onClick={() => { toggleSaveJob(session.id, job.id); refresh(); }}
              className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0" title="Remove">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ===== Applied Jobs Tab ===== */
function AppliedJobsTab({ apps }: { apps: any[] }) {
  if (apps.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
        <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">No applications yet</p>
        <Link to="/jobs" className="text-[#2554a7] text-sm font-medium mt-2 inline-block">Browse jobs</Link>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {apps.map(app => (
        <div key={app.id} className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm">{app.jobTitle}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{app.companyName}</p>
              <p className="text-xs text-gray-400 mt-1">Applied {timeAgo(app.createdAt)}</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              app.status === 'shortlisted' ? 'bg-green-50 text-green-700' :
              app.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
            }`}>
              {app.status === 'shortlisted' && <CheckCircle className="w-3 h-3 mr-1" />}
              {app.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
              {app.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ===== Alerts Tab ===== */
function AlertsTab({ session, alerts, matchingAlerts, refresh }: { session: any; alerts: JobAlert[]; matchingAlerts: { alert: JobAlert; jobs: Job[] }[]; refresh: () => void }) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    addJobAlert(session.id, keyword.trim(), location.trim());
    setKeyword('');
    setLocation('');
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteJobAlert(id);
    refresh();
  };

  return (
    <div className="space-y-6">
      {/* Add Alert Form */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2"><Plus className="w-4 h-4 text-[#2554a7]" /> Create Job Alert</h2>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Keyword (e.g. React Developer)" required
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location (optional)"
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
          <button type="submit" className="bg-[#2554a7] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors shrink-0">
            Add Alert
          </button>
        </form>
      </div>

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Bell className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No job alerts set up</p>
        </div>
      ) : (
        <div className="space-y-4">
          {matchingAlerts.map(({ alert, jobs }) => (
            <div key={alert.id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{alert.keyword}</p>
                  {alert.location && <p className="text-xs text-gray-400">{alert.location}</p>}
                </div>
                <button onClick={() => handleDelete(alert.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete alert">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {jobs.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-medium">{jobs.length} matching jobs</p>
                  {jobs.map(j => (
                    <Link key={j.id} to={`/jobs/${j.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-[#2554a7] font-bold text-xs">{j.companyName.slice(0, 2)}</div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{j.title}</p>
                        <p className="text-xs text-gray-400">{j.companyName} &middot; {j.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">No matching jobs found</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===== Resume Tab ===== */
function ResumeTab({ session, refresh }: { session: any; refresh: () => void }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be under 5MB');
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      updateUser({ ...session, resumeData: reader.result as string, resumeName: file.name });
      setUploading(false);
      refresh();
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    updateUser({ ...session, resumeData: '', resumeName: '' });
    refresh();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2 mb-6"><Upload className="w-5 h-5 text-[#2554a7]" /> Resume / CV</h2>

      {session.resumeData ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">{session.resumeName}</p>
              <p className="text-xs text-gray-500">Uploaded</p>
            </div>
            <button onClick={handleDelete} className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Remove">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400">Your resume will be automatically attached when you apply for jobs.</p>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
          <Upload className="w-8 h-8 text-gray-300 mx-auto mb-4" />
          <p className="text-sm text-gray-500 mb-4">Upload your resume to apply for jobs faster</p>
          <label className="inline-flex items-center gap-2 bg-[#2554a7] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors cursor-pointer">
            <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload Resume'}
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
          <p className="text-xs text-gray-400 mt-3">PDF, DOC, DOCX &middot; Max 5MB</p>
        </div>
      )}
    </div>
  );
}

/* ===== Messages Tab ===== */
function MessagesTab({ userId, userName, partners, refresh }: { userId: string; userName: string; partners: any[]; refresh: () => void }) {
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

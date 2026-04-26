import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getJobs, getUsers, getApplications, getContactMessages,
  deleteJob, toggleJobActive, toggleJobFeatured, updateUser,
  markContactMessageRead, deleteContactMessage,
  type Job, type User as UserType, type Application, type ContactMessage,
} from '../lib/data';
import { timeAgo } from '../components/UI';
import {
  Shield, Lock, Briefcase, Mail, Trash2, Eye, EyeOff, Star, StarOff,
  Check, Search, ArrowLeft, User, MessageSquare, FileText, Users,
  Ban, CheckCircle, Clock, XCircle,
} from 'lucide-react';

const ADMIN_PASSWORD = 'admin123';

type Tab = 'jobs' | 'users' | 'applications' | 'messages';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const loadData = () => {
    setJobs(getJobs());
    setUsers(getUsers());
    setApplications(getApplications());
    setMessages(getContactMessages());
  };

  useEffect(() => { if (authenticated) loadData(); }, [authenticated]);

  useEffect(() => {
    const handler = () => { if (authenticated) loadData(); };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#2554a7] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-500 mt-1">Enter the admin password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
              </div>
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
            <button type="submit" className="w-full bg-[#2554a7] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors">
              Sign In
            </button>
          </form>
          <button onClick={() => navigate('/')} className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Back to Homepage
          </button>
        </div>
      </div>
    );
  }

  const filteredData = (items: any[], fields: string[]) => {
    if (!searchQuery) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(item => fields.some(f => String(item[f] || '').toLowerCase().includes(q)));
  };

  const totalJobs = jobs.length;
  const totalUsers = users.length;
  const totalApps = applications.length;
  const totalMessages = messages.length;

  const tabs: { key: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { key: 'jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" />, count: totalJobs },
    { key: 'users', label: 'Users', icon: <Users className="w-4 h-4" />, count: totalUsers },
    { key: 'applications', label: 'Applications', icon: <FileText className="w-4 h-4" />, count: totalApps },
    { key: 'messages', label: 'Messages', icon: <Mail className="w-4 h-4" />, count: totalMessages },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/')} className="p-2 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#2554a7]" />
                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
              </div>
            </div>
            <button onClick={() => { setAuthenticated(false); setPassword(''); }}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"><Briefcase className="w-5 h-5 text-[#2554a7]" /></div>
              <div><p className="text-xs text-gray-400">Total Jobs</p><p className="text-xl font-bold text-gray-900">{totalJobs}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center"><Users className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-xs text-gray-400">Users</p><p className="text-xl font-bold text-gray-900">{totalUsers}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center"><FileText className="w-5 h-5 text-amber-600" /></div>
              <div><p className="text-xs text-gray-400">Applications</p><p className="text-xl font-bold text-gray-900">{totalApps}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center"><MessageSquare className="w-5 h-5 text-red-600" /></div>
              <div><p className="text-xs text-gray-400">Messages</p><p className="text-xl font-bold text-gray-900">{totalMessages}</p></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-100 p-1 mb-6">
          {tabs.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setSearchQuery(''); }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === t.key ? 'bg-[#2554a7] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
              {t.icon} {t.label} ({t.count})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              tab === 'jobs' ? 'Search jobs by title, company, or category...' :
              tab === 'users' ? 'Search users by name or email...' :
              tab === 'applications' ? 'Search applications by name or job title...' :
              'Search messages by name, email, or subject...'
            }
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
        </div>

        {/* Jobs Tab */}
        {tab === 'jobs' && (
          <div className="space-y-3">
            {filteredData(jobs, ['title', 'companyName', 'category']).length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No jobs found</p>
              </div>
            ) : (
              filteredData(jobs, ['title', 'companyName', 'category']).map((job) => (
                <div key={job.id} className={`bg-white rounded-xl border p-5 ${job.isActive ? 'border-gray-100' : 'border-red-100 bg-red-50/30'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#2554a7] font-bold text-xs shrink-0">
                      {job.companyName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900 text-sm">{job.title}</h3>
                        <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${job.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {job.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {job.isFeatured && <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">Featured</span>}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{job.companyName} &middot; {job.category} &middot; {job.type}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{job.location}, {job.country} &middot; {timeAgo(job.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => { toggleJobActive(job.id); loadData(); }}
                        className={`p-2 rounded-lg transition-colors ${job.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}
                        title={job.isActive ? 'Deactivate' : 'Activate'}>
                        {job.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => { toggleJobFeatured(job.id); loadData(); }}
                        className={`p-2 rounded-lg transition-colors ${job.isFeatured ? 'text-amber-500 hover:bg-amber-50' : 'text-gray-400 hover:bg-gray-50'}`}
                        title={job.isFeatured ? 'Unfeature' : 'Feature'}>
                        {job.isFeatured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => { if (confirm('Delete this job?')) { deleteJob(job.id); loadData(); } }}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <div className="space-y-3">
            {filteredData(users, ['name', 'email', 'role']).length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No users found</p>
              </div>
            ) : (
              filteredData(users, ['name', 'email', 'role']).map((u) => (
                <div key={u.id} className={`bg-white rounded-xl border p-5 ${u.banned ? 'border-red-100 bg-red-50/30' : 'border-gray-100'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#2554a7] font-bold text-xs shrink-0">
                      {u.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900 text-sm">{u.name}</h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#2554a7]">{u.role}</span>
                        {u.banned && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">Banned</span>}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{u.email} &middot; {u.phone || 'No phone'}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Joined {timeAgo(u.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => { updateUser({ ...u, banned: !u.banned }); loadData(); }}
                        className={`p-2 rounded-lg transition-colors ${u.banned ? 'text-green-600 hover:bg-green-50' : 'text-red-400 hover:bg-red-50 hover:text-red-600'}`}
                        title={u.banned ? 'Unban' : 'Ban'}>
                        {u.banned ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Applications Tab */}
        {tab === 'applications' && (
          <div className="space-y-3">
            {filteredData(applications, ['seekerName', 'jobTitle', 'companyName']).length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No applications found</p>
              </div>
            ) : (
              filteredData(applications, ['seekerName', 'jobTitle', 'companyName']).map((app) => (
                <div key={app.id} className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#2554a7] font-bold text-xs shrink-0">
                      {app.seekerName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm">{app.seekerName}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{app.seekerEmail} &middot; {app.seekerPhone}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Applied for <span className="font-medium text-gray-700">{app.jobTitle}</span> at <span className="font-medium text-gray-700">{app.companyName}</span></p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          app.status === 'shortlisted' ? 'bg-green-50 text-green-700' :
                          app.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {app.status === 'shortlisted' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {app.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                          {app.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-400">{timeAgo(app.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Messages Tab */}
        {tab === 'messages' && (
          <div className="space-y-3">
            {(() => {
              const allMsgs = [
                ...messages.map(m => ({ ...m, type: 'contact' as const })),
              ];
              const filtered = filteredData(allMsgs, ['name', 'email', 'subject']);
              if (filtered.length === 0) {
                return (
                  <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <Mail className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No messages found</p>
                  </div>
                );
              }
              return filtered.map((msg: any) => (
                <div key={msg.id} className={`bg-white rounded-xl border p-5 ${msg.read ? 'border-gray-100' : 'border-blue-200 bg-blue-50/20'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900 text-sm">{msg.name}</h3>
                        {!msg.read && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-[#2554a7]">New</span>}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{msg.email} &middot; {msg.phone}</p>
                      <p className="text-xs font-medium text-gray-700 mt-1">Subject: {msg.subject}</p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{msg.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{timeAgo(msg.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!msg.read && (
                        <button onClick={() => { markContactMessageRead(msg.id); loadData(); }}
                          className="p-2 rounded-lg text-[#2554a7] hover:bg-blue-50 transition-colors" title="Mark as read">
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => { if (confirm('Delete this message?')) { deleteContactMessage(msg.id); loadData(); } }}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

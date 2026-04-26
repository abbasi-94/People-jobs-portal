import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJobs, getMessages, toggleJobActive, deleteJob, markMessageRead, deleteMessage, type Job, type ContactMessage } from '../lib/data';
import { Shield, Lock, Briefcase, Mail, Trash2, Eye, EyeOff, Check, Search, ArrowLeft, User, MessageSquare } from 'lucide-react';

const ADMIN_PASSWORD = 'admin123';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'jobs' | 'messages'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const loadData = () => {
    setJobs(getJobs());
    setMessages(getMessages());
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

  const handleToggleActive = (id: string) => {
    toggleJobActive(id);
    loadData();
  };

  const handleDeleteJob = (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      deleteJob(id);
      loadData();
    }
  };

  const handleMarkRead = (id: string) => {
    markMessageRead(id);
    loadData();
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      deleteMessage(id);
      loadData();
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
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
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
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

  const filteredJobs = searchQuery
    ? jobs.filter((j) =>
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : jobs;

  const unreadCount = messages.filter((m) => !m.read).length;

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
                <Shield className="w-5 h-5 text-blue-600" />
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
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"><Briefcase className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-xs text-gray-400">Total Jobs</p><p className="text-xl font-bold text-gray-900">{jobs.length}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center"><Eye className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-xs text-gray-400">Active Jobs</p><p className="text-xl font-bold text-gray-900">{jobs.filter((j) => j.is_active).length}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center"><Mail className="w-5 h-5 text-amber-600" /></div>
              <div><p className="text-xs text-gray-400">Messages</p><p className="text-xl font-bold text-gray-900">{messages.length}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center"><MessageSquare className="w-5 h-5 text-red-600" /></div>
              <div><p className="text-xs text-gray-400">Unread</p><p className="text-xl font-bold text-gray-900">{unreadCount}</p></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-100 p-1 mb-6">
          <button onClick={() => setTab('jobs')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === 'jobs' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Briefcase className="w-4 h-4" /> Jobs ({jobs.length})
          </button>
          <button onClick={() => setTab('messages')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === 'messages' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Mail className="w-4 h-4" /> Messages ({messages.length})
            {unreadCount > 0 && <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={tab === 'jobs' ? 'Search jobs by title, company, or category...' : 'Search messages by name, email, or subject...'}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>

        {/* Jobs Tab */}
        {tab === 'jobs' && (
          <div className="space-y-3">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No jobs found</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div key={job.id} className={`bg-white rounded-xl border p-5 ${job.is_active ? 'border-gray-100' : 'border-red-100 bg-red-50/30'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                      {job.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{job.title}</h3>
                        <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${job.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {job.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{job.company} &middot; {job.category} &middot; {job.type}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{job.location}, {job.country} &middot; {new Date(job.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => handleToggleActive(job.id)}
                        className={`p-2 rounded-lg transition-colors ${job.is_active ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}
                        title={job.is_active ? 'Deactivate' : 'Activate'}>
                        {job.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => handleDeleteJob(job.id)}
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

        {/* Messages Tab */}
        {tab === 'messages' && (
          <div className="space-y-3">
            {(searchQuery
              ? messages.filter((m) =>
                  m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  m.subject.toLowerCase().includes(searchQuery.toLowerCase())
                )
              : messages
            ).length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <Mail className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No messages found</p>
              </div>
            ) : (
              (searchQuery
                ? messages.filter((m) =>
                    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    m.subject.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                : messages
              ).map((msg) => (
                <div key={msg.id} className={`bg-white rounded-xl border p-5 ${msg.read ? 'border-gray-100' : 'border-blue-200 bg-blue-50/20'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900 text-sm">{msg.name}</h3>
                        {!msg.read && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">New</span>}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{msg.email} &middot; {msg.phone}</p>
                      <p className="text-xs font-medium text-gray-700 mt-1">Subject: {msg.subject}</p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{msg.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(msg.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!msg.read && (
                        <button onClick={() => handleMarkRead(msg.id)}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors" title="Mark as read">
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => handleDeleteMessage(msg.id)}
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
      </div>
    </div>
  );
}

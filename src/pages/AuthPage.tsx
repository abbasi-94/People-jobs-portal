import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, registerUser, setSession } from '../lib/data';
import { Briefcase, Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '', email: '', password: '', phone: '', role: 'seeker' as 'seeker' | 'employer',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const user = loginUser(loginForm.email, loginForm.password);
      setSession(user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (registerForm.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      const user = registerUser({
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        phone: registerForm.phone,
        role: registerForm.role,
      });
      setSession(user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2554a7] rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">JobBoard</span>
          </Link>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-white rounded-xl border border-gray-100 p-1 mb-6">
          <button
            onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              tab === 'login' ? 'bg-[#2554a7] text-white' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              tab === 'register' ? 'bg-[#2554a7] text-white' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Login Form */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                    placeholder="your@email.com"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#2554a7] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors flex items-center justify-center gap-2"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Register Form */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Role Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRegisterForm({ ...registerForm, role: 'seeker' })}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      registerForm.role === 'seeker'
                        ? 'border-[#2554a7] bg-blue-50 text-[#2554a7]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <User className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm font-semibold">Job Seeker</span>
                    <p className="text-xs mt-1 opacity-75">Looking for jobs</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegisterForm({ ...registerForm, role: 'employer' })}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      registerForm.role === 'employer'
                        ? 'border-[#2554a7] bg-blue-50 text-[#2554a7]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Briefcase className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm font-semibold">Employer</span>
                    <p className="text-xs mt-1 opacity-75">Hiring talent</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    required
                    placeholder="Your full name"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    required
                    placeholder="your@email.com"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    required
                    placeholder="Min. 6 characters"
                    className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    placeholder="+973 1234 5678"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2554a7] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors flex items-center justify-center gap-2"
              >
                Create Account <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          {tab === 'login' ? (
            <>Don't have an account? <button onClick={() => { setTab('register'); setError(''); }} className="text-[#2554a7] font-semibold hover:text-[#1d3f8a]">Sign up</button></>
          ) : (
            <>Already have an account? <button onClick={() => { setTab('login'); setError(''); }} className="text-[#2554a7] font-semibold hover:text-[#1d3f8a]">Sign in</button></>
          )}
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Briefcase, Shield, User, LogOut, MessageSquare, Sun, Moon } from 'lucide-react';
import { getSession, clearSession, getUnreadChatCount } from '../lib/data';
import { ThemeToggle } from './UI';
import { useTheme } from '../lib/hooks';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const user = getSession();
  const unreadChats = user ? getUnreadChatCount(user.id) : 0;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/jobs', label: 'Find Jobs' },
    { to: '/post-job', label: 'Post a Job' },
    { to: '/contact', label: 'Contact' },
    { to: '/faq', label: 'FAQ' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSignOut = () => {
    clearSession();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <div className="w-8 h-8 bg-[#2554a7] rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-[#2554a7]">JobBoard</span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {links.map((link) => (
              <Link key={link.to} to={link.to}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive(link.to) ? 'text-[#2554a7] bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle theme={theme} toggle={toggle} />
            {user && (
              <Link to="/chat" className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
                <MessageSquare className="w-5 h-5" />
                {unreadChats > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadChats}</span>
                )}
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-2">
                <Link to={user.role === 'employer' ? '/employer-dashboard' : '/dashboard'}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <User className="w-4 h-4" />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </Link>
                <button onClick={handleSignOut} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-50 transition-colors" title="Sign Out">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth" className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Sign In</Link>
                <Link to="/auth" className="bg-[#2554a7] text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#1d3f8a] transition-colors">Register</Link>
              </div>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(link.to) ? 'text-[#2554a7] bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-gray-100" />
            {user ? (
              <>
                <Link to={user.role === 'employer' ? '/employer-dashboard' : '/dashboard'} onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <span className="flex items-center gap-2"><User className="w-4 h-4" /> Dashboard</span>
                </Link>
                <Link to="/chat" onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Messages {unreadChats > 0 && <span className="bg-red-500 text-white text-xs px-1.5 rounded-full">{unreadChats}</span>}</span>
                </Link>
                <button onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50">
                  <span className="flex items-center gap-2"><LogOut className="w-4 h-4" /> Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Sign In</Link>
                <Link to="/auth" onClick={() => setIsOpen(false)}
                  className="block bg-[#2554a7] text-white px-3 py-2.5 rounded-lg text-sm font-semibold text-center hover:bg-[#1d3f8a]">Register</Link>
              </>
            )}
            <Link to="/admin" onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-50">
              <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Admin</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

import { Link } from 'react-router-dom';
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react';
import { getSession } from '../lib/data';

export default function Footer() {
  const user = getSession();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#2554a7] rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">JobBoard</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting talented professionals with their dream careers. Your next opportunity starts here.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Job Seekers</h3>
            <ul className="space-y-2.5">
              <li><Link to="/jobs" className="text-sm hover:text-white transition-colors">Find Jobs</Link></li>
              <li><Link to="/jobs?category=IT" className="text-sm hover:text-white transition-colors">Browse by Category</Link></li>
              {user && user.role === 'seeker' && (
                <>
                  <li><Link to="/dashboard" className="text-sm hover:text-white transition-colors">My Dashboard</Link></li>
                  <li><Link to="/dashboard?tab=alerts" className="text-sm hover:text-white transition-colors">Job Alerts</Link></li>
                  <li><Link to="/dashboard?tab=saved" className="text-sm hover:text-white transition-colors">Saved Jobs</Link></li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Employers</h3>
            <ul className="space-y-2.5">
              <li><Link to="/post-job" className="text-sm hover:text-white transition-colors">Post a Job</Link></li>
              {user && user.role === 'employer' && (
                <>
                  <li><Link to="/employer-dashboard" className="text-sm hover:text-white transition-colors">Dashboard</Link></li>
                  <li><Link to="/employer-dashboard?tab=applications" className="text-sm hover:text-white transition-colors">Applications</Link></li>
                </>
              )}
              {!user && <li><Link to="/auth" className="text-sm hover:text-white transition-colors">Sign Up</Link></li>}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              <li><Link to="/contact" className="text-sm hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#5a8fd4] shrink-0 mt-0.5" />
                123 Career Street, Suite 100
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-[#5a8fd4] shrink-0" />
                (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-[#5a8fd4] shrink-0" />
                hello@jobboard.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} JobBoard. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">JobBoard</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting talented professionals with their dream careers. Your next opportunity starts here.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/jobs" className="text-sm hover:text-white transition-colors">Find Jobs</Link></li>
              <li><Link to="/post-job" className="text-sm hover:text-white transition-colors">Post a Job</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2.5">
              <li><Link to="/jobs?category=IT" className="text-sm hover:text-white transition-colors">IT</Link></li>
              <li><Link to="/jobs?category=Sales" className="text-sm hover:text-white transition-colors">Sales</Link></li>
              <li><Link to="/jobs?category=Marketing" className="text-sm hover:text-white transition-colors">Marketing</Link></li>
              <li><Link to="/jobs?category=Healthcare" className="text-sm hover:text-white transition-colors">Healthcare</Link></li>
              <li><Link to="/jobs?category=Engineering" className="text-sm hover:text-white transition-colors">Engineering</Link></li>
              <li><Link to="/jobs?category=Teaching" className="text-sm hover:text-white transition-colors">Teaching</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Bahrain World Trade Center, Level 28, Manama, Bahrain</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                +973 1750 0000
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                support@jobboard.bh
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} JobBoard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

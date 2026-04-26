import { useState } from 'react';
import { saveContactMessage } from '../lib/data';
import { Mail, MapPin, Phone, CheckCircle, Send, MessageCircle, Globe, Linkedin, Twitter } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveContactMessage(form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">Thank you for reaching out. Our team will review your message and respond within 24 hours.</p>
          <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
            className="bg-[#2554a7] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors">
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-[#2554a7] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Have a question about job listings, need support, or want to partner with us? Our team is ready to assist you.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#2554a7] mt-0.5 shrink-0" />
                  <div><p className="text-sm text-gray-700">123 Career Street, Suite 100</p><p className="text-sm text-gray-500">Manama, Bahrain</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#2554a7] mt-0.5 shrink-0" />
                  <div><p className="text-sm text-gray-700">+973 1750 0000</p><p className="text-xs text-gray-400">Mon-Thu, 8am-5pm</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#2554a7] mt-0.5 shrink-0" />
                  <div><p className="text-sm text-gray-700">support@jobboard.bh</p><p className="text-xs text-gray-400">We respond within 24 hours</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#2554a7] mt-0.5 shrink-0" />
                  <div><p className="text-sm text-gray-700">www.jobboard.bh</p><p className="text-xs text-gray-400">Available 24/7</p></div>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/97317500000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-2xl p-5 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-green-700 text-sm">Chat on WhatsApp</p>
                <p className="text-xs text-green-600">Quick responses during business hours</p>
              </div>
            </a>

            {/* Social Links */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#2554a7] hover:bg-[#2554a7] hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#2554a7] hover:bg-[#2554a7] hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#2554a7] hover:bg-[#2554a7] hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#2554a7] hover:bg-[#2554a7] hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Send us a message</h2>
            <p className="text-sm text-gray-500 mb-6">Fill out the form below and our team will respond promptly.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+973 1234 5678"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent appearance-none">
                    <option value="">Select a topic</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Job Listing Support">Job Listing Support</option>
                    <option value="Report a Listing">Report a Listing</option>
                    <option value="Recruitment Services">Recruitment Services</option>
                    <option value="Partnership Opportunity">Partnership Opportunity</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={6} placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2554a7] focus:border-transparent resize-none" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-gray-400">All fields marked with * are required</p>
                <button type="submit" className="inline-flex items-center gap-2 bg-[#2554a7] text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors shadow-sm">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

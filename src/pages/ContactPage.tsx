import { useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  Mail,
  MapPin,
  Phone,
  CheckCircle,
  Send,
  Clock,
  MessageSquare,
  ChevronDown,
  Globe,
  Building2,
} from 'lucide-react';

const faqs = [
  {
    q: 'How do I apply for a job listed on JobBoard?',
    a: 'Click on any job listing to view the full details. Each job includes application instructions — most employers accept applications via email or through their company website. Follow the "How to Apply" instructions provided in the job description.',
  },
  {
    q: 'Is it free to post a job on JobBoard?',
    a: 'Yes, posting a job on JobBoard is completely free. Simply navigate to the "Post a Job" page, fill in the job details, and your listing will be live immediately for job seekers to discover.',
  },
  {
    q: 'How long will my job listing stay active?',
    a: 'Job listings remain active for 30 days by default. You can repost or extend your listing at any time. Inactive listings can be reactivated from your dashboard.',
  },
  {
    q: 'Can I search for jobs in a specific country or city?',
    a: 'Absolutely. Use the country and category filters on the Find Jobs page to narrow down results. We cover opportunities across the Middle East and over 50 countries worldwide.',
  },
  {
    q: 'How can I report a suspicious job listing?',
    a: 'If you encounter a listing that seems fraudulent or misleading, please use our contact form below with the subject "Report a Listing" and include the job title and company name. We review all reports within 24 hours.',
  },
  {
    q: 'Do you offer recruitment services for companies?',
    a: 'We offer premium recruitment solutions for businesses looking to hire at scale. Contact our team using the form below with "Recruitment Services" in the subject, and we will get back to you with a tailored plan.',
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });

    setLoading(false);

    if (error) {
      alert('Failed to send message. Please try again.');
      return;
    }

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
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you for reaching out. Our team will review your message and respond within 24 hours.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: '', email: '', subject: '', message: '' });
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <MessageSquare className="w-4 h-4 text-blue-200" />
            <span className="text-sm text-blue-100 font-medium">We're here to help</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Have a question about job listings, need support, or want to partner with us?
            Our team in Manama is ready to assist you.
          </p>
        </div>
      </section>

      {/* Contact Cards + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {/* Office Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Head Office</h3>
                  <p className="text-sm text-gray-500 mt-0.5">JobBoard FZE</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">Bahrain World Trade Center</p>
                    <p className="text-sm text-gray-500">Level 28, Manama, Bahrain</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">+973 1750 0000</p>
                    <p className="text-xs text-gray-400">Mon-Thu, 8am-5pm / Sun, 8am-1pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">support@jobboard.bh</p>
                    <p className="text-xs text-gray-400">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">www.jobboard.bh</p>
                    <p className="text-xs text-gray-400">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">Business Hours</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { day: 'Sunday', hours: '8:00 AM - 1:00 PM' },
                  { day: 'Monday', hours: '8:00 AM - 5:00 PM' },
                  { day: 'Tuesday', hours: '8:00 AM - 5:00 PM' },
                  { day: 'Wednesday', hours: '8:00 AM - 5:00 PM' },
                  { day: 'Thursday', hours: '8:00 AM - 5:00 PM' },
                  { day: 'Friday', hours: 'Closed' },
                  { day: 'Saturday', hours: 'Closed' },
                ].map((row) => (
                  <div key={row.day} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{row.day}</span>
                    <span className={row.hours === 'Closed' ? 'text-red-500 font-medium' : 'text-gray-900 font-medium'}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Response Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-2">Need a Quick Answer?</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                Check our FAQ section below — most common questions are answered there. If not, send us a message and we'll get back to you fast.
              </p>
              <a
                href="#faq"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/25 transition-colors"
              >
                Browse FAQ
                <ChevronDown className="w-4 h-4" />
              </a>
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
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Ahmed Al Khalifa"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="e.g. ahmed@example.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject *</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow appearance-none"
                >
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-shadow"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-gray-400">All fields marked with * are required</p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white border-t border-gray-100 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500">Find quick answers to common questions about JobBoard</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-xl overflow-hidden transition-colors hover:border-gray-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openFaq === i ? 'max-h-40 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map / Location CTA */}
      <section className="bg-gray-50 border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Visit Our Office</h2>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Located in the iconic Bahrain World Trade Center in Manama, our office is easily accessible
                  from all major areas in Bahrain. Walk-ins are welcome during business hours.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-gray-700">Bahrain World Trade Center, Level 28, Manama</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-gray-700">+973 1750 0000</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-gray-700">support@jobboard.bh</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 min-h-[300px] flex items-center justify-center">
                <iframe
                  title="JobBoard Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.8!2d50.586!3d26.236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDE0JzA5LjYiTiA1MMKwMzUnMDkuNiJF!5e0!3m2!1sen!2sbh!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 300 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

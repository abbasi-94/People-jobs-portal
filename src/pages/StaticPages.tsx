import { Link } from 'react-router-dom';
import { Shield, FileText, HelpCircle, Home } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#2554a7] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-sm text-gray-500">Last updated: April 2026</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 space-y-6">
          {[
            {
              title: '1. Information We Collect',
              content: `We collect information you provide directly to us, including:

- Personal information such as your name, email address, phone number, and resume when you create an account or apply for jobs
- Company information if you register as an employer
- Job preferences and search criteria
- Messages and communications sent through our platform
- Contact form submissions

We also collect certain information automatically when you use our service, including your IP address, browser type, device information, and usage patterns.`
            },
            {
              title: '2. How We Use Your Information',
              content: `We use the information we collect to:

- Provide, maintain, and improve our job board services
- Match job seekers with relevant job listings
- Send you job alerts and notifications you have requested
- Facilitate communication between job seekers and employers
- Process and manage your job applications
- Respond to your inquiries and support requests
- Monitor and analyze usage trends to improve our platform
- Detect and prevent fraud or abuse`
            },
            {
              title: '3. Information Sharing',
              content: `We do not sell your personal information to third parties. We may share your information with:

- Employers when you apply for a job through our platform (your name, email, resume, and cover letter)
- Service providers who assist us in operating our platform (under strict data protection agreements)
- Law enforcement when required by law or to protect our rights and safety

Job listings posted by employers are publicly visible. Your job applications are only visible to the employer who posted the job.`
            },
            {
              title: '4. Data Security',
              content: `We implement industry-standard security measures to protect your personal information, including:

- Encrypted data transmission (SSL/TLS)
- Secure storage systems with access controls
- Regular security audits and vulnerability assessments
- Employee training on data protection practices

While we strive to protect your data, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security.`
            },
            {
              title: '5. Your Rights',
              content: `You have the right to:

- Access and view your personal information stored in your account
- Update or correct your personal information at any time
- Delete your account and request removal of your personal data
- Opt out of job alerts and marketing communications
- Export your data in a standard format

To exercise these rights, please contact us through our contact page or email support@jobboard.bh.`
            },
            {
              title: '6. Cookies',
              content: `We use cookies and similar technologies to improve your experience on our platform. These include:

- Essential cookies for authentication and security
- Preference cookies to remember your settings
- Analytics cookies to understand how you use our service

You can control cookie settings through your browser preferences. Disabling certain cookies may affect the functionality of our service.`
            },
            {
              title: '7. Changes to This Policy',
              content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website or sending you an email. Your continued use of our service after any changes constitutes your acceptance of the updated policy.`
            },
            {
              title: '8. Contact Us',
              content: `If you have questions about this Privacy Policy or our data practices, please contact us:

- Email: privacy@jobboard.bh
- Address: 123 Career Street, Suite 100, Manama, Bahrain
- Contact form: /contact`
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h2>
              <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TermsConditions() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#2554a7] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Terms & Conditions</h1>
          </div>
          <p className="text-sm text-gray-500">Last updated: April 2026</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 space-y-6">
          {[
            {
              title: '1. Acceptance of Terms',
              content: `By accessing and using JobBoard, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our service. These terms apply to all users, including job seekers, employers, and visitors.`
            },
            {
              title: '2. User Accounts',
              content: `To use certain features of our service, you must create an account. You agree to:

- Provide accurate, current, and complete information during registration
- Maintain and promptly update your account information
- Keep your password confidential and not share it with others
- Notify us immediately of any unauthorized use of your account
- Accept responsibility for all activities under your account

You must be at least 18 years old to create an account and use our services.`
            },
            {
              title: '3. Job Seeker Obligations',
              content: `As a job seeker, you agree to:

- Use the platform only for legitimate job search purposes
- Provide truthful information in your profile and applications
- Not misrepresent your qualifications, experience, or identity
- Not apply for jobs fraudulently or with the intent to deceive
- Not harass, threaten, or abuse employers or other users
- Not use automated tools to scrape or collect job listings`
            },
            {
              title: '4. Employer Obligations',
              content: `As an employer, you agree to:

- Post only genuine, accurate job listings
- Not discriminate against applicants based on race, gender, religion, or other protected characteristics
- Respond to applications in a timely manner
- Not charge job seekers any fees for applying or obtaining employment
- Comply with all applicable labor laws and regulations
- Not post misleading salary information or fake job listings`
            },
            {
              title: '5. Content and Intellectual Property',
              content: `All content on JobBoard, including the website design, logos, graphics, and software, is the property of JobBoard or its licensors and is protected by intellectual property laws.

You retain ownership of content you submit to the platform, but by posting content, you grant JobBoard a non-exclusive, worldwide, royalty-free license to use, reproduce, and distribute that content in connection with our service.

You must not post content that infringes on the intellectual property rights of others.`
            },
            {
              title: '6. Prohibited Conduct',
              content: `You must not:

- Use the service for any illegal or unauthorized purpose
- Post false, misleading, or fraudulent content
- Impersonate any person or entity
- Interfere with or disrupt the service
- Attempt to gain unauthorized access to our systems
- Use the service to send spam or unsolicited communications
- Create multiple accounts for fraudulent purposes
- Reverse-engineer or attempt to extract our source code`
            },
            {
              title: '7. Disclaimers',
              content: `JobBoard is provided "as is" and "as available" without warranties of any kind. We do not guarantee that:

- The service will be uninterrupted, error-free, or secure
- Job listings are accurate, complete, or reliable
- Employers will respond to your applications
- Job seekers are qualified for the positions they apply for
- Any employment obtained through our service will be satisfactory

You use our service at your own risk.`
            },
            {
              title: '8. Limitation of Liability',
              content: `JobBoard shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service. This includes damages for loss of profits, data, or other intangible losses.

Our total liability to you for any claims arising from these terms shall not exceed the amount you paid to use our service, or $100, whichever is greater.`
            },
            {
              title: '9. Termination',
              content: `We may suspend or terminate your account at any time for violation of these terms or for any other reason at our discretion. Upon termination:

- Your right to use the service will immediately cease
- We may delete your account and associated data
- Provisions of these terms that should survive termination will remain in effect

You may terminate your account at any time by deleting it through your dashboard settings.`
            },
            {
              title: '10. Governing Law',
              content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of the Kingdom of Bahrain. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Bahrain.`
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h2>
              <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FAQPage() {
  const faqs = [
    {
      category: 'General',
      items: [
        { q: 'What is JobBoard?', a: 'JobBoard is a comprehensive job portal connecting job seekers with employers worldwide. Browse thousands of job listings across 25+ industries and 80+ countries, apply directly, and manage your career journey.' },
        { q: 'Is JobBoard free to use?', a: 'Yes, JobBoard is completely free for job seekers. You can browse jobs, create a profile, upload your resume, and apply for positions at no cost. Employers can also post jobs for free.' },
        { q: 'How do I create an account?', a: 'Click the "Sign In" button and select "Create Account." Choose whether you are a Job Seeker or Employer, fill in your details, and you are ready to go.' },
      ]
    },
    {
      category: 'Job Seekers',
      items: [
        { q: 'How do I search for jobs?', a: 'Use the search bar on the homepage or Jobs page. Enter keywords, job titles, or company names in the "What" field and a location in the "Where" field. Use filters to narrow results by category, job type, salary range, experience level, and date posted.' },
        { q: 'How do I apply for a job?', a: 'Click on any job listing to view the full details, then click "Apply Now." If you have uploaded your resume, it will be automatically attached. You can also add a cover letter.' },
        { q: 'How do I save jobs for later?', a: 'Click the bookmark icon on any job card or the "Save Job" button on the job detail page. Saved jobs are accessible from your dashboard under "Saved Jobs."' },
        { q: 'What are job alerts?', a: 'Job alerts notify you when new jobs matching your criteria are posted. Set up alerts in your dashboard by entering keywords and locations. You will see matching jobs directly in your alerts section.' },
        { q: 'How do I upload my resume?', a: 'Go to your Dashboard, select the "Resume" tab, and click "Upload Resume." You can upload PDF, DOC, or DOCX files up to 5MB. Your resume will be automatically attached when you apply for jobs.' },
      ]
    },
    {
      category: 'Employers',
      items: [
        { q: 'How do I post a job?', a: 'Register as an Employer, then go to your Dashboard and click "Post Job." Fill in all the required details including job title, category, location, salary, description, and requirements. Your listing goes live immediately.' },
        { q: 'How do I manage applications?', a: 'Go to your Dashboard and select the "Applications" tab. You can view all received applications, shortlist candidates, or reject them. You can also send messages to applicants directly.' },
        { q: 'Can I edit or pause my job listing?', a: 'Yes, from your Dashboard under "My Jobs," you can pause (deactivate) any job listing to stop receiving applications, or reactivate it later. You can also delete listings you no longer need.' },
        { q: 'How do I set up my company profile?', a: 'Go to your Dashboard and select "Company Profile." Fill in your company name, description, website, industry, location, and size. A complete company profile helps attract more qualified candidates.' },
      ]
    },
    {
      category: 'Safety & Support',
      items: [
        { q: 'How do I report a suspicious job listing?', a: 'Use our Contact page with the subject "Report a Listing" and include the job title and company name. We review all reports within 24 hours and take appropriate action.' },
        { q: 'Is my personal information secure?', a: 'Yes, we take data security seriously. All data is stored securely, and we do not sell your personal information to third parties. Read our Privacy Policy for full details.' },
        { q: 'How do I delete my account?', a: 'Contact our support team through the Contact page, and we will process your account deletion request. This will remove all your personal data from our system.' },
      ]
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#2554a7] rounded-lg flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          </div>
          <p className="text-sm text-gray-500">Find answers to common questions about JobBoard</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {faqs.map((category) => (
          <div key={category.category}>
            <h2 className="text-lg font-bold text-gray-900 mb-4">{category.category}</h2>
            <div className="space-y-3">
              {category.items.map((faq, i) => (
                <details key={i} className="group bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-medium text-gray-900 pr-4">{faq.q}</span>
                    <span className="shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-[#2554a7] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Home className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-900 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved. Let us help you find your way back.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#2554a7] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1d3f8a] transition-colors">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link to="/jobs"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}

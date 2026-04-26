// ===== TYPES =====
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'seeker' | 'employer' | 'admin';
  avatar: string;
  createdAt: string;
  banned: boolean;
  // Seeker fields
  skills?: string;
  experience?: string;
  education?: string;
  resumeData?: string; // base64
  resumeName?: string;
  // Employer fields
  companyId?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string; // initials or color
  description: string;
  website: string;
  industry: string;
  location: string;
  country: string;
  size: string;
  ownerId: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  category: string;
  subcategory: string;
  type: string;
  location: string;
  country: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  salaryPeriod: string;
  experienceRequired: string;
  educationRequired: string;
  skillsRequired: string;
  description: string;
  responsibilities: string;
  benefits: string;
  deadline: string;
  employerEmail: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  seekerId: string;
  seekerName: string;
  seekerEmail: string;
  seekerPhone: string;
  coverLetter: string;
  resumeData: string;
  resumeName: string;
  status: 'pending' | 'shortlisted' | 'rejected';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  jobId: string;
  jobTitle: string;
  text: string;
  createdAt: string;
  read: boolean;
}

export interface JobAlert {
  id: string;
  seekerId: string;
  keyword: string;
  location: string;
  createdAt: string;
}

export interface SavedJob {
  seekerId: string;
  jobId: string;
}

export interface RecentlyViewed {
  seekerId: string;
  jobId: string;
  viewedAt: string;
}

// ===== CATEGORIES =====
export const CATEGORIES: Record<string, string[]> = {
  'Information Technology': ['Software Development', 'Web Development', 'Mobile Development', 'AI & Machine Learning', 'Cybersecurity', 'DevOps', 'Database Administration', 'Networking', 'Cloud Computing', 'QA & Testing'],
  'Engineering': ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Chemical Engineering', 'Aerospace Engineering', 'Biomedical Engineering', 'Environmental Engineering', 'Petroleum Engineering', 'Industrial Engineering'],
  'Healthcare & Medical': ['Doctor', 'Nurse', 'Pharmacist', 'Dentist', 'Lab Technician', 'Physiotherapist', 'Surgeon', 'Medical Assistant', 'Radiologist', 'Paramedic'],
  'Education & Teaching': ['Teacher', 'Professor', 'Online Tutor', 'Principal', 'Trainer', 'Curriculum Designer', 'Academic Advisor', 'Librarian', 'Special Education', 'Research Assistant'],
  'Business & Finance': ['Accounting', 'Banking', 'Investment', 'Insurance', 'Auditing', 'Financial Analyst', 'Tax Consultant', 'Bookkeeper', 'Risk Management', 'Compliance Officer'],
  'Sales & Marketing': ['Digital Marketing', 'SEO/SEM', 'Sales Executive', 'Brand Manager', 'Social Media Manager', 'Copywriter', 'Business Development', 'Telesales', 'Account Manager', 'Market Research'],
  'Media & Communications': ['Journalist', 'Content Writer', 'Copywriter', 'Photographer', 'PR Manager', 'Video Producer', 'Editor', 'Broadcaster', 'Translator', 'Social Media Influencer'],
  'Legal & Law': ['Lawyer', 'Judge', 'Legal Advisor', 'Paralegal', 'Compliance Officer', 'Contract Manager', 'Mediator', 'Court Clerk', 'Notary Public', 'Legal Assistant'],
  'Construction & Real Estate': ['Architect', 'Interior Designer', 'Property Dealer', 'Site Engineer', 'Civil Contractor', 'Surveyor', 'Project Manager', 'Quantity Surveyor', 'Facility Manager', 'Real Estate Agent'],
  'Transportation & Logistics': ['Driver', 'Pilot', 'Supply Chain Manager', 'Warehouse Manager', 'Freight Forwarder', 'Logistics Coordinator', 'Dispatcher', 'Marine Engineer', 'Customs Broker', 'Fleet Manager'],
  'Hospitality & Tourism': ['Chef', 'Hotel Manager', 'Travel Agent', 'Event Planner', 'Waiter', 'Tour Guide', 'Housekeeping Manager', 'Sommelier', 'Front Desk Agent', 'Resort Manager'],
  'Manufacturing & Production': ['Factory Worker', 'Quality Control', 'Production Supervisor', 'Technician', 'Machine Operator', 'Assembly Line Worker', 'Safety Officer', 'Maintenance Technician', 'Plant Manager', 'Process Engineer'],
  'Agriculture & Farming': ['Agronomist', 'Farm Manager', 'Veterinarian', 'Food Scientist', 'Agricultural Engineer', 'Horticulturist', 'Soil Scientist', 'Crop Consultant', 'Livestock Manager', 'Irrigation Specialist'],
  'Government & Public Sector': ['Civil Servant', 'Police', 'Army', 'Municipal Worker', 'Policy Maker', 'Diplomat', 'Tax Officer', 'Customs Officer', 'Firefighter', 'Social Security Officer'],
  'Social Work & NGO': ['Community Worker', 'Fundraiser', 'Volunteer Coordinator', 'Social Worker', 'Counselor', 'Program Manager', 'Outreach Worker', 'Case Manager', 'Policy Analyst', 'Grant Writer'],
  'Arts & Design': ['Graphic Designer', 'UI/UX Designer', 'Animator', 'Fashion Designer', 'Video Editor', 'Illustrator', 'Art Director', 'Photographer', 'Sculptor', 'Game Designer'],
  'Science & Research': ['Physicist', 'Chemist', 'Biologist', 'Data Scientist', 'Research Analyst', 'Lab Director', 'Epidemiologist', 'Geologist', 'Astronomer', 'Environmental Scientist'],
  'Customer Service': ['Call Center Agent', 'Support Specialist', 'Receptionist', 'Help Desk', 'Client Relations', 'Customer Success Manager', 'Technical Support', 'Complaints Officer', 'Service Advisor', 'Concierge'],
  'Human Resources': ['HR Manager', 'Recruiter', 'Payroll Specialist', 'Training Coordinator', 'Compensation Analyst', 'Employee Relations', 'HR Business Partner', 'Talent Acquisition', 'HR Assistant', 'Organizational Development'],
  'Retail & E-commerce': ['Shop Manager', 'Cashier', 'Inventory Controller', 'E-commerce Manager', 'Buyer', 'Store Supervisor', 'Loss Prevention', 'Retail Analyst', 'Delivery Coordinator', 'Visual Merchandiser'],
  'Telecom': ['Network Engineer', 'Telecom Technician', 'RF Engineer', 'OSP Engineer', 'Fiber Optic Technician', 'Switch Engineer', 'Transmission Engineer', 'Core Network Engineer', 'VOIP Engineer', 'Wireless Engineer'],
  'Oil & Gas': ['Petroleum Engineer', 'Drilling Engineer', 'HSE Officer', 'Geologist', 'Reservoir Engineer', 'Production Engineer', 'Pipeline Engineer', 'Refinery Operator', 'Rig Manager', 'Process Engineer'],
  'Security': ['Security Guard', 'CCTV Operator', 'Security Supervisor', 'Cybersecurity Analyst', 'Bodyguard', 'Security Consultant', 'Alarm Technician', 'Patrol Officer', 'Access Control Manager', 'Investigator'],
  'Aviation': ['Pilot', 'Air Hostess', 'Ground Staff', 'Aircraft Technician', 'Air Traffic Controller', 'Flight Dispatcher', 'Avionics Engineer', 'Cabin Crew', 'Baggage Handler', 'Aviation Manager'],
  'Sports & Fitness': ['Coach', 'Personal Trainer', 'Physiotherapist', 'Sports Manager', 'Fitness Instructor', 'Athletic Trainer', 'Sports Journalist', 'Referee', 'Yoga Instructor', 'Gym Manager'],
};

export const CATEGORY_LIST = Object.keys(CATEGORIES);
export const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Freelance', 'Internship', 'Contract', 'Hybrid'] as const;
export const EXPERIENCE_LEVELS = ['No Experience', '1-2 Years', '3-5 Years', '5-10 Years', '10+ Years', 'Entry Level', 'Mid Level', 'Senior Level', 'Executive'] as const;
export const EDUCATION_LEVELS = ['High School', 'Diploma', 'Associate Degree', "Bachelor's Degree", "Master's Degree", 'PhD', 'Professional Degree', 'Certification', 'Any'] as const;
export const SALARY_CURRENCIES = ['USD', 'BHD', 'AED', 'SAR', 'QAR', 'KWD', 'OMR', 'EGP', 'EUR', 'GBP', 'INR', 'SGD'] as const;
export const SALARY_PERIODS = ['Per Month', 'Per Year', 'Per Hour', 'Per Week'] as const;
export const COMPANY_SIZES = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'] as const;

export const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Bahrain','Bangladesh',
  'Belgium','Brazil','Canada','Chile','China','Colombia','Czech Republic','Denmark','Egypt',
  'Ethiopia','Finland','France','Germany','Ghana','Greece','Hungary','India','Indonesia',
  'Iran','Iraq','Ireland','Israel','Italy','Japan','Jordan','Kenya','Kuwait','Lebanon',
  'Libya','Malaysia','Mexico','Morocco','Nepal','Netherlands','New Zealand','Nigeria',
  'Norway','Oman','Pakistan','Palestine','Peru','Philippines','Poland','Portugal','Qatar',
  'Romania','Russia','Saudi Arabia','Singapore','South Africa','South Korea','Spain',
  'Sri Lanka','Sudan','Sweden','Switzerland','Syria','Taiwan','Tanzania','Thailand',
  'Tunisia','Turkey','Uganda','Ukraine','United Arab Emirates','United Kingdom',
  'United States','Venezuela','Vietnam','Yemen',
];

// ===== LOCALSTORAGE HELPERS =====
const KEYS = {
  users: 'jb_users',
  companies: 'jb_companies',
  jobs: 'jb_jobs',
  applications: 'jb_applications',
  messages: 'jb_contact',
  chats: 'jb_chats',
  alerts: 'jb_alerts',
  saved: 'jb_saved',
  recent: 'jb_recent',
  session: 'jb_session',
  theme: 'jb_theme',
};

function gid(): string { return Date.now().toString(36) + Math.random().toString(36).substring(2, 8); }

function load<T>(key: string): T[] {
  try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : []; } catch { return []; }
}
function save<T>(key: string, data: T[]): void { localStorage.setItem(key, JSON.stringify(data)); }

// ===== AUTH =====
export function getUsers(): User[] { return load<User>(KEYS.users); }
export function registerUser(data: Omit<User, 'id' | 'createdAt' | 'banned' | 'avatar'>): User {
  const users = getUsers();
  if (users.find(u => u.email === data.email)) throw new Error('Email already registered');
  const user: User = { ...data, id: gid(), createdAt: new Date().toISOString(), banned: false, avatar: data.name.slice(0, 2).toUpperCase() };
  users.push(user);
  save(KEYS.users, users);
  return user;
}
export function loginUser(email: string, password: string): User {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  if (user.banned) throw new Error('Account has been suspended');
  return user;
}
export function setSession(user: User): void { localStorage.setItem(KEYS.session, JSON.stringify(user)); }
export function getSession(): User | null {
  try { const d = localStorage.getItem(KEYS.session); return d ? JSON.parse(d) : null; } catch { return null; }
}
export function clearSession(): void { localStorage.removeItem(KEYS.session); }
export function updateUser(user: User): void {
  const users = getUsers().map(u => u.id === user.id ? user : u);
  save(KEYS.users, users);
  const sess = getSession();
  if (sess && sess.id === user.id) setSession(user);
}
export function getUserById(id: string): User | undefined { return getUsers().find(u => u.id === id); }

// ===== COMPANIES =====
export function getCompanies(): Company[] { return load<Company>(KEYS.companies); }
export function getCompanyById(id: string): Company | undefined { return getCompanies().find(c => c.id === id); }
export function saveCompany(data: Omit<Company, 'id' | 'createdAt'>): Company {
  const companies = getCompanies();
  const company: Company = { ...data, id: gid(), createdAt: new Date().toISOString() };
  companies.push(company);
  save(KEYS.companies, companies);
  return company;
}
export function updateCompany(company: Company): void {
  const companies = getCompanies().map(c => c.id === company.id ? company : c);
  save(KEYS.companies, companies);
}

// ===== JOBS =====
export function getJobs(): Job[] {
  const stored = load<Job>(KEYS.jobs);
  if (stored.length > 0) return stored;
  const defaults = seedJobs();
  save(KEYS.jobs, defaults);
  return defaults;
}
export function getJobById(id: string): Job | undefined { return getJobs().find(j => j.id === id); }
export function saveJob(data: Omit<Job, 'id' | 'isActive' | 'isFeatured' | 'createdAt'>): Job {
  const jobs = getJobs();
  const job: Job = { ...data, id: gid(), isActive: true, isFeatured: false, createdAt: new Date().toISOString() };
  jobs.unshift(job);
  save(KEYS.jobs, jobs);
  return job;
}
export function updateJob(job: Job): void {
  const jobs = getJobs().map(j => j.id === job.id ? job : j);
  save(KEYS.jobs, jobs);
}
export function deleteJob(id: string): void { save(KEYS.jobs, getJobs().filter(j => j.id !== id)); }
export function toggleJobActive(id: string): void {
  const jobs = getJobs();
  const job = jobs.find(j => j.id === id);
  if (job) { job.isActive = !job.isActive; save(KEYS.jobs, jobs); }
}
export function toggleJobFeatured(id: string): void {
  const jobs = getJobs();
  const job = jobs.find(j => j.id === id);
  if (job) { job.isFeatured = !job.isFeatured; save(KEYS.jobs, jobs); }
}
export function filterJobs(params: {
  q?: string; location?: string; category?: string; type?: string;
  salaryMin?: number; salaryMax?: number; experience?: string; datePosted?: string;
  sort?: string;
}): Job[] {
  let results = getJobs().filter(j => j.isActive);
  if (params.category) results = results.filter(j => j.category === params.category);
  if (params.type) results = results.filter(j => j.type === params.type);
  if (params.experience) results = results.filter(j => j.experienceRequired === params.experience);
  if (params.salaryMin) results = results.filter(j => j.salaryMax >= params.salaryMin!);
  if (params.salaryMax) results = results.filter(j => j.salaryMin <= params.salaryMax!);
  if (params.datePosted) {
    const now = Date.now();
    const dayMs = 86400000;
    if (params.datePosted === 'today') results = results.filter(j => now - new Date(j.createdAt).getTime() < dayMs);
    else if (params.datePosted === '3days') results = results.filter(j => now - new Date(j.createdAt).getTime() < 3 * dayMs);
    else if (params.datePosted === 'week') results = results.filter(j => now - new Date(j.createdAt).getTime() < 7 * dayMs);
    else if (params.datePosted === 'month') results = results.filter(j => now - new Date(j.createdAt).getTime() < 30 * dayMs);
  }
  if (params.q || params.location) {
    const q = (params.q || '').toLowerCase();
    const loc = (params.location || '').toLowerCase();
    results = results.filter(j => {
      const text = `${j.title} ${j.companyName} ${j.category} ${j.subcategory} ${j.skillsRequired} ${j.description}`.toLowerCase();
      const locText = `${j.location} ${j.country}`.toLowerCase();
      const qMatch = !q || text.includes(q);
      const locMatch = !loc || locText.includes(loc);
      return qMatch && locMatch;
    });
  }
  if (params.sort === 'date') results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  else if (params.sort === 'salary') results.sort((a, b) => b.salaryMax - a.salaryMax);
  return results;
}
export function getSimilarJobs(job: Job, limit = 4): Job[] {
  return getJobs().filter(j => j.isActive && j.id !== job.id && (j.category === job.category || j.subcategory === job.subcategory)).slice(0, limit);
}

// ===== APPLICATIONS =====
export function getApplications(): Application[] { return load<Application>(KEYS.applications); }
export function applyForJob(data: Omit<Application, 'id' | 'status' | 'createdAt'>): Application {
  const apps = getApplications();
  if (apps.find(a => a.jobId === data.jobId && a.seekerId === data.seekerId)) throw new Error('Already applied');
  const app: Application = { ...data, id: gid(), status: 'pending', createdAt: new Date().toISOString() };
  apps.unshift(app);
  save(KEYS.applications, apps);
  return app;
}
export function updateApplicationStatus(id: string, status: Application['status']): void {
  const apps = getApplications().map(a => a.id === id ? { ...a, status } : a);
  save(KEYS.applications, apps);
}
export function getApplicationsForJob(jobId: string): Application[] { return getApplications().filter(a => a.jobId === jobId); }
export function getApplicationsForSeeker(seekerId: string): Application[] { return getApplications().filter(a => a.seekerId === seekerId); }
export function hasApplied(jobId: string, seekerId: string): boolean { return getApplications().some(a => a.jobId === jobId && a.seekerId === seekerId); }

// ===== SAVED JOBS =====
export function getSavedJobs(seekerId: string): string[] { return load<SavedJob>(KEYS.saved).filter(s => s.seekerId === seekerId).map(s => s.jobId); }
export function toggleSaveJob(seekerId: string, jobId: string): void {
  let saved = load<SavedJob>(KEYS.saved);
  const exists = saved.find(s => s.seekerId === seekerId && s.jobId === jobId);
  if (exists) saved = saved.filter(s => !(s.seekerId === seekerId && s.jobId === jobId));
  else saved.push({ seekerId, jobId });
  save(KEYS.saved, saved);
}
export function isJobSaved(seekerId: string, jobId: string): boolean { return load<SavedJob>(KEYS.saved).some(s => s.seekerId === seekerId && s.jobId === jobId); }

// ===== RECENTLY VIEWED =====
export function getRecentlyViewed(seekerId: string): string[] {
  return load<RecentlyViewed>(KEYS.recent).filter(r => r.seekerId === seekerId).sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()).map(r => r.jobId).slice(0, 10);
}
export function addRecentlyViewed(seekerId: string, jobId: string): void {
  let recent = load<RecentlyViewed>(KEYS.recent).filter(r => !(r.seekerId === seekerId && r.jobId === jobId));
  recent.push({ seekerId, jobId, viewedAt: new Date().toISOString() });
  recent = recent.sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()).slice(0, 50);
  save(KEYS.recent, recent);
}

// ===== JOB ALERTS =====
export function getJobAlerts(seekerId: string): JobAlert[] { return load<JobAlert>(KEYS.alerts).filter(a => a.seekerId === seekerId); }
export function addJobAlert(seekerId: string, keyword: string, location: string): JobAlert {
  const alerts = load<JobAlert>(KEYS.alerts);
  const alert: JobAlert = { id: gid(), seekerId, keyword, location, createdAt: new Date().toISOString() };
  alerts.push(alert);
  save(KEYS.alerts, alerts);
  return alert;
}
export function deleteJobAlert(id: string): void { save(KEYS.alerts, load<JobAlert>(KEYS.alerts).filter(a => a.id !== id)); }
export function getMatchingAlerts(seekerId: string): { alert: JobAlert; jobs: Job[] }[] {
  const alerts = getJobAlerts(seekerId);
  return alerts.map(alert => ({
    alert,
    jobs: filterJobs({ q: alert.keyword, location: alert.location }).slice(0, 5),
  }));
}

// ===== CONTACT MESSAGES =====
export function getContactMessages(): ContactMessage[] { return load<ContactMessage>(KEYS.messages); }
export function saveContactMessage(data: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
  const msgs = getContactMessages();
  const msg: ContactMessage = { ...data, id: gid(), createdAt: new Date().toISOString(), read: false };
  msgs.unshift(msg);
  save(KEYS.messages, msgs);
  return msg;
}
export function markContactMessageRead(id: string): void {
  const msgs = getContactMessages().map(m => m.id === id ? { ...m, read: true } : m);
  save(KEYS.messages, msgs);
}
export function deleteContactMessage(id: string): void { save(KEYS.messages, getContactMessages().filter(m => m.id !== id)); }

// ===== CHAT MESSAGES =====
export function getChats(userId: string): ChatMessage[] {
  return load<ChatMessage>(KEYS.chats).filter(c => c.fromId === userId || c.toId === userId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}
export function getChatThread(userId1: string, userId2: string, jobId: string): ChatMessage[] {
  return load<ChatMessage>(KEYS.chats).filter(c => c.jobId === jobId && ((c.fromId === userId1 && c.toId === userId2) || (c.fromId === userId2 && c.toId === userId1))).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}
export function sendChat(data: Omit<ChatMessage, 'id' | 'createdAt' | 'read'>): ChatMessage {
  const chats = load<ChatMessage>(KEYS.chats);
  const msg: ChatMessage = { ...data, id: gid(), createdAt: new Date().toISOString(), read: false };
  chats.push(msg);
  save(KEYS.chats, chats);
  return msg;
}
export function markChatsRead(userId: string, fromId: string): void {
  const chats = load<ChatMessage>(KEYS.chats).map(c => c.toId === userId && c.fromId === fromId && !c.read ? { ...c, read: true } : c);
  save(KEYS.chats, chats);
}
export function getUnreadChatCount(userId: string): number { return load<ChatMessage>(KEYS.chats).filter(c => c.toId === userId && !c.read).length; }
export function getChatPartners(userId: string): { partnerId: string; partnerName: string; jobId: string; jobTitle: string; lastMessage: string; unread: number }[] {
  const chats = load<ChatMessage>(KEYS.chats).filter(c => c.fromId === userId || c.toId === userId);
  const threads = new Map<string, { partnerId: string; partnerName: string; jobId: string; jobTitle: string; lastMessage: string; unread: number }>();
  chats.forEach(c => {
    const partnerId = c.fromId === userId ? c.toId : c.fromId;
    const partnerName = c.fromId === userId ? c.toName : c.fromName;
    const key = `${partnerId}-${c.jobId}`;
    const existing = threads.get(key);
    const unread = c.toId === userId && !c.read ? (existing?.unread || 0) + 1 : existing?.unread || 0;
    threads.set(key, { partnerId, partnerName, jobId: c.jobId, jobTitle: c.jobTitle, lastMessage: c.text, unread });
  });
  return Array.from(threads.values());
}

// ===== THEME =====
export function getTheme(): 'light' | 'dark' { return (localStorage.getItem(KEYS.theme) as 'light' | 'dark') || 'light'; }
export function setTheme(theme: 'light' | 'dark'): void { localStorage.setItem(KEYS.theme, theme); }

// ===== SEED DATA =====
function seedJobs(): Job[] {
  return [
    { id: 'j1', title: 'Senior Frontend Developer', companyId: 'c1', companyName: 'TechVision Bahrain', category: 'Information Technology', subcategory: 'Web Development', type: 'Full-time', location: 'Manama', country: 'Bahrain', salaryMin: 4000, salaryMax: 7000, salaryCurrency: 'BHD', salaryPeriod: 'Per Month', experienceRequired: '5-10 Years', educationRequired: "Bachelor's Degree", skillsRequired: 'React, TypeScript, CSS, REST APIs', description: 'We are looking for a Senior Frontend Developer to join our growing team in Manama. You will be responsible for building and maintaining high-quality web applications using modern JavaScript frameworks.\n\nYou will work closely with our design and backend teams to deliver exceptional user experiences. Our tech stack includes React, TypeScript, and Tailwind CSS.', responsibilities: 'Build and maintain web applications\nCollaborate with design and backend teams\nWrite clean, testable code\nParticipate in code reviews', benefits: 'Competitive salary\nHealth insurance\nAnnual flight tickets\nHousing allowance\nProfessional development budget', deadline: '2026-06-30', employerEmail: 'careers@techvision.bh', isActive: true, isFeatured: true, createdAt: '2026-04-20T10:00:00Z' },
    { id: 'j2', title: 'Marketing Manager', companyId: 'c2', companyName: 'Gulf Brands Group', category: 'Sales & Marketing', subcategory: 'Brand Manager', type: 'Full-time', location: 'Dubai', country: 'United Arab Emirates', salaryMin: 6000, salaryMax: 9000, salaryCurrency: 'AED', salaryPeriod: 'Per Month', experienceRequired: '5-10 Years', educationRequired: "Master's Degree", skillsRequired: 'Digital Marketing, Brand Strategy, Team Management', description: 'Gulf Brands Group is seeking an experienced Marketing Manager to lead our brand strategy across the MENA region. You will oversee digital campaigns, manage a team of 5 marketers, and drive growth for our portfolio of consumer brands.', responsibilities: 'Lead brand strategy across MENA\nManage digital campaigns\nOversee marketing team of 5\nDrive growth for consumer brands', benefits: 'Tax-free salary\nHousing allowance\nAnnual bonus\nHealth insurance\nCar allowance', deadline: '2026-05-31', employerEmail: 'hr@gulfbrands.ae', isActive: true, isFeatured: true, createdAt: '2026-04-19T14:30:00Z' },
    { id: 'j3', title: 'Registered Nurse - ICU', companyId: 'c3', companyName: 'Royal Bahrain Hospital', category: 'Healthcare & Medical', subcategory: 'Nurse', type: 'Full-time', location: 'Manama', country: 'Bahrain', salaryMin: 3000, salaryMax: 5000, salaryCurrency: 'BHD', salaryPeriod: 'Per Month', experienceRequired: '3-5 Years', educationRequired: "Bachelor's Degree", skillsRequired: 'ICU, BLS/ACLS, Patient Care, Medication Administration', description: 'Royal Bahrain Hospital is hiring a Registered Nurse for our Intensive Care Unit. You will provide critical care to patients, monitor vital signs, administer medications, and collaborate with our multidisciplinary team.', responsibilities: 'Provide critical care to ICU patients\nMonitor vital signs and administer medications\nCollaborate with multidisciplinary team\nMaintain accurate patient records', benefits: 'Housing allowance\nMedical insurance\nAnnual flight tickets\nContinuing education support', deadline: '2026-07-15', employerEmail: 'nursing@rbh.bh', isActive: true, isFeatured: true, createdAt: '2026-04-18T09:15:00Z' },
    { id: 'j4', title: 'Civil Engineer', companyId: 'c4', companyName: 'Alghanim Industries', category: 'Engineering', subcategory: 'Civil Engineering', type: 'Full-time', location: 'Kuwait City', country: 'Kuwait', salaryMin: 4500, salaryMax: 7500, salaryCurrency: 'KWD', salaryPeriod: 'Per Month', experienceRequired: '5-10 Years', educationRequired: "Bachelor's Degree", skillsRequired: 'AutoCAD, Project Management, Construction, Safety Standards', description: 'Alghanim Industries is looking for a Civil Engineer to support our construction operations. You will design structures, oversee construction projects, and ensure compliance with safety standards.', responsibilities: 'Design structures and oversee construction\nEnsure compliance with safety standards\nManage project timelines and budgets\nCoordinate with contractors and stakeholders', benefits: 'Competitive salary\nHousing provided\nVehicle allowance\nAnnual bonus', deadline: '2026-06-15', employerEmail: 'engineering@alghanim.com', isActive: true, isFeatured: false, createdAt: '2026-04-17T11:00:00Z' },
    { id: 'j5', title: 'Mathematics Teacher', companyId: 'c5', companyName: 'British School of Bahrain', category: 'Education & Teaching', subcategory: 'Teacher', type: 'Full-time', location: 'Hamala', country: 'Bahrain', salaryMin: 2500, salaryMax: 4000, salaryCurrency: 'BHD', salaryPeriod: 'Per Month', experienceRequired: '3-5 Years', educationRequired: "Bachelor's Degree", skillsRequired: 'British Curriculum, IGCSE, A-Level, Classroom Management', description: 'The British School of Bahrain is seeking a qualified Mathematics Teacher to join our secondary school department. You will teach the British National Curriculum to students aged 11-18.', responsibilities: 'Teach Mathematics to students aged 11-18\nPrepare lesson plans and assessments\nMonitor student progress\nParticipate in school activities', benefits: 'Housing allowance\nMedical insurance\nAnnual flights\nTuition discount for children', deadline: '2026-05-20', employerEmail: 'recruitment@bsb.bh', isActive: true, isFeatured: false, createdAt: '2026-04-16T08:45:00Z' },
    { id: 'j6', title: 'DevOps Engineer', companyId: 'c6', companyName: 'CloudNine Technologies', category: 'Information Technology', subcategory: 'DevOps', type: 'Remote', location: 'Remote', country: 'United Arab Emirates', salaryMin: 5000, salaryMax: 9000, salaryCurrency: 'AED', salaryPeriod: 'Per Month', experienceRequired: '3-5 Years', educationRequired: "Bachelor's Degree", skillsRequired: 'AWS, Docker, Kubernetes, CI/CD, Terraform', description: 'CloudNine Technologies is hiring a DevOps Engineer to build and maintain our cloud infrastructure. You will work with AWS, Docker, Kubernetes, and CI/CD pipelines to ensure our platforms run reliably at scale.', responsibilities: 'Build and maintain cloud infrastructure\nManage CI/CD pipelines\nEnsure platform reliability at scale\nAutomate deployment processes', benefits: 'Fully remote\nFlexible hours\nLearning budget\nHealth insurance', deadline: '2026-07-01', employerEmail: 'jobs@cloudnine.tech', isActive: true, isFeatured: true, createdAt: '2026-04-14T16:00:00Z' },
    { id: 'j7', title: 'UI/UX Designer', companyId: 'c7', companyName: 'PixelCraft Studio', category: 'Arts & Design', subcategory: 'UI/UX Designer', type: 'Hybrid', location: 'Manama', country: 'Bahrain', salaryMin: 3500, salaryMax: 5500, salaryCurrency: 'BHD', salaryPeriod: 'Per Month', experienceRequired: '3-5 Years', educationRequired: "Bachelor's Degree", skillsRequired: 'Figma, User Research, Prototyping, Wireframing, Design Systems', description: 'PixelCraft Studio is looking for a talented UI/UX Designer to create beautiful, intuitive digital experiences. You will work on web and mobile projects for clients across the Middle East.', responsibilities: 'Create UI/UX designs for web and mobile\nConduct user research and testing\nBuild prototypes and wireframes\nMaintain design systems', benefits: 'Creative environment\nFlexible schedule\nProfessional development\nHealth insurance', deadline: '2026-06-01', employerEmail: 'hello@pixelcraft.bh', isActive: true, isFeatured: false, createdAt: '2026-04-13T10:30:00Z' },
    { id: 'j8', title: 'Financial Analyst', companyId: 'c8', companyName: 'InvestQ Capital', category: 'Business & Finance', subcategory: 'Investment', type: 'Full-time', location: 'Doha', country: 'Qatar', salaryMin: 6000, salaryMax: 10000, salaryCurrency: 'QAR', salaryPeriod: 'Per Month', experienceRequired: '5-10 Years', educationRequired: "Master's Degree", skillsRequired: 'CFA, Financial Modeling, Bloomberg, Excel, Market Research', description: 'InvestQ Capital is seeking a Financial Analyst to support our investment team. You will conduct market research, build financial models, and prepare investment memos.', responsibilities: 'Conduct market research\nBuild financial models\nPrepare investment memos\nAssist with portfolio management', benefits: 'Tax-free salary\nHousing allowance\nPerformance bonus\nHealth insurance', deadline: '2026-05-31', employerEmail: 'talent@investq.qa', isActive: true, isFeatured: true, createdAt: '2026-04-12T09:00:00Z' },
    { id: 'j9', title: 'Corporate Lawyer', companyId: 'c9', companyName: 'Hassan & Partners', category: 'Legal & Law', subcategory: 'Lawyer', type: 'Full-time', location: 'Riyadh', country: 'Saudi Arabia', salaryMin: 8000, salaryMax: 15000, salaryCurrency: 'SAR', salaryPeriod: 'Per Month', experienceRequired: '5-10 Years', educationRequired: 'Professional Degree', skillsRequired: 'Corporate Law, M&A, GCC Regulations, Arabic, English', description: 'Hassan & Partners is seeking an experienced Corporate Lawyer to handle M&A transactions, corporate governance, and regulatory compliance for our clients in the GCC region.', responsibilities: 'Handle M&A transactions\nAdvise on corporate governance\nEnsure regulatory compliance\nDraft and review contracts', benefits: 'Premium compensation\nHousing provided\nCar allowance\nAnnual bonus', deadline: '2026-06-30', employerEmail: 'legal@hassanpartners.sa', isActive: true, isFeatured: false, createdAt: '2026-04-11T15:45:00Z' },
    { id: 'j10', title: 'Data Scientist', companyId: 'c10', companyName: 'AnalyticsAI', category: 'Science & Research', subcategory: 'Data Scientist', type: 'Full-time', location: 'Singapore', country: 'Singapore', salaryMin: 8000, salaryMax: 13000, salaryCurrency: 'USD', salaryPeriod: 'Per Month', experienceRequired: '3-5 Years', educationRequired: "Master's Degree", skillsRequired: 'Python, TensorFlow, PyTorch, SQL, Statistics', description: 'AnalyticsAI is hiring a Data Scientist to develop machine learning models and extract insights from large datasets. You will work with cross-functional teams to solve complex business problems.', responsibilities: 'Develop ML models\nExtract insights from datasets\nCollaborate with cross-functional teams\nPublish research findings', benefits: 'Competitive salary\nStock options\nLearning budget\nHealth insurance', deadline: '2026-07-15', employerEmail: 'hiring@analyticsai.sg', isActive: true, isFeatured: false, createdAt: '2026-04-10T07:30:00Z' },
    { id: 'j11', title: 'Executive Chef', companyId: 'c11', companyName: 'The Ritz-Carlton Bahrain', category: 'Hospitality & Tourism', subcategory: 'Chef', type: 'Full-time', location: 'Manama', country: 'Bahrain', salaryMin: 5000, salaryMax: 8000, salaryCurrency: 'BHD', salaryPeriod: 'Per Month', experienceRequired: '10+ Years', educationRequired: 'Certification', skillsRequired: 'Fine Dining, Kitchen Management, Menu Development, HACCP', description: 'The Ritz-Carlton Bahrain is seeking an Executive Chef to lead our culinary team. You will oversee all kitchen operations, menu development, and maintain our Michelin-standard cuisine.', responsibilities: 'Lead culinary team\nOversee kitchen operations\nDevelop menus\nMaintain food quality standards', benefits: 'World-class facilities\nHousing provided\nMeals on duty\nHealth insurance', deadline: '2026-06-01', employerEmail: 'fandb@ritzcarlton.bh', isActive: true, isFeatured: false, createdAt: '2026-04-09T12:00:00Z' },
    { id: 'j12', title: 'HR Manager', companyId: 'c12', companyName: 'Gulf Talent Solutions', category: 'Human Resources', subcategory: 'HR Manager', type: 'Full-time', location: 'Dubai', country: 'United Arab Emirates', salaryMin: 5000, salaryMax: 8000, salaryCurrency: 'AED', salaryPeriod: 'Per Month', experienceRequired: '5-10 Years', educationRequired: "Master's Degree", skillsRequired: 'CIPD, Recruitment, UAE Labor Law, Arabic, English', description: 'Gulf Talent Solutions is looking for an HR Manager to oversee recruitment, employee relations, and organizational development for our growing consultancy.', responsibilities: 'Oversee recruitment\nManage employee relations\nDrive organizational development\nEnsure compliance with labor laws', benefits: 'Tax-free salary\nHousing allowance\nAnnual bonus\nHealth insurance', deadline: '2026-05-31', employerEmail: 'careers@gulftalent.ae', isActive: true, isFeatured: false, createdAt: '2026-04-08T10:00:00Z' },
    { id: 'j13', title: 'Petroleum Engineer', companyId: 'c13', companyName: 'Saudi Aramco', category: 'Oil & Gas', subcategory: 'Petroleum Engineer', type: 'Full-time', location: 'Dhahran', country: 'Saudi Arabia', salaryMin: 12000, salaryMax: 20000, salaryCurrency: 'SAR', salaryPeriod: 'Per Month', experienceRequired: '5-10 Years', educationRequired: "Master's Degree", skillsRequired: 'Reservoir Simulation, Drilling, Production Optimization, HSE', description: 'Saudi Aramco is seeking a Petroleum Engineer to join our upstream operations team. You will work on reservoir management, production optimization, and field development planning.', responsibilities: 'Manage reservoir performance\nOptimize production operations\nPlan field development\nEnsure HSE compliance', benefits: 'Premium compensation\nHousing provided\nEducation assistance\nComprehensive benefits', deadline: '2026-08-01', employerEmail: 'careers@aramco.sa', isActive: true, isFeatured: true, createdAt: '2026-04-07T08:00:00Z' },
    { id: 'j14', title: 'Network Engineer', companyId: 'c14', companyName: 'Zain Bahrain', category: 'Telecom', subcategory: 'Network Engineer', type: 'Full-time', location: 'Manama', country: 'Bahrain', salaryMin: 3500, salaryMax: 6000, salaryCurrency: 'BHD', salaryPeriod: 'Per Month', experienceRequired: '3-5 Years', educationRequired: "Bachelor's Degree", skillsRequired: '4G/5G, Fiber Optics, Cisco, Network Security', description: 'Zain Bahrain is hiring a Network Engineer to design, implement, and maintain our telecommunications infrastructure. You will work on 4G/5G networks and fiber optic deployments.', responsibilities: 'Design and implement network infrastructure\nMaintain 4G/5G networks\nDeploy fiber optic solutions\nEnsure network security', benefits: 'Competitive salary\nPhone allowance\nHealth insurance\nTraining programs', deadline: '2026-06-15', employerEmail: 'careers@zain.bh', isActive: true, isFeatured: false, createdAt: '2026-04-06T14:00:00Z' },
    { id: 'j15', title: 'Commercial Pilot', companyId: 'c15', companyName: 'Gulf Air', category: 'Aviation', subcategory: 'Pilot', type: 'Full-time', location: 'Manama', country: 'Bahrain', salaryMin: 8000, salaryMax: 15000, salaryCurrency: 'BHD', salaryPeriod: 'Per Month', experienceRequired: '10+ Years', educationRequired: 'Certification', skillsRequired: 'ATPL, Type Rating, IFR, Multi-Crew Operations', description: 'Gulf Air is seeking experienced Commercial Pilots to join our flight operations team. You will operate our fleet of modern aircraft on regional and international routes.', responsibilities: 'Operate aircraft safely\nFollow standard operating procedures\nEnsure passenger safety\nCoordinate with cabin crew', benefits: 'Premium compensation\nHousing provided\nTravel benefits\nHealth insurance', deadline: '2026-09-01', employerEmail: 'pilots@gulfair.com', isActive: true, isFeatured: false, createdAt: '2026-04-05T09:00:00Z' },
  ];
}

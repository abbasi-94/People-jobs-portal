export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  category: string;
  subcategory: string;
  type: string;
  salary_min: number;
  salary_max: number;
  description: string;
  requirements: string;
  how_to_apply: string;
  employer_email: string;
  is_active: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  read: boolean;
}

export const CATEGORIES: Record<string, string[]> = {
  'Information Technology': ['Software', 'Web Development', 'Mobile Development', 'AI & Machine Learning', 'Cybersecurity', 'Database Administration', 'Networking', 'DevOps', 'Cloud Computing', 'QA & Testing'],
  'Engineering': ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Chemical Engineering', 'Aerospace Engineering', 'Biomedical Engineering', 'Petroleum Engineering', 'Industrial Engineering', 'Environmental Engineering'],
  'Healthcare & Medical': ['Doctor', 'Nurse', 'Pharmacist', 'Dentist', 'Lab Technician', 'Surgeon', 'Physiotherapist', 'Radiologist', 'Medical Assistant', 'Paramedic'],
  'Education & Teaching': ['Teacher', 'Professor', 'Tutor', 'Principal', 'Trainer', 'Curriculum Developer', 'Academic Advisor', 'Librarian', 'Special Education', 'Research Assistant'],
  'Business & Finance': ['Accounting', 'Banking', 'Investment', 'Insurance', 'Auditing', 'Financial Analyst', 'Tax Consultant', 'Bookkeeper', 'Risk Management', 'Compliance Officer'],
  'Sales & Marketing': ['Digital Marketing', 'SEO Specialist', 'Sales Executive', 'Brand Manager', 'Market Research', 'Social Media Manager', 'Copywriter', 'Business Development', 'Telesales', 'Account Manager'],
  'Media & Communications': ['Journalist', 'Content Writer', 'Photographer', 'Public Relations', 'Video Producer', 'Editor', 'Broadcaster', 'Social Media Influencer', 'Translator', 'Interpreter'],
  'Legal & Law': ['Lawyer', 'Judge', 'Legal Advisor', 'Paralegal', 'Legal Assistant', 'Compliance Officer', 'Contract Manager', 'Mediator', 'Court Clerk', 'Notary Public'],
  'Construction & Real Estate': ['Architect', 'Interior Designer', 'Property Dealer', 'Civil Contractor', 'Surveyor', 'Project Manager', 'Real Estate Agent', 'Quantity Surveyor', 'Site Engineer', 'Facility Manager'],
  'Transportation & Logistics': ['Driver', 'Pilot', 'Supply Chain Manager', 'Warehouse Manager', 'Freight Forwarder', 'Logistics Coordinator', 'Dispatcher', 'Marine Engineer', 'Customs Broker', 'Fleet Manager'],
  'Hospitality & Tourism': ['Chef', 'Hotel Manager', 'Travel Agent', 'Waiter', 'Tour Guide', 'Event Planner', 'Housekeeping Manager', 'Sommelier', 'Front Desk Agent', 'Resort Manager'],
  'Manufacturing & Production': ['Factory Worker', 'Quality Control', 'Supervisor', 'Production Manager', 'Process Engineer', 'Machine Operator', 'Assembly Line Worker', 'Safety Officer', 'Maintenance Technician', 'Plant Manager'],
  'Agriculture & Farming': ['Agronomist', 'Farm Manager', 'Veterinarian', 'Agricultural Engineer', 'Horticulturist', 'Soil Scientist', 'Crop Consultant', 'Livestock Manager', 'Irrigation Specialist', 'Food Scientist'],
  'Government & Public Sector': ['Army', 'Police', 'Civil Servant', 'Politician', 'Diplomat', 'Tax Officer', 'Customs Officer', 'Firefighter', 'Social Security Officer', 'Municipal Worker'],
  'Social Work & NGO': ['Community Worker', 'Fundraiser', 'Volunteer Coordinator', 'Counselor', 'Program Manager', 'Outreach Worker', 'Case Manager', 'Policy Analyst', 'Grant Writer', 'Advocacy Officer'],
  'Arts & Design': ['Graphic Designer', 'UI/UX Designer', 'Animator', 'Fashion Designer', 'Illustrator', 'Art Director', 'Photographer', 'Sculptor', 'Musician', 'Game Designer'],
  'Science & Research': ['Physicist', 'Chemist', 'Biologist', 'Data Scientist', 'Research Fellow', 'Lab Director', 'Epidemiologist', 'Geologist', 'Astronomer', 'Environmental Scientist'],
  'Customer Service': ['Call Center Agent', 'Support Agent', 'Receptionist', 'Help Desk', 'Client Relations', 'Customer Success Manager', 'Technical Support', 'Complaints Officer', 'Service Advisor', 'Concierge'],
  'Human Resources': ['HR Manager', 'Recruiter', 'Payroll Specialist', 'Training Manager', 'Compensation Analyst', 'Employee Relations', 'HR Business Partner', 'Talent Acquisition', 'HR Assistant', 'Organizational Development'],
  'Retail & E-commerce': ['Shop Manager', 'Cashier', 'Inventory Controller', 'Visual Merchandiser', 'E-commerce Manager', 'Buyer', 'Store Supervisor', 'Loss Prevention', 'Retail Analyst', 'Delivery Coordinator'],
};

export const CATEGORY_LIST = Object.keys(CATEGORIES);

export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Remote',
  'Freelance',
  'Internship',
  'Contract',
  'Hybrid',
] as const;

export const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
  'Bahrain', 'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China',
  'Colombia', 'Czech Republic', 'Denmark', 'Egypt', 'Ethiopia', 'Finland',
  'France', 'Germany', 'Ghana', 'Greece', 'Hungary', 'India', 'Indonesia',
  'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan', 'Kenya',
  'Kuwait', 'Lebanon', 'Libya', 'Malaysia', 'Mexico', 'Morocco', 'Nepal',
  'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Oman', 'Pakistan',
  'Palestine', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
  'Romania', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa',
  'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Sweden', 'Switzerland',
  'Syria', 'Taiwan', 'Tanzania', 'Thailand', 'Tunisia', 'Turkey',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Venezuela', 'Vietnam', 'Yemen',
];

// localStorage helpers
const JOBS_KEY = 'jobboard_jobs';
const MESSAGES_KEY = 'jobboard_messages';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export function getJobs(): Job[] {
  const stored = localStorage.getItem(JOBS_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fall through */ }
  }
  const defaults = getDefaultJobs();
  localStorage.setItem(JOBS_KEY, JSON.stringify(defaults));
  return defaults;
}

export function saveJob(job: Omit<Job, 'id' | 'is_active' | 'created_at'>): Job {
  const jobs = getJobs();
  const newJob: Job = {
    ...job,
    id: generateId(),
    is_active: true,
    created_at: new Date().toISOString(),
  };
  jobs.unshift(newJob);
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
  return newJob;
}

export function toggleJobActive(id: string): void {
  const jobs = getJobs();
  const job = jobs.find((j) => j.id === id);
  if (job) {
    job.is_active = !job.is_active;
    localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
  }
}

export function deleteJob(id: string): void {
  const jobs = getJobs().filter((j) => j.id !== id);
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

export function getJobById(id: string): Job | undefined {
  return getJobs().find((j) => j.id === id);
}

export function filterJobs(params: {
  q?: string;
  category?: string;
  country?: string;
  type?: string;
}): Job[] {
  let results = getJobs().filter((j) => j.is_active);
  if (params.category) results = results.filter((j) => j.category === params.category);
  if (params.country) results = results.filter((j) => j.country === params.country);
  if (params.type) results = results.filter((j) => j.type === params.type);
  if (params.q) {
    const lower = params.q.toLowerCase();
    results = results.filter(
      (j) =>
        j.title.toLowerCase().includes(lower) ||
        j.company.toLowerCase().includes(lower) ||
        j.location.toLowerCase().includes(lower) ||
        j.description.toLowerCase().includes(lower) ||
        j.subcategory.toLowerCase().includes(lower)
    );
  }
  return results;
}

// Contact messages
export function getMessages(): ContactMessage[] {
  const stored = localStorage.getItem(MESSAGES_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fall through */ }
  }
  return [];
}

export function saveMessage(msg: Omit<ContactMessage, 'id' | 'created_at' | 'read'>): ContactMessage {
  const messages = getMessages();
  const newMsg: ContactMessage = {
    ...msg,
    id: generateId(),
    created_at: new Date().toISOString(),
    read: false,
  };
  messages.unshift(newMsg);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  return newMsg;
}

export function markMessageRead(id: string): void {
  const messages = getMessages();
  const msg = messages.find((m) => m.id === id);
  if (msg) {
    msg.read = true;
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }
}

export function deleteMessage(id: string): void {
  const messages = getMessages().filter((m) => m.id !== id);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

// Default seed data
function getDefaultJobs(): Job[] {
  return [
    {
      id: 'd1', title: 'Senior Frontend Developer', company: 'TechVision Bahrain', location: 'Manama', country: 'Bahrain',
      category: 'Information Technology', subcategory: 'Web Development', type: 'Full-time', salary_min: 4000, salary_max: 7000,
      description: 'We are looking for a Senior Frontend Developer to join our growing team in Manama. You will be responsible for building and maintaining high-quality web applications using modern JavaScript frameworks.\n\nYou will work closely with our design and backend teams to deliver exceptional user experiences. Our tech stack includes React, TypeScript, and Tailwind CSS.',
      requirements: '5+ years React/TypeScript experience, Strong CSS/Tailwind skills, REST API integration, Git version control, Agile methodology experience',
      how_to_apply: 'Send your CV and portfolio to careers@techvision.bh', employer_email: 'careers@techvision.bh', is_active: true, created_at: '2026-04-20T10:00:00Z',
    },
    {
      id: 'd2', title: 'Marketing Manager', company: 'Gulf Brands Group', location: 'Dubai', country: 'United Arab Emirates',
      category: 'Sales & Marketing', subcategory: 'Brand Manager', type: 'Full-time', salary_min: 6000, salary_max: 9000,
      description: 'Gulf Brands Group is seeking an experienced Marketing Manager to lead our brand strategy across the MENA region. You will oversee digital campaigns, manage a team of 5 marketers, and drive growth for our portfolio of consumer brands.',
      requirements: '7+ years marketing experience, MENA regional expertise, Digital marketing proficiency, Team management, Brand strategy development',
      how_to_apply: 'Apply via our careers page at gulfbrands.careers', employer_email: 'hr@gulfbrands.ae', is_active: true, created_at: '2026-04-19T14:30:00Z',
    },
    {
      id: 'd3', title: 'Registered Nurse - ICU', company: 'Royal Bahrain Hospital', location: 'Manama', country: 'Bahrain',
      category: 'Healthcare & Medical', subcategory: 'Nurse', type: 'Full-time', salary_min: 3000, salary_max: 5000,
      description: 'Royal Bahrain Hospital is hiring a Registered Nurse for our Intensive Care Unit. You will provide critical care to patients, monitor vital signs, administer medications, and collaborate with our multidisciplinary team.\n\nWe offer competitive compensation, housing allowance, medical insurance, and annual flight tickets.',
      requirements: 'BSc Nursing degree, Valid nursing license, 3+ years ICU experience, BLS/ACLS certification, English fluency',
      how_to_apply: 'Email your CV and certifications to nursing@rbh.bh', employer_email: 'nursing@rbh.bh', is_active: true, created_at: '2026-04-18T09:15:00Z',
    },
    {
      id: 'd4', title: 'Civil Engineer', company: 'Alghanim Industries', location: 'Kuwait City', country: 'Kuwait',
      category: 'Engineering', subcategory: 'Civil Engineering', type: 'Full-time', salary_min: 4500, salary_max: 7500,
      description: 'Alghanim Industries is looking for a Civil Engineer to support our construction operations. You will design structures, oversee construction projects, and ensure compliance with safety standards.',
      requirements: 'BSc Civil Engineering, 5+ years construction experience, AutoCAD proficiency, Project management skills, GCC experience preferred',
      how_to_apply: 'Submit your application at alghanim.careers.com', employer_email: 'engineering@alghanim.com', is_active: true, created_at: '2026-04-17T11:00:00Z',
    },
    {
      id: 'd5', title: 'Mathematics Teacher', company: 'British School of Bahrain', location: 'Hamala', country: 'Bahrain',
      category: 'Education & Teaching', subcategory: 'Teacher', type: 'Full-time', salary_min: 2500, salary_max: 4000,
      description: 'The British School of Bahrain is seeking a qualified Mathematics Teacher to join our secondary school department. You will teach the British National Curriculum to students aged 11-18.',
      requirements: 'QTS or equivalent teaching qualification, Mathematics degree, 2+ years teaching British Curriculum, Enhanced DBS check',
      how_to_apply: 'Apply through our school portal at bsb.careers.bh', employer_email: 'recruitment@bsb.bh', is_active: true, created_at: '2026-04-16T08:45:00Z',
    },
    {
      id: 'd6', title: 'DevOps Engineer', company: 'CloudNine Technologies', location: 'Remote', country: 'United Arab Emirates',
      category: 'Information Technology', subcategory: 'DevOps', type: 'Remote', salary_min: 5000, salary_max: 9000,
      description: 'CloudNine Technologies is hiring a DevOps Engineer to build and maintain our cloud infrastructure. You will work with AWS, Docker, Kubernetes, and CI/CD pipelines to ensure our platforms run reliably at scale.',
      requirements: '3+ years DevOps experience, AWS/GCP expertise, Docker and Kubernetes, CI/CD pipeline design, Terraform/Ansible',
      how_to_apply: 'Email your CV and GitHub profile to jobs@cloudnine.tech', employer_email: 'jobs@cloudnine.tech', is_active: true, created_at: '2026-04-14T16:00:00Z',
    },
    {
      id: 'd7', title: 'UI/UX Designer', company: 'PixelCraft Studio', location: 'Manama', country: 'Bahrain',
      category: 'Arts & Design', subcategory: 'UI/UX Designer', type: 'Hybrid', salary_min: 3500, salary_max: 5500,
      description: 'PixelCraft Studio is looking for a talented UI/UX Designer to create beautiful, intuitive digital experiences. You will work on web and mobile projects for clients across the Middle East.',
      requirements: '3+ years UX/UI design experience, Figma proficiency, User research skills, Prototyping and wireframing, Strong portfolio',
      how_to_apply: 'Send your portfolio and CV to hello@pixelcraft.bh', employer_email: 'hello@pixelcraft.bh', is_active: true, created_at: '2026-04-13T10:30:00Z',
    },
    {
      id: 'd8', title: 'Financial Analyst', company: 'InvestQ Capital', location: 'Doha', country: 'Qatar',
      category: 'Business & Finance', subcategory: 'Investment', type: 'Full-time', salary_min: 6000, salary_max: 10000,
      description: 'InvestQ Capital is seeking a Financial Analyst to support our investment team. You will conduct market research, build financial models, and prepare investment memos.',
      requirements: 'CFA Level 2+, Finance/Economics degree, 3+ years investment analysis, Excel/financial modeling, Bloomberg terminal',
      how_to_apply: 'Apply at investq.careers.qa', employer_email: 'talent@investq.qa', is_active: true, created_at: '2026-04-12T09:00:00Z',
    },
    {
      id: 'd9', title: 'Corporate Lawyer', company: 'Hassan & Partners', location: 'Riyadh', country: 'Saudi Arabia',
      category: 'Legal & Law', subcategory: 'Lawyer', type: 'Full-time', salary_min: 8000, salary_max: 15000,
      description: 'Hassan & Partners is seeking an experienced Corporate Lawyer to handle M&A transactions, corporate governance, and regulatory compliance for our clients in the GCC region.',
      requirements: 'JD or LLB degree, 5+ years corporate law experience, GCC regulatory knowledge, Bilingual Arabic/English, Bar admission',
      how_to_apply: 'Email CV to legal.recruitment@hassanpartners.sa', employer_email: 'legal.recruitment@hassanpartners.sa', is_active: true, created_at: '2026-04-11T15:45:00Z',
    },
    {
      id: 'd10', title: 'Data Scientist', company: 'AnalyticsAI', location: 'Singapore', country: 'Singapore',
      category: 'Science & Research', subcategory: 'Data Scientist', type: 'Full-time', salary_min: 8000, salary_max: 13000,
      description: 'AnalyticsAI is hiring a Data Scientist to develop machine learning models and extract insights from large datasets. You will work with cross-functional teams to solve complex business problems.',
      requirements: 'MSc/PhD in Data Science, Python/R proficiency, TensorFlow/PyTorch, SQL and big data tools, Statistical analysis',
      how_to_apply: 'Apply at analyticsai.careers.sg', employer_email: 'hiring@analyticsai.sg', is_active: true, created_at: '2026-04-10T07:30:00Z',
    },
    {
      id: 'd11', title: 'Executive Chef', company: 'The Ritz-Carlton', location: 'Manama', country: 'Bahrain',
      category: 'Hospitality & Tourism', subcategory: 'Chef', type: 'Full-time', salary_min: 5000, salary_max: 8000,
      description: 'The Ritz-Carlton Bahrain is seeking an Executive Chef to lead our culinary team. You will oversee all kitchen operations, menu development, and maintain our Michelin-standard cuisine.',
      requirements: '10+ years culinary experience, Fine dining background, Kitchen management, Menu development, HACCP certification',
      how_to_apply: 'Apply at ritzcarlton.careers.com', employer_email: 'fandb@ritzcarlton.bh', is_active: true, created_at: '2026-04-09T12:00:00Z',
    },
    {
      id: 'd12', title: 'HR Manager', company: 'Gulf Talent Solutions', location: 'Dubai', country: 'United Arab Emirates',
      category: 'Human Resources', subcategory: 'HR Manager', type: 'Full-time', salary_min: 5000, salary_max: 8000,
      description: 'Gulf Talent Solutions is looking for an HR Manager to oversee recruitment, employee relations, and organizational development for our growing consultancy.',
      requirements: '5+ years HR experience, CIPD qualification, Recruitment expertise, UAE labor law knowledge, Bilingual Arabic/English',
      how_to_apply: 'Email CV to careers@gulftalent.ae', employer_email: 'careers@gulftalent.ae', is_active: true, created_at: '2026-04-08T10:00:00Z',
    },
  ];
}

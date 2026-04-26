export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  category: string;
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

export const CATEGORIES = [
  'IT',
  'Sales',
  'Marketing',
  'Teaching',
  'Healthcare',
  'Engineering',
] as const;

export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Remote',
  'Hybrid',
  'Internship',
] as const;

export const COUNTRIES = [
  'Bahrain', 'Egypt', 'Iraq', 'Jordan', 'Kuwait', 'Lebanon', 'Oman',
  'Qatar', 'Saudi Arabia', 'United Arab Emirates', 'Yemen',
  'Canada', 'United States', 'United Kingdom', 'Germany', 'France',
  'Australia', 'India', 'Singapore', 'Japan',
] as const;

export const JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechVision Bahrain',
    location: 'Manama',
    country: 'Bahrain',
    category: 'IT',
    type: 'Full-time',
    salary_min: 4000,
    salary_max: 7000,
    description: `We are looking for a Senior Frontend Developer to join our growing team in Manama. You will be responsible for building and maintaining high-quality web applications using modern JavaScript frameworks.

You will work closely with our design and backend teams to deliver exceptional user experiences. Our tech stack includes React, TypeScript, and Tailwind CSS. We value clean code, performance, and accessibility.

This is a hybrid role with 3 days in our Bahrain World Trade Center office and 2 days remote.`,
    requirements: '5+ years React/TypeScript experience, Strong CSS/Tailwind skills, REST API integration, Git version control, Agile methodology experience',
    how_to_apply: 'Send your CV and portfolio to careers@techvision.bh with the subject line "Senior Frontend Developer Application"',
    employer_email: 'careers@techvision.bh',
    is_active: true,
    created_at: '2026-04-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Gulf Brands Group',
    location: 'Dubai',
    country: 'United Arab Emirates',
    category: 'Marketing',
    type: 'Full-time',
    salary_min: 6000,
    salary_max: 9000,
    description: `Gulf Brands Group is seeking an experienced Marketing Manager to lead our brand strategy across the MENA region. You will oversee digital campaigns, manage a team of 5 marketers, and drive growth for our portfolio of consumer brands.

The ideal candidate has a proven track record in regional marketing, understands cultural nuances, and can balance strategic thinking with hands-on execution.`,
    requirements: '7+ years marketing experience, MENA regional expertise, Digital marketing proficiency, Team management, Brand strategy development',
    how_to_apply: 'Apply via our careers page at gulfbrands.careers or email hr@gulfbrands.ae',
    employer_email: 'hr@gulfbrands.ae',
    is_active: true,
    created_at: '2026-04-19T14:30:00Z',
  },
  {
    id: '3',
    title: 'Registered Nurse - ICU',
    company: 'Royal Bahrain Hospital',
    location: 'Manama',
    country: 'Bahrain',
    category: 'Healthcare',
    type: 'Full-time',
    salary_min: 3000,
    salary_max: 5000,
    description: `Royal Bahrain Hospital is hiring a Registered Nurse for our Intensive Care Unit. You will provide critical care to patients, monitor vital signs, administer medications, and collaborate with our multidisciplinary team.

We offer competitive compensation, housing allowance, medical insurance, and annual flight tickets. Bahrain offers a tax-free salary and excellent quality of life.`,
    requirements: 'BSc Nursing degree, Valid nursing license, 3+ years ICU experience, BLS/ACLS certification, English fluency, Arabic preferred',
    how_to_apply: 'Email your CV and certifications to nursing@rbh.bh',
    employer_email: 'nursing@rbh.bh',
    is_active: true,
    created_at: '2026-04-18T09:15:00Z',
  },
  {
    id: '4',
    title: 'Sales Executive',
    company: 'Oasis Tech Solutions',
    location: 'Riyadh',
    country: 'Saudi Arabia',
    category: 'Sales',
    type: 'Full-time',
    salary_min: 5000,
    salary_max: 8000,
    description: `Oasis Tech Solutions is expanding our sales team in Saudi Arabia. We need a driven Sales Executive to sell enterprise software solutions to mid-market and enterprise clients across the Kingdom.

You will manage the full sales cycle from prospecting to closing, with a focus on building long-term client relationships. Uncapped commission structure means top performers can significantly exceed base salary.`,
    requirements: '3+ years B2B software sales, Saudi market knowledge, CRM proficiency, Strong negotiation skills, Valid Saudi driving license',
    how_to_apply: 'Send CV to recruitment@oasistech.sa with "Sales Executive - Riyadh" in the subject',
    employer_email: 'recruitment@oasistech.sa',
    is_active: true,
    created_at: '2026-04-17T11:00:00Z',
  },
  {
    id: '5',
    title: 'Mathematics Teacher',
    company: 'British School of Bahrain',
    location: 'Hamala',
    country: 'Bahrain',
    category: 'Teaching',
    type: 'Full-time',
    salary_min: 2500,
    salary_max: 4000,
    description: `The British School of Bahrain is seeking a qualified Mathematics Teacher to join our secondary school department. You will teach the British National Curriculum to students aged 11-18, including IGCSE and A-Level classes.

We provide a supportive working environment, professional development opportunities, and a comprehensive benefits package including housing allowance and annual flights.`,
    requirements: 'QTS or equivalent teaching qualification, Mathematics degree, 2+ years teaching British Curriculum, Enhanced DBS check, Passion for education',
    how_to_apply: 'Apply through our school portal at bsb.careers.bh or email recruitment@bsb.bh',
    employer_email: 'recruitment@bsb.bh',
    is_active: true,
    created_at: '2026-04-16T08:45:00Z',
  },
  {
    id: '6',
    title: 'Mechanical Engineer',
    company: 'Alghanim Industries',
    location: 'Kuwait City',
    country: 'Kuwait',
    category: 'Engineering',
    type: 'Full-time',
    salary_min: 4500,
    salary_max: 7500,
    description: `Alghanim Industries is looking for a Mechanical Engineer to support our manufacturing operations. You will design mechanical systems, oversee installation and maintenance, and ensure compliance with safety standards.

This role offers the opportunity to work on large-scale industrial projects across the GCC region with one of the region's most respected companies.`,
    requirements: 'BSc Mechanical Engineering, 5+ years industrial experience, AutoCAD/SolidWorks proficiency, Project management skills, GCC experience preferred',
    how_to_apply: 'Submit your application at alghanim.careers.com',
    employer_email: 'engineering@alghanim.com',
    is_active: true,
    created_at: '2026-04-15T13:20:00Z',
  },
  {
    id: '7',
    title: 'DevOps Engineer',
    company: 'CloudNine Technologies',
    location: 'Remote',
    country: 'United Arab Emirates',
    category: 'IT',
    type: 'Remote',
    salary_min: 5000,
    salary_max: 9000,
    description: `CloudNine Technologies is hiring a DevOps Engineer to build and maintain our cloud infrastructure. You will work with AWS, Docker, Kubernetes, and CI/CD pipelines to ensure our platforms run reliably at scale.

This is a fully remote position. We are a distributed team across the GCC and welcome applicants from anywhere in the region.`,
    requirements: '3+ years DevOps experience, AWS/GCP expertise, Docker and Kubernetes, CI/CD pipeline design, Terraform/Ansible, Linux administration',
    how_to_apply: 'Email your CV and GitHub profile to jobs@cloudnine.tech',
    employer_email: 'jobs@cloudnine.tech',
    is_active: true,
    created_at: '2026-04-14T16:00:00Z',
  },
  {
    id: '8',
    title: 'UX/UI Designer',
    company: 'PixelCraft Studio',
    location: 'Manama',
    country: 'Bahrain',
    category: 'IT',
    type: 'Hybrid',
    salary_min: 3500,
    salary_max: 5500,
    description: `PixelCraft Studio is looking for a talented UX/UI Designer to create beautiful, intuitive digital experiences. You will work on web and mobile projects for clients across the Middle East, from concept to delivery.

We value creativity, attention to detail, and a user-centered design approach. You will collaborate with developers and project managers in our Manama studio.`,
    requirements: '3+ years UX/UI design experience, Figma proficiency, User research skills, Prototyping and wireframing, Design systems experience, Strong portfolio',
    how_to_apply: 'Send your portfolio and CV to hello@pixelcraft.bh',
    employer_email: 'hello@pixelcraft.bh',
    is_active: true,
    created_at: '2026-04-13T10:30:00Z',
  },
  {
    id: '9',
    title: 'Financial Analyst',
    company: 'InvestQ Capital',
    location: 'Doha',
    country: 'Qatar',
    category: 'Sales',
    type: 'Full-time',
    salary_min: 6000,
    salary_max: 10000,
    description: `InvestQ Capital is seeking a Financial Analyst to support our investment team. You will conduct market research, build financial models, prepare investment memos, and assist with portfolio management.

This is an excellent opportunity for a finance professional looking to grow in the dynamic Qatar Financial Centre ecosystem.`,
    requirements: 'CFA Level 2+, Finance/Economics degree, 3+ years investment analysis, Excel/financial modeling, Bloomberg terminal, Arabic and English fluency',
    how_to_apply: 'Apply at investq.careers.qa or email talent@investq.qa',
    employer_email: 'talent@investq.qa',
    is_active: true,
    created_at: '2026-04-12T09:00:00Z',
  },
  {
    id: '10',
    title: 'Content Writer',
    company: 'Narrative Media',
    location: 'Remote',
    country: 'Bahrain',
    category: 'Marketing',
    type: 'Freelance',
    salary_min: 1500,
    salary_max: 3000,
    description: `Narrative Media is looking for a freelance Content Writer to create engaging content for our clients. You will write blog posts, social media copy, website content, and email campaigns.

We work with brands across the GCC and need someone who understands the regional market while maintaining a global perspective. Flexible hours and competitive per-project rates.`,
    requirements: '2+ years content writing, SEO knowledge, Social media copywriting, English native/fluent, Arabic a plus, Portfolio of published work',
    how_to_apply: 'Send writing samples to writers@narrativemedia.bh',
    employer_email: 'writers@narrativemedia.bh',
    is_active: true,
    created_at: '2026-04-11T15:45:00Z',
  },
  {
    id: '11',
    title: 'Pediatrician',
    company: 'Saudi German Hospital',
    location: 'Jeddah',
    country: 'Saudi Arabia',
    category: 'Healthcare',
    type: 'Full-time',
    salary_min: 8000,
    salary_max: 14000,
    description: `Saudi German Hospital in Jeddah is recruiting a Pediatrician to join our growing pediatrics department. You will provide comprehensive medical care to children from birth through adolescence.

We offer an excellent compensation package including tax-free salary, furnished housing, medical insurance, education allowance for children, and annual leave with flights.`,
    requirements: 'MD/Pediatrics, Board certification, 5+ years pediatric experience, Saudi Commission license or eligible, Excellent communication skills',
    how_to_apply: 'Email CV and credentials to medical.hr@sghgroup.com',
    employer_email: 'medical.hr@sghgroup.com',
    is_active: true,
    created_at: '2026-04-10T07:30:00Z',
  },
  {
    id: '12',
    title: 'Data Scientist',
    company: 'AnalyticsAI',
    location: 'Singapore',
    country: 'Singapore',
    category: 'IT',
    type: 'Full-time',
    salary_min: 8000,
    salary_max: 13000,
    description: `AnalyticsAI is hiring a Data Scientist to develop machine learning models and extract insights from large datasets. You will work with cross-functional teams to solve complex business problems using advanced analytics.

We are a fast-growing startup with a collaborative culture and a focus on innovation. You will have access to cutting-edge tools and large-scale datasets.`,
    requirements: 'MSc/PhD in Data Science or related field, Python/R proficiency, ML framework experience (TensorFlow/PyTorch), SQL and big data tools, Statistical analysis, Published research a plus',
    how_to_apply: 'Apply at analyticsai.careers.sg',
    employer_email: 'hiring@analyticsai.sg',
    is_active: true,
    created_at: '2026-04-09T12:00:00Z',
  },
];

export function getJobById(id: string): Job | undefined {
  return JOBS.find((j) => j.id === id);
}

export function filterJobs(params: {
  q?: string;
  category?: string;
  country?: string;
  type?: string;
}): Job[] {
  let results = JOBS.filter((j) => j.is_active);

  if (params.category) {
    results = results.filter((j) => j.category === params.category);
  }
  if (params.country) {
    results = results.filter((j) => j.country === params.country);
  }
  if (params.type) {
    results = results.filter((j) => j.type === params.type);
  }
  if (params.q) {
    const lower = params.q.toLowerCase();
    results = results.filter(
      (j) =>
        j.title.toLowerCase().includes(lower) ||
        j.company.toLowerCase().includes(lower) ||
        j.location.toLowerCase().includes(lower) ||
        j.description.toLowerCase().includes(lower)
    );
  }

  return results;
}

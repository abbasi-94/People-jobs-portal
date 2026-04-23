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

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
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
  'Argentina',
  'Australia',
  'Austria',
  'Bangladesh',
  'Belgium',
  'Brazil',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Czech Republic',
  'Denmark',
  'Egypt',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hong Kong',
  'Hungary',
  'India',
  'Indonesia',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Kenya',
  'Malaysia',
  'Mexico',
  'Netherlands',
  'New Zealand',
  'Nigeria',
  'Norway',
  'Pakistan',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Romania',
  'Saudi Arabia',
  'Singapore',
  'South Africa',
  'South Korea',
  'Spain',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'Thailand',
  'Turkey',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Vietnam',
] as const;

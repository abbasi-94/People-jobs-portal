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
  // Middle East
  'Bahrain',
  'Egypt',
  'Iraq',
  'Jordan',
  'Kuwait',
  'Lebanon',
  'Oman',
  'Palestine',
  'Qatar',
  'Saudi Arabia',
  'Syria',
  'United Arab Emirates',
  'Yemen',
  // Americas
  'Argentina',
  'Brazil',
  'Canada',
  'Chile',
  'Colombia',
  'Mexico',
  'Peru',
  'United States',
  // Europe
  'Austria',
  'Belgium',
  'Czech Republic',
  'Denmark',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Netherlands',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Spain',
  'Sweden',
  'Switzerland',
  'Ukraine',
  'United Kingdom',
  // Asia-Pacific
  'Australia',
  'Bangladesh',
  'China',
  'Hong Kong',
  'India',
  'Indonesia',
  'Israel',
  'Japan',
  'Malaysia',
  'New Zealand',
  'Pakistan',
  'Philippines',
  'Singapore',
  'South Korea',
  'Taiwan',
  'Thailand',
  'Turkey',
  'Vietnam',
  // Africa
  'Kenya',
  'Nigeria',
  'South Africa',
] as const;

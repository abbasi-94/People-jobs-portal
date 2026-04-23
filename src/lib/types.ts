export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
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
  'Remote',
] as const;

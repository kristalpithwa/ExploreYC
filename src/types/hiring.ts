export interface Company {
  id: number;
  name: string;
  slug: string;
  batch: string;
  location: string | null;
  is_hiring: boolean;
  logo_url: string;
  small_logo_url: string;
  logo_path?: string;
  team_size: number;
  primary_vertical: string;
  parent_sector: string;
  child_sector: string | null;
  description: string;
  hiring_description: string;
  website: string;
  one_liner: string;
  country: string | null;
}

export interface Job {
  id: number;
  company_id: number;
  state: string;
  title: string;
  description: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency?: string; 
  equity_min: number | null;
  equity_max: number | null;
  show_path: string; 
  pretty_job_type: string; 
  pretty_min_experience: string;
  pretty_location_or_remote: string;
  pretty_salary_range: string;
  pretty_role: string; 
  pretty_updated_at: string;
  job_type: 'fulltime' | 'contract' | 'internship' | 'parttime';
  remote: 'yes' | 'no';
  locations: string[];
  min_experience: number;
  time_to_hire: number | null;
}

export interface JobWithCompany extends Job {
  company: Company;
}

export interface HiringStats {
  totalJobs: number;
  hiringCompanies: number;
  newJobsThisWeek: number;
  avgSalary: number | null;
  topRoles: Array<{ role: string; count: number }>;
  topBatches: Array<{ batch: string; count: number }>;
  topLocations: Array<{ location: string; count: number }>;
}

export interface HiringFilters {
  roles: string[];
  batches: string[];
  locations: string[];
  jobTypes: string[];
  experienceLevels: string[];
  remote: 'all' | 'yes' | 'no';
  salaryMin: number | null;
  salaryMax: number | null;
  searchQuery: string;
}

export const ROLE_COLORS: Record<string, string> = {
  'Engineering': '#3b82f6',
  'Sales': '#10b981',
  'Design': '#a855f7',
  'Marketing': '#FB651E',
  'Product': '#06b6d4',
  'Operations': '#64748b',
  'HR': '#ec4899',
  'Recruiting': '#ec4899',
};

export const ROLE_ICONS: Record<string, string> = {
  'Engineering': '⚙️',
  'Sales': '🎯',
  'Design': '🎨',
  'Marketing': '📢',
  'Product': '📦',
  'Operations': '⚡',
  'HR': '👥',
  'Recruiting': '👥',
};

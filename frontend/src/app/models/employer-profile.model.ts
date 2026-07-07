export interface EmployerProfile {
  id?: number;               // optional for new profiles
  employerId: number;        // links to User.id
  companyName: string;
  companyEmail?: string;
  companyPhone?: string;
  industry?: string;
  website?: string;
  address?: string;
  foundedYear?: string;
  companySize?: string;
  logoUrl?: string;
  bannerUrl?: string;
  description?: string;
}
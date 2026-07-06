export interface CreateJobRequest {
  title: string;
  company: string;
  location: string;

  latitude: number | null;
  longitude: number | null;

  salary: number | null;

  jobType: string;
  description: string;

  employerId: number;

  category: string;
}
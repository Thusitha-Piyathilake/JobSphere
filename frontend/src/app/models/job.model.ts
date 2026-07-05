export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;

  latitude: number;
  longitude: number;

  salary: number;
  jobType: string;
  description: string;
  createdAt: string;
  employerId: number;
}
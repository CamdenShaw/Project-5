import { Job } from './job';

export interface Colonist {
  id: number;
  name: string;
  job: Job;
  age: number;
}

export interface NewColonist {
  name: string;
  age: number;
  job_id: number;
}
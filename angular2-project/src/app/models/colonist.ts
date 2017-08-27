import { Job } from './job';

export interface Colonist {
  name: string;
  job: Job;
  id: number;
  age: number;
}

export interface NewColonist {
  local_id: number,
  name: string;
  age: string;
  job_id: string;
}
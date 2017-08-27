export interface Encounters {
  id: number;
  date: string;
  colonist_id: number;
  atype: string;
  action: string;
}

export interface NewEncounters {
  date: string;
  colonist_id: number;
  atype: string;
  action: string;
}
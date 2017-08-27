export interface Encounters {
  id: number;
  date: string;
  colonist_id: number;
  atype: string;
  action: string;
}

export interface NewEncounters {
  local_id: number;
  date: string;
  colonist_id: number;
  atype: string;
  action: string;
}
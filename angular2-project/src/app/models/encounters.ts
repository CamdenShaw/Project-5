export interface Encounters {
  id: number;
  date: string;
  action: string;
  colinist_id: number;
  atype: string;
}

export interface NewEncounters {
  atype: string;
  date: string;
  action: string;
  colonist_id: number;
}
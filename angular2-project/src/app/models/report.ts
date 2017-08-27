export interface Report {
  encounter : {
      id: number,
      atype : string,
      date : string,
      action : string,
      colonist_id : number;
  }
}

export interface ReportEncounter {
  local_id: number;
  encounter: {
    atype : string,
    date : string,
    action : string,
    colonist_id : number;
  }
}
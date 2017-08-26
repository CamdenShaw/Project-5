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
  encounter: {
    atype : string,
    date : string,
    action : string,
    colonist_id : number;
  }
}
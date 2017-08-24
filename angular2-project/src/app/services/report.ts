import { Injectable } from '@angular/core';
import { Report, ReportEncounter } from '../models/report';
import { Http, Headers } from '@angular/http';
import { Encounters, NewEncounters } from '../models/encounters';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReportService {
    reportUrl = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
    constructor(private http: Http){}
    newReport(report: Report): Promise<Report[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let body = JSON.stringify({ report });
        return this.http
                    .post(this.reportUrl, body, { headers: headers })
                    .toPromise()
                    .then(response => response.json().encounters)
                    .catch(this.handleError);
    }
    reportEncounter(encounter: ReportEncounter): Promise<Report[]> {
        return this.http.get(this.reportUrl)
                        .toPromise()
                        .then((response) => response.json().encounters)
                        .catch(this.handleError);
    }
    private handleError(error: any) {
        console.log("encounter services is returning an error</br>",error);
        return Promise.reject(error.message ||error);
    }
}
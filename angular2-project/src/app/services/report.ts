import { Injectable } from '@angular/core';
import { Report, ReportEncounter } from '../models/report';
import { Http, Headers } from '@angular/http';
import { Encounters, NewEncounters } from '../models/encounters';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReportService {
    reportUrl = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
    public reportStorage;
    public reportArray = [];

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
    reportEncounter(report: ReportEncounter): Promise<Encounters[]> {
        if ( this.reportStorage == null && this.reportStorage === 'undefined' ) {
            localStorage.setItem("report", '' );
            this.reportArray = [];
            console.log('empty array', this.reportArray);
        }
        else {
            this.reportStorage = localStorage.getItem("report");
            this.reportArray = JSON.parse(this.reportStorage);
            console.log('not-so-empty array', this.reportArray);
        }
        this.reportArray.push(report);
        localStorage.setItem("report", JSON.stringify(this.reportArray));
        console.log(report);
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
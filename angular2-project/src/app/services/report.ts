import { Injectable } from '@angular/core';
import { Report, ReportEncounter } from '../models/report';
import { Http, Headers } from '@angular/http';
import { Encounters, NewEncounters } from '../models/encounters';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReportService {
    reportUrl = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
    public reportArray = [];

    constructor(private http: Http){}

    getReport(report: Report): Promise<Report[]> {
        return this.http
                    .get(this.reportUrl)
                    .toPromise()
                    .then(response => response.json().encounters)
                    .catch(this.handleError);
    }

    reportEncounter(report: ReportEncounter): Promise<Encounters[]> {
        let headers = new Headers({"Content-Type": "application/json"});
        let body = JSON.stringify({ report });

        if ( typeof localStorage.getItem("report") == "undefined" || localStorage.getItem("report") == null || localStorage.getItem("report") === "" ) {
            localStorage.setItem("report", '' );
            this.reportArray = [];
            console.log('empty report array from services ', this.reportArray);
        }
        else {;
            this.reportArray = JSON.parse(localStorage.getItem("report"));
            console.log('not-so-empty report array from services ', this.reportArray);
        }
        this.reportArray.push(report);
        localStorage.setItem("report", JSON.stringify(this.reportArray));
        console.log(report);
        return this.http.post(this.reportUrl, report, { headers: headers })
                        .toPromise()
                        .then((response) => response.json().encounters)
                        .catch(this.handleError);
    }
    private handleError(error: any) {
        console.log("encounter services is returning an error</br>",error);
        return Promise.reject(error.message ||error);
    }
}
import { Injectable } from '@angular/core';
import { Report } from '../models/report';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReportService {
    reportUrl = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
    constructor(private http: Http){}
    getReport(): Promise<Report[]> {
        return this.http.get(this.reportUrl)
                        .toPromise()
                        .then((response) => response.json().report)
                        .catch(this.handleError);
    }
    private handleError(error: any) {
        console.log("encounter services is returning an error</br>",error);
        return Promise.reject(error.message ||error);
    }
}
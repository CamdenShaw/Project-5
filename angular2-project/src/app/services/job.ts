import { Injectable } from '@angular/core';
import { Job } from '../models/job';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JobService {
    jobUrl = 'https://red-wdp-api.herokuapp.com/api/mars/job';
    constructor(private http: Http){}
    getJob(): Promise<Job[]> {
        return this.http.get(this.jobUrl)
                        .toPromise()
                        .then((response) => response.json().job)
                        .catch(this.handleError);
    }
     handleError(error) {
        console.log("job services is returning an error</br>",error);
    }
}
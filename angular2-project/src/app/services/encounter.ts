import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Encounters, NewEncounters } from '../models/encounters';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EncountersService {
    encountersUrl = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
    constructor(private http: Http){}
    getEncounters(): Promise<Encounters[]> {
        return this.http.get(this.encountersUrl)
                    .toPromise()
                    .then((response) => response.json().encounters)
                    .catch(this.handleError);
    }
    newEncounter(encounter: NewEncounters): Promise<Encounters[]> {
        return this.http.get(this.encountersUrl)
                    .toPromise()
                    .then((response) => response.json().encounters)
                    .catch(this.handleError);
    }
    private handleError(error: any) {
        console.log("encounter services is returning an error</br>",error);
        return Promise.reject(error.message || error);
    }
}
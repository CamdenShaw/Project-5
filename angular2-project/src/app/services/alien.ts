import { Injectable } from '@angular/core';
import { Alien } from '../models/alien';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AlienService {
    aliensUrl = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';
    constructor(private http: Http){}
    getAliens(): Promise<Alien[]> {
        return this.http.get(this.aliensUrl)
                        .toPromise()
                        .then((response) => response.json().aliens)
                        .catch(this.handleError);
    }
     handleError(error) {
        console.error(error);
    }
}
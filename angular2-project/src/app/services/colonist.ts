import { Injectable } from '@angular/core';
import { Colonist } from '../models/colonist';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ColonistService {
    colonistUrl = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';
    constructor(private http: Http){}
    getColonist(): Promise<Colonist[]> {
        return this.http.get(this.colonistUrl)
                        .toPromise()
                        .then((response) => response.json().colonist)
                        .catch(this.handleError);
    }
     handleError(error) {
        console.error(error);
    }
}
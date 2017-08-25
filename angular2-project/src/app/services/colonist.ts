import { Injectable } from '@angular/core';
import { Colonist, NewColonist } from '../models/colonist';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ColonistService {
    colonistUrl = 'https://red-wdp-api.herokuapp.com/api/mars/colonists';
    public colonistStorage;
    public colonistArray = [];
    public colonistID;

    constructor(private http: Http){}

    newColonist(colonist: Colonist): Promise<Colonist[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let body = JSON.stringify({ colonist });
        return this.http
                   .post(this.colonistUrl, body, { headers: headers })
                   .toPromise()
                   .then(response => response.json().colonist)
                   .catch(this.handleError);
    }
    registerColonist(colonist: NewColonist): Promise<Colonist[]> {

        if ( this.colonistStorage == null && this.colonistStorage === 'undefined' ) {
            localStorage.setItem("colonist", '' );
            this.colonistArray = [];
            console.log('empty array', this.colonistArray);
        }
        else {
            this.colonistStorage = localStorage.getItem("colonist");
            this.colonistArray = JSON.parse(this.colonistStorage);
            console.log('not-so-empty array', this.colonistArray);
        }

        this.colonistArray.push(colonist);
        localStorage.setItem("colonist", JSON.stringify(this.colonistArray));
        console.log(colonist);
        return this.http.get(this.colonistUrl)
                        .toPromise()
                        .then((response) => response.json().colonist)
                        .catch(this.handleError);
    }
    private handleError(error) {
        console.log("Colonist services is returning an error</br>", error);
        return Promise.reject(error.message || error);
    }
}
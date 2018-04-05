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
    
    getColonist(): Promise<Colonist[] > {
        return this.http.get(this.colonistUrl)
                        .toPromise()
                        .then((response) => response.json().colonists)
                        .catch(this.handleError);
    }

    newColonist(colonist: NewColonist): Promise<NewColonist[]> {
        let headers = new Headers({"Content-Type": "application/json"});
        let body = JSON.stringify({ colonist });

        if ( localStorage.getItem("colonist").length === 0 ) { this.colonistArray = []; }
        else {
            this.colonistStorage = JSON.parse(localStorage.getItem("colonist"));
            this.colonistArray = (this.colonistStorage);
        }

        this.colonistArray.push(colonist);
        localStorage.setItem("colonist", JSON.stringify(this.colonistArray));
        return this.http.post(this.colonistUrl, body, { headers: headers })
                        .toPromise()
                        .then((response) => response.json().colonists)
                        .catch(this.handleError);
    }

    private handleError(error) {
        console.log("Colonist services is returning an error</br>", error);
        return Promise.reject(error.message || error);
    }
}
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


//this is called an angular service
//this means that a service can be injected in other or other services in the application
//the meta data providedIn root
@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient ) { }

  login(model : any){
    return this.http.post(this.baseUrl+'account/login',model);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { Observable, ReplaySubject } from 'rxjs';
import { Sme } from '../_models/sme';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseUrl = 'https://localhost:5001/api/';
  field: any;
  field$ : any;
  constructor(private http: HttpClient) { }

 

  getFields():Observable<any[]>{
	
    return this.http.get<any>(this.baseUrl+'field');
  }

}

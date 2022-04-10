import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { meeting } from '../_models/meeting';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  baseUrl = environment.apiUrl;
  constructor(private http : HttpClient, private toastr: ToastrService) { }

  getMeetingByProf(username:string){
    return this.http.get<meeting>(this.baseUrl+'meeting/meetingByProf/'+username);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { profProfile } from '../_models/profProfile';

@Injectable({
  providedIn: 'root'
})
export class ProfService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,private toastr : ToastrService) { }

  getLast4Prof(){
    return this.http.get<profProfile>(this.baseUrl+'prof/last4Prof');
  }
}

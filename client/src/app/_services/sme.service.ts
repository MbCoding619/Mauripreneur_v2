import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { smeProfile } from '../_models/smeProfile';

@Injectable({
  providedIn: 'root'
})
export class SmeService {
  
  baseUrl = environment.apiUrl;

  constructor(private http : HttpClient, private toastr: ToastrService) { }

  getSmeById(id : any){
    return this.http.get<smeProfile>(this.baseUrl+'sme/smeById/'+id);
  }


}

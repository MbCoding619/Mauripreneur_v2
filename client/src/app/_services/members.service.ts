import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { smeProfile } from '../_models/smeProfile';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http : HttpClient, private toastr : ToastrService) { }

  getSmes(){
    return this.http.get<smeProfile>(this.baseUrl+'sme/allSme');
  }

  getSmeByUsername(username:string){
    return this.http.get<smeProfile>(this.baseUrl+`sme/${username}`);
  }

  editSmeProfile(model : any){
    return this.http.put(this.baseUrl+'sme/editSme',model).pipe(map(()=>{
      this.toastr.success("Profile updated successfully");
    }))
  }

}

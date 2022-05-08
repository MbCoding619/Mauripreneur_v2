import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { smeProfile } from '../_models/smeProfile';
import { profProfile } from '../_models/profProfile';
import { User } from '../_models/user';

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

  getProfs(){
    return this.http.get<profProfile>(this.baseUrl+`prof/allProf`);
  }

  getProfByUsername(username:string){
    return this.http.get<profProfile>(this.baseUrl+`prof/${username}`);
  }

  editProfProile(model : any){
    return this.http.put(this.baseUrl+'prof/editProf',model).pipe(map(()=>{
      this.toastr.success("Profile updated Sucessfully");
    }))
  }

  getAllUsers(){
    return this.http.get<User>(this.baseUrl+`user`);
  }

}

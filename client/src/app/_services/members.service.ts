import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { smeProfile } from '../_models/smeProfile';
import { profProfile } from '../_models/profProfile';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';


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

  getAllUsers(userParams : UserParams){
   let params = this.getPaginationHeaders(userParams.pageNumber,userParams.pageSize);
   params = params.append('appUserRole', userParams.appUserRole);
   if(userParams.fieldId){
    params = params.append('fieldId', userParams?.fieldId);
   }
   


    return this.getPaginatedResults<User[]>(this.baseUrl+'user',params);

    
  }
//check section 158 to 161 to understand this below code
//note code has been refactored to enable code re use
  private getPaginatedResults<T>(url,params) {
   const paginatedResult : PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url , { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number , pageSize : number){
    let params = new HttpParams();
    
      params = params.append('pageNumber',pageNumber.toString());
      params = params.append('pageSize',pageSize.toString());      
    
      return params;
  }

}

import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActionStatus } from '../_models/ActionStatus';
import { editJob } from '../_models/editJob';
import { field } from '../_models/field';
import { fieldAdd } from '../_models/fieldAdd';
import { Job } from '../_models/job';
import { manageUser } from '../_models/manageUser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  
  constructor(private http : HttpClient, private toastr: ToastrService) { }

  getFields(){
    return this.http.get<field[]>(this.baseUrl+'field');
  }

  addField(model:any){
    return this.http.post(this.baseUrl+'field/addField',model).pipe(

      map((field : fieldAdd)=>{
        if(field){
          this.toastr.success("Field Added");
          console.log(field);
        }
       
      })
    )
  }

  editField(model :any){

    return this.http.put(this.baseUrl+'field/editField',model).pipe(
      
      map((field : editJob)=>{

        if(field)
        {
          this.toastr.success();
          //return(job);
        }
      })
    )
  }

  getUsers(){
    return this.http.get<manageUser[]>(this.baseUrl+'user');
  }

  deactivatUser(appUserId : number,model : any){
    return this.http.put(this.baseUrl+'admin/deactivateUser/'+appUserId,model).pipe(
      map((user : editJob)=>{
        if(user)
        {
          this.toastr.success();
        }
      }

      )
    )
  }

  activateUser(appUserId : number,model : any){
    return this.http.put(this.baseUrl+'admin/activateUser/'+appUserId,model).pipe(
      map((user : editJob)=>{
        if(user)
        {
          this.toastr.success();
        }
      }

      )
    )
  }

  getAllJob(){
    return this.http.get<Job[]>(this.baseUrl+'job/allJobAdmin');
  }

  approveJob(id : any,model : any){
    return this.http.put(this.baseUrl+'admin/approveJob/'+id,model).pipe(
      map((status : ActionStatus)=>{
        if(status){
          this.toastr.success("Job Approved");
        }
      },error =>{
        this.toastr.error(error.error);
      })
    )
  }

  declineJob(id:any,model:any){
    return this.http.put(this.baseUrl+'admin/declineJob/'+id,model).pipe(
      map((status : ActionStatus)=>{
        if(status){
          this.toastr.success("Job Declined");
        }
      },error =>{
        this.toastr.error(error.error);
      })
    )
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { Observable, ReplaySubject } from 'rxjs';
import { Sme } from '../_models/sme';
//import {MatSnackBar} from '@angular/material/snack-bar';
import { addJob } from '../_models/addJob';
import { ToastrService } from 'ngx-toastr';
import { Job } from '../_models/job';
import { addBid } from '../_models/addBid';
import { editJob } from '../_models/editJob';
import { acceptBid } from '../_models/acceptBid';
import { meetingResponse } from '../_models/meetingResponse';
import { environment } from 'src/environments/environment';
import { jobDetails } from '../_models/jobDetails';
import { subField } from '../_models/subField';
import { ActionStatus } from '../_models/ActionStatus';
import { field } from '../_models/field';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseUrl = environment.apiUrl;
  field: any;
  field$ : any;
  
  constructor(private http: HttpClient,private toastr : ToastrService) { }

 

  getFields():Observable<field[]>{
	
    return this.http.get<field[]>(this.baseUrl+'field/fields');
  }

  getSubFields(){
    return this.http.get<subField[]>(this.baseUrl+'field/subFields');
  }

  getSubFieldsByFieldId(id : number){
    return this.http.get<subField[]>(this.baseUrl+`field/subFieldsByFieldId/${id}`);
  }

  // openSnackBar(message: string , action : string){
  //   this._snackBar.open(message,action);
  // }

  addJob(model : any){
    return this.http.post(this.baseUrl+'Job/addJob',model).pipe(

      map((job : addJob)=>{

        if(job){
         this.toastr.success();
          return(job);
                  
        }
      })
    )

  }

  getJobByUsernameStatus(username : string , status : string){
    return this.http.get<Job>(`${this.baseUrl}Job/jobBySmeByStatus/${username}/${status}`);
  }

  getJobByUsername(username : string){
    
    return this.http.get<any>(`${this.baseUrl}Job/${username}`);
  }

  getAllJob(){

    return this.http.get<any>(this.baseUrl+'Job/allJob');
  }

  getJobById(id:any){

    return this.http.get<Job>(this.baseUrl+'job/jobById/'+id);
  }

  getJobDetails(){
    return this.http.get<jobDetails>(this.baseUrl+'Job/jobDetails');
  }

  placeBid(model : any){

    return this.http.post(this.baseUrl+'bid/addBid',model).pipe(

      map((bid : addBid)=>{

        if(bid){
         this.toastr.show(bid.status)
          return(bid);                  
        }
      })
    )
  }

  editJob(model :any){

    return this.http.put(this.baseUrl+'job/editJob',model).pipe(
      
      map((job : editJob)=>{

        if(job)
        {
          this.toastr.success();
          //return(job);
        }
      })
    )
  }


  getBidQuery(username : any){
    return this.http.get<any>(`${this.baseUrl}bid/${username}`);
  }

  getBidAccepted(username : any){
    return this.http.get<any>(`${this.baseUrl}bid/getBidAccepted/${username}`)
  }

  acceptBid(model : any){

    return this.http.put(this.baseUrl+'bid/acceptBid',model).pipe(
      map((bidAccept : acceptBid)=>{

        if(bidAccept){

          this.toastr.success();
          return(bidAccept);
        }
      })
    )
  }

  getBidSent(username :any){
    return this.http.get<any>(`${this.baseUrl}bid/getBidSent/${username}`)
  }

  getBidSentByStatus(username :any , status :any){
    return this.http.get<any>(`${this.baseUrl}bid/getBidSent/${username}/${status}`)
  }

  getRoleId(appUserId : any){
    return this.http.get<any>(`${this.baseUrl}user/getUserRoleId/${appUserId}`)
  }

  scheduleMeeting(model : any){

    return this.http.post(this.baseUrl+'meeting/createMeeting',model).pipe(
      map((meetResponse : meetingResponse)=>{

        if(meetResponse){          
          return(meetResponse);
        }
      })
    )
  }




  //testing

  public download(fileUrl: string) {
    return this.http.get(`${this.baseUrl}FileManager/download?fileUrl=${fileUrl}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    });
  }

  public upload(formData: FormData,id : any) {
    return this.http.post(`${this.baseUrl}FileManager/upload/${id}`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

 


}

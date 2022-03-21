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


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseUrl = 'https://localhost:5001/api/';
  field: any;
  field$ : any;
  
  constructor(private http: HttpClient,private toastr : ToastrService) { }

 

  getFields():Observable<any[]>{
	
    return this.http.get<any>(this.baseUrl+'field');
  }

  // openSnackBar(message: string , action : string){
  //   this._snackBar.open(message,action);
  // }

  addJob(model : any){
    return this.http.post(this.baseUrl+'Job/addJob',model).pipe(

      map((job : addJob)=>{

        if(job){
         this.toastr.show(job.Status)
          return(job);
                  
        }
      })
    )

  }

  getJobByUsername(username : string){
    
    return this.http.get<any>(`${this.baseUrl}Job/${username}`);
  }

  getAllJob(){

    return this.http.get<any>(this.baseUrl+'Job/allJob');
  }

  placeBid(model : any){

    return this.http.post(this.baseUrl+'bid/addBid',model).pipe(

      map((bid : addBid)=>{

        if(bid){
         this.toastr.show(bid.Status)
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
          this.toastr.success();;
          return(job);
        }
      })
    )
  }


}

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

  getJobById(id : any){
    
    return this.http.get<Job[]>(`${this.baseUrl}/${id}`);
  }

  getAllJob(){

    return this.http.get<Job[]>(this.baseUrl+'Job/allJob');
  }



}

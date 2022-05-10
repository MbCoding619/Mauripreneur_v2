import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActionStatus } from '../_models/ActionStatus';
import { addBid } from '../_models/addBid';
import { bidProfCard } from '../_models/bidProfCard';
import { jobDetails } from '../_models/jobDetails';
import { timeline } from '../_models/timeline';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  baseUrl = environment.apiUrl;

  public jobToBid = new ReplaySubject<jobDetails>(1);
  currentJobToBid$ = this.jobToBid.asObservable();

  constructor(private http : HttpClient, private toastr: ToastrService) { }

  clickToBid(job : jobDetails){
   this.jobToBid.next(job);
  }

  cleanBid(){
    this.jobToBid.next(null);
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

  addTimeline(model:any){
    return this.http.post(this.baseUrl+'bid/addTimelines',model).pipe(
      map((status : ActionStatus)=>{
        if(status){
          return(status);
        }
      },error =>{
        this.toastr.error(error.error);
      })
    )
  }

  getTimeline(id:number){
    return this.http.get<timeline>(`${this.baseUrl}bid/getTimelines/${id}`);
  }

  deleteTimelineById(id:number){
    return this.http.delete(`${this.baseUrl}bid/deleteTimeline/${id}`);
  }

  getBidProfBySme(id : number){
    return this.http.get<bidProfCard>(`${this.baseUrl}bid/getBidProfBySmeId/${id}`);
  }
}

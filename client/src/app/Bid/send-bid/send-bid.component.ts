import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { jobDetails } from 'src/app/_models/jobDetails';
import { timeline } from 'src/app/_models/timeline';
import { AccountsService } from 'src/app/_services/accounts.service';
import { BidService } from 'src/app/_services/bid.service';

@Component({
  selector: 'app-send-bid',
  templateUrl: './send-bid.component.html',
  styleUrls: ['./send-bid.component.css']
})
export class SendBidComponent implements OnInit {
  BidForm : FormGroup;
  timelineForm : FormGroup;
  bidF = true;
  jobData : jobDetails;
  model : any;
  modelT : any;
  username : string;
  timelineData : timeline;
  bidId : number;
  constructor(private bidService : BidService,
              private toastr : ToastrService,
              private accountService : AccountsService) { }

  ngOnInit(): void {
    this.bidService.currentJobToBid$.pipe(take(1)).subscribe(response =>{
      console.log(response);
      this.jobData = response;      
    });

    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.username = user.username;
      console.log(user);
    })

    this.initialiseFormBid();
    this.initialiseFormPlan();

    if(this.bidId !=undefined){
      this?.getTimeline(this?.bidId);
    }
  }


  populateModel(){

    this.model ={
      'username' : this.username?.toLowerCase(),
      'jobId' : this.jobData.jobId,
      'description' : this.BidForm.controls['description'].value,
      'bidAmount' : this.BidForm.controls['bidAmount'].value,
      'otherDetails': this.BidForm.controls['otherDetails'].value      
    }

    console.log(this.model)   

  }

  bid(){
    if(this.BidForm.value)    
    {
      this.populateModel();
      this.bidService.placeBid(this.model).subscribe(response=>{
        console.log(response.bidId);
        this.toastr.success();    
        this.bidId = response.bidId;        
        const submit = document.getElementById("submitBid");
        submit.setAttribute("disabled","disabled");
        this.bidF = !this.bidF;
      },error =>{
        this.toastr.error(error.error);
      })
    }else{
      console.log("Something Went wrong.")
    }
  }

  initialiseFormBid(){
    this.BidForm = new FormGroup({
      description : new FormControl(),
      bidAmount : new FormControl(),
      otherDetails : new FormControl()
    })
  }

  initialiseFormPlan(){
    this.timelineForm = new FormGroup({
      title : new FormControl(),
      description: new FormControl(),
      date : new FormControl()
    })
  }

  populateModelTimeline(){
    this.modelT ={
      'bidId' : this?.bidId,
      'title' : this.timelineForm?.controls['title']?.value,
      'description' : this.timelineForm?.controls['description']?.value,
      'date' : this.timelineForm?.controls['date']?.value,
          
    }
  }

  addTimeline(){
    if(this.timelineForm.value){
      this.populateModelTimeline();
      this.bidService.addTimeline(this.modelT).subscribe(response=>{
        this.toastr.success();
        this.getTimeline(this.bidId);        
      },error =>{
        this.toastr.error(error.error);
      })
    }
  }

  getTimeline(id : any){
    this.bidService.getTimeline(id).subscribe(response =>{
      this.timelineData = response;
      //const p = document.getElementById(response.timelineId.toString());
      //p.style.backgroundColor ="#ccc";
    })
  }

  test(){
    const timeline = document.getElementById("comment");
    const p = document.createElement("p");
    const h = document.createElement("h4");
    h.textContent = this.timelineForm?.get('date')?.value;    
    p.setAttribute("id",this.timelineForm?.get('title')?.value);
    p.textContent = this.timelineForm?.get('description')?.value;    
    p.style.display ="block";
    const matIcon = document.createElement("i");
    matIcon.setAttribute("id","icon");    
    matIcon.style.cursor ="pointer";
    matIcon.className +="fa fa-trash-o";
    matIcon.setAttribute("id","test"+this.timelineForm?.get('title')?.value);
    matIcon.addEventListener('click',(e)=>{
        this.test2(e);
        
    })
    p.appendChild(h);
    p.appendChild(matIcon);

   // var styleElem = document.head.appendChild(document.createElement("style"));
   // styleElem.innerHTML = ".comment p:nth-child(odd)::before , .comment p:nth-child(even)::before{ content: '10/02/2022'}";
    timeline?.appendChild(p);
    
  }

  test2(e){
    console.log("works");
    console.log(e.srcElement.id);
    var x = document.getElementById(e.srcElement.id).parentElement.id;
    console.log(x);
    var toRemove = document.getElementById(x);
    toRemove.remove();
  }

  bidTest(){
    
    this.bidF = !this.bidF;
  }

}

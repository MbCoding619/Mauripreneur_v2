import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { timeline } from 'src/app/_models/timeline';
import { BidService } from 'src/app/_services/bid.service';

interface Status {
	value : string;
	viewValue : string;
}
@Component({
  selector: 'app-bid-sent',
  templateUrl: './bid-sent.component.html',
  styleUrls: ['./bid-sent.component.css']
})

export class BidSentComponent implements OnInit {

  displayedColumns : string[] =['bidId','imagePath','name','jobTitle','jobDescription','budget','action'];
  dataSource : MatTableDataSource<any>;
  username = '';
  modelB : any;
  modelT : any;
  modelTE : any;
  showBid = false;
  timeEdit = false;
  BidForm : FormGroup;
  bidData : any;
  social :any;
  timelineForm : FormGroup;
  timelineData : timeline;
  timelineEditData : timeline;
  public myAngularxQrCode: string = null;

  statuses: Status [] = [
    {value: 'noneSelected', viewValue: 'None'},
    {value: 'INTERESTED', viewValue: 'Showed Interest'},
    {value: 'PENDING', viewValue: 'Pending'},
    {value: 'Accepted', viewValue: 'Approved'},
    {value: 'DECLINED', viewValue: 'Declined'}

  ];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sharedService : SharedService,
    private accountService : AccountsService,
    private toastr : ToastrService,
    private routr : Router,
    private fb : FormBuilder,
    private bidService : BidService) {
      this.myAngularxQrCode = this?.bidData?.social;
     }

  ngOnInit(): void {

    this.accountService.currentUser$.subscribe(response =>{
      this.username = response.username;
    })
    this.initialiseFormBid();
    this.initialiseFormPlan();
    console.log(this.username);
    this.getBidSent(this.username);
   
  }

  getBidSent(username :any){

    this.sharedService.getBidSent(username).subscribe(response =>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      console.log(response);

    },error =>{

      this.toastr.error(error.error);
    })

  }

  getBidSentByStatus(username:any , status :any){
    this.sharedService.getBidSentByStatus(username,status).subscribe(response =>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      console.log(response);

    },error =>{

      this.toastr.error(error.error);
    })
  }

  createImgPath(serverPath : string){
    return `https://localhost:5001/${serverPath}`;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  initialiseFormBid(){
    this.BidForm = new FormGroup({
      description : new FormControl(),
      bidAmount : new FormControl(),
      otherDetails : new FormControl()
    })
  }

  showBidDetails(row : any){
    this.bidData = row;
    this.showBid = true;
    console.log(this.bidData);
    if(this.bidData.bidId !=undefined){
      this.getTimeline(this.bidData.bidId);
    }
  }

  back(){
    this.showBid = false;
  }

  populateModel(){

    this.modelB ={      
      'bidId' : this.bidData.bidId,
      'description' : this.BidForm.controls['description'].value,
      'bidAmount' : this.BidForm.controls['bidAmount'].value,
      'otherDetails': this.BidForm.controls['otherDetails'].value      
    }

    console.log(this.modelB)   

  }

  bid(){
    if(this.BidForm.value)    
    {
      this.populateModel();
      this.bidService.placeBid2(this.modelB).subscribe(response=>{
        console.log(response.bidId);
        //this.toastr.success(); 
      },error =>{
        this.toastr.error(error.error);
      })
    }else{
      console.log("Something Went wrong.")
    }
  }


  initialiseFormPlan(){
    this.timelineForm = this.fb.group({
      title : ['',Validators.required],
      description : ['',Validators.required],
      date : ['',Validators.required]
    })
  }

  populateModelTimeline(){
    this.modelT ={
      'bidId' : this?.bidData?.bidId,
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
        this.getTimeline(this?.bidData?.bidId);
        this.timelineForm.reset();        
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

  populateTimelineForm(){    
    
    this.timelineForm.patchValue({
      title : this.timelineEditData?.title,
      description : this.timelineEditData?.description,
      date : this.timelineEditData?.date
    })

  }

  populateModelTimelineEdit(){
    this.modelTE ={
      'timelineId' : this?.timelineEditData?.timelineId,
      'title' : this.timelineForm?.controls['title']?.value,
      'description' : this.timelineForm?.controls['description']?.value,
      'date' : this.timelineForm?.controls['date']?.value,
    }
  }

  getTimelineById(id :any){
    this.bidService.getTimelineById(id).subscribe(response =>{
      this.timelineEditData = response;
      this.timeEdit = true;      
      this.populateTimelineForm();
      console.log(this.timelineEditData.title);      
    })
  }

  updateTimeline(){
    this.populateModelTimelineEdit();
    this.bidService.updateTimeline(this.modelTE).subscribe(response =>{      
        this.getTimeline(this.bidData.bidId);        
        this.timelineForm.reset();
        this.toastr.success("Updated");
        this.timeEdit = false;
      
    },error=>{
      this.toastr.error(error.error);
    })
  }


  deleteTimelineById(id :number){
    this.bidService.deleteTimelineById(id).subscribe(response=>{  

      this.toastr.success("Deleted");
      this.getTimeline(this.bidData.bidId);
    })

    
    
  }

  onBidStatusFilter(value :any){
    console.log(value);
    if(value ==="noneSelected"){
      this.getBidSent(this.username);
    }else{
      this.getBidSentByStatus(this.username,value);
    }
   
  }

  

  


}

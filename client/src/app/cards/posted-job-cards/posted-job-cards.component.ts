import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountsService } from 'src/app/_services/accounts.service';
import { take } from 'rxjs/operators';
import { SharedService } from 'src/app/_services/shared.service';
import { Job } from 'src/app/_models/job';
import { MatDialog } from '@angular/material/dialog';
import { DialogJobPostedComponent } from 'src/app/dialog/dialog-job-posted/dialog-job-posted.component';


@Component({
  selector: 'app-posted-job-cards',
  templateUrl: './posted-job-cards.component.html',
  styleUrls: ['./posted-job-cards.component.css']
})
export class PostedJobCardsComponent implements OnInit {
  username : string;
  data: Job;
  jobData: Job;
  itemCout : any;
  p =1;

  @Input() params : string;
  @Output() itemCount = new EventEmitter();
  @Output() sendJobData = new EventEmitter<Job>();

  constructor(private accountService : AccountsService,private sharedService : SharedService, private dialog : MatDialog) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(response =>{
      this.username = response.username;
    })
   }

  ngOnInit(): void {
    this.getJobsBySmeId(this.username);
    //console.log(this.params);
    this.getJobByUsernameStatus(this.username,this?.params);
  }


  getJobsBySmeId(username : any){
    this.sharedService.getJobByUsername(username).subscribe(response =>{
      this.data = response;
      //console.log(this.data.jobStatus);
    })
  }

  getJobByUsernameStatus(username : string, status : string){
    this.sharedService.getJobByUsernameStatus(username,status).subscribe(job =>{
      this.jobData = job;
      console.log(this.jobData);
      this.itemCout = Object.keys(this.jobData).length;
      this.itemCount.emit(this.itemCout);
    })
  }

  openDialogJobPosted(row :any){
    const dialogJobPosted = this.dialog.open(DialogJobPostedComponent,{
      data : row,
    })
   
  }

  sendJobDataToParent(job : any){
    this.sendJobData.emit(job);
  }

}

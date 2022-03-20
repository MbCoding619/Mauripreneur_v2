import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Job } from 'src/app/_models/job';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-job-posted',
  templateUrl: './job-posted.component.html',
  styleUrls: ['./job-posted.component.css']
})
export class JobPostedComponent implements OnInit {

jobs : Job[];
fieldList : any[];
  constructor(private sharedService : SharedService,
    private accountService : AccountsService) { }

  ngOnInit(): void {

    this.sharedService.getAllJob().subscribe( job => this.jobs = job)
   
  }


  getFields(){

    this.sharedService.getFields().subscribe((response:any)=>{

      this.fieldList = response;

    })
  }

}

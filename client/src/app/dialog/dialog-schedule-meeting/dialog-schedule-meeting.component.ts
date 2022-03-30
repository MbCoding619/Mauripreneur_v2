import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CalendarViewComponent } from 'src/app/calendar/calendar-view/calendar-view.component';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-dialog-schedule-meeting',
  templateUrl: './dialog-schedule-meeting.component.html',
  styleUrls: ['./dialog-schedule-meeting.component.css']
})
export class DialogScheduleMeetingComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<DialogScheduleMeetingComponent>,@Inject(MAT_DIALOG_DATA) public meetData :any, private sharedService : SharedService,
  private accountService : AccountsService,
  private toastr : ToastrService ) { }

  meetForm : FormGroup;
  model : any ={};
  username = '';
  bidId : any;
  profId : any;

  ngOnInit(): void {

    console.log(this.meetData);
    this.bidId = this.meetData.bidId;
    this.profId = this.meetData.profId;
    this.initialiseForm();
    this.accountService.currentUser$.subscribe(uname =>{
      this.username = uname.username;
});

  


  }

  initialiseForm(){
    this.meetForm = new FormGroup({
      meetTitle : new FormControl(),
      startDate : new FormControl(),
      endDate : new FormControl()
    })
  }

  populateModel(){

    this.model ={
      'username' : this.username?.toLowerCase(),
      'meetTitle' : this.meetForm.controls['meetTitle'].value,
      'startDate' : this.meetForm.controls['startDate'].value,
      'endDate' : this.meetForm.controls['endDate'].value,
      'bidId' : this.bidId,
      'profId' : this.profId
      
    }
    localStorage.setItem('meetTitle',this.model.meetTitle);
    localStorage.setItem('startDate',this.model.startDate);
    localStorage.setItem('endDate',this.model.endDate);

    console.log(this.model)   

  }

  scheduleMeeting(){
    this.populateModel();    
    if(this.model !=null){
      this.sharedService.scheduleMeeting(this.model).subscribe(response =>{

        console.log(response);
        this.toastr.success();
        this.dialogRef.close();
      },error =>{
        this.toastr.error(error.error);
      })
    }
  }

}

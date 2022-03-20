import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-dialog-job-edit',
  templateUrl: './dialog-job-edit.component.html',
  styleUrls: ['./dialog-job-edit.component.css']
})
export class DialogJobEditComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<DialogJobEditComponent>,@Inject(MAT_DIALOG_DATA) public editData :any, private sharedService : SharedService,
  private accountService : AccountsService,
  private toastr : ToastrService  
    ) { }
   BidForm : FormGroup;
   model : any ={};
   username ='';
  ngOnInit(): void {

    console.log(this.editData);
    this.initialiseForm();
    this.accountService.currentUser$.subscribe(uname =>{
      this.username = uname.username;
});

  }

  initialiseForm(){
    this.BidForm = new FormGroup({
      description : new FormControl(),
      bidAmount : new FormControl(),
      otherDetails : new FormControl()
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }

  populateModel(){

    this.model ={
      'username' : this.username?.toLowerCase(),
      'jobId' : this.editData,
      'description' : this.BidForm.controls['description'].value,
      'bidAmount' : this.BidForm.controls['bidAmount'].value,
      'otherDetails': this.BidForm.controls['otherDetails'].value      
    }

    console.log(this.model)   

  }

  bid(){

    this.populateModel();
    if(this.model !=null){
      this.sharedService.placeBid(this.model).subscribe(response =>{
        console.log(response);
        this.toastr.show(response.Status);
      },error=>{
        this.toastr.error(error.error);
      })
    }

  }

}

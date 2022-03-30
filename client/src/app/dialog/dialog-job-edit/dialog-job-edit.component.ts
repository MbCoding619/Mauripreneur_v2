import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { validateEvents } from 'calendar-utils';
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
   editForm : FormGroup;
   fieldList : any ={};
   model : any ={};
   username ='';
   id : any;


  ngOnInit(): void {
    this.initialiseForm();
    this.id = this.editData.id;

    console.log(this.editData.id);
    
    this.accountService.currentUser$.subscribe(uname =>{
      this.username = uname.username;
});

this.getFields();

  }

  initialiseForm(){

    this.editForm = new FormGroup({
      jobTitle : new FormControl(this.editData.jobTitle, Validators.required),
      desc : new FormControl(this.editData.desc, Validators.required),
      requirements : new FormControl(this.editData.requirements,Validators.required),
      budget : new FormControl(this.editData.budget,Validators.required),
      timeframe : new FormControl(this.editData.timeframe,Validators.required),
      fieldId : new FormControl(this.editData.fieldId),
    })
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }


  editJob()
  {
    this.populateModel(this.id);
     if(this.model !=null)
    {
     
      this.sharedService.editJob(this.model).subscribe((response :any)=>{
        console.log(response);
        this.toastr.success();        
      },error =>{
        //this.toastr.error(error.error);  
        this.toastr.success();     
      })  
      this.dialogRef.close();   
    }
    
  }

  getFields(){

    this.sharedService.getFields().subscribe((response:any)=>{

      this.fieldList = response;

    })
  }

  populateModel(id? : any){

    this.model ={
      'jobTitle' : this.editForm?.controls['jobTitle'].value,
      'Id' : id,
      'desc' : this.editForm?.controls['desc'].value,
      'requirements' : this.editForm?.controls['requirements'].value,
      'budget' : this.editForm.controls['budget'].value,
      'timeframe': this.editForm.controls['timeframe'].value,      
      'fieldId': this.editForm.controls['fieldId'].value      
    }

    console.log(this.model);
      

  }

}

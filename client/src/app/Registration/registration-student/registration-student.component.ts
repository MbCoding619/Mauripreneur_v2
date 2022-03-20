import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};





@Component({
  selector: 'app-registration-student',
  templateUrl: './registration-student.component.html',
  styleUrls: ['./registration-student.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]

})
export class RegistrationStudentComponent implements OnInit {
  fieldList: any;
  registerForm: FormGroup;
  facCalendarDays = faCalendarDays;
  username : any;
  testUse = this.accountService.currentUser$.subscribe(response =>{

    this.username = response.username;

  })
   

  constructor(private sharedService: SharedService,
    private accountService : AccountsService,
    private router : Router,
    private toastr : ToastrService) { }

  ngOnInit(): void {

    this.getFields();
    this.initializeForm();    
    
  }

  initializeForm(){
    this.registerForm = new FormGroup({

      username: new FormControl(this.username,Validators.required),
      FName : new FormControl(),
      LName : new FormControl(),
      Phone : new FormControl(),
      Address : new FormControl(),
      email : new FormControl(),
      Uni : new FormControl(),
      Course : new FormControl(),
      Course_level : new FormControl(),
      LinkedInLink : new FormControl(),      
      briefDescription : new FormControl(),
      FieldId : new FormControl()


    })
  }

  getFields(){

    this.sharedService.getFields().subscribe((response:any)=>{

      this.fieldList = response;

    })
  }

  registerStud(){
    this.accountService.registerStud(this.registerForm.value).subscribe(response =>{

      console.log(response);
      this.router.navigateByUrl('/');

    },error =>{
      this.toastr.error(error.error);
    })
  }

  
}

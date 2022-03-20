import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';


@Component({
  selector: 'app-register-professional',
  templateUrl: './register-professional.component.html',
  styleUrls: ['./register-professional.component.css']
})
export class RegisterProfessionalComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any ={}; 
  fieldList: any;
  username:any;
  testUse = this.accountService.currentUser$.subscribe(response =>{

    this.username = response.username;

  })
  registerForm: FormGroup;

  constructor(private sharedService : SharedService,
    private accountService: AccountsService,
    private router : Router,
    private toastr : ToastrService) {}

  ngOnInit(): void {
    
    this.initiliazeForm();
    this.getFields();

    
  }

  initiliazeForm(){
    this.registerForm = new FormGroup({
      username: new FormControl(this.username),
      FName : new FormControl(),
      LName: new FormControl(),
      Email: new FormControl(),
      Address: new FormControl(),
      IDNum: new FormControl(),
      FieldId: new FormControl(),
      Phone: new FormControl(),
      Qual1: new FormControl(),
      Qual2: new FormControl(),
      LinkedInLink: new FormControl(),
      EducationInstition: new FormControl(),
      BriefDesc : new FormControl(),
      EmploymentHistory: new FormControl(),
      EmploymentStatus: new FormControl()
    })
  }


  registerProf(){
    this.accountService.registerProf(this.registerForm.value).subscribe(response =>{
      
      console.log(response);
      this.router.navigateByUrl('/');

    },error =>{
      this.toastr.error(error.error);
    })
  }

 

  getFields(){

    this.sharedService.getFields().subscribe((response:any)=>{

      this.fieldList = response;

    })
  }

}

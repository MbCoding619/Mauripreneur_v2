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
  formDataSubmit = new FormData();
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
    this.formDataSubmit.append('username',this.registerForm.controls["username"]?.value);
    this.formDataSubmit.append('fName',this.registerForm.controls["FName"]?.value);
    this.formDataSubmit.append('lName',this.registerForm.controls["LName"]?.value);
    this.formDataSubmit.append('address',this.registerForm.controls["Address"]?.value);
    this.formDataSubmit.append('iDNum',this.registerForm.controls["IDNum"]?.value);
    this.formDataSubmit.append('phone',this.registerForm.controls["Phone"]?.value);
    this.formDataSubmit.append('qual1',this.registerForm.controls["Qual1"]?.value);
    this.formDataSubmit.append('qual2',this.registerForm.controls["Qual2"]?.value);
    this.formDataSubmit.append('fieldId',this.registerForm.controls["FieldId"]?.value);
    this.formDataSubmit.append('educationInstition',this.registerForm.controls["EducationInstition"]?.value);
    this.formDataSubmit.append('briefDesc',this.registerForm.controls["BriefDesc"]?.value);
    this.formDataSubmit.append('employmentHistory',this.registerForm.controls["EmploymentHistory"]?.value);
    this.formDataSubmit.append('employmentStatus',this.registerForm.controls["EmploymentStatus"]?.value);

    this.accountService.registerProf(this.formDataSubmit).subscribe(response =>{
      
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

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    //const formData = new FormData();
    this.formDataSubmit.append('file', fileToUpload, fileToUpload.name);  
  };


}

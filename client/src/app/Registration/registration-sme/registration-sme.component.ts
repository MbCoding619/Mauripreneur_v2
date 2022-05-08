import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-registration-sme',
  templateUrl: './registration-sme.component.html',
  styleUrls: ['./registration-sme.component.css']
})
export class RegistrationSmeComponent implements OnInit {
  
  model: any ={}; 
  registerForm : FormGroup;
  public progress: number;
  public message: string;
  id : any;
  username : any;
  formDataSubmit = new FormData();

  

  constructor(private accountService : AccountsService,
    private toastr : ToastrService,
    private router : Router,
    private fb : FormBuilder,
    private sharedService : SharedService) { }

  ngOnInit(): void {

   
   this.accountService.currentUser$.pipe(take(1)).subscribe(response =>{
     this.username = response.username;
   })

   this.initializeForm();
  }
  
  initializeForm(){
    this.registerForm = this.fb.group({
      representName :['',Validators.required],
      representLName : ['',Validators.required],
      email : ['',[Validators.email, Validators.required]],
      address : ['',[Validators.required,Validators.minLength(10),Validators.maxLength(70)]],
      compName : ['',Validators.required],
      username : [this.username,Validators.required],
      representPhone :['',[Validators.required, Validators.minLength(8),Validators.maxLength(8)]]
    })
  }


  registerSme(){

    this.formDataSubmit.append('representName',this.registerForm.controls["representName"]?.value);
    this.formDataSubmit.append('representLName',this.registerForm.controls["representLName"]?.value);
    this.formDataSubmit.append('email',this.registerForm.controls["email"]?.value);
    this.formDataSubmit.append('address',this.registerForm.controls["address"]?.value);
    this.formDataSubmit.append('compName',this.registerForm.controls["compName"]?.value);
    this.formDataSubmit.append('username',this.registerForm.controls["username"]?.value);
    this.formDataSubmit.append('representPhone',this.registerForm.controls["representPhone"]?.value);

    this.accountService.registerSme(this.formDataSubmit).subscribe(response =>{

      console.log(response);   
      this.router.navigateByUrl('/');
    },error =>{
      this.toastr.error(error.error);
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

  cancel(){
    this.router.navigateByUrl('/Registration/Choice');
  }




}

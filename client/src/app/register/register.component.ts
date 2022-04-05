import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from '../_services/accounts.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import Validation from '../_utils/validation';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  //by using the @Input makes the parent component transmit data to the chld component
  //then need to go to the child template and  add [usersFromHomeComponent] to the child component tag
  // and assign it to the variable we need to capture in the parent 
  //@Input() usersFromHomeComponent: any;
  //When sending info from child component to Parent component
  //the Following annotation is used
  //when sending this we used EventEmmitter
  //While importing EventEmitter, make sure that it comes from Angular/core 
  //not other packages.
  //Step 1: Describe Output property
  //Step 2 : Set the EventEmitter
  //Step 3 : See template of home compoment to see step 3
  // Step 4: go to home component(Parent) -> create a function which has parameters event then assign it to step 3 with 
  //Even paramater called : $event


  @Output() cancelRegister = new EventEmitter();
  model: any ={}; 
  registerForm : FormGroup;
  submitted = false;
  validationErrors: string[] = [];

  constructor(private accountService : AccountsService,
    private toastr: ToastrService,
    private router : Router,private fb : FormBuilder) { }

  ngOnInit(): void {
   this.initializeForm();
  }

  registerUser(){
    this.accountService.registerUser(this.registerForm.value).subscribe(response =>{
      console.log(response);
      this.router.navigateByUrl('Registration/Choice');
    },error =>{
      console.log(error);
      this.toastr.error(error.error);
    })
  }
  initializeForm(){
    this.registerForm = this.fb.group(
      {
        username : ['', Validators.required],
        password : ['',[Validators.required,Validators.minLength(6), Validators.maxLength(16)]],
        confirmPassword : ['',[Validators.required, this.matchValues('password')]]

      }
    )
  }


  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true}
    }
  }

  



 
 

  cancel(){
    this.cancelRegister.emit(false);
  }
}

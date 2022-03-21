import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-organisation',
  templateUrl: './registration-organisation.component.html',
  styleUrls: ['./registration-organisation.component.css']
})
export class RegistrationOrganisationComponent implements OnInit {

  constructor(private sharedService: SharedService,
    private accountService : AccountsService,
    private router : Router,
    private toastr : ToastrService) { }

    fieldList: any;
    registerForm: FormGroup;    
    username : any;
    testUse = this.accountService.currentUser$.subscribe(response =>{
  
      this.username = response.username;
  
    })

  ngOnInit(): void {

    
   
    this.initializeForm(); 
  }

  
  initializeForm(){
    this.registerForm = new FormGroup({

      username : new FormControl(this.username,Validators.required),
      OrgName : new FormControl(),
      Address : new FormControl(),
      email : new FormControl(),
      Phone : new FormControl(),
      OrgRepresent_LName : new FormControl(),
      OrgRepresent_FName : new FormControl()      


    })
  }

  registerOrg(){
    this.accountService.registerOrg(this.registerForm.value).subscribe(response =>{

      console.log(response);
      this.router.navigateByUrl('/');

    },error =>{
      this.toastr.error(error.error);
    })
  }


}

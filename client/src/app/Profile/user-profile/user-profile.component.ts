import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { smeProfile } from 'src/app/_models/smeProfile';
import { AccountsService } from 'src/app/_services/accounts.service';
import { MembersService } from 'src/app/_services/members.service';
import {User} from 'src/app/_models/user';
import { ToastrService } from 'ngx-toastr';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  editFormSme : FormGroup;
  user : User;
  sme : smeProfile;

  constructor(private fb : FormBuilder, private memberService : MembersService, public accountService: AccountsService,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
      console.log(this.user.username);
    })
    if(this.user.appUserRole =="SME"){
      this.getSmeByUsername(this.user.username);   
    }
    
    
  }

  initializeFormSme(){
    this.editFormSme = this.fb.group({
      id: [this.sme?.id],
      compName: [this.sme?.compName,Validators.required],
      address: [this.sme?.address,Validators.required],
      email: [this.sme?.email,[Validators.required, Validators.email]],
      representName: [this.sme?.representName,Validators.required],
      representLName: [this.sme?.representLName,Validators.required],
      representPhone: [this.sme?.representPhone,Validators.required],
      socialLink: [this.sme?.socialLink,Validators.required],
      compDescription: [this.sme?.compDescription,Validators.required]
    })
  }

  getSmeByUsername(username:string){
    this.memberService.getSmeByUsername(username).pipe(take(1)).subscribe( sme =>{
      this.sme = sme;
      console.log(this.sme);
      this.initializeFormSme();
    })
  }

  editSme(){

    this.memberService.editSmeProfile(this.editFormSme.value).subscribe(()=>{
      this.getSmeByUsername(this.user.username);      
    })

    console.log(this.editFormSme.value);
  }


}

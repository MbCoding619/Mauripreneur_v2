import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { smeProfile } from 'src/app/_models/smeProfile';
import { AccountsService } from 'src/app/_services/accounts.service';
import { MembersService } from 'src/app/_services/members.service';
import {User} from 'src/app/_models/user';
import { ToastrService } from 'ngx-toastr';
import { ThisReceiver } from '@angular/compiler';
import { SharedService } from 'src/app/_services/shared.service';
import { profProfile } from 'src/app/_models/profProfile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  editFormSme : FormGroup;
  editFormProf : FormGroup;
  user : User;
  sme : smeProfile;
  prof: profProfile;
  fieldList: any;

  constructor(private fb : FormBuilder, private memberService : MembersService, public accountService: AccountsService,private toastr : ToastrService, private sharedService : SharedService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user;
      console.log(this.user.username);
    })
    
    if(this.user.appUserRole =="SME"){
      this.getSmeByUsername(this.user.username);   
    }else if(this.user.appUserRole =="PROFESSIONAL"){
      this.getFields();
      this.getProfByUsername(this.user.username);      
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

  initializeFormProf(){
    this.editFormProf = this.fb.group({
        id: [this.prof?.id,Validators.required],
        fName : [this.prof?.fName,Validators.required],
        lName: [this.prof?.lName,Validators.required],
        idNum:[this.prof?.idNum,Validators.required],
        address:[this.prof?.address,Validators.required],
        phone:[this.prof?.phone,Validators.required],
        email:[this.prof?.email,Validators.required],
        educationInstition:[this.prof?.educationInstition,Validators.required],
        qual1:[this.prof?.qual1,Validators.required],
        qual2:[this.prof?.qual2,Validators.required],
        linkedInLink:[this.prof?.linkedInLink,Validators.required],
        briefDesc:[this.prof?.briefDesc,Validators.required],
        employmentHistory:[this.prof?.employmentHistory,Validators.required],
        employmentStatus:[this.prof?.employmentStatus,Validators.required],
        fieldId:[this.prof?.fieldId,Validators.required]
    })
  }


  getFields(){

    this.sharedService.getFields().subscribe((response:any)=>{

      this.fieldList = response;

    })
  
  }

  getProfByUsername(username:string){
    this.memberService.getProfByUsername(username).pipe(take(1)).subscribe( prof =>{
      this.prof = prof;
      console.log(this.prof);
      this.initializeFormProf();
    })
  }

  editProf(){
    this.memberService.editProfProile(this.editFormProf.value).subscribe(()=>{
      this.getProfByUsername(this.user.username);
    })
    console.log(this.editFormProf.value);
  }
}

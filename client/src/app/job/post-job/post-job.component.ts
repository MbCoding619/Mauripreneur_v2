import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SharedService } from 'src/app/_services/shared.service';
import { ThrowStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/_services/accounts.service';


interface timeFrame{

  value : string;
  viewValue : string;
    
}

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css'],
  providers : [CurrencyPipe]
})


export class PostJobComponent implements OnInit {

  isLinear = true;
  fieldList: any;
  JobTitle: FormGroup;
  Description: FormGroup;
  Requirements : FormGroup;
  Field : FormGroup;
  TimeFrame : FormGroup;
  Budget : FormGroup;
  selectedValue : string;
  username = '';
 
  timeframes : timeFrame[] = [

    {value: '24-hours', viewValue: '24 hours'},
    {value: '7-days', viewValue: '7-days'},
    {value: '21-days', viewValue: '21 days'},
    {value: 'undefined', viewValue: 'Undefined'},

  ]
  

  test: any ={};

  constructor(private _formBuilder: FormBuilder,
    private sharedService : SharedService,
    private currencyPipe : CurrencyPipe,    
    private toastr : ToastrService,
    private accountService : AccountsService) { }

  ngOnInit(): void {

    this.getFields();

    this.initializeForm();
    this.accountService.currentUser$.subscribe(uname =>{
       this.username = uname.username;
 });
   
  }

  initializeForm(){

    this.JobTitle = this._formBuilder.group({
      jobTitle: ['', Validators.required],
    });
    this.Description = this._formBuilder.group({
      description: ['', Validators.required],
    });
  
    this.Requirements = this._formBuilder.group({
      requirements : ['', Validators.required]
    })

    this.Field = this._formBuilder.group({

      fieldId : ['', Validators.required]
    })
    this.TimeFrame = this._formBuilder.group({

      timeframe : ['', Validators.required] 
    })
    
    this.Budget = this._formBuilder.group({

      budget : ['', Validators.required] 
    })

   
  }

  


  getFields(){

    this.sharedService.getFields().subscribe((response:any)=>{

      this.fieldList = response;

    })
  }

  populateModel(){

    
    this.test = {
      
      'username' : this.username?.toLowerCase(),
      'jobTitle' : this.JobTitle?.get('jobTitle')?.value,
      'requirements' : this.Requirements?.get('requirements')?.value,
      'desc' : this.Description?.get('description')?.value,
      'fieldId' : this.Field?.get('fieldId')?.value,
      'timeFrame' : this.TimeFrame?.get('timeframe')?.value,     
      'budget' : this.Budget?.get('budget')?.value     
    }
  }

  addJob(){

    this.sharedService.addJob(this.test).subscribe(response =>{

      console.log(response);
    },error =>{

       this.toastr.error(error.error);
       console.log(error);
    })
  }

  pushData(){

    console.log(this.test);
  }

}

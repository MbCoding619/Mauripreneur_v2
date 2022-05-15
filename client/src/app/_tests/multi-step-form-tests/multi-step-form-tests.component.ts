import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProgressComponent } from 'src/app/multi-step-form/progress/progress.component';

@Component({
  selector: 'app-multi-step-form-tests',
  templateUrl: './multi-step-form-tests.component.html',
  styleUrls: ['./multi-step-form-tests.component.css']
})
export class MultiStepFormTestsComponent implements OnInit, AfterViewInit {
  testForm = new FormGroup({
    food: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });
  constructor() { }


  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    
  }

  

  goNext(progress : ProgressComponent){
    progress.next();
  }

  onStateChange(event){
    console.log(event);
  }



}

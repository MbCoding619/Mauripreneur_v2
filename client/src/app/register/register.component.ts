import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //by using the @Input makes the child component transmit data to the parent
  //then need to go to the parent template and  add [usersFromHomeComponent] to the child component tag
  // and assign it to the variable we need to capture in the parent 
  @Input() usersFromHomeComponent: any;
  model: any ={}; 
  constructor() { }
  ngOnInit(): void {
   
  }

  register(){
    console.log(this.model);
  }

  cancel(){
    console.log("cancelled");
  }
}

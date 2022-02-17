import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountsService } from '../_services/accounts.service';


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

  constructor(private accountService : AccountsService) { }

  ngOnInit(): void {
   
  }

  register(){
    this.accountService.register(this.model).subscribe(response =>{
      console.log(response);
      this.cancel();
    },error =>{
      console.log(error);
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
 // users: any;  
  

  constructor(public accountService : AccountsService){}

  ngOnInit(): void {
    //this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  //these codes were used in parallel to @Input Annotation in Register component
  // To understand how Parent child data communication works.
  // getUsers(){
  //   this.http.get('https://localhost:5001/api/user').subscribe(users =>{
  //     this.users =users;
  //   })
  // }

  cancelRegisterMode(event: boolean){

    this.registerMode = event;
  }

}

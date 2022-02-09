import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './_models/user';
import { AccountsService } from './_services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mauripreneur';
  users: any;


  //creating a constructor for the HttpClient module
  constructor(private acountService: AccountsService){}

  //this is generated when making the AppComponent implementing OnInit -> creating a life cycle hook
  //NgOnInit can be used to call method when the app is initialised
  ngOnInit(){
   
   //setting the Current user when iniatlisation of the component.
   this.setCurrentUser();
  }

 
  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.acountService.setCurrentUser(user);
  }
  
}

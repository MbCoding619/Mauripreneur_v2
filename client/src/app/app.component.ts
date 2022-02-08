import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mauripreneur';
  users: any;


  //creating a constructor for the HttpClient module
  constructor(private http: HttpClient){}

  //this is generated when making the AppComponent implementing OnInit -> creating a life cycle hook
  //NgOnInit can be used to call method when the app is initialised
  ngOnInit(){
   this.getUsers();
  }

  getUsers(){
     //to get access to any aspect of this class. we are using this
    //using this calling http client and the get method of the httpclienbt
    //the get methods can take 2 parameters 
    //1st param is the URL
    //2nd param is options which is optional --> Read on it
    //then to get the data we use the  .subscribe method.
    // the get method returns someting call Observarable
    this.http.get('https://localhost:5001/api/user').subscribe(response => {
      //allocating the resposne to users
       this.users = response;

       

    },
    //catching the error and displaying it in console
    error =>{
      console.log(error);
    })

  }
  
}

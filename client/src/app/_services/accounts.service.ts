import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { Sme } from '../_models/sme';


//this is called an angular service
//this means that a service can be injected in other or other services in the application
//the meta data providedIn root
@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  baseUrl = 'https://localhost:5001/api/';
  //A replaySubject is a like a buffer object. 
  //Its an observables. of type USer from Model interface
  // of size 1
  private currentUserSource = new ReplaySubject<User>(1);
  private currentSmeSource = new ReplaySubject<Sme>(1);
  //when declaring an observable use '$' at end of name.. its a convention
  //By creating this observable. we can persist the login of a user without using Session
  //Note that the size of this observable helps us in assigning only one user.
  currentUser$ = this.currentUserSource.asObservable();
  currentSme$ = this.currentSmeSource.asObservable();

  constructor(private http: HttpClient ) { }
 

  login(model : any){
    return this.http.post(this.baseUrl+'account/login',model).pipe(
      map((response: User) =>{
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
                   
        }
      })
    );
  }

  registerUser(model : any){

    return this.http.post(this.baseUrl+'account/register',model).pipe(

      map((user : User) =>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
          return(user);          
        }
      })
    )
  }

  registerSme(model : any){
    return this.http.post(this.baseUrl+'account/registerSme',model).pipe(

      map((sme : Sme)=>{

        if(sme){
          localStorage.setItem('SmeAppId',JSON.stringify(sme));
          return(sme);
          this.currentSmeSource.next(sme);          
        }
      })
    )

  }





  // Setting the data of the current user to the Observable object
  //This service function is re used in the App component module with a function with same name.
  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }
  
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}

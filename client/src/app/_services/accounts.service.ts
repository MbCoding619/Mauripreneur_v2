import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';


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
  //when declaring an observable use '$' at end of name.. its a convention
  //By creating this observable. we can persist the login of a user without using Session
  //Note that the size of this observable helps us in assigning only one user.
  currentUser$ = this.currentUserSource.asObservable();

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

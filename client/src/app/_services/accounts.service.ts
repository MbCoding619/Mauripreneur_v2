import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { Sme } from '../_models/sme';
import { Professional } from '../_models/professional';
import { Student } from '../_models/student';
import { Organisation } from '../_models/organisation';
import { environment } from 'src/environments/environment';


//this is called an angular service
//this means that a service can be injected in other or other services in the application
//the meta data providedIn root
@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  baseUrl = environment.apiUrl;
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
          //localStorage.setItem('username',JSON.stringify(user.username));
          this.currentUserSource.next(user);          
          return user;     
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
                  
        }
      })
    )

  }

  registerProf(model : any){

    return this.http.post(this.baseUrl+'account/registerProf',model).pipe(

      map((prof : Professional)=>{

        if(prof){
          localStorage.setItem('ProfAppId',JSON.stringify(prof));
          return(prof);
        }
        
      })

    )

  }

  registerStud(model : any){

    return this.http.post(this.baseUrl+'account/registerStud',model).pipe(

      map((stud : Student)=>{

        if(stud){
          localStorage.setItem('StudAppId',JSON.stringify(stud));
          return(stud);
        }
      })
    )

  }


  registerOrg(model : any){

    return this.http.post(this.baseUrl+'account/registerOrg',model).pipe(

      map((org : Organisation)=>{

        if(org){
          localStorage.setItem('OrgAppId',JSON.stringify(org));
          return(org);
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
    localStorage.clear();
    this.currentUserSource.next(null);
  }
}

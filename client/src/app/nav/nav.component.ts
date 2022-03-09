import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountsService } from '../_services/accounts.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public isCollapsed = false;
  closeResult ='';
  model : any ={};
  //instead of initialising the Current user Observable and then calling the account service.
  //We just have to make the constructor for AccountService public and access it directly in the template.
  //currentUser$ : Observable<User>;
  userWelcome ='';
  userInform: any;
  modalReference: any;
  
  
  
  constructor(private modalService : NgbModal,
    public accountService: AccountsService){};


  ngOnInit() : void {
    
  }

  private getDismissReason(reason: any) : string {
    if(reason === ModalDismissReasons.ESC){
      return 'by pressing ESC';
    }else if(reason === ModalDismissReasons.BACKDROP_CLICK){
      return 'by click on a backdrop';
    }else {
      return 'with: ${reason}';
    }
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  login(){
    this.accountService.login(this.model).subscribe(response =>{
      console.log(response);
      this.userInform = JSON.parse(localStorage.getItem('user')); // The Variable doesn't persist.
      this.userWelcome = this.userInform.username;
                   
    },error =>{
      console.log(error);
    })
  }

  logout(){
    this.accountService.logout();
    
    
  }
  
  // getCurrentUser(){
  //   this.accountService.currentUser$.subscribe(user =>{
  //     //double !! makes the object a boolean 
  //     //Saying if Null so its false. but if not null its true.
  //     this.loggedIn = !!user;
  //     this.userInform = JSON.parse(localStorage.getItem('user'));
  //     this.userWelcome = this.userInform.username;
      
  //   },error =>{
  //     console.log(error);
  //   })
  // }

}

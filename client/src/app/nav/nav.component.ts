import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
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
  loggedIn: boolean;
  userWelcome ='';
  userInform: any;
  
  
  
  constructor(private modalService : NgbModal,
    private accountService: AccountsService){};


  ngOnInit() : void {
    this.getCurrentUser();
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
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  login(){
    this.accountService.login(this.model).subscribe(response =>{
      console.log(response);
      this.loggedIn = true;
    },error =>{
      console.log(error);
    })
  }

  logout(){
    this.accountService.logout();
    this.loggedIn = false;
    
  }
  
  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user =>{
      //double !! makes the object a boolean 
      //Saying if Null so its false. but if not null its true.
      this.loggedIn = !!user;
      this.userInform = JSON.parse(localStorage.getItem('user'));
      this.userWelcome = this.userInform.username;
      
    },error =>{
      console.log(error);
    })
  }

}

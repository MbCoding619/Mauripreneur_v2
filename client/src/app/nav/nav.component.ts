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
  
  
  
  constructor(private modalService : NgbModal,
    private accountService: AccountsService){};


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
    this.loggedIn = false;
    
  }
  

}

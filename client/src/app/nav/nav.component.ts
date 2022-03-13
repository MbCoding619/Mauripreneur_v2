import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountsService } from '../_services/accounts.service';
import { faTwitter,  faFacebookF, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public isCollapsed = false;
  faTwitter = faTwitter;
  faFacebookF = faFacebookF;
  faInstagramSquare = faInstagramSquare;
  closeResult ='';
  model : any ={};
  //instead of initialising the Current user Observable and then calling the account service.
  //We just have to make the constructor for AccountService public and access it directly in the template.
  //currentUser$ : Observable<User>;
  userWelcome ='';
  userRole ='';
  modalReference: any;
  
  
  
  
  constructor(private modalService : NgbModal,
    public accountService: AccountsService,
    private router: Router,
    private toastr: ToastrService){};


  ngOnInit() : void {

    
    
  }
  // Get reasons why Modal was dismissed
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
      //this.userInform = JSON.parse(localStorage.getItem('user')); // The Variable doesn't persist.
      //this.userWelcome = this.userInform.username;
      this.userRole = response.AppUserRole;
      this.accountService.currentUser$.subscribe( b =>{
        this.userWelcome = b.username;       
        
      }) // This above method also does not persist
     
      this.modalService.dismissAll({
        'dismissed': true
      })
      this.router.navigateByUrl('/');

                   
    },error =>{
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');  
    this.userWelcome =''; 
    
  }

  
  
  getUserRole(){
    this.accountService.currentUser$.subscribe(user =>{

      this.userRole = user.AppUserRole;
      console.log(this.userRole);
    },error =>{
      console.log(error);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountsService } from '../_services/accounts.service';
import { faTwitter,  faFacebookF, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { take } from 'rxjs/operators';
import { el } from 'date-fns/locale';
import { environment } from 'src/environments/environment';



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
  userWelcome :any;
  userRole ='';
  currentUser : User;
  modalReference: any;
  baseImgUrl = environment.apiImg;
  
  
  
  
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
      console.log(response.appUserId);
      if(response.appUserRole  == "ADMIN"){
        this.router.navigateByUrl('Admin/Dashboard');
        console.log(response.appUserRole);
      }else{
        this.router.navigateByUrl('');
        console.log(response.appUserRole)
      }   
         
      this.modalService.dismissAll({
        'dismissed': true
      })                   
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
    this.accountService.currentUser$.pipe(take(1)).subscribe( user => this.currentUser = user);
  }

 

  createImgPath(serverPath : string){
    return `${this.baseImgUrl}${serverPath}`;
  }

}

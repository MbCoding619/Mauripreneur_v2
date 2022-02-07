import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public isCollapsed = false;
  closeResult ='';

  
  private getDismissReason(reason: any) : string {
    if(reason === ModalDismissReasons.ESC){
      return 'by pressing ESC';
    }else if(reason === ModalDismissReasons.BACKDROP_CLICK){
      return 'by click on a backdrop';
    }else {
      return 'with: ${reason}';
    }
  }

  
  constructor(private modalService : NgbModal){};

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngOnInit() {

  }


  

}

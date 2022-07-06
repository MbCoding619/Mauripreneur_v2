import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { bidProfCard } from 'src/app/_models/bidProfCard';
import { AccountsService } from 'src/app/_services/accounts.service';
import { BidService } from 'src/app/_services/bid.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prof-bid-card',
  templateUrl: './prof-bid-card.component.html',
  styleUrls: ['./prof-bid-card.component.css']
})
export class ProfBidCardComponent implements OnInit {
  @Input() params : any;
  @Input() bidResponse :string;
  @Output() sendData  = new EventEmitter<{bidId : string}>();
  @Output() sendBidData = new EventEmitter<bidProfCard>();
  bidData :any;
  user : User;
  biD:string;
  bidProfdata : bidProfCard;
  bidProfData2 : bidProfCard;
  p =1;
  model : any;
  baseImgUrl = environment.apiImg;

  constructor(private bidService : BidService, private accountService : AccountsService,
              private toastr : ToastrService) {

    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
        this.user = user;
       
    })
   }

  ngOnInit(): void {

    

    this.getBidProfByJobId(this.params,this.bidResponse);
  }



  getBidProfByJobId(id :number,bidResponse:string){
 this.bidService.getBidProfByJobId(id,bidResponse).subscribe(response => {
   if(response){
     this.bidProfdata = response;
     console.log(this.bidProfdata);
     //this.loadCard();
     
   }
 })
} 

acceptBid(bidData :bidProfCard){
  this.model = {
    "bidId" : bidData.bidId,
    "username" : this.user?.username
  }

  this.bidService.acceptBid(this.model).subscribe(response =>{
    this.toastr.success(response.status);
  });
}

declineBid(bidData : bidProfCard){
  this.model = {
    "bidId" : bidData.bidId,
    "username" : this.user?.username
  }

  this.bidService.declineBid(this.model).subscribe(response => {
    this.toastr.success(response.status);
  })
}

showTimelineTab(bidId :string,bidData :bidProfCard){
  // this.bidData = {
  //   "bidId" : bidId,
  //   "timelineShow" : true
  // };
  // console.log(this.bidData,"wa 2eme la sa");
  this.biD = bidId;
  console.log(this.biD);
    this.sendData.emit({bidId : this.biD});
    this.bidProfData2 = bidData;
    this.sendBidData.emit(this.bidProfData2);
}





  activateCard(i : any,e : Event) {
    let btnClass ="card-btn"
    const buttons = document.querySelectorAll(btnClass+i);
    //console.log(buttons);
    let id : string = (e.target as Element).id;
    const button = document.getElementById(id);
    //console.log(button);
    let cardSecId = ".card-sec"
    const sections = document.querySelectorAll(cardSecId+i);
    //console.log(sections);
    let cardId = "card-";
    const card = document.getElementById(cardId+i);
    //console.log(card);

    const targetSection = button.getAttribute("data-section");
    //console.log(targetSection);
    const section = document.getElementById(targetSection);
    //console.log(section);
    

    targetSection !== "#about"+i ?

    card.classList.add("is-active") :
  
    card.classList.remove("is-active");
  
    card.setAttribute("data-state", targetSection);    
    sections.forEach(s => s.classList.remove("is-active"));
    buttons.forEach(b => b.classList.remove("is-active"));

    button.classList.add("is-active");
    section.classList.add("is-active");

  }

 
  createImgPath(serverPath : string){
    return `${this.baseImgUrl}${serverPath}`;
  }



      //This works but is too complicated and has triple click.
  //if loadCard is used on one card. Its available on only one card.
  test(id :any){
    const buttons = document.getElementById(id);

    const handleButtonClick = e =>{
        console.log("wa");
    }
     buttons.addEventListener('click',handleButtonClick);
  }



  loadCard(){
    const buttons = document.querySelectorAll(".card-buttons button");
 
   const sections = document.querySelectorAll(".card-section");
 
   const card = document.querySelector(".card");
 
   const handleButtonClick = e => {
 
   const targetSection = e.target.getAttribute("data-section");
 
   const section = document.querySelector(targetSection);
 
   targetSection !== "#about" ?
 
   card.classList.add("is-active") :
 
   card.classList.remove("is-active");
 
   card.setAttribute("data-state", targetSection);
 
   sections.forEach(s => s.classList.remove("is-active"));
 
   buttons.forEach(b => b.classList.remove("is-active"));
 
   e.target.classList.add("is-active");
 
   section.classList.add("is-active");
 
 };
 
 buttons.forEach(btn => {
 
   btn.addEventListener("click", handleButtonClick);
 
 });
 
 
   }

  //Take this below code logic as reference to any dom manipulation
  // on dynamically generated html component from back end.
  // using index and id naming relating to index.
  test2(i: any,e : Event){
    let id : string = (e.target as Element).id;
    const buttons = document.getElementById(id);
    const p = document.createElement("p");
    //buttons.append(p);
    console.log(buttons);
    console.log(id);

    let cardSecId = ".card-sec"
    const sections = document.querySelectorAll(cardSecId+i);
   // console.log(sections);

    let cardId = "card-";
    const card = document.getElementById(cardId+i);
    //console.log(card);

    //const targetSection = buttons.getAttribute("data-section");
    //const section = document.getElementById(targetSection);
    //console.log(section);
  }
}

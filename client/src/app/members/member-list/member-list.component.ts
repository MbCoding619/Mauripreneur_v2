import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AccountsService } from 'src/app/_services/accounts.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs/operators';
import { UserParams } from 'src/app/_models/userParams';
import { SharedService } from 'src/app/_services/shared.service';
import { field } from 'src/app/_models/field';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
members : User[];
pagination : Pagination;
pageNumber =1;
pageSize = 5;
username ='';
user : User;
userParams : UserParams;
fieldList : field;


constructor(private memberService : MembersService,private accountService : AccountsService, private sharedService : SharedService) { 
  this.accountService.currentUser$.pipe(take(1)).subscribe(response =>{
    this.user = response;
    this.username = response.username;
    this.userParams = new UserParams(response);
  })
}

  ngOnInit(): void {

   this.getFields();
   this.loadMember();
    
  }

//  loadMember(){
//   this.memberService.getAllUsers().subscribe(response =>{
//     this.members = response;
//     console.log(this.members.username);
//   })
//  } 

loadMember(){
  this.memberService.getAllUsers(this.userParams).subscribe(response =>{
    this.members = response.result;
    this.pagination = response.pagination;
  })
}

pageChanged(event :any){
  this.userParams.pageNumber = event.page;
  this.loadMember();
}

getFields(){

  this.sharedService.getFields().subscribe((response:any)=>{

    this.fieldList = response;

  })
}

resetFilters(){
  this.userParams = new UserParams(this.user);
  this.loadMember();
}

}

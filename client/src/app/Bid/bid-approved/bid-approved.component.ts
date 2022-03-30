import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bid-approved',
  templateUrl: './bid-approved.component.html',
  styleUrls: ['./bid-approved.component.css']
})
export class BidApprovedComponent implements OnInit {

  
  displayedColumns : string[] =['bidId','jobTitle','description','name','budget','bidAmount','response'];
  dataSource : MatTableDataSource<any>;
  model : any ={};
  username = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sharedService : SharedService,
    public accountService : AccountsService,
    private toastr : ToastrService,
    private routr : Router) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(response =>{
      this.username = response.username;
    })
    this.getBidApproved(this.username);
  }

  getBidApproved(username : any){
    this.sharedService.getBidAccepted(username).subscribe( response =>{

      this.dataSource = new MatTableDataSource(response);
      //this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;       
      console.log(response);
    },error =>{

      this.toastr.error(error.error);
    })
  }

}

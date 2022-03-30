import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bid-sent',
  templateUrl: './bid-sent.component.html',
  styleUrls: ['./bid-sent.component.css']
})
export class BidSentComponent implements OnInit {

  displayedColumns : string[] =['bidId','jobTitle','description','name','budget','bidAmount','response'];
  dataSource : MatTableDataSource<any>;
  username = '';
  model : any ={};

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sharedService : SharedService,
    private accountService : AccountsService,
    private toastr : ToastrService,
    private routr : Router) { }

  ngOnInit(): void {

    this.accountService.currentUser$.subscribe(response =>{
      this.username = response.username;
    })
    this.getBidSent(this.username);
  }

  getBidSent(username :any){

    this.sharedService.getBidSent(username).subscribe(response =>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      console.log(response);

    },error =>{

      this.toastr.error(error.error);
    })

  }

  


}

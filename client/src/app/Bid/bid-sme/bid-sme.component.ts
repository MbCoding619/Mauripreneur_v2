import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bid-sme',
  templateUrl: './bid-sme.component.html',
  styleUrls: ['./bid-sme.component.css']
})
export class BidSmeComponent implements OnInit {
  displayedColumns : string[] =['bidId','jobTitle','description','name','budget','bidAmount','response' , 'Action'];
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

    this.getJobBySme(this.username);
  }


  getJobBySme(username :any){

    this.sharedService.getBidQuery(username).subscribe( response =>{

      this.dataSource = new MatTableDataSource(response);
      //this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;       
      console.log(response);
    },error =>{

      this.toastr.error(error.error);
    })

  }


  populateModel(bidId : any){

    this.model = {
      'username' : this.username?.toLowerCase(),
      'bidId' : bidId
    }

    //console.log(this.model) 

  }

  acceptBid( bidId : any){

    this.populateModel(bidId);
    this.sharedService.acceptBid(this.model).subscribe(response =>{
      if(response){
        this.toastr.success();
        console.log(response);
        this.routr.navigateByUrl('/Bid/ViewBid');
        
      }
    })
    
  }

}

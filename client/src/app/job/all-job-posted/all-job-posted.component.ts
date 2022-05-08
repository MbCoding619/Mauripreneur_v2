import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogJobEditComponent } from 'src/app/dialog/dialog-job-edit/dialog-job-edit.component';
import { DialogBidComponent } from 'src/app/dialog/dialog-bid/dialog-bid.component';
import { SmeProfileComponent } from 'src/app/dialog/sme-profile/sme-profile.component';
import { jobDetails } from 'src/app/_models/jobDetails';
import { BidService } from 'src/app/_services/bid.service';




@Component({
  selector: 'app-all-job-posted',
  templateUrl: './all-job-posted.component.html',
  styleUrls: ['./all-job-posted.component.css']
})
export class AllJobPostedComponent implements OnInit {
 displayedColumns : string[] =['jobTitle','desc','timeframe','budget' , 'Action'];
 dataSource : MatTableDataSource<any>;
 jobDetails : jobDetails;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) sort: MatSort;

  constructor(private sharedService : SharedService,
    public accountService : AccountsService,
    private toastr : ToastrService, 
    private dialog : MatDialog,
    private bidService : BidService
    ) { }

  ngOnInit(): void {
    this.getAllJob();
    this.getJobDetails();
  
   
  }

  //below code was used to populate table for all jobs posted.
  getAllJob(){

    this.sharedService.getAllJob().subscribe(
      job => {

        this.dataSource = new MatTableDataSource(job);
        //this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;       
        console.log(job);
      },error =>{

        this.toastr.error(error.error);
      }
    )

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getJobDetails(){
    this.sharedService.getJobDetails().subscribe(
      jobDetails =>{
        this.jobDetails = jobDetails;
        //console.log(this.jobDetails);

      },error =>{
        this.toastr.error(error.error);
      }
    )
  }

  createImgPath(serverPath : string){
    return `https://localhost:5001/${serverPath}`;
  }

  openDialog(row : any) {
    const dialogRef = this.dialog.open(SmeProfileComponent,{
        data: row
    });
    this.bidService.clickToBid(row);
  }

  


}

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
import {User} from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { faPray } from '@fortawesome/free-solid-svg-icons';
import { th } from 'date-fns/locale';




@Component({
  selector: 'app-all-job-posted',
  templateUrl: './all-job-posted.component.html',
  styleUrls: ['./all-job-posted.component.css']
})
export class AllJobPostedComponent implements OnInit {
 displayedColumns : string[] =['jobTitle','desc','timeframe','budget' , 'Action'];
 dataSource : MatTableDataSource<any>;
 jobDetails : jobDetails;
 style = '#90afc5';
 user : User;
 textIntent = "Bid";
 bidChek = false;
 appRole : any;
 roleId : any;
 username ='';
 testArray :any[];
 p : number =1;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) sort: MatSort;

  constructor(private sharedService : SharedService,
    public accountService : AccountsService,
    private toastr : ToastrService, 
    private dialog : MatDialog,
    private bidService : BidService
    ) { 
      this.accountService.currentUser$.subscribe(response =>{
        this.user = response;
        this.username = response.username;
        this.appRole = response.appUserRole;
      })
    }

  ngOnInit(): void {

    //this.getAllJob(); -> This api call not working
    this.getJobDetails();    
    console.log(this.username);
    console.log(this.bidChek);
    
    
    
    if(this.appRole === "PROFESSIONAL"){
      this.getRoleId(this.user.appUserId);
     
    }
    
   
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
        this.testArray =Object.values(jobDetails);
        //console.log(this.testArray);
        this.testArray.forEach(element=>{
         // console.log(element.jobId);          
          //this.checkBid(element.jobId,this.username);
          
        })
                       
       
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

  checkBid(jobId : any, username : any){ 

    this.bidService.checkBid(jobId,username).subscribe(response =>{
      if(response.status ==="Bidded"){
        //this.style ='#13C8A6';
        //this.textIntent = "Already Bid";
        this.jobDetails.jobBid = "BID";
        //return "BID";
      }else {
        //this.style ='#90afc5';
        //this.textIntent = "Bid";
        //console.log("wa");
        this.jobDetails.jobBid = "NOT";
       // return "NOT";
      }
    })
  }

  getRoleId(appUserId : any){
    this.sharedService.getRoleId(appUserId).subscribe(respsone =>{
      this.roleId = respsone;
    })
  }

 find = function() {
    try {
      return Array.prototype.slice.call(arguments).reduce(function(acc, key) {
        return acc[key]
      }, this)
    }
    catch(e) {
      return 
    }
  }



  


}

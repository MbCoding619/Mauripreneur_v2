import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Job } from 'src/app/_models/job';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import { DialogJobEditComponent } from 'src/app/dialog/dialog-job-edit/dialog-job-edit.component';


@Component({
  selector: 'app-job-posted',
  templateUrl: './job-posted.component.html',
  styleUrls: ['./job-posted.component.css']
})
export class JobPostedComponent implements OnInit {
  displayedColumns : string[] =['jobTitle','desc','timeframe','budget' , 'Action'];
  dataSource : MatTableDataSource<any>;
username ='';
fieldList : any[];
test : any;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatPaginator) sort: MatSort;

  constructor(private sharedService : SharedService,
    private accountService : AccountsService,
    private toastr : ToastrService, 
    private dialog : MatDialog
    ) { }

  ngOnInit(): void {

   this.accountService.currentUser$.subscribe(response =>{
    this.username = response.username;
  })

  this.getAllJobBySmeId(this.username);
   
  }

  getAllJobBySmeId(username : any){

    this.sharedService.getJobByUsername(username).subscribe(
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

  openDialog(row : any) {
    const dialogRef = this.dialog.open(DialogJobEditComponent,{
        data: row,
        
    });
  }


  getFields(){

    this.sharedService.getFields().subscribe((response:any)=>{

      this.fieldList = response;

    })
  }

}

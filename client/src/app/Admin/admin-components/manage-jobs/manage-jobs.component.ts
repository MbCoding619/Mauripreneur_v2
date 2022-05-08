import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { take } from 'rxjs/operators';
import { AdminService } from 'src/app/_services/admin.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.css']
})
export class ManageJobsComponent implements OnInit {

  displayedColumns : string[] =['id','jobTitle','desc','jobStatus','filePath','Action'];

  dataSource : MatTableDataSource<any>;
  model : any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) sort: MatSort;

  constructor(private adminService : AdminService, private sharedService : SharedService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getAllJob();
  }

  getAllJob(){
    this.adminService.getAllJob().subscribe(jobs=>{
      
      this.dataSource = new MatTableDataSource(jobs);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  download(filePath :any) {
    if(filePath !=null){
      this.sharedService.download(filePath).subscribe((event) => {        
        if(event.type == HttpEventType.Response){
          this.downloadFile(event,filePath);
        }
      },error=>{
        this.toastr.error(error.error);
      });
    }else{
      this.toastr.error();
    }
    
  }

  private downloadFile(data: HttpResponse<Blob>, filePath :any) {
    const downloadedFile = new Blob([data.body], { type: data.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = filePath;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }

  approveJob(id :any){
    this.adminService.approveJob(id,this.model).pipe(take(1)).subscribe(status =>{
      console.log(status);
      this.getAllJob();
    })
    
  }

  declineJob(id:any){
    this.adminService.declineJob(id,this.model).pipe(take(1)).subscribe(status =>{
      console.log(status);
      this.getAllJob();
    })
  }

}

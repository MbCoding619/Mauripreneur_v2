import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrIconClasses, ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/_services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  displayedColumns : string[] =['appUserId','userName','appUserRole','accountStatus','imagePath','Action'];
  dataSource : MatTableDataSource<any>;
  model : any = [];
  baseImgUrl = environment.apiImg;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) sort: MatSort;

  constructor(private router : Router, private route: ActivatedRoute,
    private adminService : AdminService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.adminService.getUsers().subscribe(
      users => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        console.log(users);
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

  createImagePath(fileUrl : any){   
    return `${this.baseImgUrl}${fileUrl}`;
  }

  deactivateUser(appUserId : any){
    this.adminService.deactivatUser(appUserId,this.model).subscribe(resposne=>{
      console.log(resposne);
      
    },error=>{
      this.toastr.error(error.error);
    })
    this.getUsers();
  }

  activateUser(appUserId : any){
    this.adminService.activateUser(appUserId,this.model).subscribe(resposne=>{
      console.log(resposne);
      
    })
    this.getUsers();
  }


  createImgPath(serverPath : string){
    return `${this.baseImgUrl}${serverPath}`;
  }

  

}

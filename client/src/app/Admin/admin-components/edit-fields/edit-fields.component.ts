import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-edit-fields',
  templateUrl: './edit-fields.component.html',
  styleUrls: ['./edit-fields.component.css']
})
export class EditFieldsComponent implements OnInit {
  displayedColumns : string[] =['fieldId','description','fieldStatus','Action'];
  dataSource : MatTableDataSource<any>;
  editForm : FormGroup;
  data : any;
  test:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) sort: MatSort;

  constructor(private adminService : AdminService, private toastr : ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getFields();
    this.initializeForm();
  }

  getFields(){
    this.adminService.getFields().subscribe(
      fields =>{
        this.dataSource = new MatTableDataSource(fields);
        this.dataSource.paginator = this.paginator;
        console.log(fields);
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

  initializeForm(){

    this.editForm = this.fb.group({
      fieldId : ['',Validators.required],
      description: ['',Validators.required],
      fieldStatus: ['',Validators.required]
    })
  }

  getData(element : any){
    this.data = element;
    console.log(this.data);
    this.editForm.setValue(this?.data);
  }

  clearForm(){
    this.editForm.reset();
  }

  addField(){
    
    this.test = {
      "description": this.editForm.controls['description'].value,
      "fieldStatus": this.editForm.controls['fieldStatus'].value
    }

    this.adminService.addField(this.test).subscribe(response=>{
      console.log(response);
      this.getFields();
    })
  }

  editField(){
    this.adminService.editField(this.editForm.value).subscribe(()=>{
      this.getFields();
      console.log(this.editForm.value);
    })
  }

}

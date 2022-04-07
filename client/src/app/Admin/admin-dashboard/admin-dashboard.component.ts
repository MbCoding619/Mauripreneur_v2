import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public isCollapsed = false;
  constructor(private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  editFieldsRoute(){
    this.router.navigate(['EditFields'],{relativeTo:this.route});
  }



}

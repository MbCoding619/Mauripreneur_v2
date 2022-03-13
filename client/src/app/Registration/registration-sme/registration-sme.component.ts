import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/_services/accounts.service';

@Component({
  selector: 'app-registration-sme',
  templateUrl: './registration-sme.component.html',
  styleUrls: ['./registration-sme.component.css']
})
export class RegistrationSmeComponent implements OnInit {
  
  model: any ={}; 

  constructor(private accountService : AccountsService,
    private toastr : ToastrService,
    private router : Router) { }

  ngOnInit(): void {
  }

  registerSme(){

    this.accountService.registerSme(this.model).subscribe(response =>{

      console.log(response);   
      this.router.navigateByUrl('/');
    },error =>{
      this.toastr.error(error.error);
    })

  }

  cancel(){
    this.router.navigateByUrl('/Registration/Choice');
  }

}

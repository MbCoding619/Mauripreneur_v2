import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register-professional',
  templateUrl: './register-professional.component.html',
  styleUrls: ['./register-professional.component.css']
})
export class RegisterProfessionalComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any ={}; 

  constructor() {}

  ngOnInit(): void {
  }

}

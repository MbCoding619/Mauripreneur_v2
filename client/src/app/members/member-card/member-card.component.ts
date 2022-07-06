import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() member : User;
  baseImgUrl = environment.apiImg;
  constructor() { }

  ngOnInit(): void {
  }

  createImgPath(serverPath : string){
    return `${this.baseImgUrl}${serverPath}`;
  }

}

import { Component, OnInit } from '@angular/core';
import { faTwitter,  faFacebookF, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faTwitter = faTwitter;
  faFacebookF = faFacebookF;
  faInstagramSquare = faInstagramSquare;

  constructor() { }

  ngOnInit(): void {
  }

}

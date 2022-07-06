import { Component, OnInit } from '@angular/core';
import { faLinkedinIn,  faFacebookF, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faTwitter = faLinkedinIn;
  faFacebookF = faFacebookF;
  faInstagramSquare = faInstagramSquare;

  constructor() { }

  ngOnInit(): void {
  }

}

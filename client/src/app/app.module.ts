import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './_services/account/account.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CarouselComponent,
    AccountComponent,
    HomeComponent,
    RegisterComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    MatStepperModule,
    ReactiveFormsModule  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

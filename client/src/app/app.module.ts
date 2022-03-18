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
import { RegisterProfessionalComponent } from './Registration/register-professional/register-professional.component';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationSmeComponent } from './Registration/registration-sme/registration-sme.component';
import { RegistrationChoiceComponent } from './Registration/registration-choice/registration-choice.component';
import { RegistrationStudentComponent } from './Registration/registration-student/registration-student.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { PostJobComponent } from './job/post-job/post-job.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';








@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CarouselComponent,
    AccountComponent,
    HomeComponent,
    RegisterComponent,
    RegisterProfessionalComponent,
    RegistrationSmeComponent,
    RegistrationChoiceComponent,
    RegistrationStudentComponent,
    FooterComponent,
    TestErrorsComponent,
    PostJobComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),    
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }),
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule   
         
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

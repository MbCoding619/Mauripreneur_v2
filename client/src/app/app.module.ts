import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

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
import { RegistrationOrganisationComponent } from './Registration/registration-organisation/registration-organisation.component';
import { JobPostedComponent } from './job/job-posted/job-posted.component';
import { CalendarViewComponent } from './calendar/calendar-view/calendar-view.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AllJobPostedComponent } from './job/all-job-posted/all-job-posted.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { DialogJobEditComponent } from './dialog/dialog-job-edit/dialog-job-edit.component';
import { DialogBidComponent } from './dialog/dialog-bid/dialog-bid.component';
import { UserProfileComponent } from './Profile/user-profile/user-profile.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { BidSmeComponent } from './Bid/bid-sme/bid-sme.component';
import { DialogScheduleMeetingComponent } from './dialog/dialog-schedule-meeting/dialog-schedule-meeting.component';
import { BidSentComponent } from './Bid/bid-sent/bid-sent.component';
import { BidApprovedComponent } from './Bid/bid-approved/bid-approved.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { TestUploadComponent } from './_tests/test-upload/test-upload.component';
import { TextAreaComponent } from './_forms/text-area/text-area.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EditFieldsComponent } from './admin/admin-components/edit-fields/edit-fields.component';
import { ManageUsersComponent } from './Admin/admin-components/manage-users/manage-users.component';
import { SmeProfileComponent } from './dialog/sme-profile/sme-profile.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { QRCodeModule } from 'angular2-qrcode';










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
    PostJobComponent,
    RegistrationOrganisationComponent,
    JobPostedComponent,
    CalendarViewComponent,
    AllJobPostedComponent,
    DialogJobEditComponent,
    DialogBidComponent,
    UserProfileComponent,
    AdminDashboardComponent,
    BidSmeComponent,
    DialogScheduleMeetingComponent,
    BidSentComponent,
    BidApprovedComponent,
    TextInputComponent,
    TestUploadComponent,
    TextAreaComponent,
    EditFieldsComponent,
    ManageUsersComponent,
    SmeProfileComponent    
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
    MatRadioModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TabsModule.forRoot(),
    QRCodeModule
    
       
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS,useClass: JwtInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

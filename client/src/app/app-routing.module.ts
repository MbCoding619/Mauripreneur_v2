import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarDayViewComponent } from 'angular-calendar';
import { EditFieldsComponent } from './admin/admin-components/edit-fields/edit-fields.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { BidApprovedComponent } from './Bid/bid-approved/bid-approved.component';
import { BidSentComponent } from './Bid/bid-sent/bid-sent.component';
import { BidSmeComponent } from './Bid/bid-sme/bid-sme.component';
import { CalendarViewComponent } from './calendar/calendar-view/calendar-view.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { AllJobPostedComponent } from './job/all-job-posted/all-job-posted.component';
import { JobPostedComponent } from './job/job-posted/job-posted.component';
import { PostJobComponent } from './job/post-job/post-job.component';
import { UserProfileComponent } from './Profile/user-profile/user-profile.component';
import { RegisterProfessionalComponent } from './Registration/register-professional/register-professional.component';
import { RegistrationChoiceComponent } from './Registration/registration-choice/registration-choice.component';
import { RegistrationOrganisationComponent } from './Registration/registration-organisation/registration-organisation.component';
import { RegistrationSmeComponent } from './Registration/registration-sme/registration-sme.component';
import { RegistrationStudentComponent } from './Registration/registration-student/registration-student.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestUploadComponent } from './_tests/test-upload/test-upload.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'Registration/Professional',component: RegisterProfessionalComponent},
  {path:'Registration/Sme',component: RegistrationSmeComponent},
  {path:'Registration/Student',component: RegistrationStudentComponent},
  {path:'Registration/Organization',component: RegistrationOrganisationComponent},
  {path:'Registration/Choice',component: RegistrationChoiceComponent},
  {path:'Job/PostJob',component: PostJobComponent},
  {path:'Job/JobPosted',component: JobPostedComponent},
  {path:'Job/AllJob',component: AllJobPostedComponent},
  {path:'Calendar/ViewCalendar',component: CalendarViewComponent},
  {path:'User/UserProfile',component: UserProfileComponent},
  {path:'Admin/Dashboard',component: AdminDashboardComponent,
      children:[
        {
          path:'EditFields',
          component : EditFieldsComponent
        }
      ]},
  {path:'Bid/ViewBid',component: BidSmeComponent},
  {path:'Bid/BidSent',component: BidSentComponent},
  {path:'Bid/BidApproved',component: BidApprovedComponent},
  {path:'errors',component: TestErrorsComponent},
  {path:'Test/Upload',component: TestUploadComponent}, 
  {path:'**',component: HomeComponent,pathMatch:'full'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

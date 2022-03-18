import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostJobComponent } from './job/post-job/post-job.component';
import { RegisterProfessionalComponent } from './Registration/register-professional/register-professional.component';
import { RegistrationChoiceComponent } from './Registration/registration-choice/registration-choice.component';
import { RegistrationSmeComponent } from './Registration/registration-sme/registration-sme.component';
import { RegistrationStudentComponent } from './Registration/registration-student/registration-student.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'Registration/Professional',component: RegisterProfessionalComponent},
  {path:'Registration/Sme',component: RegistrationSmeComponent},
  {path:'Registration/Student',component: RegistrationStudentComponent},
  {path:'Registration/Choice',component: RegistrationChoiceComponent},
  {path:'Job/PostJob',component: PostJobComponent},
  {path:'**',component: HomeComponent,pathMatch:'full'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

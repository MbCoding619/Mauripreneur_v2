import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterProfessionalComponent } from './Registration/register-professional/register-professional.component';
import { RegistrationChoiceComponent } from './Registration/registration-choice/registration-choice.component';
import { RegistrationSmeComponent } from './Registration/registration-sme/registration-sme.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'Registration/Professional',component: RegisterProfessionalComponent, canActivate : [AuthGuard]},
  {path:'Registration/Sme',component: RegistrationSmeComponent},
  {path:'Registration/Student',component: RegistrationSmeComponent, canActivate : [AuthGuard]},
  {path:'Registration/Choice',component: RegistrationChoiceComponent},
  {path:'**',component: HomeComponent,pathMatch:'full'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

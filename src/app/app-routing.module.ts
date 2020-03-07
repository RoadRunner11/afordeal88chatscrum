import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { AuthGuard } from './auth.guard';
import { ChangeroleComponent } from './changerole/changerole.component';
import { Createproject } from './createproject';
import { CreategoalComponent } from './creategoal/creategoal.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path : '', component : HomepageComponent},
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'createproject', component: CreateprojectComponent },
  { path: 'creategoal/:user_id', component: CreategoalComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'scrumboard/:project_id', component: ScrumboardComponent, canActivate: [AuthGuard] },
  { path: 'changerole/:role_id', component: ChangeroleComponent,},
  // { path: 'createproject', component: Createproject}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

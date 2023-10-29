import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { SignInComponent } from './page/sign-in/sign-in.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { ForgotPassComponent } from './page/forgot-pass/forgot-pass.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { FaceRecognitionComponent } from './page/face-recognition/face-recognition.component';
import { CardComponent } from './page/dashboard/card/card.component';


const routes: Routes = [
  {
    path: 'dashboard/:id', component: DashboardComponent
  },
  {
    path: 'dashboard/:id/app/:appId', component: CardComponent
  },
  
  {
    path: 'sign-in/forgot-password', component: ForgotPassComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'sign-in', component: SignInComponent
  },
  {
    path: 'sign-in/face-recognition', component: FaceRecognitionComponent
  },
  
  {
    path: '', redirectTo: '/sign-in', pathMatch: 'full'
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

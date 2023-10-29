import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { SignInComponent } from './page/sign-in/sign-in.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { ForgotPassComponent } from './page/forgot-pass/forgot-pass.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FaceRecognitionComponent } from './page/face-recognition/face-recognition.component';
import { CardComponent } from './page/dashboard/card/card.component';



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    NotFoundComponent,
    ForgotPassComponent,
    DashboardComponent,
    FaceRecognitionComponent,
    CardComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

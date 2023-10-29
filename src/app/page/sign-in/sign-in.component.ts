import { Router } from '@angular/router';
import { PasswordVisibleService } from 'src/app/service/password-visible/password-visible.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  constructor(
    private router: Router,
    private passVisible: PasswordVisibleService,
    private service: ApiService
  ) {}

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public passwordVisible: boolean = false;
  btnValidation: boolean = false;
  message: string = '';

  // password visibility
  togglePasswordVisibility(e: Event) { 
    e.stopPropagation();
    this.passwordVisible = !this.passwordVisible;
    this.passVisible.changeIcon();
  }

  // navigate ke page forgot-password
  forgotPass() {
    this.router.navigate(['sign-in/forgot-password']);
  }

  // navigate ke page sign-up
  signUp() {
    this.router.navigate(['sign-up']);
  }

  // navigate ke page face-recogn
  faceRecog() {
    this.router.navigate(['sign-in/face-recognition']);
  }

  // proses login
  submitForm() {
    if (this.userForm.valid) {
      const formData = new FormData();
        // @ts-ignore
      formData.append('username', this.userForm.get('username').value);
        // @ts-ignore
      formData.append('password', this.userForm.get('password').value);

      this.service.loginUser(formData)
        .subscribe((res) => {
          if (res === null) {
            this.message = 'Username and password unvalid';
            this.btnValidation = true;
            setTimeout(() => {
              this.btnValidation = false;
            }, 2000);
          } else {
            this.router.navigate([`dashboard/${res.user_id}`]);
          }
        });
    } else {
      this.message = 'All field are required';
      this.btnValidation = true;
      setTimeout(() => {
        this.btnValidation = false;
      }, 2000);
    }
  }
}

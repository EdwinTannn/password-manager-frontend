import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordVisibleService } from 'src/app/service/password-visible/password-visible.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PasswordGeneratorService } from 'src/app/service/password-generator/password-generator.service';
import { CommonModule } from '@angular/common';
import { UnameRecommendationService } from 'src/app/service/uname-recommendation/uname-recommendation.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  constructor(
    private activeRouter: ActivatedRoute,
    private service: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private passVisible: PasswordVisibleService,
    private passwordGenerator: PasswordGeneratorService,
    private unameRec: UnameRecommendationService
  ) { this.selectedChoice = ''; }

  private id: string = ''; 
  public passwordVisible: boolean = false;
  username: string = '';
  imgUrl: string = '';
  apps: any[] = [];
  isTambah: boolean = false;
  linkToApp: string = '';
  btnValidation: boolean = false;
  selectedChoice: string = '';
  recommendedPassword: string = '';
  combinedWord: string = '';
  recommendedUsername: string = '';
  
  // @ts-ignore
  appForm: FormGroup;
 

  
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.id = params['id'];
      this.service.getStatus(this.id).subscribe((res) => {
        if(res) {
          if(res.islogin === 'false') {
            alert('please login properly');
            this.router.navigate(['sign-in']);
            return;
          } 
        } else {
          alert('please login properly');
          this.router.navigate(['sign-in']);
          return;
        }
      });

      this.service.getUserById(this.id).subscribe((res) => {
        this.username = res.user_username;
        
        this.imgUrl = res.user_picture;
        console.log('getUserById',res)
      })

      this.service.getAppByUserId(this.id).subscribe((res) => {
        for (let i = 0; i < res.length; i++) {
          this.apps.push(res[i]);
        }
        console.log("getappuserid",res)
        
      })
    })

    this.appForm = this.fb.group({
      appName: [null, Validators.required],
      appLink: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required],
    })

    
  }

  // Create App Baru
  submitForm() {
    if (this.appForm.valid) {
      const formData = new FormData();

      formData.append('user_id', this.id);
      formData.append('app_name', this.appForm.get('appName')?.value!);
      formData.append('app_link', this.appForm.get('appLink')?.value!);
      formData.append('app_username', this.appForm.get('username')?.value!);
      formData.append('app_password', this.appForm.get('password')?.value!);
      formData.append('app_email', this.appForm.get('email')?.value!);
      

      this.service.createApp(formData).subscribe((res) => {
        window.location.reload();
      });
      
    } else {
      this.btnValidation = true;
      setTimeout(() => {
        this.btnValidation = false;
      }, 2000);
    }
  }

  // logout
  logout() {
    this.service.userLogout(this.id).subscribe((res) => {
      this.router.navigate(['sign-in'])
    })
  }

  profilePage() {
    this.router.navigate([`dashboard/${this.id}/profile`])
  }
 
  // Menuju ke app page
  cardPage(appId: string) {
    this.router.navigate([`dashboard/${this.id}/app/${appId}`])
    console.log("cardpage",appId)
  }

  // Password Visibility
  togglePasswordVisibility(e: Event) {
    e.stopPropagation();
    this.passwordVisible = !this.passwordVisible;
    this.passVisible.changeIcon();
  }

  fetchUserData(): void {
    this.service.getUserById(this.id).subscribe((res) => {
      this.username = res.user_username;
      this.imgUrl = res.user_picture;

      // Pass the fetched data to UnameRecommendationService
      const userData = {
        firstname: res.user_firstname,
        lastname: res.user_lastname,
        key1: res.key1,
        key2: res.key2,
        key3: res.key3
      };
      this.unameRec.setUserData(userData);
      this.recommendedUsername = this.unameRec.generateUsername();
      console.log('unameRec', this.unameRec);
      
    });
  }

  

  //pass recommend
  generate() {
    this.recommendedPassword = this.passwordGenerator.generatePassword();
  }
  // navigate to app
  navigateToApp(username: string, password: string, event: any) {
    this.service.navigateToApp(username, password).subscribe((res) => {
      window.location.href = res.url;
    });
    event.stopPropagation();
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { PasswordVisibleService } from 'src/app/service/password-visible/password-visible.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor(
    private passVisible: PasswordVisibleService,
    private service: ApiService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  private appId: string = '';
  public passwordVisible: boolean = false;
  isEdit: boolean = false;
  userId: string = '';
  appName: string = '';
  // appType: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  webAddress: string = '';
  lastPasswordChange: any = '';
  btnValidation: boolean = false;

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.appId = params['appId'];
      this.service.getAppById(this.appId).subscribe((res) => {
        this.userId = res.userUserId;
        this.appName = res.app_name;
        // this.appType = res.app_type;
        this.email = res.app_email;
        this.username = res.app_username;
        this.password = res.app_password;
        this.webAddress = res.app_link;
        this.lastPasswordChange = res.last_password_change;
      });
    });
  }

  // untuk mengedit data app
  submitForm() {
    const formData = new FormData();

    if (this.appName && this.webAddress && this.username && this.password && this.email) {
      formData.append('name', this.appName);
      // formData.append('type', this.appType);
      formData.append('link', this.webAddress);
      formData.append('username', this.username);
      formData.append('password', this.password);
      formData.append('email', this.email);
  
      this.service.updateApp(this.appId, formData).subscribe((res) => {
        window.location.reload();
      });
    } else {
      this.btnValidation = true;
      setTimeout(() => {
        this.btnValidation = false;
      }, 2000);
    }
  }

  // Menghitung hari untuk update password
  updateYourPass(): number {
    const futureDate = this.addDaysToDate(this.lastPasswordChange, 30);
    const today = new Date();
    const timeDiff = futureDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff;
  }

  addDaysToDate(inputDate: string, daysToAdd: number): Date {
    // Ubah input tanggal menjadi objek Date
    const dateParts = inputDate.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Karena bulan di JavaScript dimulai dari 0 (Januari adalah bulan 0)
    const day = parseInt(dateParts[2]);
    const inputDateObj = new Date(year, month, day);

    // Tambahkan jumlah hari ke tanggal
    const futureDateObj = new Date(inputDateObj);
    futureDateObj.setDate(inputDateObj.getDate() + daysToAdd);

    return futureDateObj;
  }

  // password visibility
  togglePasswordVisibility(e: Event) {
    e.stopPropagation();
    this.passwordVisible = !this.passwordVisible;
    this.passVisible.changeIcon();
  }

  // cancel proses edit
  cancelBtn() {
    window.location.reload();
  }

  // Mendelete app
  deleteApp() {
    this.service.deleteApp(this.appId).subscribe((res) => {
      this.router.navigate([`dashboard/${this.userId}`]);
    });
  }
}

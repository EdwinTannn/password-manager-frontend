import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordVisibleService {

  constructor() { }

  // mengubah icon pada input password
  changeIcon() {
    let passIcon = document.querySelector('.password-container>i');
    
    if (passIcon?.classList.contains('bi-eye')) {
      passIcon?.classList.add('bi-eye-slash')
      passIcon?.classList.remove('bi-eye')
    } else {
      passIcon?.classList.remove('bi-eye-slash')
      passIcon?.classList.add('bi-eye')
    }
  }
}

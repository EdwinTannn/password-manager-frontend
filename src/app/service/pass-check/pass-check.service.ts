import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassCheckService {
  constructor() { }

  // pengecekan dan spesifikasi untuk password strength
  checkPasswordStrength(password: string) {
    const numberPattern = /\d/;
    const uppercasePattern = /[A-Z]/;
   

    const hasMinimumLength = password.length >= 6;
    const hasNumber = numberPattern.test(password);
    const hasUpperCase = uppercasePattern.test(password);
    

    return hasMinimumLength && hasNumber && hasUpperCase 
  }
}

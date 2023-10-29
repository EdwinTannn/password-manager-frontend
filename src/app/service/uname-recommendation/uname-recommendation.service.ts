import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UnameRecommendationService {

  private firstname: string = '';
  private lastname: string = '';
  private key1: string = '';
  private key2: string = '';
  private key3: string = '';

  constructor() { }

  setUserData(data: any): void {
    this.firstname = data.firstname || '';
    this.lastname = data.lastname || '';
    this.key1 = data.key1 || '';
    this.key2 = data.key2 || '';
    this.key3 = data.key3 || '';
  }

  private getRandomValues(): string[] {
    const values = [this.firstname, this.lastname, this.key1, this.key2, this.key3];
    return this.shuffleArray(values).slice(0, 2);  // shuffle and take the first two items
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  generateUsername(): string {
    const [value1, value2] = this.getRandomValues();
    const username = `${value1}.${value2}`;

    console.log('generateUsername', username);
    return username.toLowerCase();
  }
}


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  private readonly apiUrl = 'http://localhost:3000';

  // * User
  // login
  loginUser(data: any): Observable<any>{
    return this._http.post(`${this.apiUrl}/login`, data);
  }

  // check status login
  getStatus(userID: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/login/status/user/${userID}`);
  }

  // membuat user baru
  regisUser(data: any): Observable<any>{
    return this._http.post(`${this.apiUrl}/user/`, data);
  }

  // mendapatkan semua muka untuk fungsi face recogn
  getAllFace(): Observable<any> {
    return this._http.get(`${this.apiUrl}/user`);
  }

  // login menggunakan face recogn
  getUserByFace(data: any): Observable<any> {
    return this._http.patch(`${this.apiUrl}/user/face`, data);
  }

  // mendapatkan data user dari ID
  getUserById(userID: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/check/user/${userID}`);
  }

  // mengubah password user
  changeUserPass(data: any): Observable<any> {
    return this._http.patch(`${this.apiUrl}/update/user`, data);
  }

  // // mengubah profile user
  // updateUser(data: any): Observable<any> {
  //   return this._http.patch(`${this.apiUrl}/update/user`, data);
  // }

  // logout
  userLogout(userID: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/logout/user/${userID}`);
  }

  // * App
  // mendapatkan data app dari user ID
  getAppByUserId(userID: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/app/user/${userID}`);
  }

  // mendapatkan data app dari ID
  getAppById(appID: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/app/${appID}`);
  }

  // membuat app baru
  createApp(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/create/app`, data);
  }

  // mengedit/mengupdate data app
  updateApp(appID: string, data: any): Observable<any> {
    return this._http.patch(`${this.apiUrl}/app/update/${appID}`, data);
  }

  // menghapus app
  deleteApp(appID: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/delete/app/${appID}`);
  }

  navigateToApp(username: string, password: string): Observable<any> {
    return this._http.get(`http://localhost:4000/dummy/${username}/${password}`)
  }
}

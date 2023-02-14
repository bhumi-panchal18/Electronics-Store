import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000/user';
  getAll() {
    return this.http.get(this.apiUrl);
  }
  getById(id: any) {
    return this.http.get(this.apiUrl + '/' + id);
  }
  proceedRegister(inputData: any) {
    return this.http.post(this.apiUrl, inputData);
  }

  updateUser(code: any, inputData: any) {
    return this.http.put(this.apiUrl + '/' + code, inputData);
  }

  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  getUserRole() {
    return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole')?.toString() : '';
  }
  updateuser(id: any, inputdata: any) {
    return this.http.put(this.apiUrl + '/' + id, inputdata);
  }
  getuserrole() {
    return this.http.get('http://localhost:3000/role');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../Modal/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  private url: string = "http://localhost:3000/users";
  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user'))
    this.user.next(user)
  }

  getUsers(): Observable<UserModel[]> { 
    return this.http.get<UserModel[]>(this.url); 
  }

  setUser(user: UserModel) {
    sessionStorage.setItem('userrole', JSON.stringify(user))
    this.user.next(user)
  }
}

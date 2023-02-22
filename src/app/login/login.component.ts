import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup | any;
  constructor(private http: HttpClient, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private service: AuthService, 
    private _snackBar: MatSnackBar) {
    sessionStorage.clear();
  }
  ngOnInit(): void {

  }
  loginForm = this.formBuilder.group({
    username: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required)
  });
  userData: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  horizontalPosition1: MatSnackBarHorizontalPosition = 'end';
  verticalPosition1: MatSnackBarVerticalPosition = 'top';
  proceedLogin() {
   if (this.loginForm.valid) {
      this.service.getById(this.loginForm.value.username).subscribe(res => {
        this.userData = res;
        if (this.userData.password == this.loginForm.value.password) {
          if (this.userData.isActive) {
            

            sessionStorage.setItem('username', this.userData.id);
            sessionStorage.setItem('userrole', JSON.stringify(this.userData));
            this._snackBar.open("Logged in Successfully!", 'Close', {
              duration: 1000,
              horizontalPosition: this.horizontalPosition1,
              verticalPosition: this.verticalPosition1
            });
            
            this.router.navigate(['store']);
          } else {
            this._snackBar.open("InActive User", 'Close', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition
            });
          }
        } else {
          this._snackBar.open("Invalid Cerdentials!", 'Close', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition

          });
        }
      }, err => {
        this._snackBar.open("User not found!", 'Close', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition

        });
      });
    }
  }

}

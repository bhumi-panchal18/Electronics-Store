import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

import {MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  hide = true;
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private service: AuthService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  registerForm = this.formBuilder.group({
    id: this.formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required),
    email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.formBuilder.control('male'),
    role: this.formBuilder.control(''),
    isActive: this.formBuilder.control(true)
  })

  proceedRegistration() {
    if (this.registerForm.valid) {
      this.service.proceedRegister(this.registerForm.value).subscribe(res => {
        this._snackBar.open("Registered Sucessfully!",'Close', {
          duration: 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this.router.navigate(['login']);
      });
    } else {
      this._snackBar.open("Please enter valid data!",'Close', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    }
  }
}

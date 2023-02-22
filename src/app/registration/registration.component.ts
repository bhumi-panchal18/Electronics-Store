import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

import {MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { UserModel } from '../Modal/user.model';
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
  allUsers;
  ngOnInit(): void {
    this.service.getAll().subscribe(res=>{
      this.allUsers = res;
    })
    

  }

  registerForm = this.formBuilder.group({
    id: this.formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(6),this.userExists.bind(this)])),
    name: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(8)])),
    email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email, this.emailExists.bind(this)])),
    gender: this.formBuilder.control('male'),
    role: this.formBuilder.control(''),
    isActive: this.formBuilder.control(true)
  })


  userExists(control: FormControl): { [s :string]: boolean }{
   if(this.allUsers?.some((data)=>
    data.id === control.value)) {
    return{'userExists':true}
   }
   return null;
  }
 

  emailExists(control: FormControl): { [s :string]: boolean }{
   if(this.allUsers?.some((data)=>
    data.email === control.value)) {
    return{'emailExists':true}
   }
   return null;
  }

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

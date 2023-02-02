import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  hide=true;
  constructor() { }
  signup: FormGroup;
  ngOnInit(): void {
    
    this.signup = new FormGroup({
      'name': new FormControl(),
      'gender': new FormControl(),
      'emailID': new FormControl(),
      'password': new FormControl(),
      'confirmpass': new FormControl()
    })
  }
  signupData(signup:FormGroup){
    console.log(this.signup.value);
  }

}

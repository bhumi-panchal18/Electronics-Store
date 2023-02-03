import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  hide=true;
  api = "http://localhost:3000/signup";
  constructor(private http: HttpClient, private router:Router) { }
  signup: FormGroup;
  signupuser: any;
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
    // console.log(this.signup.value);
    this.signupuser = this.signup.value.name;
    this.http.post<any>(this.api,this.signup.value).subscribe(response=>{
      alert('You are successfully signed up!');
      this.signup.reset();
      window.location.reload();
    }, err =>{
      alert('Something went wrong!');
    });
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../material/material.module';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup|any;
  constructor(private http: HttpClient, private route:Router) { }
  api = "http://localhost:3000/signup";
  ngOnInit(): void {
    this.login=new FormGroup({
      'emailID': new FormControl(),
      'password': new FormControl()
    })
  }
  onViewAppliance(){
  }

  loginData(login:FormGroup){
    // console.log(this.login.value);
    this.http.get<any>(this.api)
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.fname === this.login.value.fname && a.password === this.login.value.password
      });

      if(user){
        alert('you are successfully login');
        this.login.reset();
        this.route.navigate(['store']);
      }else{
        alert('User Not Found');
        // this._route.navigate(['login']);
      }

    }, err=>{
      alert('Something was wrong');
    })
  }
}

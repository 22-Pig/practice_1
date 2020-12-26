import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  //对应登录的表单
  myForm: FormGroup;
  //对应输入用户名的输入框
  userName: AbstractControl;
  //对应密码的输入框
  password: AbstractControl;

  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: User;
  users$: Observable<User>;
  msg: string;
  constructor(private fb: FormBuilder, private router: Router, private httpclient: HttpClient) {
    this.myForm = this.fb.group(
      {
        'userName': ['', Validators.compose([Validators.required, userNameValidator])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      }
    );

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
  }

  onSubmit(value: any) {
    console.log(value);
    this.msg = value.userName;
    console.log(this.msg);
  }

  ngOnInit(): void {
    
  }

  login() {
    if (this.myForm.valid) {
      // console.log( this.myForm.value);
      this.httpclient.post(this.baseUrl + 'login', this.myForm.value).subscribe((val: any) => {
        console.log(val);
        if (val.succ == true) {
          // this.authService.login();
          this.router.navigate(['/management', this.msg]);
        } else if (val.succ == false) {
          alert('用户名或密码错误！');
        }
      });
    }
  }
}

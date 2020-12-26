import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

function usernameValidator(control: FormControl): { [s: string]: boolean } {
  if (control && control.value) {
    if (!control.value.match(/^a/)) {
      return { invalidUser: true };
    }
  }
}

function idValidator(control: FormControl): { [s: string]: boolean } {
  if (control && control.value) {
    if (!String(control.value).match(/^[0-9]*$/)) {
      return { invalidId: true };
    }
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  userForm: FormGroup;
  id: AbstractControl;
  username: AbstractControl;
  password: AbstractControl;
  message: AbstractControl;
  users$: Observable<User>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: User;
  modalRef: BsModalRef;

  constructor(private fb: FormBuilder, private httpclient: HttpClient, private modalService: BsModalService) {
    this.userForm = this.fb.group({
      'id': ['', Validators.compose([Validators.required, idValidator])],
      'username': ['', Validators.compose([Validators.required, usernameValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'message': ['']
    });

    this.id = this.userForm.controls['id'];
    this.username = this.userForm.controls['username'];
    this.password = this.userForm.controls['password'];
    this.message = this.userForm.controls['message'];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpclient.get(this.baseUrl + 'searchAllUser');
  }

  search() {
    console.log(this.username.value);
    if (!this.username.value) {
      this.users$ = <Observable<User>>this.httpclient.get(this.baseUrl + 'searchAllUser');
    } else {
      this.users$ = <Observable<User>>this.httpclient.get(this.baseUrl + 'searchUser/' + this.username.value);
    }
  }

  searchall() {
    if (this.username.value) {
      this.users$ = <Observable<User>>this.httpclient.get(this.baseUrl + 'searchAllUser');
    }
  }

  add() {
    if (!this.username.value) {
      alert('用户名为空，不能添加!');
      return 0;
    } else {
      // 对于可观察对象执行，我们需要订阅其结果
      this.httpclient.post(this.baseUrl + 'addUser', this.userForm.value).subscribe(
        (val: any) => {
          if (val.succ) { // val是服务器返回的值
            alert('添加成功!');
            this.searchall();
          }
        }
      );
    }
  }

  select(u: User) {
    this.currentUser = u;
    this.userForm.setValue(this.currentUser);
  }

  delete() {
    let username = String(this.currentUser.username)
    this.httpclient.post(this.baseUrl + 'deleteUser', { username }).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('删除成功!');
          this.searchall();
        }
      }
    )
  }

  update() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpclient.post(this.baseUrl + 'updateUser', this.userForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功!');
            this.searchall();
          }
        }
      )
    }
  }

}

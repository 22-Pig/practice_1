import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../tab4/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Tab4Service {

  users$: Observable<User>;
  baseUrl = 'http://192.168.134.58:8080/';
  currentUser: User;
  curUsername = null;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpclient: HttpClient) { }

  add(formValue: object) {
    const obj = {
      formValue: formValue
    }
    console.log(obj.formValue);
    return this.httpclient.post(this.baseUrl + 'addUser', obj.formValue);
  }

  delete(username: string) {
    return this.httpclient.post(this.baseUrl + 'deleteUser', { username });
  }

  update(formValue: object) {
    const obj = {
      formValue: formValue
    }
    return this.httpclient.post(this.baseUrl + 'updateUser', obj.formValue);
  }

  searchall() {
    return this.httpclient.get(this.baseUrl + 'searchAllUser');
  }

  search(username: string) {
    return this.httpclient.get(this.baseUrl + 'searchUser/' + username);
  }

  setCurUsername(username: string) {
    this.curUsername = username;
  }

  getCurUsername(): string {
    return this.curUsername;
  }

}

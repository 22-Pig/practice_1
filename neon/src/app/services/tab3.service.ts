import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dev } from '../tab3/Dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Tab3Service {

  devs$: Observable<Dev>;
  baseUrl = 'http://192.168.134.58:8080/';
  currentUser: Dev;
  curId = null;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpclient: HttpClient) {
  }

  add(formValue: object) {
    const obj = {
      formValue: formValue
    }
    console.log(obj.formValue);
    return this.httpclient.post(this.baseUrl + 'addDev', obj.formValue);
  }

  delete(did: string) {
    /* const obj = {
      did: did
    }
    console.log(typeof (obj.did)); */
    return this.httpclient.post(this.baseUrl + 'deleteDev', { did });
  }

  update(formValue: object) {
    const obj = {
      formValue: formValue
    }
    return this.httpclient.post(this.baseUrl + 'updateDev', obj.formValue);
  }

  searchall() {
    // this.devs$ = <Observable<Dev>>this.httpclient.get(this.baseUrl + 'searchAllDev');
    return this.httpclient.get(this.baseUrl + 'searchAllDev');
  }

  search(id: string) {
    console.log(id);
    return this.httpclient.get(this.baseUrl + 'searchDev/' + id);
  }

  setCurId(id: string) {
    this.curId = id;
  }

  getCurId(): string {
    return this.curId;
  }
}

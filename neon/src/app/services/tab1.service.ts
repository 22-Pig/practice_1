import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Info } from '../tab1/Info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Tab1Service {

  infos$: Observable<Info>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: Info;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpclient: HttpClient) { }

  searchall() {
    // this.devs$ = <Observable<Dev>>this.httpclient.get(this.baseUrl + 'searchAllDev');
    return this.httpclient.get(this.baseUrl + 'infos');
  }
}

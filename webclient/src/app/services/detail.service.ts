import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  SERVER_URL = 'http://127.0.0.1:8080/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  // 该函数用于开关灯
  toggleLED(status: number) {
    const obj = {
      status: status
    };
    return this.httpClient.post(this.SERVER_URL + 'toggleLed', obj, this.httpOptions);
  }
  // 该函数用于获取灯的状态
  getLED() {
    return this.httpClient.get(this.SERVER_URL + 'getLed');
  }
  // 该函数用于开关风扇
  toggleFAN(fanstatus: number) {
    const obj = {
      status: fanstatus
    };
    return this.httpClient.post(this.SERVER_URL + 'toggleFan', obj, this.httpOptions);
  }
  // 该函数用于获取风扇的状态
  getFAN() {
    return this.httpClient.get(this.SERVER_URL + 'getFan');
  }
  getMOT() {
    return this.httpClient.get(this.SERVER_URL + 'getMot/003');
  }
}

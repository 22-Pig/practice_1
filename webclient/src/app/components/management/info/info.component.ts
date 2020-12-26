import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Info } from './Info';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent implements OnInit {

  id: AbstractControl;
  type: AbstractControl;
  name: AbstractControl;
  value: AbstractControl;
  descr: AbstractControl;
  infos$: Observable<Info>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: Info;

  icons = new Map([
    ['humd', '/assets/img/湿度计.svg'],
    ['temp', '/assets/img/温度计.svg'],
    ['led', '/assets/img/提示灯红.svg'],
    ['fan', '/assets/img/排气扇.svg'],
    ['CO', '/assets/img/一氧化碳报警器.svg'],
    ['infrared', '/assets/img/红外传感器.svg'],
    ['door', '/assets/img/门.svg'],
  ]);

  constructor(private httpclient: HttpClient) { }
  // 页面初始化
  ngOnInit(): void {
    this.infos$ = <Observable<Info>>this.httpclient.get(this.baseUrl + 'infos');
    console.log(this.infos$);
  }

  deviceIcon(type: string): string {
    if (this.icons.get(type)) {
      return this.icons.get(type);
    }

    return '/assets/img/报错.svg';
  }

}

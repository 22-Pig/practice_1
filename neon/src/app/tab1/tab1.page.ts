import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Info } from './Info';
import { AbstractControl } from '@angular/forms';
import { Tab1Service } from '../services/tab1.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  id: AbstractControl;
  type: AbstractControl;
  name: AbstractControl;
  value: AbstractControl;
  descr: AbstractControl;
  infos$: Observable<Info>;
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
  constructor(private tab1Service: Tab1Service) { }

  ngOnInit(): void {
    this.infos$ = <Observable<Info>>this.tab1Service.searchall();
  }

  deviceIcon(type: string): string {
    if (this.icons.get(type)) {
      return this.icons.get(type);
    }

    return '/assets/img/报错.svg';
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { Observable, timer } from 'rxjs';
import { Dev } from '../../Dev';
import { Tab3Service } from '../../../services/tab3.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  id: string;
  type: string;
  name: string;
  value: string = '0';
  descr: string;
  devs$: Observable<Dev>;
  currentUser: Dev;

  constructor(private tab3Service: Tab3Service, public navParams: NavParams, private httpclient: HttpClient) {
    // console.log(this.navParams.data.value);
  }

  ngOnInit() { }

  doClose() {
    this.navParams.data.modal.dismiss();
    // this.devs$ = <Observable<Dev>>this.tab3Service.searchall();
  }

  add() {
    const formValue = { "id": this.id, "type": this.type, "name": this.name, "value": this.value, "descr": this.descr }
    console.log(formValue);
    this.tab3Service.add(formValue).subscribe(
      (val: any) => {
        if (val.succ) { // val是服务器返回的值
          alert('添加成功!');
        }
        else {
          alert('添加失败!');
        }
      }
    );
  }
}

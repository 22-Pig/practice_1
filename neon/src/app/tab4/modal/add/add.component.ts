import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../User';
import { Tab4Service } from '../../../services/tab4.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  id: string;
  username: string;
  password: string;
  message: string;
  users$: Observable<User>;
  currentUser: User;

  constructor(private tab4Service: Tab4Service, public navParams: NavParams, private httpclient: HttpClient, private fb: FormBuilder) {
    // console.log(this.navParams.data);
  }

  ngOnInit() { }

  addUser() {
    const userValue = { "id": this.id, "username": this.username, "password": this.password, "message": this.message }
    console.log(userValue);
    this.tab4Service.add(userValue).subscribe(
      (val: any) => {
        if (val.succ = true) { // val是服务器返回的值
          alert('添加成功!');
        }
        else {
          alert('添加失败!');
        }
      }
    );
  }

  doClose() {
    this.navParams.data.modal.dismiss();
  }

}

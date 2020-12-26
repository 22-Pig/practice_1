import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Tab4Service } from '../../../services/tab4.service';
import { User } from '../../User';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {

  id: string;
  username: string;
  password: string;
  message: string;
  users$: Observable<User>;

  constructor(private tab4Service: Tab4Service, public navParams: NavParams, private httpclient: HttpClient) { }

  ngOnInit() { }

  doClose() {
    this.navParams.data.modal.dismiss();
  }

  update() {
    const formValue = { "id": this.id, "username": this.username, "password": this.password, "message": this.message }
    console.log(formValue);
    this.tab4Service.update(formValue).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('修改成功!');
        }
        else {
          alert('修改失败!');
        }
      }
    )
  }
}

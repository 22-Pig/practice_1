import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Tab3Service } from '../../../services/tab3.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {

  id: string;
  type: string;
  name: string;
  value: string = '0';
  descr: string;
  baseUrl = 'http://192.168.134.58:8080/';
  constructor(private tab3Service: Tab3Service, public navParams: NavParams, private httpclient: HttpClient) { }

  ngOnInit() { }

  doClose() {
    this.navParams.data.modal.dismiss();
  }

  update() {
    const formValue = { "id": this.id, "type": this.type, "name": this.name, "value": this.value, "descr": this.descr }
    this.tab3Service.update(formValue).subscribe(
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

import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Tab4Service } from '../../../services/tab4.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {

  constructor(private tab4Service: Tab4Service, public navParams: NavParams, private httpclient: HttpClient) { }

  ngOnInit() { }

  delete() {
    const username = this.tab4Service.getCurUsername();
    console.log(typeof (username));
    this.tab4Service.delete(username).subscribe(
      (val: any) => {
        if (val.succ) { // val是服务器返回的值
          alert('删除成功!');
        }
        else {
          alert('删除失败!');
        }
      }
    )
  }

  doClose() {
    this.navParams.data.modal.dismiss();
  }
}

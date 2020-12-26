import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Tab3Service } from '../../../services/tab3.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {

  baseUrl = 'http://192.168.134.58:8080/';
  // did: string;
  // did = String(this.navParams.data.value);
  constructor(private tab3Service: Tab3Service, public navParams: NavParams, private httpclient: HttpClient) {
    console.log(this.navParams);
  }

  ngOnInit() {
    console.log(this.tab3Service.getCurId());
  }


  delete() {
    const did = this.tab3Service.getCurId();
    console.log(typeof (did));
    this.tab3Service.delete(did).subscribe(
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

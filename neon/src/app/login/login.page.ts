import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() name: string;
  username: string;
  password: string;
  baseUrl = 'http://192.168.134.58:8080/';

  constructor(private httpClient: HttpClient, private router: Router, public alertCtrl: AlertController,) { }
  ngOnInit() {

  }
  // ----------登录
  login() {
    const formValue = { "userName": this.username, "password": this.password }
    this.httpClient.post(this.baseUrl + 'loginApp', formValue).subscribe(
      (val: any) => {
        console.log(val);
        if (val.succ == true) {
          this.router.navigate(['./tabs']);
          alert("登录成功");
        } else {
          alert("用户名或者密码无效");
        }
      }
    );
  }
  // ---------协议
  async showConfirm() {
    let confirm = this.alertCtrl.create({
      message: ' 本《最终用户许可协议》（以下简称“本协议”）是您（个人、XXX技术有限公司及关联公司（以下简称"XXX"）签订的协议。在此特写提醒您仔细阅读本协议中的各项条款。',
      buttons:
        [
          {
            text: '返回并退出',
            handler: () => {
              console.log('Disagree clicked');
              // navigator['app'].exitApp();
            }
          },
          {
            text: '同意并注册',
            handler: () => {
              console.log('Agree clicked');
              this.router.navigate(['./sign']);
            }
          }
        ]
    });
    (await confirm).present();
  }
}

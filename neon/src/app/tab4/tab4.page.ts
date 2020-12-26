import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AddComponent } from './modal/add/add.component';
import { DeleteComponent } from './modal/delete/delete.component';
import { UpdateComponent } from './modal/update/update.component';
import { SearchComponent } from './modal/search/search.component';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

import { Tab4Service } from '../services/tab4.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  users$: Observable<User>;
  baseUrl = 'http://192.168.134.58:8080/';
  currentUser: User;
  public username: string;
  constructor(public modalController: ModalController, private httpclient: HttpClient, private tab4Service: Tab4Service) { }

  ngOnInit() {
    this.users$ = <Observable<User>>this.tab4Service.searchall();
  }

  select(u: User) {
    this.currentUser = u;
    this.username = this.currentUser.username;
    this.tab4Service.setCurUsername(this.username);
    console.log(this.username);
  }

  async addModal() {
    const modal = await this.modalController.create({
      component: AddComponent,
      cssClass: 'my-custom-class',
      // componentProps: { value: 'addModal123' }
    });
    modal.onDidDismiss().then(
      () => {
        this.users$ = <Observable<User>>this.tab4Service.searchall();
      }
    );
    return await modal.present();
  }

  async deleteModal() {
    const modal = await this.modalController.create({
      component: DeleteComponent,
      cssClass: 'my-custom-class',
      componentProps: { value: this.username }
    });
    modal.onDidDismiss().then(
      () => {
        this.users$ = <Observable<User>>this.tab4Service.searchall();
      }
    );
    return await modal.present();
  }

  async updateModal() {
    const modal = await this.modalController.create({
      component: UpdateComponent,
      cssClass: 'my-custom-class',
      // componentProps: { value: 'updateModal' }
    });
    modal.onDidDismiss().then(
      () => {
        this.users$ = <Observable<User>>this.tab4Service.searchall();
      }
    );
    return await modal.present();
  }

  async searchModal() {
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'my-custom-class',
      // componentProps: { value: 'searchModal' }
    });
    modal.onDidDismiss().then(
      () => {
        console.log(typeof (this.tab4Service.getCurUsername()));
        const username = this.tab4Service.getCurUsername();
        console.log(username);
        if (username == 'null') {
          this.users$ = <Observable<User>>this.tab4Service.searchall();
        } else {
          this.users$ = <Observable<User>>this.tab4Service.search(username);
        }
      }
    );
    return await modal.present();
  }

}

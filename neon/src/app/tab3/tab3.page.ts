import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AddComponent } from './modal/add/add.component';
import { DeleteComponent } from './modal/delete/delete.component';
import { UpdateComponent } from './modal/update/update.component';
import { SearchComponent } from './modal/search/search.component';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dev } from './Dev';

import { Tab3Service } from '../services/tab3.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  devs$: Observable<Dev>;
  currentUser: Dev;
  public did: string;
  constructor(public modalController: ModalController, private httpclient: HttpClient, private tab3Service: Tab3Service) {

  }
  ngOnInit(): void {
    this.devs$ = <Observable<Dev>>this.tab3Service.searchall();
  }

  select(u: Dev) {
    this.currentUser = u;
    this.did = this.currentUser.id;
    this.tab3Service.setCurId(this.did);
    console.log(this.did);
  }

  async addModal() {
    const modal = await this.modalController.create({
      component: AddComponent,
      cssClass: 'my-custom-class'
      // componentProps: { value: 'addModal' }
    });
    modal.onDidDismiss().then(
      () => {
        this.devs$ = <Observable<Dev>>this.tab3Service.searchall();
      }
    );
    return await modal.present();
  }

  async deleteModal() {
    const modal = await this.modalController.create({
      component: DeleteComponent,
      cssClass: 'my-custom-class',
      componentProps: { value: this.did }
    });
    modal.onDidDismiss().then(
      () => {
        this.devs$ = <Observable<Dev>>this.tab3Service.searchall();
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
        this.devs$ = <Observable<Dev>>this.tab3Service.searchall();
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
        console.log(typeof (this.tab3Service.getCurId()));
        const sid = this.tab3Service.getCurId();
        if (sid == '0') {
          this.devs$ = <Observable<Dev>>this.tab3Service.searchall();
        } else {
          this.devs$ = <Observable<Dev>>this.tab3Service.search(sid);
        }
        // this.tab3Service.getCurId();
      }
    );
    return await modal.present();
  }
}

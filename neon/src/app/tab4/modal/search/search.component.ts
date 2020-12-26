import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Tab4Service } from '../../../services/tab4.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../User';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  username: string;
  users$: Observable<User>;
  baseUrl = 'http://192.168.134.58:8080/';
  constructor(private tab4Service: Tab4Service, public navParams: NavParams, private httpclient: HttpClient) { }

  ngOnInit() { }
  search() {
    const searchValue = { "username": this.username }
    console.log(searchValue.username);
    if (searchValue.username === undefined) {
      this.tab4Service.setCurUsername('null');
      console.log(searchValue.username);
    }
    else {
      this.tab4Service.setCurUsername(searchValue.username);
    }
  }
  doClose() {
    this.navParams.data.modal.dismiss();
  }
}

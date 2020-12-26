import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Dev } from '../../Dev';
import { Tab3Service } from '../../../services/tab3.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  id: string;
  devs$: Observable<Dev>;
  constructor(private tab3Service: Tab3Service, public navParams: NavParams, private httpclient: HttpClient) { }

  ngOnInit() { }

  search() {
    const formValue = { "id": this.id }
    console.log(formValue.id);
    if (formValue.id === undefined) {
      this.tab3Service.setCurId('0');
      console.log(formValue.id);
    }
    else {
      this.tab3Service.setCurId(formValue.id);
    }
  }
  doClose() {
    this.navParams.data.modal.dismiss();
  }
}

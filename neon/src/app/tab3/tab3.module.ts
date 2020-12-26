import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';

import { AddComponent } from './modal/add/add.component';
import { DeleteComponent } from './modal/delete/delete.component';
import { UpdateComponent } from './modal/update/update.component';
import { SearchComponent } from './modal/search/search.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
  ],
  declarations: [Tab3Page, AddComponent, DeleteComponent, UpdateComponent, SearchComponent],
  entryComponents: [AddComponent, DeleteComponent, UpdateComponent, SearchComponent]
})
export class Tab3PageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';

import { AddComponent } from './modal/add/add.component';
import { DeleteComponent } from './modal/delete/delete.component';
import { UpdateComponent } from './modal/update/update.component';
import { SearchComponent } from './modal/search/search.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule
  ],
  declarations: [Tab4Page,AddComponent, DeleteComponent, UpdateComponent, SearchComponent],
  entryComponents: [AddComponent, DeleteComponent, UpdateComponent, SearchComponent]
})
export class Tab4PageModule {}

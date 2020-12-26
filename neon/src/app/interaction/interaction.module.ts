import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InteractionPageRoutingModule } from './interaction-routing.module';

import { InteractionPage } from './interaction.page';

import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InteractionPageRoutingModule
  ],
  declarations: [InteractionPage],
  providers: [Sensors]
})
export class InteractionPageModule { }

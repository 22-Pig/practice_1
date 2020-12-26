import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InteractionPage } from './interaction.page';

const routes: Routes = [
  {
    path: '',
    component: InteractionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InteractionPageRoutingModule {}

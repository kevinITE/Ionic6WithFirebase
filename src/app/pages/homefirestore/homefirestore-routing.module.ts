import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomefirestorePage } from './homefirestore.page';

const routes: Routes = [
  {
    path: 'homefirestore',
    component: HomefirestorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomefirestorePageRoutingModule {}

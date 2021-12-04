import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomefirestorePageRoutingModule } from './homefirestore-routing.module';

import { HomefirestorePage } from './homefirestore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomefirestorePageRoutingModule
  ],
  declarations: [HomefirestorePage]
})
export class HomefirestorePageModule {}

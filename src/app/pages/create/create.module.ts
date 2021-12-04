import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';
import { FirestoreService } from 'src/app/services/data/firestore.service';

import { CreatePage } from './create.page';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [CreatePage],
  providers: [
   FirestoreService,FormGroup, FormBuilder
  ]
})
export class CreatePageModule {}

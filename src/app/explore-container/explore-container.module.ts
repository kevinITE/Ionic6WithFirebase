import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';

import { firebaseConfig } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { AngularFireAnalyticsModule ,UserTrackingService , CONFIG ,ScreenTrackingService } from '@angular/fire/compat/analytics';
import { AuthService } from  '../auth/auth.service';
import {UserService }  from  '../user/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,AngularFireModule.initializeApp(firebaseConfig) ,AngularFireDatabaseModule, 
    FormsModule,AngularFirestoreModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,AngularFireAnalyticsModule,AngularFireStorageModule,],
  declarations: [ExploreContainerComponent],
  exports: [ExploreContainerComponent,],
  providers: [
    // ... Existing Providers
    { provide: PERSISTENCE, useValue: 'session' },
    UserTrackingService,ScreenTrackingService,
    { provide: CONFIG, useValue: {
      send_page_view: false,
      allow_ad_personalization_signals: false,
      anonymize_ip: true
    } }, AuthService , UserService , FormBuilder,AngularFirestore,AngularFireDatabase,FirestoreService
  ]
})
export class ExploreContainerComponentModule {
  
}

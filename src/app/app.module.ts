import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { FileSizePipe } from './file-size.pipe';

@NgModule({
  declarations: [AppComponent, FileSizePipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },FormBuilder,AngularFireDatabase,FirestoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase ,AngularFireList, AngularFireObject  } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab1PageModule } from '../tab1/tab1.module';
import { Router } from '@angular/router';



import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/data/firestore.service';
import { Song } from 'src/app/user/user/user.module';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  userRef: AngularFireObject<any>;
 peoplelist: AngularFireList<any>;
 public createSongForm: FormGroup;
 constructor(
   public loadingCtrl: LoadingController,
   public alertCtrl: AlertController,
   private firestoreService: FirestoreService,
   formBuilder: FormBuilder
   ,private router: Router, public db:AngularFireDatabase, ) {
    this.peoplelist=db.list('/')


 
  }
  createEmployee(name,lname,age,job,employeeId){
    this.peoplelist.push({
      key_id: new Date().getTime(),
            name : name,
            lname :lname,
            age: age,
            job: job,
            employeeId : employeeId
      
          }).then(newPerson => {

            this.router.navigate(['/tabs'])
          })
  }


  Updateuser1(){
    this.userRef = this.db.object('/-MpfsbfpvytllqyFHD6M')
    return this.userRef.update({
      employeeId:"user.employeeId",
      name: "user.name",
      lname:"user.lname",
      job:"user.job",
      age:"user.age",
    })
  }


  async createSong() {
 
    this.firestoreService
      .createSong("hello", "adel", "songDescription", "songName")
      .then(
        () => {
         
        },
        error => {
          
            console.error(error);
          
        }
      );
  
   
  }


 
  
}









  

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase ,AngularFireList ,AngularFireAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { config } from '@ionic/core';
import {UserService }  from  '../user/user.service';
import {UserModule }  from  '../user/user/user.module';
import { User } from '@firebase/auth-types';
import { FirestoreService } from '../services/data/firestore.service';
import { Song } from 'src/app/user/user/user.module';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertController } from '@ionic/angular';


import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { finalize, tap } from 'rxjs/operators';

export interface FILE {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  ///////

  ngFireUploadTask: AngularFireUploadTask;

  progressNum: Observable<number>;

  progressSnapshot: Observable<any>;

  fileUploadedPath: Observable<string>;

  files: Observable<FILE[]>;

  FileName: string;
  FileSize: number;

  isImgUploading: boolean;
  isImgUploaded: boolean;

  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;
  /////


  public song: Song;

  itemsRef: AngularFireList<any>;
   users: Observable<any[]>;
     
    users1 = [] 
    public songList: Observable<Song[]>;
    constructor(
    private firestoreService: FirestoreService,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    analytics: AngularFireAnalytics,
    public userservice : UserService,
    private route: Router,private alertController: AlertController,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
  ) {
    ///////////////////////////
    
    
    this.itemsRef =  db.list('/')
        this.users = this.itemsRef.valueChanges() ;
       console.log(this.db);
       this.songList = this.firestoreService.getSongList();

    analytics.logEvent (  "tab1open" ,   { content_type :  [ "tab1open" ] ,lastname :  [ "darwish" ]  }) ;
   analytics.setUserId ("id :  yazan id ") ;
    analytics.setUserProperties( { test :  [ "yazan" ] ,tesst :  [ "darwish" ]  }) ;
    analytics.setCurrentScreen("setCurrentScreen : tab1page");
    analytics.setAnalyticsCollectionEnabled(true);
    
    
    
    this.isImgUploading = false;
    this.isImgUploaded = false;
    
    this.ngFirestoreCollection = angularFirestore.collection<FILE>('filesCollection');
    this.files = this.ngFirestoreCollection.valueChanges();
  }
   
    
   ngOnInit() {
      

       let employeesRes = this.userservice.getuserList()
       employeesRes.snapshotChanges().subscribe(async res =>{
         
        this.users1 = []
         
         await res.forEach(item =>{
         
           let a = item.payload.toJSON()
           a['$key'] = item.key
           this.users1.push(a.valueOf())
          
         })
         console.log(this.users1); 
       })
   

       ///////////////////////////////////
       
       this.firestoreService.getSongDetail("t8fPnDoPJBnddOhabDaC").subscribe(song => {
         this.song = song;
       });
      }
  
   ionViewDidLoad() {
    console.log('ionViewDidLoad EditPersonPage');
  
  }

  fetchEmployees(){
    this.userservice.getuserList().valueChanges().subscribe(res =>{
      console.log(res)
    })
  }


  deleteEmployee(id){
  
    this.db.database.ref("/").remove;
  }
 

  fetchusers(){
   this.userservice.getuserList().valueChanges().subscribe(res =>{
      console.log(res)
    })
  }

  deleteusers(id){
    console.log(id)
    if (window.confirm('will delete ')) {
      this.userservice.deleteuser("MpfsbfpvytllqyFHD6M") 
      console.log(id)
    }
    
    }


    async deleteSong(songId: string, songName: string): Promise<void> {
      const alert = await this.alertController.create({
        message: `Are you sure you want to delete ${songName}?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: blah => {
              console.log('Confirm Cancel: blah');
            },
          },
          {
            text: 'Okay',
            handler: () => {
              this.firestoreService.deleteSong(songId).then(() => {
                this.route.navigateByUrl('');
              });
            },
          },
        ],
      });
    
      await alert.present();
    }

    fileUpload(event: FileList) {
      
      const file = event.item(0)

      if (file.type.split('/')[0] !== 'image') { 
        console.log('File type is not supported!')
        return;
      }

      this.isImgUploading = true;
      this.isImgUploaded = false;

      this.FileName = file.name;

      const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;

      const imageRef = this.angularFireStorage.ref(fileStoragePath);

      this.ngFireUploadTask = this.angularFireStorage.upload(fileStoragePath, file);
      
      this.progressNum = this.ngFireUploadTask.percentageChanges();
      this.progressSnapshot = this.ngFireUploadTask.snapshotChanges().pipe(
        
        finalize(() => {
          this.fileUploadedPath = imageRef.getDownloadURL();
          
          this.fileUploadedPath.subscribe(resp=>{
            this.fileStorage({
              name: file.name,
              filepath: resp,
              size: this.FileSize
            });
            this.isImgUploading = false;
            this.isImgUploaded = true;
          },error => {
            console.log(error);
          })
        }),
        tap(snap => {
            this.FileSize = snap.totalBytes;
        })
      )
  }
  fileStorage(image: FILE) {
    const ImgId = this.angularFirestore.createId();
    
    this.ngFirestoreCollection.doc(ImgId).set(image).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
}  

}

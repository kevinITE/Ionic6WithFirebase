import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from '../../user/user/user.module';
import { FirestoreService } from '../../services/data/firestore.service';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public song: Song;
  
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    const songId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getSongDetail(songId).subscribe(song => {
      this.song = song;
    });
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
              this.router.navigateByUrl('');
            });
          },
        },
      ],
    });
  
    await alert.present();
  }
  

}
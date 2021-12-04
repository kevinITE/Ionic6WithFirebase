import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/data/firestore.service';
import { Song } from '../../user/user/user.module';
@Component({
  selector: 'app-homefirestore',
  templateUrl: './homefirestore.page.html',
  styleUrls: ['./homefirestore.page.scss'],
})
export class HomefirestorePage implements OnInit {

  public songList: Observable<Song[]>;
  constructor(
    private firestoreService: FirestoreService
  ) { }


  ngOnInit() {
    this.songList = this.firestoreService.getSongList();
  }
}

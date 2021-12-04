import { Injectable } from '@angular/core';


import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Song } from '../../user/user/user.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  public songList: Observable<Song[]>;
  constructor(public firestore: AngularFirestore) {}

  createSong(
    albumName: string,
    artistName: string,
    songDescription: string,
    songName: string
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc(`songList/${id}`).set({
      id,
      albumName,
      artistName,
      songDescription,
      songName,
    });
   }

   getSongList(): Observable<Song[]> {
    return this.firestore.collection<Song>(`songList`).valueChanges();
  }
  getSongDetail(songId: string): Observable<Song> {
    return this.firestore.collection('songList').doc<Song>(songId).valueChanges();
  }

  deleteSong(songId: string): Promise<void> {
    return this.firestore.doc(`songList/${songId}`).delete();
  }
  
}
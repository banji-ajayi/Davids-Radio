import {Injectable} from '@angular/core';
// import { Observable } from 'rxjs/Rx';
import 'firebase/storage';
import { FirebaseApp } from 'angularfire2';
import { Directory } from '../directory.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { NotificationService } from '../shared/notification.service';

@Injectable()
export class MusicService {
    allsongs: FirebaseListObservable<any[]>;
    onesong: FirebaseObjectObservable<any>;
    memberPlaylist: FirebaseListObservable<any>;
    feedBack: FirebaseListObservable<any>;
    about: FirebaseListObservable<any>;
    folder: any;
    folder2: any;
    mySongPaths: any;
    mySongName: any;
    progress: number;


    constructor(private db: AngularFireDatabase,
      private notifier: NotificationService) {
        console.log('MusicService Initialized...');
        this.allsongs = this.db.list('/songs') as FirebaseListObservable<Allsong[]>;
        this.memberPlaylist = this.db.list('/playlist') as FirebaseListObservable<any[]>;
        this.feedBack = this.db.list('/messages') as FirebaseListObservable<any[]>;
        this.about = this.db.list('/about') as FirebaseListObservable<any[]>;
        this.folder = 'assets';
        this.folder2 = 'music';

    }

getADavidSong(songId: string) {
  return this.db.object('songs/' + songId);
}

getAnAboutMessage(aboutId: string) {
  return this.db.object('about/' + aboutId);
}

getAPlaylistSong(songId: string) {
  return this.db.object('playlist/' + songId);
}

   getAllPlaylist() {
    return this.memberPlaylist;
   }


   getAllSongs() {
    //  this.allsongs = this.allsongs as FirebaseListObservable<Allsong[]>
    return this.allsongs;
  }

  getAboutMessage() {
    return this.about;
   }



  addSong(onesong) {
    // Create root ref
    const storageRef = firebase.storage().ref();
    const realStorageRef = firebase.storage().ref();
    const selectedFile = (<HTMLInputElement>document.getElementById('image')).files[0];
    const selectedSong = (<HTMLInputElement>document.getElementById('eachsong')).files[0];

      const path = `/${this.folder}/${selectedFile.name}`;
      const iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        onesong.image = selectedFile.name;
        const imageUrl = snapshot.downloadURL;
        onesong.path = imageUrl;
      })
      .then(realSong => {
        const realsongpath = `/${this.folder2}/${selectedSong.name}`;
        const realRef = realStorageRef.child(realsongpath);
       const uploadTask = realRef.put(selectedSong);

       return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', snapshot => {
          // upload in progress
          onesong.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;

        }, error => {
           reject(error);
        }, () => {
          onesong.eachsong = selectedSong.name;
          const songUrl = uploadTask.snapshot.downloadURL;
          onesong.realsongpath = songUrl;
          resolve(this.allsongs.push(onesong));
        });

       });

      })
      .then(data => {
        this.notifier.display('success', 'Song Successfully loaded in database');
      })
      .catch(err => {
        this.notifier.display('error', err.message);
      });
  }

  addSongToPlaylist(mysong) {
      this.memberPlaylist.push(mysong)
      .then(data => {
        this.notifier.display('success', 'Song Successfully loaded to playlist');
      })
      .catch(err => {
        this.notifier.display('error', err.message);
      });
  }

  addFeedBack(formRequest) {
    this.feedBack.push(formRequest)
    .then(data => {
      this.notifier.display('success', 'Message sent successfully');
    })
    .catch(err => {
      this.notifier.display('error', err.message);
    });
}

   deleteSongFromPlaylist($key) {
     const songToRemove = this.getAPlaylistSong($key);
        songToRemove.remove();

   }

updateAboutContent(localUpdatedContent) {
  const aboutEntryInFirebase = this.getAnAboutMessage(localUpdatedContent.$key);
  aboutEntryInFirebase.update({title: localUpdatedContent.title,
                              content: localUpdatedContent.content,
                             }).then( data => {
                              this.notifier.display('success', 'About content updated successfully');

                             })
                             .catch(err => {
                                this.notifier.display('error', err.message);
                              });
}

}



interface Allsong {
  $key?: string;
  artist?: string;
  album?: string;
  title?: string;
  type?: string;
  image?: string;
  eachsong?: string;
  realsongpath?: string;
  progress?: number;
}



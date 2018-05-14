import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { PagerService } from '../services/pager.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-songmix',
  templateUrl: './songmix.component.html',
  styleUrls: ['./songmix.component.css']
})
export class SongmixComponent implements OnInit {
  key: string;
  title: string;
  artist: string;
  album: string;
  image: any;
  eachsong: any;
  realsongpath: any;
  type: any;
  progress: number;

  mysong: any;


  deleteError: string;
  deleteKey: string;
  isDeleting = false;
  timer: any;

  submitError: string;
  submitKey: string;
  isSubmitting = false;

  mySongs: any;
  myWholeSongsLength: any;
  myPlaylistsLength: any;
  myPlaylists: any;
  // array of all items to be paged
  private allItems: any[];
  myWholeSongs: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(private _musicService: MusicService, private pagerService: PagerService) { }



  ngOnInit() {
    this._musicService.getAllSongs()
    .subscribe(mySongs => {
      this.myWholeSongs = mySongs;
      this.setPage(1);
      this.myWholeSongsLength = this.myWholeSongs.length;
    });

      this._musicService.getAllPlaylist()
    .subscribe(playlists => {
      this.myPlaylists = playlists;
      this.myPlaylistsLength = this.myPlaylists.length;
  });
}


deleteFromPlaylistQuestion($key: string) {
  this.deleteError = null;
  this.deleteKey = $key;
}

addToPlaylistQuestion($key: string) {
  this.submitError = null;
  this.submitKey = $key;
}

cancelDelete() {
  this.isDeleting = false;
  this.deleteKey = null;
}

cancelSubmit() {
  this.isSubmitting = false;
  this.submitKey = null;
}

addToPlaylist(artist, album, eachsong, realsongpath, title) {
  this.isSubmitting = true;

  this.mysong = {artist, album, eachsong, realsongpath, title};

  this._musicService.addSongToPlaylist(this.mysong);
  this.cancelSubmit();
  // .subscribe(
  //   c => this.cancelSubmit(),
  //   err => { this.submitError = err; this.isSubmitting = false; }
  //   );
}


deleteFromPlaylist($key: string) {
  this.isDeleting = true;
  this._musicService.deleteSongFromPlaylist($key);
  this.cancelDelete();
  // .subscribe(
  //   c => this.cancelDelete(),
  //   err => { this.deleteError = err; this.isDeleting = false; }
  //   );
}


setPage(page: number) {
  if (page < 1 || page > this.pager.totalPages) {
      return;
  }

  // get pager object from service
  this.pager = this.pagerService.getPager(this.myWholeSongs.length, page);

  // get current page of items
  this.pagedItems = this.myWholeSongs.slice(this.pager.startIndex, this.pager.endIndex + 1);
}


}

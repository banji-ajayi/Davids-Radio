import { Component, OnInit, ViewChild, AfterViewInit, Renderer, Renderer2, ElementRef} from '@angular/core';
import { MusicService } from '../services/music.service';
import { Directory } from '../directory.model';
import 'firebase/storage';
import { FirebaseApp } from 'angularfire2';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';



@Component({
  moduleId: module.id,
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  searchStr: string;
  searchRes: Array<Object>;

  active = false;
  songPlay = '../../assets/play.png';
  songPause = '../../assets/pause.png';

  @ViewChild('songTitle') sTitle;
  @ViewChild('songSlider') sSlider;
  @ViewChild('currentTime') cTime;
  @ViewChild('duration') dtn;
  @ViewChild('volumeSlider') vSlider;


  // loading songs elements
  songTitle: any;
  songSlider: any;
  currentTime: any;
  duration: any;
  volumeSlider: any;
  nextSongTitle: any;

  // audio stuffs
   song = new Audio();
   currentSong = 0;


  // id: any;
  allsongs: FirebaseListObservable<Allsong[]>;
  allplaylists: FirebaseListObservable<Allsong[]>;
  playUrl: any;
  pauseUrl: any;
  mySongs: any;
  filteredSongs: FirebaseListObservable<Allsong[]>;
  mySongPaths;
  mySongName;

  // counter
  counter;

  // filterable properties
  title: string;
  album: string;
  artist: string;
  latest: boolean;
  cancelInterval: any;


  constructor(private _musicService: MusicService, private db: AngularFireDatabase,
    private renderer: Renderer2,
    private element: ElementRef) {

}

ngOnInit() {
    // this.allsongs = this._musicService.getAllSongs();
    this.allplaylists = this._musicService.getAllPlaylist();
}

ngAfterViewInit() {
    this.songTitle = this.sTitle.nativeElement;
    this.songSlider = this.sSlider.nativeElement;
    this.currentTime = this.cTime.nativeElement;
    this.duration = this.dtn.nativeElement;
    this.volumeSlider = this.vSlider.nativeElement;
    // this.nextSongTitle = this.nSongTitle.nativeElement;

    // console.log(this.duration);

    this.loadSong();

    this.cancelInterval = setInterval(this.updateSongSlider.bind(this), 1000);

}


loadSong() {

    this.allplaylists.subscribe(mySongs => {

        this.mySongPaths = mySongs.map(result => `${result.realsongpath}`);
        this.mySongName = mySongs.map(result => `${result.artist} - ${result.title}`);

        this.song.src = this.mySongPaths[this.currentSong];
        // songTitle.textContent = (currentSong + 1) + ". " + songs[currentSong];
        this.songTitle.textContent = this.mySongName[this.currentSong];

        // nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[currentSong + 1 % songs.length];
        this.song.playbackRate = 1;
        this.song.pause();
        this.song.load();
        this.song.volume = this.volumeSlider.value;

        this.song.onloadedmetadata = this.showDuration.bind(this);
        // this.song.play(); // comment this line out if you want song to autoplay
    });
}




// setInterval(updateSongSlider, 1000);

updateSongSlider() {
    if (this.song) {
        const c = Math.round(this.song.currentTime);
        this.songSlider.value = c;
        this.currentTime.textContent = this.convertTime(c);

        this.song.volume = this.volumeSlider.value;
        if (this.song.ended) {
            this.next();
        }
    }

}

convertTime(secs) {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    // min = (min < 10) ? '0' + min : min;
    // sec = (sec < 10) ? '0' + sec : sec;
    return (min + ':' + sec);
}



showDuration() {

    const d = Math.floor(this.song.duration) || 0;
    // debugger;
    console.log('duration ', d);
    this.songSlider.setAttribute('max', d);
    this.duration.textContent = this.convertTime(d);
}

  playOrPauseSong() {
    this.song.playbackRate = 1;
    if (this.song.paused) {
        this.song.play();
        this.active = true;
    } else {
        this.song.pause();
        this.active = false;
    }
}


next() {
    // currentSong = currentSong + 1 % songs.length;
    // console.log('next');
    this.currentSong = Math.floor(Math.random() * this.mySongPaths.length);
    this.loadSong();
    this.song.play();
}

previous() {
    this.currentSong--;
    this.currentSong = (this.currentSong < 0) ? this.mySongPaths.length - 1 : this.currentSong;
    this.loadSong();
}

seekSong() {
    console.log('seekSong change');
    this.song.currentTime = this.songSlider.value;
    this.currentTime.textContent = this.convertTime(this.song.currentTime);
}

adjustVolume() {
    this.song.volume = this.volumeSlider.value;
}

increasePlaybackRate() {
    this.mySongPaths.playbackRate += 0.5;
}

decreasePlaybackRate() {
    this.mySongPaths.playbackRate -= 0.5;
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


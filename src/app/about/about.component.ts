import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';
import 'firebase/storage';
import { FirebaseApp } from 'angularfire2';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  allAbout: FirebaseListObservable<any[]>;

  aboutTitle: any;
  aboutContent: any;


  constructor(private _musicService: MusicService) { }

  ngOnInit() {
    this.allAbout = this._musicService.getAboutMessage();
    // console.log(this.allAbout);

    this.allAbout.subscribe(myAboutContent => {
      //  console.log(myAboutContent);
      this.aboutTitle = myAboutContent.map(result => `${result.title}`);
      this.aboutContent = myAboutContent.map(result => `${result.content}`);

      // console.log(this.aboutTitle);
      // console.log(this.aboutContent);
    });
    }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicService } from '../services/music.service';
import { NgForm } from '@angular/forms';
import 'firebase/storage';
import { FirebaseApp } from 'angularfire2';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-about',
  templateUrl: './add-about.component.html',
  styleUrls: ['./add-about.component.css']
})
export class AddAboutComponent implements OnInit {
  // @Input() selectedMessage;

  allAbout: FirebaseListObservable<any[]>;
  aboutTitle: any;
  aboutContent: any;
  aboutKey: any;

  title: string;
  content: string;
  newAbout: any;
  submitting = false;
  selectedMessage = {content: 'mine',
                     title: '2',
                      $key: 'yes'};



  constructor(private fb: FormBuilder, private _musicService: MusicService) {
  }

  ngOnInit() {
    this.allAbout = this._musicService.getAboutMessage();

    this.allAbout.subscribe(myAboutContent => {
      this.aboutTitle = myAboutContent.map(result => `${result.title}`);
      this.aboutContent = myAboutContent.map(result => `${result.content}`);
      this.aboutKey = myAboutContent.map(result => `${result.$key}`);


      this.selectedMessage.content = this.aboutContent;
      this.selectedMessage.title = this.aboutTitle;
      this.selectedMessage.$key = this.aboutKey;


  });
}

  onUpdate(newAbout) {
    this._musicService.updateAboutContent(newAbout);
  }

}

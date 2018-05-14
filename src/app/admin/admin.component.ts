import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Directory } from '../directory.model';
import { MusicService } from '../services/music.service';
import { NgForm } from '@angular/forms';
import { FileValidator } from '../../file-input.validator';

@Component({
  moduleId: module.id,
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  styles:[
	`input.ng-invalid{border-left:5px solid red;}
	input.ng-valid{border-left:5px solid green}`]
})


export class AdminComponent implements OnInit {

  key: string;
  title: string;
  artist: string;
  album: string;
  image: any;
  eachsong: any;
  type: any;
  progress: number;

  newSong: any;

  submitting = false;

  constructor(
    private _musicService: MusicService) {

  }

  ngOnInit() {}

  onSubmit(adminForm: NgForm) {
    this.newSong = {
      title: this.title,
      artist: this.artist,
      album: this.album,
      progress: this.progress

    };
    if (adminForm.valid) {
      this.submitting = true;
    this._musicService.addSong(this.newSong);
    }
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

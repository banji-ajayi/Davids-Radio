import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicService } from '../services/music.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  // form: FormGroup;

  name: string;
  email: string;
  message: string;
  newEmail: any;



  constructor(private fb: FormBuilder, private _musicService: MusicService) {
    // this.createForm();
  }

  ngOnInit() {
  }

  // createForm() {
  //   this.form = this.fb.group({
  //     name: ['', Validators.required],
  //     email: ['', Validators.required],
  //     message: ['', Validators.required],
  //   });
  // }

  // onSubmit() {
  //   const {name, email, message} = this.form.value;
  //   const date = Date();
  //   const html = `
  //     <div>From: ${name}</div>
  //     <div>Email: <a href="mailto:${email}">${email}</a></div>
  //     <div>Date: ${date}</div>
  //     <div>Message: ${message}</div>
  //   `;
  //   const formRequest = { name, email, message, date, html };
  //   this._musicService.addFeedBack(formRequest);
  //   // this.af.database.list('/messages').push(formRequest);
  //   this.form.reset();
  // }

  onSubmit(feedbackForm: NgForm) {
    this.newEmail = {
      name: this.name,
      email: this.email,
      message: this.message
    };

    this.newEmail = feedbackForm.value;


    const {name, email, message} = feedbackForm.value;
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    // const formRequest = { name, email, message, date, html };
    const formRequest = {
      name: this.name,
      email: this.email,
      message: this.message,
      date,
      html
    };

    this._musicService.addFeedBack(formRequest);
    // this.af.database.list('/messages').push(formRequest);
    feedbackForm.reset();
  }

}



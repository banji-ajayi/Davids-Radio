import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';
import { UserService } from '../user.service';
import { Router } from '@angular/router';




@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit () {
    firebase.auth().onAuthStateChanged(userData => {
      // user is logged in
      if (userData && userData.emailVerified) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

onLogout() {
  firebase.auth().signOut()
  .then(() => {
    this.userService.destroy();
    this.isLoggedIn = false;
  })
  .then(() => {
    this.router.navigate(['/']);
    location.reload();
  });
}

reloadPage() {
  location.reload();
}

}

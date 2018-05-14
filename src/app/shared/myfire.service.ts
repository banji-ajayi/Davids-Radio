import * as firebase from 'firebase';
import {Injectable} from '@angular/core';

@Injectable()
export class MyFireService {

  constructor() {}

  getUserFromDatabase(uid) {

    const ref = firebase.database().ref('users/' + uid);
    return ref.once('value')
      .then(snapshot => snapshot.val());

  }

}


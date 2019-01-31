import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { CheckUsername, User } from '../../interfaces/pic';
import { HomePage } from '../home/home';
import { HttpClient } from "@angular/common/http";
import {FormsModule} from '@angular/forms';
import { ViewChild } from '@angular/core';

/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {

  user: User = { username: null };
  registering = false;
  mediaPath = 'http://media.mw.metropolia.fi/wbma';
  usernameAvailable = true;
  matchingPasswords = true;
  confirmPassword: string;
  @ViewChild('f') f: any;
  @ViewChild('r') r: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider,
              public http: HttpClient) {
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

  login() {
    this.mediaProvider.login(this.user).subscribe(
      response => {
        console.log(response);
        // this.mediaProvider.token = response.token;
        localStorage.setItem('token', response.token);
        this.mediaProvider.loggedIn = true;
        localStorage.setItem('userID', response.user.user_id.toString());
        if (this.registering) {
          this.r.reset();
          this.registering = false;
        } else {
          this.f.reset();
        }
        // console.log(this.f.form);
        // this.r.reset();
        // Save to local storage
        // Move to Homepage with navCtrl

        this.navCtrl.push(HomePage);

      },
      error => {
        console.log(error);
      });
  }

  register() {
    this.mediaProvider.register(this.user).subscribe(
      response => {
        console.log(response);
        this.login();
      },
      error => {
        console.log(error);
      });

  }

  checkUsernameAvailability(user: string) {
    this.http.get(this.mediaPath + '/users/username/' + user).subscribe((res: CheckUsername) => {
      this.usernameAvailable = res.available;
      if (!this.usernameAvailable) {
        this.r.form.controls['username'].setErrors({ 'incorrect': true });
      }
    });
  }
  checkMatchingPasswords(first: string, second: string) {
    this.matchingPasswords = first === second;
  }
}

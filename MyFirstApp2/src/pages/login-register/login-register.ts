import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { User } from '../../interfaces/pic';
import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider) {
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
}

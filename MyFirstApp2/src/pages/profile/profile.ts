import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { Pic, User } from "../../interfaces/pic";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  mediaPath = 'http://media.mw.metropolia.fi/wbma';
  private u: Observable<User>;
  avatarUrl: string;

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewWillEnter() {
    this.u = this.mediaProvider.getUserInfo();

    this.http.get(this.mediaPath + '/tags/profile').subscribe((res: Pic[]) => {
      console.log(res, localStorage.getItem('userID'));
      try {
        this.avatarUrl = res
          .filter(item => item.user_id.toString() === localStorage.getItem('userID'))
          .map(item => item.filename)[0].toString();
        console.log(this.avatarUrl);
      } catch (e) {
        console.log(e);
        this.avatarUrl = '';
      }
    });
  }

  /*
  ionViewWillEnter() {
    this.logout();
  }
  */
  logout() {
    localStorage.clear();
    console.log('Logged out');
    this.mediaProvider.loggedIn = false;
    this.avatarUrl = '';
    this.navCtrl.push(HomePage);
  }

}

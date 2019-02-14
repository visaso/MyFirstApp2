import { Component, Provider } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pic } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from "rxjs";
import { UploadPage } from "../upload/upload";
import { PlayerPage } from "../player/player";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picArray: Observable<Pic[]>;

  constructor(public navCtrl: NavController, private http: HttpClient, private mediaProvider: MediaProvider) {
  }

  ionViewWillEnter() {
    this.getAllFiles();
    console.log('Getting imgs');
    /*
    if (localStorage.getItem('token') != null && !this.mediaProvider.loggedIn) {
      console.log('Automatic login');
      this.mediaProvider.token = localStorage.getItem('token');
      this.mediaProvider.login(this.mediaProvider.token);
    }
    */
    if (!this.mediaProvider.loggedIn && localStorage.getItem("token") != null) {

      this.mediaProvider.initialLoginCheck().subscribe(
        res => {
          this.mediaProvider.loggedIn = true;
        },
        error => {
          this.mediaProvider.loggedIn = false;
        });
    }

    const pattern = '\\[d\\](.*)\\[\\/d\\]';
    const re = new RegExp(pattern);
    console.log(re);
    console.log(re.exec('[d]Nice dog[/d]'));
  }

  goToUpload() {
    this.navCtrl.push(UploadPage).catch();
  }

  getAllFiles() {
    this.picArray = this.mediaProvider.getAllMedia();
  }

  viewImage(param1, param2) {
    this.navCtrl.push(PlayerPage, {
      property1: param1,
      property2: param2
    });
  }
}




import { Component, Provider } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pic } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from "rxjs";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picArray: Observable<Pic[]>;

  constructor(public navCtrl: NavController, private http: HttpClient, private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
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
  }

  getAllFiles() {
    this.picArray = this.mediaProvider.getAllMedia();
  }
}




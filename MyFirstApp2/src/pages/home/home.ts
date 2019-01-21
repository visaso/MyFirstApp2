import { Component, Provider } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pic } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';
import { MediaProvider } from "../../providers/media/media";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picArray: Pic[] = [];

  //mediaPath = 'http://media.mw.metropolia.fi/wbma/media';

  constructor(public navCtrl: NavController, private http: HttpClient, private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    this.getAllFiles();
    console.log('Getting images');
  }

  getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe((data: Pic[]) => {
      console.log(data);
      this.picArray = data.map((pic: Pic) => {
        const nameArray = pic.filename.split('.');
        pic.thumbnails = {
          160: nameArray[0] + '-tn160.png',
        };
        return pic;
      });
    });
  }
}




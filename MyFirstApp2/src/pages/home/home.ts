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
  /*
  getImages() {
    this.http.get<Pic[]>(this.mediaPath).subscribe(
      (res: Pic[]) => {
        this.picArray = res;
        this.picArray.forEach(i => {
          let split = i.filename;
          let rest = split.substring(0, split.lastIndexOf('.') + 0);
          i.filename = rest + '-tn160.png';
        });
        console.log(this.picArray);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  */
  getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe((data: Pic[]) => {
      console.log(data);
      this.picArray = data;
      this.picArray.map((i => {
        const split = i.filename;
        const rest = split.substring(0, split.lastIndexOf('.'));
        i.filename = rest + '-tn160.png';
      }));
    });
  }
}




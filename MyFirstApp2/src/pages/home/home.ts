import { Component, Provider } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pic } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picArray: Pic[] = [];
  mediaPath = 'http://media.mw.metropolia.fi/wbma/media';

  constructor(public navCtrl: NavController, private http: HttpClient) {
  }

  ngOnInit() {
    this.getImages();
    console.log('Getting images');
  }

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
}




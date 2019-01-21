import { Component, Provider } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pic } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';
import { MediaProvider } from '../../providers/media/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picArray: Pic[] = [];

  constructor(public navCtrl: NavController, private http: HttpClient, private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    this.getAllFiles();
    console.log('Getting images');
  }

  getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe((data: Pic[]) => {
      console.log(data);
      data.forEach((i => {
        this.mediaProvider.getSingleMedia(i.file_id).subscribe((item: Pic) => {
          this.picArray.push(item);
          console.log(item);
        });
      }));
    });
  }
}




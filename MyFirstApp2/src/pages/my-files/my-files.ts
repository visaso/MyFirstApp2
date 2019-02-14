import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from "../../providers/media/media";
import { Pic } from "../../interfaces/pic";
import { UploadPage } from "../upload/upload";
import { Observable } from "rxjs";
import { PlayerPage } from "../player/player";
import { ModifyPage } from "../modify/modify";

/**
 * Generated class for the MyFilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-files',
  templateUrl: 'my-files.html',
})
export class MyFilesPage {

  picArray: Observable<Pic[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public media: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyFilesPage');
    this.getFiles();
  }

  getFiles() {
    this.picArray = this.media.getUserFiles();
  }

  viewImage(param1, param2) {
    this.navCtrl.push(PlayerPage, {
      property1: param1,
      property2: param2
    });
  }

  modifyImage(param1, param2) {
    this.navCtrl.push(ModifyPage, {
      property1: param1,
      property2: param2
    });
  }

  deleteImage(id: string) {
    this.media.deleteImage(id).subscribe((res => {
      console.log(res);
    }));
    this.navCtrl.pop().catch();
    this.navCtrl.push(MyFilesPage).catch();
  }


}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from "../../providers/media/media";
import { Modify, Pic } from "../../interfaces/pic";

/**
 * Generated class for the ModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modify',
  templateUrl: 'modify.html',
})
export class ModifyPage {

  pic: string;
  title: string;
  description: string;

  json: Modify = { title: 'ok', description: 'okok' };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public media: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPage');
    this.pic = this.navParams.get('property2');
    console.log(this.pic);
  }

  modify() {
    this.media.modifyImage(this.json, this.pic);

  }

}

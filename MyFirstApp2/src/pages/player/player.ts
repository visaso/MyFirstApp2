import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pic } from "../../interfaces/pic";
import { MediaProvider } from "../../providers/media/media";

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {

  username: string;
  pic: Pic;
  pic_id: string;

  constructor(public navCtrl: NavController, public navParams: NavParams
  , public media: MediaProvider) {

  }

  ionViewDidEnter() {
    this.pic = this.navParams.get('property1');
    console.log(this.pic);
    this.pic_id = this.pic.file_id;
    console.log(this.pic.user_id);
    this.media.getUsername(this.pic.user_id).subscribe((res => {
      console.log(res);
      this.username = res.username;
    }));
    console.log(this.pic.description);
  }



}

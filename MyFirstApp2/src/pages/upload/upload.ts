import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from "../../providers/media/media";
import { LoadingController } from "ionic-angular";

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  filedata = '';
  file: File;
  title: string;
  description: string;
  filters = {
    'brightness': 100,
    'contrast': 100,
    'sepia': 0,
    'saturation': 100,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public media: MediaProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  handleChange($event) {
    this.file = $event.target.files[0];
    this.showPreview();
  }

  showPreview() {
    const reader = new FileReader();
    reader.onloadend = (evt) => {
      this.filedata = reader.result;
    };
    if (this.file.type.includes('video')) {
      this.filedata = 'http://via.placeholder.com/500X200/000?text=Video';
    } else if (this.file.type.includes('audio')) {
      this.filedata = 'http://via.placeholder.com/500X200/000?text=Audio';
    } else {
      reader.readAsDataURL(this.file);
    }
  }

  upload() {
    // show spinner
    const loading = this.loadingCtrl.create({
      content: 'Please chill.'
    });
    loading.present();
    // const desc = '<description>${this.description}</description>';
    const filters = '<filters>filtersAsText</filters>';
    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('description', this.description);
    fd.append('file', this.file);
    this.media.upload(fd).subscribe(res => {
      console.log(res);
      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.pop().catch();
      }, 2000);
      // setTimeout 2 sec

      // remove spinner
    });
  }

  filterImage() {
    return { filter: `brightness(${this.filters.brightness}%) contrast(${this.filters.contrast}%) sepia(${this.filters.sepia}%) saturate(${this.filters.saturation}%)` };
  }

}

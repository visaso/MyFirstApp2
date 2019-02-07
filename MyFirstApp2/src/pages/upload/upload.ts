import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from "../../providers/media/media";
import { LoadingController } from "ionic-angular";
import { Chooser } from "@ionic-native/chooser";

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
    'saturation': 100,
    'sepia': 0,
    'contrast': 100,
  };
  width = '100%';
  height = '20%';
  bgColor = 'red';
  myBlob: any;
  previewSrc = '';
  isImage = false;
  imageUploaded = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public media: MediaProvider,
              public loadingCtrl: LoadingController, private chooser: Chooser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  handleChange($event) {
    this.file = $event.target.files[0];
    // this.showPreview();
  }
/*
  showPreview() {
    const reader = new FileReader();
    reader.onloadend = (evt) => {
      this.previewSrc = reader.result;
    };

    if (this.previewSrc.includes('video')) {
      this.filedata = 'http://via.placeholder.com/500X200/000?text=Video';
    } else if (this.previewSrc.includes('audio')) {
      this.filedata = 'http://via.placeholder.com/500X200/000?text=Audio';
    } else {
      reader.readAsDataURL(this.previewSrc);
    }

    reader.readAsDataURL(this.previewSrc);

}
*/
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
    fd.append('description', this.description + ':FILTERS:' + JSON.stringify(this.filters));
    // fd.append('file', this.file);
    fd.append('file', this.myBlob);
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

  chooseFile() {
    this.chooser.getFile('image/*, audio/*, video/*').then(
      file => {
        console.log(file);
        this.myBlob = new Blob([file.data], { type: file.mediaType });
        if (file.mediaType.includes('image')) {
          this.isImage = true;
        }
        this.imageUploaded = true;
        console.log(this.myBlob);
        this.previewSrc = file.dataURI;
        // this.showPreview();
      },
      error => {
        console.error(error);
      }
    );
  }
  clear() {
    this.previewSrc = '';
    this.isImage = false;
    this.filters = {
      'brightness': 100,
      'saturation': 100,
      'sepia': 0,
      'contrast': 100,
    };
  }
}

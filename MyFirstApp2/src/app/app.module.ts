import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { MediaProvider } from '../providers/media/media';
import { MenuPage } from '../pages/menu/menu';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { ProfilePage } from '../pages/profile/profile';
import { ThumbnailPipe } from '../pipes/thumbnail/thumbnail';
import { UserimagePipe } from "../pipes/userimage/userimage";
import { FormsModule } from "@angular/forms";
import { UploadPage } from "../pages/upload/upload";
import { Chooser } from "@ionic-native/chooser";
import { Camera } from "@ionic-native/camera";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    LoginRegisterPage,
    ProfilePage,
    ThumbnailPipe,
    UserimagePipe,
    UploadPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    LoginRegisterPage,
    ProfilePage,
    UploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,

    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider,
    Chooser,
    Camera
  ]
})
export class AppModule {
}

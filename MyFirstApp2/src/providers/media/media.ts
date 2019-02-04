import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckUsername, LoginResponse, MediaFile, Pic, User } from '../../interfaces/pic';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  mediaPath = 'http://media.mw.metropolia.fi/wbma';
  loggedIn = false;
  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAllMedia() {
    return this.http.get<Pic[]>(this.mediaPath + '/media');
  }
  getSingleMedia(id: any) {
   return this.http.get<Pic>(this.mediaPath + '/media/' + id);
  }
  register(user: User) {
    const registerInfo = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),
    };
    return this.http.post<LoginResponse>(this.mediaPath + '/users/', user, registerInfo);
  }
  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),
      // body: [user.username]
    }; // add headers
    return this.http.post<LoginResponse>(this.mediaPath + '/login', user, httpOptions);
  }

  upload(user: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })
      // body: [user.username]
    }; // add headers
    return this.http.post<LoginResponse>(this.mediaPath + '/media', user, httpOptions);
  }

  getUserInfo() {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })
    };
    return this.http.get<User>(this.mediaPath + '/users/user/', httpOptions);
  }

  getFilesByTag() {
    return this.http.get<Pic[]>(this.mediaPath + '/tags/profile');
  }

  initialLoginCheck() {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })
    };
    return this.http.get<LoginResponse>(this.mediaPath + '/users/user/', httpOptions);
  }

  /*
  profile() {
    localStorage.clear();
  }
  */
}

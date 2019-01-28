import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from "../../providers/media/media";
import { Pic, User } from "../../interfaces/pic";

/**
 * Generated class for the UserimagePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'userimage',
})
export class UserimagePipe implements PipeTransform {

  constructor(private mediaProvider: MediaProvider) {
  }

  transform(token: string, ...args) {
    return new Promise((resolve, reject) => {
      /*
      this.mediaProvider.getFilesByTag().subscribe((response: Pic) => {
        resolve(response.username);
      });
      */
    });
  }
}

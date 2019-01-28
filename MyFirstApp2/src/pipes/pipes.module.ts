import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { UserimagePipe } from './userimage/userimage';
@NgModule({
	declarations: [ThumbnailPipe,
    UserimagePipe],
	imports: [],
	exports: [ThumbnailPipe,
    UserimagePipe]
})
export class PipesModule {}

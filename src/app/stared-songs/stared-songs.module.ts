import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaredSongsPageRoutingModule } from './stared-songs-routing.module';

import { StaredSongsPage } from './stared-songs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaredSongsPageRoutingModule
  ],
  declarations: [StaredSongsPage]
})
export class StaredSongsPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaredSongsPage } from './stared-songs.page';

const routes: Routes = [
  {
    path: '',
    component: StaredSongsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaredSongsPageRoutingModule {}

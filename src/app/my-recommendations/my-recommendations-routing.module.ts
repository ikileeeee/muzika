import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRecommendationsPage } from './my-recommendations.page';
import { EditComponent } from '../edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: MyRecommendationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRecommendationsPageRoutingModule {}

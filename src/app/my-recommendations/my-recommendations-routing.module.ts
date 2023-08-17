import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRecommendationsPage } from './my-recommendations.page';

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

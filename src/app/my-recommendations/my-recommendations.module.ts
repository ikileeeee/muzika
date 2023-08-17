import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRecommendationsPageRoutingModule } from './my-recommendations-routing.module';

import { MyRecommendationsPage } from './my-recommendations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRecommendationsPageRoutingModule
  ],
  declarations: [MyRecommendationsPage]
})
export class MyRecommendationsPageModule {}

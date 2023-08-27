import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRecommendationsPageRoutingModule } from './my-recommendations-routing.module';

import { MyRecommendationsPage } from './my-recommendations.page';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { RecomendModule } from '../recomend.module';
import { EditComponent } from '../edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRecommendationsPageRoutingModule
   // AddModalComponent
  ],
  declarations: [MyRecommendationsPage, AddModalComponent, EditComponent],

})
export class MyRecommendationsPageModule {}

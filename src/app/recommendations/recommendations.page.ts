import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecomendModel } from '../interface/recomend.model';
import { RecomendService } from '../recomend.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.page.html',
  styleUrls: ['./recommendations.page.scss'],
})
export class RecommendationsPage implements OnInit, OnDestroy {

  recomends: RecomendModel[]=[{
    id: "1", singer:"Moja malenkost", song:"ja", genre:"ja",author:"ja",comment:"ja"
 },
 {
  id: "2", singer:"Moja malenkost", song:"ja", genre:"ja",author:"ja",comment:"ja"
}];

  constructor(private recomendService: RecomendService) { 
    this.recomends=this.recomendService.recomend;
  }

  staredAlert(){
    console.log("2");
  }

  ngOnInit() {
    console.log('ngOnInit');
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }
  
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }
  ionViewDidLeave() {
    console.log('ionViewWDidLeave');
  }
ngOnDestroy(){
  console.log('ngOnDestroy');

}

}

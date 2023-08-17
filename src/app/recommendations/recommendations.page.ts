import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.page.html',
  styleUrls: ['./recommendations.page.scss'],
})
export class RecommendationsPage implements OnInit, OnDestroy {
  constructor() { 
    console.log('constructor');
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

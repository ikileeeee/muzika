import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-stared-songs',
  templateUrl: './stared-songs.page.html',
  styleUrls: ['./stared-songs.page.scss'],
})
export class StaredSongsPage implements OnInit, OnDestroy {

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

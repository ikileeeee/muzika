import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecomendModel } from '../interface/recomend.model';
import { RecomendService } from '../recomend.service';
import { AlertController } from '@ionic/angular';
import { StaredModel } from '../stared.model';

@Component({
  selector: 'app-stared-songs',
  templateUrl: './stared-songs.page.html',
  styleUrls: ['./stared-songs.page.scss'],
})
export class StaredSongsPage implements OnInit, OnDestroy {

  private subRec: Subscription;
  recomends: RecomendModel[];

  private sub2: Subscription;
  staredRec: StaredModel[];

  constructor(private recomendService: RecomendService, private alertC: AlertController) { 
  } 

  ngOnInit() {
    this.subRec=this.recomendService.staredRecomendations.subscribe((recomendationData)=>{
     // console.log(recomendationData);
      this.recomends=recomendationData;
    }
    );
    this.sub2=this.recomendService.stared.subscribe((recomendationData)=>{
      // console.log(recomendationData);
       this.staredRec=recomendationData;
     }
     );
    
  }
  ionViewWillEnter() {
    this.recomendService.getStarredReccomendation().subscribe((recomendationData)=>{
      console.log(recomendationData);
     // this.recomends=recomendationData;
    }
    );
    this.recomendService.getStaredRecMod().subscribe((recomendationData)=>{
      console.log(recomendationData);
     // this.recomends=recomendationData;
    }
    );
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
  if(this.subRec){
  this.subRec.unsubscribe();
    }
    if(this.sub2){
      this.sub2.unsubscribe();
   }
  }

  unstar(rec: RecomendModel){
    this.alertC.create({
      header: "Unstar recomendation.",
      message: "Are you sure you want to unsave this recomendation?",
      buttons:[
        {
          text: "Cancel",
          handler: ()=>{
            console.log("Canceling it!");
          }
        },
        {
          text: "Yes",
          handler: ()=>{
            console.log('unsubscribe');
            for(const key in this.staredRec){
              if(this.staredRec[key].recomendation.id==rec.id){
                console.log(this.staredRec[key]);
                //this.recomendService.deletStaredRecomendation(this.staredRec[key]).subscribe((res)=>{
                //  console.log(res);
                //});;
              }
            }
            
          }
        }
      ]
    }).then( (alert: HTMLIonAlertElement)=>{
    alert.present();
  });
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecomendModel } from '../interface/recomend.model';
import { RecomendService } from '../recomend.service';
import { AlertController, IonButton } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.page.html',
  styleUrls: ['./recommendations.page.scss'],
})
export class RecommendationsPage implements OnInit, OnDestroy {

private subRec: Subscription;
  recomends: RecomendModel[];

  constructor(private recomendService: RecomendService, private alertC: AlertController) { 
    //this.recomends=this.recomendService.recomend;
  }



  ngOnInit() {
    this.subRec=this.recomendService.reccomendations.subscribe((recomendationData)=>{
      console.log(recomendationData);
      
      this.recomends=recomendationData;
    }
    );
  }
  ionViewWillEnter() {
    this.recomendService.getRecomendations().subscribe((recomendationData)=>{
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

}
staredAlert(){
  this.alertC.create({
    header: "Saving recomendation.",
    message: "Are you sure you want to save this recomendation?",
    buttons:[
      {
        text: "Cancel",
        handler: ()=>{
          console.log("Canceling it!");
        }
      },
      {
        text: "Save",
        handler: ()=>{
          console.log("Saving it!");
        }
      }
    ]
    
  }).then( (alert: HTMLIonAlertElement)=>{
  alert.present();
});
}

}

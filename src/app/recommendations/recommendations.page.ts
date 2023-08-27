import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecomendModel } from '../interface/recomend.model';
import { RecomendService } from '../recomend.service';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.page.html',
  styleUrls: ['./recommendations.page.scss'],
})
export class RecommendationsPage implements OnInit, OnDestroy {

  private subRec: Subscription;
  recomends: RecomendModel[];
  private sub2: Subscription;
  alreadyIn: RecomendModel[];
  old= new RecomendModel("", "","","","","");
  constructor(private recomendService: RecomendService, private alertC: AlertController) { 
    //this.recomends=this.recomendService.recomend;
  } 
  ngOnInit() {
    this.subRec=this.recomendService.reccomendations.subscribe((recomendationData)=>{
      //console.log(recomendationData);
      this.recomends=recomendationData;
    }
    );
    this.sub2=this.recomendService.staredRecomendations.subscribe((recomendationData)=>{
      //console.log(recomendationData);
      this.alreadyIn=recomendationData;
    }
    );
  }
  ionViewWillEnter() {
    this.recomendService.getRecomendations().subscribe((recomendationData)=>{
      console.log(recomendationData);
     // this.recomends=recomendationData;
    }
    );
    this.recomendService.getStarredReccomendation().subscribe((recomendationData)=>{
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
  if(this.sub2){
    this.subRec.unsubscribe();
  }
}

}

staredAlert(rec: RecomendModel){
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
          console.log(this.old);
          for(const key in this.alreadyIn){
            if(this.alreadyIn[key].id==rec.id || this.old.id==rec.id){

              this.alertC.create({
                header: "",
                message:"Already saved song!",
                buttons:[ "Okay"]
              }).then( (alert: HTMLIonAlertElement)=>{
              alert.present();
            });

              return;
            }
          }
          this.old=rec;
          console.log(rec.song);
          this.recomendService.addStaredRecomendation(rec).subscribe((res)=>{
            console.log(res);
          });;
          
        }
      }
    ]
  }).then( (alert: HTMLIonAlertElement)=>{
  alert.present();
});
}

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RecomendModel } from '../interface/recomend.model';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { RecomendService } from '../recomend.service';
import { Subscription } from 'rxjs';
import { EditComponent } from '../edit/edit.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-recommendations',
  templateUrl: './my-recommendations.page.html',
  styleUrls: ['./my-recommendations.page.scss'],
})
export class MyRecommendationsPage implements OnInit, OnDestroy {

  private subRec: Subscription;
  recomends: RecomendModel[];
    constructor(private addModal: ModalController, private recomendService: RecomendService, private router: Router, private alertC: AlertController) { 
      console.log('constructor');
    }
    openForm(){
      console.log('tu sam');
      this.addModal.create({
        component: AddModalComponent
      }).then((modal: HTMLIonModalElement)=>{
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData)=>{
      if(resultData.role==='confirm'){
          console.log(resultData);
          this.recomendService.addRecomendation('',resultData.data.recomendData.genre,
            resultData.data.recomendData.singer,resultData.data.recomendData.song,
            resultData.data.recomendData.comment).subscribe((res)=>{
              console.log(res);
              //this.recomends=this.recomends;
            });
      }else{
        console.log('canceled');
      }
      }
    )
    }
  
    ngOnInit() {
      this.subRec=this.recomendService.myReccomendations.subscribe((recomendationData)=>{
        console.log(recomendationData);
        this.recomends=recomendationData;
      }
      );
    }
    ionViewWillEnter() {
      this.recomendService.getMyRecomendations().subscribe((recomendationData)=>{
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
openEdit(rec: RecomendModel){
  console.log('iz myrec: '+rec.song);
  this.recomendService.setEdit(rec);
  this.addModal.create({
    component: EditComponent
  }).then((modal: HTMLIonModalElement)=>{
  modal.present();
  return modal.onDidDismiss();
}).then((resultData)=>{
  if(resultData.role==='confirm'){
      this.recomendService.editRecomendation(resultData.data.recomendData.id,resultData.data.recomendData.author,resultData.data.recomendData.genre,
        resultData.data.recomendData.singer,resultData.data.recomendData.song,
        resultData.data.recomendData.comment).subscribe((res)=>{
          console.log(res);
        });
  }else{
    console.log('canceled');
  }
  }
)

}
deleteRec(rec: RecomendModel){
  this.alertC.create({
    header: "Deleting recomendation.",
    message: "Are you sure you want to delete this recomendation?",
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
          this.recomendService.deleteMyRec(rec).subscribe((res)=>{});
          console.log(rec.id);
          
        }
      }
    ]
  }).then( (alert: HTMLIonAlertElement)=>{
  alert.present();
});
}

  

}

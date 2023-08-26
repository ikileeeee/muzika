import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecomendModel } from '../interface/recomend.model';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { RecomendService } from '../recomend.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-recommendations',
  templateUrl: './my-recommendations.page.html',
  styleUrls: ['./my-recommendations.page.scss'],
})
export class MyRecommendationsPage implements OnInit, OnDestroy {

  private subRec: Subscription;
  recomends: RecomendModel[];
    constructor(private addModal: ModalController, private recomendService: RecomendService) { 
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
  

}

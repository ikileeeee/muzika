import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecomendModel } from '../interface/recomend.model';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { RecomendService } from '../recomend.service';

@Component({
  selector: 'app-my-recommendations',
  templateUrl: './my-recommendations.page.html',
  styleUrls: ['./my-recommendations.page.scss'],
})
export class MyRecommendationsPage implements OnInit, OnDestroy {

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

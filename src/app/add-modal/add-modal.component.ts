
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent  implements OnInit {

  constructor(private modalC: ModalController) { 
  }
  @ViewChild('f', {static:true})f: NgForm;
 

  ngOnInit() {}

  cancel(){
    this.modalC.dismiss(null, 'cancel');
  }
  onAdd(){
    if(!this.f.valid){
      return;
    }
    this.modalC.dismiss({recomendData: {
      singer: this.f.value['singer'],
      song: this.f.value['song'],
      genre: this.f.value['genre'],
      comment: this.f.value['comment']

    }},
    'confirm');
  }
}

import { Injectable } from '@angular/core';
import { RecomendModel } from './interface/recomend.model';

@Injectable({
  providedIn: 'root'
})
export class RecomendService {
  recomend: RecomendModel[]=[{
    id: "1", singer:"Moja malenkost", song:"ja", genre:"ja",author:"ja",comment:"ja"
  },
{
  id: "2", singer:"Moja malenkost", song:"ja", genre:"Pop",author:"ja",comment:"ja to tako vamo tamo. Sta je smesno?"
},
{
  id: "4", singer:"Moja malenkost", song:"ja", genre:"Pop",author:"ja",comment:"ja to tako vamo tamo. Sta je smesno?"
}];

  constructor() { 
    console.log('ucitava');
  }
  staredAlert(){
    console.log('servis');
  }
  getRecomendId(id: string){
    return this.recomend.find((r:RecomendModel)=>r.id===id);
    console.log("izabrali ste ovaj id"+id);
  }
  


}

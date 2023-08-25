import { Injectable } from '@angular/core';
import { RecomendModel } from './interface/recomend.model';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
interface RecomendData{
  song:string,
  singer:string,
  genre:string,
  author:string,
  comment:string,
}

@Injectable({
  providedIn: 'root'
})
export class RecomendService {
  recomend: RecomendModel[]=[];
  //private recommendation: RecomendModel[]=[];
  private recommendation= new BehaviorSubject<RecomendModel[]>([]);
  get reccomendations(){
    return this.recommendation.asObservable();
  }

  constructor(private http: HttpClient) { 
    console.log('ucitava');
  }
  getRecomendId(id: string){
    return this.recomend.find((r:RecomendModel)=>r.id===id);
    console.log("izabrali ste ovaj id"+id);
  }
  
  addRecomendation(author: string, genre: string, singer:string, song:string, comment:string){
    let id;
    return this.http.post<{name:string}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/recomendation.json', {
      author,
      singer, 
      genre,
      song,
      comment
    }).pipe(switchMap((resData)=>{

      id= resData.name;
      return this.reccomendations;
    }), take(1), tap((reccomendations)=>{
      this.recommendation.next(
        reccomendations.concat(
          {
            id: id,
            song,
            singer,
            genre,
            author,
            comment
          }
        )
      );
    }));
  }
  getRecomendations(){
    return this.http.get<{[key: string]: RecomendData}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/recomendation.json').pipe(map((recomendationData)=>
    {
      const recomends: RecomendModel[]=[];
      for(const key in recomendationData){
        if(recomendationData.hasOwnProperty(key)){
          recomends.push({
            id: key,
            song:recomendationData[key].song,
            singer:recomendationData[key].singer,
            genre:recomendationData[key].genre,
            author:recomendationData[key].author,
            comment:recomendationData[key].comment
          });
        }
      }
      return recomends;
    }),
    tap( recomends =>{
      return this.recommendation.next(recomends);

    })
    );
  }

}

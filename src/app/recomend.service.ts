import { Injectable } from '@angular/core';
import { RecomendModel } from './interface/recomend.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './user.model';
import { StaredModel } from './stared.model';
interface RecomendData{
  song:string,
  singer:string,
  genre:string,
  author:string,
  comment:string,
}
interface StaredData{
  user: string,
  recomend: RecomendModel
}

@Injectable({
  providedIn: 'root'
})
export class RecomendService {
  
  recomend: RecomendModel[]=[];
  //private recommendation: RecomendModel[]=[];
  private recommendation= new BehaviorSubject<RecomendModel[]>([]);
  private myRecomendation= new BehaviorSubject<RecomendModel[]>([]);
  private staredRecomendation= new BehaviorSubject<RecomendModel[]>([]);
  private staredRecMod= new BehaviorSubject<StaredModel[]>([]);

 
  get reccomendations(){
    return this.recommendation.asObservable();
  }
  get staredRecomendations(){
    return this.staredRecomendation.asObservable();
  }

  get myReccomendations(){
    return this.myRecomendation.asObservable();
  }
  get stared(){
    return this.staredRecMod.asObservable();
  }


  constructor(private http: HttpClient, private authService: AuthService) { 
    console.log('ucitava');
  }
  getRecomendId(id: string){
    return this.recomend.find((r:RecomendModel)=>r.id===id);
    console.log("izabrali ste ovaj id"+id);
  }
  
  addRecomendation(author: string, genre: string, singer:string, song:string, comment:string){
    let id;
    let newRecomend: RecomendModel;
    return this.authService.userID.pipe(
      take(1),
      switchMap(userID=>{
        newRecomend= new RecomendModel(null,song, singer, genre, userID, comment);
        return this.http.post<{name:string}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/recomendation.json',newRecomend);

      }), take(1), switchMap((resData)=>{

        id= resData.name;
        return this.myReccomendations;
      }),take(1), tap((reccomendations)=>{
        newRecomend.id= id;
        this.myRecomendation.next(
          reccomendations.concat(newRecomend)
        );
      })
    ); 
  }
  getRecomendations(){
    let userLogged: string;
    return this.authService.userID.pipe(
      take(1),
      switchMap(userID=>{
        userLogged=userID;
        return this.http.get<{[key: string]: RecomendData}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/recomendation.json').pipe(map((recomendationData)=>
        {
          const recomends: RecomendModel[]=[];
          for(const key in recomendationData){
            if(recomendationData.hasOwnProperty(key) && userLogged!=null && userLogged!=recomendationData[key].author){
              recomends.push(new RecomendModel(key,recomendationData[key].song, recomendationData[key].singer,
                recomendationData[key].genre, recomendationData[key].author, recomendationData[key].comment));
            }
          }
          return recomends;
        }),
        tap( recomends =>{
          return this.recommendation.next(recomends);
    
        })
        );
        
      })
    );
  }

  getMyRecomendations(){
    let userLogged: string;
    return this.authService.userID.pipe(
      take(1),
      switchMap(userID=>{
        userLogged=userID;
        return this.http.get<{[key: string]: RecomendData}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/recomendation.json').pipe
        (map((recomendationData)=>
        {
          const recomends: RecomendModel[]=[];
          for(const key in recomendationData){
            if(recomendationData.hasOwnProperty(key) && userLogged!=null && userLogged==recomendationData[key].author){
              recomends.push(new RecomendModel(
                key,recomendationData[key].song, 
                recomendationData[key].singer,
                recomendationData[key].genre, 
                recomendationData[key].author, 
                recomendationData[key].comment
                ));
            }
          }
          return recomends;
        }),
        tap( recomends =>{
          return this.myRecomendation.next(recomends);

        })
        );
        
      })
    );

  }
  

  getStarredReccomendation(){
    let userLogged: string;
    
    return this.authService.userID.pipe(
      take(1),
      switchMap(userID=>{
        userLogged=userID;
        return this.http.get<{name:string}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/staredSongs.json');

      }), take(1), map((staredData)=>{
        const stars: RecomendModel[]=[];
        for(const key in staredData){
            if(staredData.hasOwnProperty(key) &&  staredData[key].user==userLogged){
              stars.push(staredData[key].recomendation);
            }
          
        }
        return stars;
      }),tap((stars)=>{
        this.staredRecomendation.next(stars);
      })
    ); 
  }
  addStaredRecomendation(recomend: RecomendModel){
        let id;
        let userLogged: string;
        let stared= new StaredModel(null, recomend, null);
        return this.authService.userID.pipe(
        take(1),
        switchMap(userID=>{
        userLogged=userID;
        stared.user=userLogged;
        return this.http.post<{name:string}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/staredSongs.json',stared);

     }), take(1), switchMap((staredData)=>{
        id= staredData.name;
        return this.staredRecomendations;
      }),take(1), tap((staredRecomendations)=>{
        stared.id= id;
        this.staredRecomendation.next(
        staredRecomendations.concat(staredRecomendations)
        );
      })
    ); 
    
  
  }
  getStaredRecMod(){
    let userLogged: string;
    
    return this.authService.userID.pipe(
      take(1),
      switchMap(userID=>{
        userLogged=userID;
        return this.http.get<{name:string}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/staredSongs.json');

      }), take(1), map((staredData)=>{
        const stars: StaredModel[]=[];
        for(const key in staredData){
            if(staredData.hasOwnProperty(key) &&  staredData[key].user==userLogged){
              stars.push(staredData[key]);
            }
          
        }
        return stars;
      }),tap((stars)=>{
        this.staredRecMod.next(stars);
      })
    ); 
  }

  deletStaredRecomendation(stared: StaredModel){
    

  }

}

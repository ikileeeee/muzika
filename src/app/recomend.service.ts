import { Injectable } from '@angular/core';
import { RecomendModel } from './interface/recomend.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './user.model';
import { StaredModel } from './stared.model';
import { Token } from '@angular/compiler';
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
  re: RecomendModel[]=[];
  edit: RecomendModel;

  setEdit(rec: RecomendModel){
    this.edit=rec;
    console.log(this.edit.song);
  }
  getEdit(){
    return this.edit;
  }

  //private recommendation: RecomendModel[]=[];
  private recommendation= new BehaviorSubject<RecomendModel[]>([]);
  private myRecomendation= new BehaviorSubject<RecomendModel[]>([]);
  private staredRecomendation= new BehaviorSubject<RecomendModel[]>([]);
  private staredRecMod= new BehaviorSubject<StaredModel[]>([]);

  getRecomend(id: string){
    this.myReccomendations.subscribe((rec)=>{
    this.re=rec;}
    )
    return this.re.find((recomen)=>recomen.id=id);
  }
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

  getStaredForDelete(r: RecomendModel){
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
        return this.authService.token;}), take(1), switchMap((token)=>{
        return this.http.post<{name:string}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/recomendation.json?auth='+token,newRecomend);

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
        return this.authService.token;}), take(1), switchMap((token)=>{
        return this.http.get<{[key: string]: RecomendData}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/recomendation.json?auth='+token);}),
        take(1), switchMap((recomendationData)=>
        {
          const recomends: RecomendModel[]=[];
          for(const key in recomendationData){
            if(recomendationData.hasOwnProperty(key) && userLogged!=null && userLogged!=recomendationData[key].author){
              recomends.push(new RecomendModel(key,recomendationData[key].song, recomendationData[key].singer,
                recomendationData[key].genre, recomendationData[key].author, recomendationData[key].comment));
            }
          }
          this.recommendation.next(recomends);
          return recomends;
        }));
      
  }

  getMyRecomendations(){
    let userLogged: string;
    return this.authService.userID.pipe(
      take(1),
      switchMap(userID=>{
        userLogged=userID;
        return this.authService.token;}), take(1), switchMap((token)=>{
        return this.http.get<{[key: string]: RecomendData}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/recomendation.json?auth='+token);}),
        take(1), switchMap((recomendationData)=>
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
          this.myRecomendation.next(recomends);
          return recomends;
        }));

  }
  

  getStarredReccomendation(){
    let userLogged: string;
    
    return this.authService.userID.pipe(
      take(1),
      switchMap(userID=>{
        userLogged=userID;
        return this.authService.token;}), take(1), switchMap((token)=>{
        return this.http.get<{name:string}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/staredSongs.json?auth='+token);

      }), take(1), map((staredData)=>{
        const stars: RecomendModel[]=[];
        for(const key in staredData){
            if(staredData.hasOwnProperty(key) &&  staredData[key].user==userLogged){
              stars.push(staredData[key].recomendation);
            }
          
        }
        this.staredRecomendation.next(stars);
        return stars;
      })); 

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
        return this.authService.token.pipe(take(1), switchMap((token)=>{
          return this.http.post<{name:string}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/staredSongs.json?auth='+token,stared)}), take(1),
          switchMap((staredData)=>{
        id= staredData.name;
        return this.staredRecomendations;
      }),take(1), tap((staredRecomendations)=>{
        stared.id= id;
        this.staredRecomendation.next(
        staredRecomendations.concat(staredRecomendations));
      }))})); 
    
  
  }
  getStaredRecMod(){

    let userLogged: string;
    
    return this.authService.userID.pipe(
      take(1),
      switchMap(userID=>{
        userLogged=userID;
        return this.authService.token;}), take(1), switchMap((token)=>{
        return this.http.get<{key:string}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/staredSongs.json?auth='+token);
      }), take(1), switchMap((staredData)=>{
        const stars: StaredModel[]=[];
        for(const key in staredData){
            if(staredData.hasOwnProperty(key) &&  staredData[key].user==userLogged){
              stars.push(new StaredModel(key, staredData[key].recomendation, staredData[key].user));
            }
          
        }
        this.staredRecMod.next(stars);
        return stars;
      })
    ); 
  }

  

  editRecomendation(id: string, author: string, genre: string, singer:string, song:string, comment:string){
    var index:number;
    let idd;
    let newRecomend: RecomendModel;
    return this.authService.userID.pipe(
      take(1),
      switchMap(userID=>{
        idd=userID;
        newRecomend= new RecomendModel(id,song, singer, genre, userID, comment);
        return this.authService.token;}), take(1), switchMap((token)=>{
        return this.http.put<{name:string}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/recomendation/'+id+'/.json?auth='+token,newRecomend)

      }), take(1), switchMap((resData)=>{
        return this.myRecomendation;
      }),take(1), tap((reccomendations)=>{
        var idRec:number;
        index=reccomendations.findIndex((rec)=>
          rec.id==newRecomend.id
        );
        console.log(index);
        var updatedRec=[...reccomendations];
        const rec= updatedRec[index];
        updatedRec[index]={id:id, song:song,singer: singer, genre:genre, author: idd, comment:comment};
        this.myRecomendation.next(updatedRec);
      })
    ); 
        
  }
  deletStaredRecomendation(stared: StaredModel){
    var index:number;
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      return this.http.delete<{name:string}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/staredSongs/'+stared.id+'.json?auth='+token)
    }), switchMap((recData) =>{
      return this.staredRecomendation;
    }), take(1), tap((staredR) =>{
      index=staredR.findIndex((s)=>
      s.id==stared.recomendation.id
      );
      console.log(index);
      var updatedRec=[...staredR];
      updatedRec.splice(index, 1);
      this.staredRecomendation.next(updatedRec);
    }));
  }

  deleteMyRec(rec:RecomendModel){
    var index:number;
      return this.authService.token.pipe(take(1), switchMap((token) =>{
        return this.http.delete<{name:string}>('https://muzika-2a82f-default-rtdb.europe-west1.firebasedatabase.app/recomendation/'+rec.id+'.json?auth='+token)
      }), switchMap((recData) =>{
        return this.myRecomendation;
      }), take(1), tap((recomendations) =>{
        console.log(rec.author+" iz funkcije");
        index=recomendations.findIndex((recc)=>
          recc.id==rec.id
        );
        var updatedRec=[...recomendations];
        updatedRec.splice(index, 1);
        this.myRecomendation.next(updatedRec);
      }));
  }
  

}

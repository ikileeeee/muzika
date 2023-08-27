import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import { map, tap } from 'rxjs/operators';

interface AuthData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  localId:string;
  expiresIn:string;
  registered?:boolean;
} 
interface UserData{
  username?: string;
  email?: string;
  password?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated=false;
  private _user= new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) { }

  get getIsAuthenticated(){
    return this._user.asObservable().pipe(
      map((user: User)=>{
        if(user){
          return !!user.token;//konverzija stringa false->true sa drugim !
        }else{
          return false;
        }
      })
    );
  }
  get userID(){
    return this._user.asObservable().pipe(
      map((user: User)=>{
        if(user){
          return user.id;//konverzija stringa false->true sa drugim !
        }else{
          return null;
        }
      })
    );
  }
  register(user: UserData){
    this.isAuthenticated=true;
    return this.http.post<AuthData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, {
      username: user.username,
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }).pipe(
      tap( (userData: AuthData)=>{
      const expiresTime= new Date(new Date().getTime() + +userData.expiresIn*1000);
      const userLogged= new User(userData.localId, userData.email,  userData.idToken, expiresTime );
       this._user.next(userLogged);
       console.log("User token pri loginu: "+ userLogged.token);
       console.log("User id "+ userLogged.id);
       console.log("User email "+ userLogged.email);
    }));
  }

  login(user: UserData){
    this.isAuthenticated=true;
    return this.http.post<AuthData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
    {
      password: user.password,
      email: user.email, 
      returnSecureToken: true
    }).pipe(
      tap( (userData: AuthData)=>{
      const expiresTime= new Date(new Date().getTime() + +userData.expiresIn*1000);
      const userLogged= new User(userData.localId, userData.email,  userData.idToken, expiresTime );
       this._user.next(userLogged);
       console.log("User token pri loginu: "+ userLogged.token);
       console.log("User id "+ userLogged.id);
       console.log("User email "+ userLogged.email);
    }));
    }
    get token(){
      return this._user.asObservable().pipe( map( (user) =>{
       if(user) {
        return user.token;
       } else {
       return null;}
      }));
    }
  logout(){
    this._user.next(null);

  }
}

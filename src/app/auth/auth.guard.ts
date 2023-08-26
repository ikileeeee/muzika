import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router){

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getIsAuthenticated.pipe(take(1), tap(isAthenticated=>{
        if(!isAthenticated){
          this.router.navigateByUrl('/login');
        }
      }
        ))
      if(!this.authService.getIsAuthenticated){
        this.router.navigateByUrl('/login');
      }
    return this.authService.getIsAuthenticated;
  }
}

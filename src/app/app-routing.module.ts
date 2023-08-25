import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'recommendations',
    pathMatch: 'full'
  },
  {
    path: 'my-recommendations',
    loadChildren: () => import('./my-recommendations/my-recommendations.module').then( m => m.MyRecommendationsPageModule),
    //canLoad: [AuthGuard]
  },
  {
    path: 'stared-songs',
    loadChildren: () => import('./stared-songs/stared-songs.module').then( m => m.StaredSongsPageModule),
   // canLoad: [AuthGuard]
  },
  {
    path: 'recommendations',
    loadChildren: () => import('./recommendations/recommendations.module').then( m => m.RecommendationsPageModule),
   // canLoad: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

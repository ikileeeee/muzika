import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'recommendations',
    pathMatch: 'full'
  },
  {
    path: 'my-recommendations',
    loadChildren: () => import('./my-recommendations/my-recommendations.module').then( m => m.MyRecommendationsPageModule)
  },
  {
    path: 'stared-songs',
    loadChildren: () => import('./stared-songs/stared-songs.module').then( m => m.StaredSongsPageModule)
  },
  {
    path: 'recommendations',
    loadChildren: () => import('./recommendations/recommendations.module').then( m => m.RecommendationsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

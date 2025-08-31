import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'article',
    loadChildren:() => import ('./article/article.module').then(m => m.ArticleModule)
  },
];

@NgModule({
  // imports: [RouterModule.forChild(routes)],
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
    // anchorScrolling: "enabled",
    // relativeLinkResolution: "legacy",
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }

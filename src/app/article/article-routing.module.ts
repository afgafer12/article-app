import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleTabComponent } from './article-tab/article-tab.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleTabComponent,
  },
  {
    path: 'tab',
    component: ArticleTabComponent,
  },
  {
    path: 'list',
    component: ArticleListComponent,
  },
  {
    path: ':id',
    component: ArticleFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }

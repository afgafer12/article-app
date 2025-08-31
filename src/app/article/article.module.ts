import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { ArticleTabComponent } from './article-tab/article-tab.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleTabComponent,
    ArticleFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ArticleRoutingModule,
    NgbModule,
    NgbNavModule,
    TableModule,
    ToastModule,
  ],
  exports: [
    ArticleListComponent,
    ArticleTabComponent,
  ]
})
export class ArticleModule { }

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Article } from 'src/app/shared/interfaces/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
})
export class ArticlePreviewComponent implements OnInit {
  articles: Article[] = [];
  queryParams: any = {status: 'publish'};

  page: any = {
    pageFirst: 0,
    pageRows: 10,
  };

  constructor(
    private articleSvc : ArticleService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(event = { first: 0, rows: this.page.pageRows }){
    const page = event.first / event.rows + 1;
    this.page.pageIndex = event.first / event.rows;
    this.page.pageFirst = event.first;
    const perPage = event.rows;
    // alert(this.page.pageFirst);
    // alert(event.first);

    this.articleSvc.getArticlesPage(perPage, this.page.pageFirst, this.queryParams).subscribe(resp => {
      this.articles = resp.data;
      this.page.pageTotalRecords = resp.meta?.total;
    }, err => {
    });
  }

}

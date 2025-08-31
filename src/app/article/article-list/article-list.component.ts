import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Article } from 'src/app/shared/interfaces/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  vsbArtcleDialog: boolean = false;
  @Input() queryParams: any = {};

  page: any = {
    pageFirst: 0,
    pageRows: 10,
  };

  constructor(
    private articleSvc : ArticleService,
    private route: ActivatedRoute, private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParams;
    // this.getArticles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['queryParams'] && !changes['queryParams'].firstChange) {
    if (changes['queryParams']) {
      this.getArticles();
    }
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

  trashArticle(id: number){
    const data = { 
      status: 'trash', 
    };
    this.articleSvc.updateArticleStatus(id, data).subscribe(resp => {
      this.messageService.add({severity:'success', detail: 'success'});
      this.router.navigate(['/article/tab'], {queryParams: data});
    }, err => {
      const errors = err.error.errors;
      for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
          errors[field].forEach((msg: string) => {
              this.messageService.add({severity:'warn', detail: msg});
          });
        }
      }
    });
  }

}

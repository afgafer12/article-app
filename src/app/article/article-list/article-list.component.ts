import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private articleSvc : ArticleService,
    private route: ActivatedRoute, private router: Router,
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


  getArticles(){
    this.articleSvc.getArticles(this.queryParams).subscribe(resp => {
      this.articles = resp.data;
      console.log('a11');
      console.log(this.articles);
    }, err => {
    });
  }

  trashArticle(id: number){
    this.router.navigate(['/article/tab'], {queryParams: { 
      status: 'trash', 
    }});
    // this.articleSvc.getArticles(this.queryParams).subscribe(resp => {
    //   this.articles = resp.data;
    // }, err => {
    // });
  }

}

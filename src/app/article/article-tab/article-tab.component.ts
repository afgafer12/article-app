import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-tab',
  templateUrl: './article-tab.component.html',
})
export class ArticleTabComponent implements OnInit {

  status: string = 'publish';
  isNavDestroy: boolean = false;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.status = this.route.snapshot.queryParams['status'];
  }

}

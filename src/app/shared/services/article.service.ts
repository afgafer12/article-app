import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  urlRsc = environment.urls.base_api + '/article';
  
  getArticles(data: any): Observable<any> {
    return this.httpClient.get<any>(`${this.urlRsc}`, {params: data});
  }
  getArticlesPage(limit: number, offset: number, data: any): Observable<any> {
    return this.httpClient.get<any>(`${this.urlRsc}/${limit}/${offset}`, {params: data});
  }
  getArticle(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.urlRsc}/`+id);
  }
  createArticle(data: Article): Observable<any> {
    return this.httpClient.post<any>(`${this.urlRsc}/`, data);
  }
  updateArticle(id: number, data: Article): Observable<any> {
    return this.httpClient.put<any>(`${this.urlRsc}/`+id, data);
  }
  updateArticleStatus(id: number, data: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.urlRsc}/`+id, data);
  }
}

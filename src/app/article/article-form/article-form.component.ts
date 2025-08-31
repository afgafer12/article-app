import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/shared/interfaces/article';
import { ArticleService } from 'src/app/shared/services/article.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
})
export class ArticleFormComponent implements OnInit {

  articleForm!: FormGroup;
  article!: Article;

  constructor(
    private fb: FormBuilder,
    private articleSvc : ArticleService,
    private route: ActivatedRoute, private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    const idParam  = Number(this.route.snapshot.paramMap.get('id'));
    if(idParam > 0){
      this.getArticle(idParam);
    }
  }

  initForm(){
    this.articleForm = this.fb.group({
      // "id": [""],
      "title": ["", Validators.required],
      "content": ["", Validators.required],
      "category":["", Validators.required],
      "status":["", Validators.required],
    })
    // this.cobaForm();
  }

  cobaForm(){
    this.articleForm.patchValue({
      "title": "title eka 12345678901234567890",
      "content": "content Lorem40 ipsum dolor sit amet consectetur adipisicing elit. Quisquam dicta quae consequatur laudantium magnam laboriosam deserunt provident reprehenderit sit atque aperiam, nisi amet explicabo asperiores nemo. Distinctio nobis repudiandae quis, architecto est veniam, ex iste amet corrupti nulla earum reprehenderit.",
      "category": "category 12345678901234567890",
    })
  }

  getArticle(id : number){
    this.articleSvc.getArticle(id).subscribe(resp => {
      this.article = resp.data;
      this.articleForm.patchValue(this.article);
    }, err => {
    });
  }

  submitArticle(status: string){
    // if(this.articleForm.invalid){
    //   this.messageService.add({severity:'warn', detail:'Form invalid'});
    // }
    this.articleForm.patchValue({
      status: status,
    })
    if(!this.article?.id){
      this.createArticle();
    }else{
      this.updateArticle(this.article.id);
    }
  }

  createArticle(){ 
    const data = this.articleForm.value; 
    this.articleSvc.createArticle(data).subscribe(resp => {
      this.article = resp.data;
      this.articleForm.patchValue(this.article);
      this.messageService.add({severity:'success', detail: 'success'});
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

  updateArticle(id: number){ 
    const data = this.articleForm.value; 
    this.articleSvc.updateArticle(id, data).subscribe(resp => {
      this.article = resp.data;
      this.articleForm.patchValue(this.article);
      this.messageService.add({severity:'success', detail: 'success'});
      this.router.navigate(['/article'], {queryParams: { 
        status: this.article.status, 
      }});
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

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {News} from './news'
@Injectable()
export class NewsService{
  news: News[];

  constructor(private http: HttpClient){ }

  apiKey = "d7ae4a56-8bf1-48a7-b44f-ded4252cf2f1";


  getText(url){
    console.log('getText');
    return this.http.get(url)
      .pipe(
        map((data: any ) => {
          return (''+ data.response.content.blocks.body[0].bodyTextSummary);
        }
            )
      )
  }

  getNews(): Observable<News>{

    return new Observable(obs => {
      console.log("producer");
      this.http.get(`https://content.guardianapis.com/search?api-key=${this.apiKey}`)
         .subscribe((data : any) => {
           data.response.results.map(news => {
             this.getText(`${news.apiUrl}?show-blocks=body&api-key=${this.apiKey}`).subscribe(text => {
               news.text = text;
               obs.next(news);
             })
           });
         });
         });
  }



}
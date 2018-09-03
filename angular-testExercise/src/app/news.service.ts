import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {News} from './news'
@Injectable()
export class NewsService {
  news: News[];

  constructor(private http: HttpClient) {
  }

  apiKey = "d7ae4a56-8bf1-48a7-b44f-ded4252cf2f1";


  getText(url) {
    return this.http.get(url)
      .pipe(
        map((data: any) => {
            return ('' + data.response.content.blocks.body[0].bodyTextSummary);
          }
        )
      )
  }

  getNewsText(news) {
    return new Observable(obs =>
    {
      this.getText(`${news.apiUrl}?show-blocks=body&api-key=${this.apiKey}`)
        .subscribe(text => {
          if(text.length> 1000){
            text = text.substring(0,1000) + '...';

          }
          obs.next(text);
        })
    })
  }

  /* getNews(): Observable<News>{

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
   }*/

 getTotalPages(): Observable<number>
 {
    return this.http.get(`https://content.guardianapis.com/search?api-key=${this.apiKey}`)
      .pipe(map((data: any) => {
        return data.response.pages;
      }))
  }

  getNews(page): Observable<News> {
    return new Observable(obs => {
      this.http.get(`https://content.guardianapis.com/search?page=${page}&api-key=${this.apiKey}`)
        .subscribe((data: any) => {
          data.response.results.map(news => {
            obs.next(
              {
                      webTitle: news.webTitle,
                      webUrl: news.webUrl,
                      apiUrl: news.apiUrl,
                      text: undefined,
                      opened: false,
              });
          })
        });
    });

  }
}

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

  apiKey = "7d6722e6-3582-49d5-aed6-273b97a72eb3";
  //apiKey = "64bbd2ac-0185-441e-8acc-9f40afad0683";
  private _page = 1;

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


 getTotalPages(): Observable<number>
 {
    return this.http.get(`https://content.guardianapis.com/search?api-key=${this.apiKey}`)
      .pipe(map((data: any) => {
        return data.response.pages;
      }))
  }

  getNews(): Observable<News> {
    return new Observable(obs => {
      this.http.get(`https://content.guardianapis.com/search?page=${this._page}&api-key=${this.apiKey}`)
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


  get page() : number{
    return this._page;
  }

  set page(value: number){
    this._page = value;
  }


}

import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { News } from '../news';
import { NewsService } from '../news.service';
import {PanelComponent} from "../panel/panel.component";


@Component({
  selector: 'news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  providers: [NewsService]
})
export class NewsListComponent implements OnInit {
  newsList: News[];
  error: any;


  constructor(private newsService: NewsService) {
  }


  ngOnInit() {
    this.getNews();
  }

  refresh() {
    this.getNews();
  }

  getNewsText(news) {
    if(news.text === undefined) {
      this.newsService.getNewsText(news).subscribe(
        text => {
          news.text = text
        }
      )
    }
  }

  getNews(): void {
    this.newsList = [];
    this.newsService.getNews()
      .subscribe(
        news => {
          this.newsList.push(news);
          if(this.newsList.length ==0){
            this.error = "Sorry, we couldn't find news for you. Please try again later"
          }
        },
        error => {
          this.error = "Sorry, we couldn't find news for you. Please try again later"
        },
      );

  }

  getPage():number{
    return this.newsService.page;
  }

  getTotalPages(){
    console.log('getTotal');
     this.newsService.getTotalPages().subscribe(value => { console.log(value)});
    return 220;
  }

  setPage(page){
    this.newsService.page = page;
    this.getNews();
  }
}

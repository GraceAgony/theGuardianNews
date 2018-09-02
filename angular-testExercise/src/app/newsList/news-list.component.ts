import { Component, OnInit } from '@angular/core';

import { News } from '../news';
import { NewsService } from '../news.service';

@Component({
  selector: 'news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  providers: [NewsService]
})
export class NewsListComponent implements OnInit {
  newsList: News[];
  error:any;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getNews();
  }

  refresh(){
    this.getNews();
  }
  getNews(): void {
    this.newsList = [];
    this.newsService.getNews()
      .subscribe(
        news => {this.newsList.push(news); console.log(this.newsList);},
        error => {this.error = "Sorry, we couldn't find news for you. Please try again later" }
        );
  }
}

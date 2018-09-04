import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { News } from '../news';
import { NewsService } from '../news.service';


@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css'],
  providers: [NewsService]
})
export class PagerComponent{

  constructor(private newsService: NewsService) {
  }

  @Input() page:number =1;
  @Input() totalPages :number =1;

  @Output() private changePage: EventEmitter<number> = new EventEmitter<number>();

  next(){
    if(this.page< this.totalPages) {
      this.changePage.emit(this.page + 1);
    }else {
      this.changePage.emit(this.totalPages);
    }
    console.log(this.page);
  }

  previous(){
    this.changePage.emit(this.page-1);
    console.log(this.page);
  }

  change(event){
    if(this.page< this.totalPages) {
      this.changePage.emit(event.target.value);
    }else {
      this.changePage.emit(this.totalPages);
    }
    console.log(this.page);
  }

}

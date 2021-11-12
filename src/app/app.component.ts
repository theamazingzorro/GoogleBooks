import { Component, OnInit } from '@angular/core';
import { Book } from './models/book';
import { BookService } from './providers/book.service';

@Component({
  selector: 'gb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'GoogleBooks';
  
  constructor() {

  }
}

import { Component, OnInit } from '@angular/core';
import { Book } from './models/book';
import { BookService } from './providers/book.service';

@Component({
  selector: 'gb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  favoriteBook!: Book;
  title = 'GoogleBooks';
  booksToRead: Book[] = []; 

  constructor(public service: BookService) {

  }

  ngOnInit(): void {
    this.favoriteBook = this.service.getFavorite();
    this.booksToRead = this.service.getBooksToRead();
  }

  bookFavorited(book: Book): void {
    this.favoriteBook = book;
  }
}

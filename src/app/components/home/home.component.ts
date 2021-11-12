import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/providers/book.service';

@Component({
  selector: 'gb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  booksToRead: Book[] = []; 

  constructor(public service: BookService) {

  }

  ngOnInit(): void {
    this.booksToRead = this.service.getBooksToRead();
  }

  bookFavorited(book: Book): void {
    this.service.setFavorite(book);
  }

}

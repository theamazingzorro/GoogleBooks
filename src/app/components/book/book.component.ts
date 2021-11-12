import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'gb-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input()
  book: Book = new Book();
  @Input()
  isFavorite: boolean = false;

  @Output()
  addToFavoriteEvent: EventEmitter<Book> = new EventEmitter<Book>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  makeFavorite(): void {
    this.isFavorite = true;
    this.addToFavoriteEvent.emit(this.book);
  }
}

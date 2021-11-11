import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/providers/book.service';

@Component({
  selector: 'gb-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book!: Book;

  constructor(public service: BookService) { 
  }

  ngOnInit(): void {
    this.book = this.service.getFavorite();
  }

  favorite(): void {

  }
}

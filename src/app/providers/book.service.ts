import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  favoriteBook: Book = new Book();

  constructor() { }
  
  getFavorite(): Book {
    return this.favoriteBook;
  }
  
  setFavorite(book: Book): void {
    this.favoriteBook = book;
  }

  getSearchResults(query: string): Book[] {
    let results: Book[] = new Array<Book>(10);
    
    for(let i:number = 0; i < 10; i++) {
      results[i] = new Book();
      results[i].title = `Search Result ${i}`;
    }
    
    return results;
  }

  getBooksToRead(): Book[] {
    let results: Book[] = new Array<Book>(3);
    
    for(let i:number = 0; i < 3; i++) {
      results[i] = new Book();
      results[i].title = `To Read ${i}`;
    }
    
    return results;
  }
}

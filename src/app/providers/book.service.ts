import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  favoriteBook: Book = new Book();

  constructor(public httpClient: HttpClient) { }
  
  getFavorite(): Book {
    return this.favoriteBook;
  }
  
  setFavorite(book: Book): void {
    this.favoriteBook = book;
  }

  getSearchResults(query: string): Observable<Book> {
    let url= 'https://www.googleapis.com/books/v1/volumes?q=' + query;
    return this.httpClient.get(url)
      .pipe(mergeMap((value: any) => {
        return value.items;
      }))
      .pipe(map((value: any) => {
        return value.volumeInfo;
      }))
      .pipe(map((value: any) => {
        let book = new Book();
        book.title= value.title;
        book.description= value.description;
        book.author= value.authors.join(', ');
        book.type= value.printType;
        book.thumbnail= value.imageLinks.thumbnail;
        return book;
      }));
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

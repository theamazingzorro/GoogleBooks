import { TestBed } from '@angular/core/testing';
import { Book } from '../models/book';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BookService } from './book.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('BookService', () => {
  let service: BookService;
  let testBook: Book;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(BookService);
    httpClient = TestBed.inject(HttpClient);

    testBook = new Book();
    testBook.title = 'test';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFavorite', () => {
    it('returns the favorite book', () => {
      service.favoriteBook = testBook;

      expect(service.getFavorite()).toBe(testBook);
    });
  });

  describe('setFavorite', () => {
    it('sets the favorite book field', () => {
      service.setFavorite(testBook);

      expect(service.favoriteBook).toBe(testBook);
    });
  });

  describe('getSearchResults', () => {
    const term: string = "testQuery";
    const response: Object = {
      items: [
        {
          volumeInfo: {
            title: 'title1',
            description: 'description1',
            authors: ['author1'],
            printType: 'BOOK1',
            imageLinks: {
            thumbnail: 'thumbnail1'
            }
          }
        },
        {
          volumeInfo: {
            title: 'title2',
            description: 'description2',
            authors: ['author2'],
            printType: 'BOOK2',
            imageLinks: {
            thumbnail: 'thumbnail2'
            }
          }
        },
        {
          volumeInfo: {
            title: 'title3',
            description: 'description3',
            authors: ['author3'],
            printType: 'BOOK3',
            imageLinks: {
            thumbnail: 'thumbnail3'
            }
          }
        }
      ]
    };

    it('makes a GET request', () => {
      spyOn(httpClient, 'get').and.returnValue(of(response));
      service.getSearchResults(term);
      expect(httpClient.get).toHaveBeenCalled();
    });

    it('uses "https://www.googleapis.com/books/v1/volumes" for the base url', () => {
      spyOn(httpClient, 'get').and.callFake((url: any): any => {
        expect(url).toContain('https://www.googleapis.com/books/v1/volumes');
        return of(response);
      });
      service.getSearchResults(term);
      expect(httpClient.get).toHaveBeenCalled();
    });

    it('adds the term as the value of q in the query params', () => {
      spyOn(httpClient, 'get').and.callFake((url: any): any => {
        expect(url).toContain('q=' + term);
        return of(response)
      });
      service.getSearchResults(term);
      expect(httpClient.get).toHaveBeenCalled();
    });  
    
    it('returns a mapped object from items[].volumeInfo', () => {
      spyOn(httpClient, 'get').and.returnValue(of(response));
      let bookCount = 0;
      service.getSearchResults(term).subscribe((book: Book) => {
        bookCount += 1;
        expect(book).not.toBeUndefined();
        expect(book.title).toBe('title' + bookCount);
        expect(book.author).toBe('author' + bookCount);
        expect(book.description).toBe('description' + bookCount);
        expect(book.thumbnail).toBe('thumbnail' + bookCount);
        expect(book.type).toBe('BOOK' + bookCount);
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        expect(bookCount).toBe(3);
      });
      expect(httpClient.get).toHaveBeenCalled();
    });      
  });

  describe('getBooksToRead', () => {
    let results: Book[];

    beforeEach(() => {
      results = service.getBooksToRead();
    });

    it('should return an array of 10 books', () => {
      expect(results).toBeTruthy();
      expect(results.length).toBe(3);
    });

    it('each book should be titled "To Read" + index', () => {
      for(let i: number = 0; i < 3; i++) {
        expect(results[i].title).toBe(`To Read ${i}`);
      }
    });
  });
  
});

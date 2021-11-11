import { TestBed } from '@angular/core/testing';
import { Book } from '../models/book';

import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFavorite', () => {
    it('returns a defined book', () => {
      expect(service.getFavorite()).toBeDefined();
    });
  });

  describe('getSearchResults', () => {
    let results: Book[];

    beforeEach(() => {
      results = service.getSearchResults('billy');
    });

    it('should return an array of 10 books', () => {
      expect(results).toBeTruthy();
      expect(results.length).toBe(10);
    });

    it('each book should be titled "Search Result" + index', () => {
      for(let i: number = 0; i < 10; i++) {
        expect(results[i].title).toBe(`Search Result ${i}`);
      }
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

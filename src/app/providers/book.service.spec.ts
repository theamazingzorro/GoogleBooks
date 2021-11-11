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
    let searchResults: Book[];

    beforeEach(() => {
      searchResults = service.getSearchResults('billy');
    });

    it('should return an array of 10 books', () => {
      expect(searchResults).toBeTruthy();
      expect(searchResults.length).toBe(10);
    });

    it('each book should be titled "Search Result" + index', () => {
      for(let i: number = 0; i < 10; i++) {
        expect(searchResults[i].title).toBe(`Search Result ${i}`);
      }
    });
  });
});

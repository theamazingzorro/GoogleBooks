import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/providers/book.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let testBook: Book;
  let testBooksToRead: Book[];
  let service: BookService;
  class MockBookService {
    getFavorite(): Book {
      return new Book();
    }

    getBooksToRead(): Book[] {
      return [];
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [ {
        provide: BookService,
        useClass: MockBookService
      }]
    })
    .compileComponents().then( () => {
      service = TestBed.inject(BookService);
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    testBook = new Book();
    testBook.title = "test";

    testBooksToRead = [new Book(), new Book(), new Book];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component', ()=> {
    describe('ngOnInit', () => {
      it('gets the favorite book from its service.getFavorite()', () => {
        spyOn(service, 'getFavorite').and.returnValue(testBook);
  
        component.ngOnInit();
        fixture.detectChanges();
  
        expect(service.getFavorite).toHaveBeenCalled();
        expect(component.favoriteBook).toBe(testBook);
      });

      it('gets booksToRead from the bookservice', () => {
        spyOn(service, 'getBooksToRead').and.returnValue(testBooksToRead);

        component.ngOnInit();
        fixture.detectChanges();

        expect(service.getBooksToRead).toHaveBeenCalled();
        expect(component.booksToRead).toBe(testBooksToRead);
      });
    });

    describe('bookFavorited', () => {
      it('sets the favoriteBook property from the set value', () => {
        component.favoriteBook = new Book();
        component.bookFavorited(testBook);
        expect(component.favoriteBook).toBe(testBook);
      });
    });
  });

  describe('template', ()=> {
    it('calls bookFavorited when the book component emits an addFavoriteEvent', () => {
      spyOn(component, 'bookFavorited').and.callThrough();
  
      const button: DebugElement = fixture.debugElement.query(By.css('gb-book'));
      const event: Event = new Event('addToFavoriteEvent');
      button.nativeElement.dispatchEvent(event);
  
      expect(component.bookFavorited).toHaveBeenCalled();
    });

    describe('booksToRead section', () => {
      it('renders a book object for each book in booksToRead', () => {
        component.booksToRead = testBooksToRead;
        fixture.detectChanges();

        const booksToReadView = fixture.debugElement.queryAll(By.css(".booksToRead gb-book"));
        expect(booksToReadView.length).toBe(testBooksToRead.length);
      });
    });
  });
});

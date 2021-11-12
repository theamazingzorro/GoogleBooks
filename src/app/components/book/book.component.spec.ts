import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/providers/book.service';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let service: BookService;
  class MockBookService {
    getFavorite(): Book {
      return new Book();
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ],
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
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe("component", () => {
    it('emits an event when favorite method is called', () => {
      spyOn(component.addToFavoriteEvent, 'emit');
      component.makeFavorite();
      expect(component.addToFavoriteEvent.emit).toHaveBeenCalledWith(component.book)
    });
  });

  describe('template', () => {
    let defaultBook: Book;

    beforeEach(() => {
      defaultBook = new Book();
    });

    it('has a title', () => {
      const titleElement: DebugElement = fixture.debugElement.query(By.css('#title'));
      expect(titleElement.nativeElement.textContent).toBe(`Title: ${defaultBook.title}`);
    });

    it('has an author', () => {
      const titleElement: DebugElement = fixture.debugElement.query(By.css('#author'));
      expect(titleElement.nativeElement.textContent).toBe(`Author: ${defaultBook.author}`);
    });

    it('has a type', () => {
      const titleElement: DebugElement = fixture.debugElement.query(By.css('#type'));
      expect(titleElement.nativeElement.textContent).toBe(`Type: ${defaultBook.type}`);
    });

    it('has a description', () => {
      const titleElement: DebugElement = fixture.debugElement.query(By.css('#description'));
      expect(titleElement.nativeElement.textContent).toBe(`Description: ${defaultBook.description}`);
    });

    it('has a thumbnail', () => {
      const titleElement: DebugElement = fixture.debugElement.query(By.css('#thumbnail img'));
      expect(titleElement.attributes['src']).toBe(defaultBook.thumbnail);
    });

    describe('favorite button', () => {
      it('exists if book is not favorite', () => {
        component.isFavorite = false;
        fixture.detectChanges();

        let button: DebugElement = fixture.debugElement.query(By.css('#favorite-button'));
        expect(button.nativeElement).toBeDefined();
      }); 

      it('is hidden if book is favorite', () => {
        component.isFavorite = true;
        fixture.detectChanges();

        let button: DebugElement = fixture.debugElement.query(By.css('#favorite-button'));
        expect(button).toBeNull();
      }); 

      it('calls bookcomponent.favorite() when clicked', () => {
        spyOn(component, 'makeFavorite');

        let button: DebugElement = fixture.debugElement.query(By.css('#favorite-button'));
        button.nativeElement.click();

        expect(component.makeFavorite).toHaveBeenCalled();
      });
    });
  });
});

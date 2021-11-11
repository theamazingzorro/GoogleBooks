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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      providers: [ BookService ]
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
    let testBook: Book;

    beforeEach(() => {
      testBook = new Book();
      testBook.title = "test";
    });

    describe('ngOnInit', () => {
      it('gets the book from its service.getFavorite()', () => {
        spyOn(service, 'getFavorite').and.returnValue(testBook);
  
        component.ngOnInit();
        fixture.detectChanges();
  
        expect(service.getFavorite).toHaveBeenCalled();
        expect(component.book).toBe(testBook);
      });
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
      let button: DebugElement;

      beforeEach(() => {
        button = fixture.debugElement.query(By.css('#favorite-button'));
      });

      it('exists', () => {
        expect(button.nativeElement).toBeDefined();
      }); 

      it('calls bookcomponent.favorite() when clicked', () => {
        spyOn(component, 'favorite');
        button.nativeElement.click();
        expect(component.favorite).toHaveBeenCalled();
      });
    });
  });
});

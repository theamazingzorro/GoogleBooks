import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Book } from 'src/app/models/book';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("component", () => {

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
  });
});

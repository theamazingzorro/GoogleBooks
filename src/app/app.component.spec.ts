import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { Book } from './models/book';
import { BookService } from './providers/book.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let testBook: Book;
  let service: BookService;
  class MockBookService {
    getFavorite(): Book {
      return new Book();
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        BookComponent
      ],
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
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testBook = new Book();
    testBook.title = "test";
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'GoogleBooks'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('GoogleBooks');
  });

  describe('component', ()=> {
    describe('ngOnInit', () => {
     it('gets the book from its service.getFavorite()', () => {
        spyOn(service, 'getFavorite').and.returnValue(testBook);
  
        component.ngOnInit();
        fixture.detectChanges();
  
        expect(service.getFavorite).toHaveBeenCalled();
        expect(component.favoriteBook).toBe(testBook);
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

  });

});

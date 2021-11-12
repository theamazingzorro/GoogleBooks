import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { SearchResultComponent } from './search-result.component';

class MockActivatedRoute {
  queryParams: Observable<Params> = new Observable<Params>();
}

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultComponent ],
      providers: [{
        provide: ActivatedRoute,
        useClass: MockActivatedRoute
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component', () => {
    describe('ngOnInit', () => {
      it('subscribes to the queryParams of the route', () => {
        const route: ActivatedRoute = TestBed.inject(ActivatedRoute);
        spyOn(route.queryParams, 'subscribe').and.callFake((callback:any) => {
          return callback({term: '123'});
        });

        component.ngOnInit();
        expect(route.queryParams.subscribe).toHaveBeenCalled();
        expect(component.term).toBe('123');
      });
    });
  });

  describe('template', () => {
    it('displays the search term', () => {
      component.term = 'test term';
      fixture.detectChanges();

      const termElement = fixture.debugElement.query(By.css('.searchTerm'));
      expect(termElement.nativeElement.textContent).toContain('test');
    });
  });
});

import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterModule} from '@angular/router';

import {HackerService} from '../hacker.service';

import {DashboardComponent} from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let hackerService;
  let getHackerNewsSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    hackerService = jasmine.createSpyObj('hackerService', ['getHackerNews']);

    TestBed
        .configureTestingModule({
          declarations: [DashboardComponent],
          imports: [RouterModule.forRoot([])],
          providers: [
            {provide: hackerService, useValue: HackerService},
          ]
        })
        .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top HackerNews" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Top HackerNews');
  });

  it('should call hackerService', waitForAsync(() => {
       expect(getHackerNewsSpy.calls.any()).toBe(true);
     }));

  it('should display 4 links', waitForAsync(() => {
       expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
     }));
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedJobPageComponent } from './detailed-job-page.component';

describe('DetailedJobPageComponent', () => {
  let component: DetailedJobPageComponent;
  let fixture: ComponentFixture<DetailedJobPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedJobPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedJobPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

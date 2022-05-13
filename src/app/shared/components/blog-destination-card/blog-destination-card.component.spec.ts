import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDestinationCardComponent } from './blog-destination-card.component';

describe('BlogDestinationCardComponent', () => {
  let component: BlogDestinationCardComponent;
  let fixture: ComponentFixture<BlogDestinationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogDestinationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDestinationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

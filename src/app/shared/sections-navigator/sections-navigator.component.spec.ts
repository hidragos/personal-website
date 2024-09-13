import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsNavigatorComponent } from './sections-navigator.component';

describe('SectionsNavigatorComponent', () => {
  let component: SectionsNavigatorComponent;
  let fixture: ComponentFixture<SectionsNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsNavigatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

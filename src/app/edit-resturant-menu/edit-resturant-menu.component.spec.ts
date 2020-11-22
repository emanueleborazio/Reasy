import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResturantMenuComponent } from './edit-resturant-menu.component';

describe('EditResturantMenuComponent', () => {
  let component: EditResturantMenuComponent;
  let fixture: ComponentFixture<EditResturantMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResturantMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResturantMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

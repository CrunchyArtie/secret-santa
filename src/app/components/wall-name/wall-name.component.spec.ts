import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallNameComponent } from './wall-name.component';

describe('WallNameComponent', () => {
  let component: WallNameComponent;
  let fixture: ComponentFixture<WallNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContenComponent } from './dialog-conten.component';

describe('DialogContenComponent', () => {
  let component: DialogContenComponent;
  let fixture: ComponentFixture<DialogContenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogContenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogContenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBookContentComponent } from './dialog-book-content.component';

describe('DialogBookContentComponent', () => {
  let component: DialogBookContentComponent;
  let fixture: ComponentFixture<DialogBookContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogBookContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBookContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

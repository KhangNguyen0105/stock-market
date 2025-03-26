import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEditDialogComponent } from './stock-edit-dialog.component';

describe('StockEditDialogComponent', () => {
  let component: StockEditDialogComponent;
  let fixture: ComponentFixture<StockEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

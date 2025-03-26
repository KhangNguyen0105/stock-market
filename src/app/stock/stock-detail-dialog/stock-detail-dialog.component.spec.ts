import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailDialogComponent } from './stock-detail-dialog.component';

describe('StockDetailDialogComponent', () => {
  let component: StockDetailDialogComponent;
  let fixture: ComponentFixture<StockDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

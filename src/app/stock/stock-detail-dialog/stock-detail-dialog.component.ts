import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-detail-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './stock-detail-dialog.component.html',
  styleUrls: ['./stock-detail-dialog.component.css']
})
export class StockDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StockDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public stock: Stock
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}

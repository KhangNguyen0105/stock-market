import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Stock } from '../../model/stock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-edit-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './stock-edit-dialog.component.html',
  styleUrls: ['./stock-edit-dialog.component.css']
})
export class StockEditDialogComponent {
  stockForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StockEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public stock: Stock
  ) {
    this.stockForm = this.fb.group({
      id: [stock.id],
      name: [stock.name, [Validators.required, Validators.minLength(3)]],
      code: [stock.code, [Validators.required, Validators.pattern('^[A-Z0-9]+$')]],
      price: [stock.price, [Validators.required, Validators.min(1)]],
      exchange: [stock.exchange, Validators.required]
    });
  }

  get f() {
    return this.stockForm.controls;
  }

  onSave() {
    if (this.stockForm.valid) {
      this.dialogRef.close(this.stockForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

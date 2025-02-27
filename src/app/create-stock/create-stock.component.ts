import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Stock } from '../model/stock';

@Component({
  selector: 'app-create-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {
  stockForm: FormGroup;
  @Output() stockCreated = new EventEmitter<Stock>();

  codeChanged: boolean = false;
  codeModified: boolean = false;
  priceTouched: boolean = false;

  constructor(private fb: FormBuilder) {
    this.stockForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      price: ['', [Validators.required]],
      exchange: ['', Validators.required],
      confirm: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.stockForm.valid) {
      const newStock: Stock = new Stock(
        this.stockForm.value.name,
        this.stockForm.value.code,
        this.stockForm.value.price,
        this.stockForm.value.price,
        this.stockForm.value.exchange
      );

      this.stockCreated.emit(newStock); // Tạo sự kiện với đối tượng `Stock`
      this.stockForm.reset();
    }
  }

  onCodeChange(value: string) {
    this.codeModified = value.trim() !== ''; // Nếu có nhập thì báo đã chỉnh sửa
  }

  onPriceFocus() {
    this.priceTouched = true;
  }

  onPriceBlur() {
    this.priceTouched = false;
  }
}

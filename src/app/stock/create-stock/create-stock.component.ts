import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-create-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {
  stockForm: FormGroup;
  priceTouched: boolean = false; // Mặc định chưa được chạm vào
  codeModified: boolean = false;
  @Output() stockCreated = new EventEmitter<Stock>();


  constructor(private fb: FormBuilder) {
    this.stockForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      price: ['', [Validators.required]],
      exchange: ['', Validators.required], // ⚠️ Đảm bảo có input cho trường này
      confirm: [false, Validators.requiredTrue] // ✅ Yêu cầu checkbox phải được chọn
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

      this.stockCreated.emit(newStock);

      // ✅ Reset form nhưng giữ checkbox confirm không bị mất
      this.stockForm.reset({ confirm: false });
    }
  }

  onCodeChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.codeModified = inputElement.value.trim() !== ''; 
    }
  }

  onPriceFocus() {
    this.priceTouched = true;
  }

  onPriceBlur() {
    this.priceTouched = true; // ✅ Giữ trạng thái đã chạm vào input
  }
}

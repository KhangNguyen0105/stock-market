import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-create-stock-2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-stock-2.component.html',
  styleUrls: ['./create-stock-2.component.css']
})
export class CreateStock2Component {
  stockForm: FormGroup;
  submitted = false;
  stockList: Stock[] = [];
  @Output() stockCreated = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.stockForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.pattern('^[A-Z0-9]+$')]],
      price: ['', [Validators.required, Validators.min(1)]],
      exchange: ['', Validators.required],
      confirm: [false, Validators.requiredTrue]
    });
  }

  get f() {
    return this.stockForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log("Form control status:", this.stockForm.status);

    if (this.stockForm.valid) {
      const newStock: Stock = new Stock(
        this.stockForm.value.name,
        this.stockForm.value.code,
        this.stockForm.value.price,
        this.stockForm.value.price,
        this.stockForm.value.exchange
      );

      this.stockList.push(newStock);
      this.stockCreated.emit(newStock);

      this.stockForm.reset({ confirm: false });
    }
  }

  /**
   * Phương thức mô phỏng tải dữ liệu cổ phiếu từ server và cập nhật vào form
   */
  loadStockFromServer() {
    // Giả lập lấy dữ liệu từ server, có thể sau này là gọi API
    const stockFromServer = {
      name: 'Vinamilk',
      code: 'VNM',
      price: 80000,
      exchange: 'HOSE'
    };

    console.log('Stock loaded from server:', stockFromServer);

    // Sau khi lấy dữ liệu thành công, ta patch vào form
    this.patchStockForm(stockFromServer);
  }

  /**
   * Cập nhật dữ liệu vào form thông qua patchValue (chỉ cập nhật các field cần thiết)
   * @param stock 
   */
  patchStockForm(stock: any) {
    this.stockForm.patchValue({
      name: stock.name,
      code: stock.code,
      price: stock.price,
      exchange: stock.exchange,
      confirm: false
    });

    // Debug
    console.log('Patched stock form:', this.stockForm.value);
  }

}

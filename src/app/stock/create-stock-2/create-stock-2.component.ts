import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Stock } from '../../model/stock';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

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
  @Output() stockCreated = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private router: Router, private http: HttpService) {
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
      const newStock: Stock = {
        id: '',
        name: this.stockForm.value.name,
        code: this.stockForm.value.code,
        price: this.stockForm.value.price,
        previousPrice: this.stockForm.value.price,
        exchange: this.stockForm.value.exchange,
        favorite: false,
        isPositiveChange: function (): boolean {
          return this.price >= this.previousPrice;
        }
      };

      this.http.postStock(newStock).subscribe({
        next: (stock) => {
          console.log('Cổ phiếu đã được tạo:', stock);
          this.stockCreated.emit(stock);
          this.stockForm.reset({ confirm: false });
          
        },
        error: (err) => {
          console.error('Lỗi khi tạo cổ phiếu:', err);
        }
      });
        

      this.stockForm.reset({ confirm: false });
    }
  }

  /**
   * Phương thức mô phỏng tải dữ liệu cổ phiếu từ server và cập nhật vào form
   */
  loadStockFromServer() {
    // Giả lập lấy dữ liệu từ server, có thể sau này là gọi API
    const stockFromServer = {
      name: 'loadStockFromServer Worked',
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

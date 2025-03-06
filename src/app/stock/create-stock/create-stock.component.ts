import { Component, EventEmitter, Output } from '@angular/core';
import { Stock } from '../../model/stock';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {
  stock: Stock = new Stock('', '', 0, 0, '');

  @Output() stockCreated = new EventEmitter<Stock>();

  onSubmit() {
    if (this.stock.name && this.stock.code && this.stock.price > 0 && this.stock.exchange) {
      const newStock = new Stock(
        this.stock.name,
        this.stock.code,
        this.stock.price,
        this.stock.price,
        this.stock.exchange
      );

      this.stockCreated.emit(newStock);

      this.stock = new Stock('', '', 0, 0, '');
    }
  }
}

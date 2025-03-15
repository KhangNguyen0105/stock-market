import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Stock } from '../../model/stock';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.css'
})
export class StockItemComponent {
  @Input() stock!: Stock;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Stock>();

  isEditing: boolean = false;

  editForm: {
    name: string;
    code: string;
    price: number;
    previousPrice: number;
    exchange: string;
  } = {
    name: '',
    code: '',
    price: 0,
    previousPrice: 0,
    exchange: ''
  };

  toggleFavorite(event: Event) {
    event.stopPropagation();
    this.stock.favorite = !this.stock.favorite;
  }

  onEdit() {
    this.isEditing = true;

    // Copy giá trị hiện tại của stock sang editForm
    this.editForm = {
      name: this.stock.name,
      code: this.stock.code,
      price: this.stock.price,
      previousPrice: this.stock.previousPrice,
      exchange: this.stock.exchange
    };
  }

  onDelete() {
    const confirmDelete = confirm(`Bạn có chắc muốn xóa cổ phiếu ${this.stock.name} (${this.stock.code}) không?`);
    if (confirmDelete) {
      this.delete.emit(this.stock.code);
    }
  }

  saveEdit() {
    this.edit.emit(new Stock(this.editForm.name, this.editForm.code, this.editForm.price, this.editForm.previousPrice, this.editForm.exchange));
    this.isEditing = false;
  }
  
  cancelEdit() {
    this.isEditing = false;
  }
  
}

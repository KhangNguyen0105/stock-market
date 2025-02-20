import { Component, Input } from '@angular/core';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.css'
})
export class StockItemComponent {
  @Input() stock!: Stock;

  toggleFavorite(event: Event) {
    event.stopPropagation(); // Chặn sự kiện click lan lên component cha
    console.log('Favorite toggled for:', this.stock.name); // Debug
    this.stock.favorite = !this.stock.favorite;
  }
  
  
}

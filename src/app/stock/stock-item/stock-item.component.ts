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
    console.log('Button clicked!'); // Debug
    this.stock.favorite = !this.stock.favorite;
  }
  
}

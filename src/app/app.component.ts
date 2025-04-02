import { Component } from '@angular/core';
import { Stock } from './model/stock';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stock-market';
  
  searchValue: string = '';
  newStock: Stock | null = null;

  onSearchStock(keyword: string) {  
    console.log('Tìm kiếm với từ khóa:', keyword);
    this.searchValue = keyword;
  }

  onStockCreated(stock: Stock) {
    this.newStock = stock;
  }
}
 
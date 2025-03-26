import { Component } from '@angular/core';
import { CreateStock2Component } from './stock/create-stock-2/create-stock-2.component';
import { StockSearchComponent } from './stock/stock-search/stock-search.component';
import { StockList2Component } from './stock/stock-list-2/stock-list-2.component';
import { Stock } from './model/stock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CreateStock2Component, StockSearchComponent, StockList2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stock-market';
  
  searchValue: string = '';
  newStock: Stock | null = null;

  onSearchStock(keyword: string) {  
    console.log('🔍 Tìm kiếm với từ khóa:', keyword); // ✅ Debug
    this.searchValue = keyword;
  }

  onStockCreated(stock: Stock) {
    this.newStock = stock;
  }
}
 
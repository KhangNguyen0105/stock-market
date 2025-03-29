import { Component } from '@angular/core';
import { CreateStock2Component } from './stock/create-stock-2/create-stock-2.component';
import { StockSearchComponent } from './stock/stock-search/stock-search.component';
import { StockList2Component } from './stock/stock-list-2/stock-list-2.component';
import { Stock } from './model/stock';
import { GetDataComponent } from './stock/get-data/get-data.component';
import { PostDataComponent } from './stock/post-data/post-data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CreateStock2Component, StockSearchComponent, StockList2Component, GetDataComponent, PostDataComponent],
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
 
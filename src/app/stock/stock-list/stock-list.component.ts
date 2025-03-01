import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockItemComponent } from '../stock-item/stock-item.component';
import { CommonModule } from '@angular/common';
import { CreateStockComponent } from '../../create-stock/create-stock.component';

@Component({
  selector: 'app-stock-list',
  imports: [CommonModule ,StockItemComponent, CreateStockComponent],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent {
  stocks: Stock[] = [
    new Stock('Test Stock Company', 'TSC', 85, 80, 'HOSE'),
    new Stock('Google', 'GOOGL', 2750, 2725, 'NASDAQ'),
    new Stock('Apple', 'AAPL', 150, 145, 'NASDAQ'),
    new Stock('Microsoft', 'MSFT', 310, 300, 'NASDAQ')
  ];

  toggleFavorite(stock: Stock) {
    stock.favorite = !stock.favorite;
  }

  addStock(newStock: Stock) {
    this.stocks.push(newStock);
  }
}

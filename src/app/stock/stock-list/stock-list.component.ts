import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockItemComponent } from '../stock-item/stock-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-list',
  imports: [CommonModule ,StockItemComponent],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit {
  public stocks: Stock[] = [];

  constructor() { }

  ngOnInit(): void {
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80),
      new Stock('Google', 'GOOGL', 2750, 2725),
      new Stock('Apple', 'AAPL', 150, 145),
      new Stock('Microsoft', 'MSFT', 310, 300)
    ];
  }

  toggleFavorite(stock: Stock) {
    stock.favorite = !stock.favorite;
  }
}

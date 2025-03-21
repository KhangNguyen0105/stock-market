import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockItemComponent } from '../stock-item/stock-item.component';
import { CommonModule } from '@angular/common';
import { CreateStock2Component } from '../create-stock-2/create-stock-2.component';
import { StockService } from '../../services/stock.service';
import { FormsModule } from '@angular/forms';
import { StockSearchComponent } from '../stock-search/stock-search.component';

@Component({
  selector: 'app-stock-list',
  imports: [FormsModule, CommonModule ,StockItemComponent, CreateStock2Component, StockSearchComponent],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stocks = this.stockService.getStocks();
  }

  toggleFavorite(stock: Stock) {
    stock.favorite = !stock.favorite;
  }

  addStock(newStock: Stock) {
    this.stockService.addStock(newStock);
    this.stocks = this.stockService.getStocks();
  }

  deleteStock(code: string) {
    const deleted = this.stockService.deleteStockByCode(code);
    if (deleted) {
      this.stocks = this.stockService.getStocks();
    }
  }
  
  editStock(stock: Stock) {
    const edit = this.stockService.updateStockByCode(stock);
    if (edit) {
      this.stocks = this.stockService.getStocks();
    }
  }

  onSearch(keyword: string) {
    this.stocks = this.stockService.searchStocks(keyword);
  }
  
}

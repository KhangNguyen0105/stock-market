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
    this.stockService.getStocks().subscribe((stocks: Stock[]) => {
      this.stocks = stocks;
    });
  }

  toggleFavorite(stock: Stock) {
    stock.favorite = !stock.favorite;
  }

  addStock(newStock: Stock): void {
    this.stockService.addStock(newStock).subscribe(() => {
      // Sau khi thêm, reload danh sách stocks
      this.stockService.getStocks().subscribe((stocks: Stock[]) => {
        this.stocks = stocks;
      });
    });
  }

  deleteStock(code: string): void {
    this.stockService.deleteStockByCode(code).subscribe((deleted: boolean) => {
      // Sau khi xóa, reload danh sách stocks
      if (deleted) {
        this.stockService.getStocks().subscribe((stocks: Stock[]) => {
          this.stocks = stocks;
        });
      }
    });
  }
  
  editStock(stock: Stock): void {
    this.stockService.updateStockByCode(stock).subscribe((updated: boolean) => {
      // Sau khi cập nhật, reload danh sách stocks
      if (updated) {
        this.stockService.getStocks().subscribe((stocks: Stock[]) => {
          this.stocks = stocks;
        });
      }
    });
  }

  onSearch(keyword: string): void {
    this.stockService.searchStocks(keyword).subscribe((stocks: Stock[]) => {
      this.stocks = stocks;
    });
  }
}

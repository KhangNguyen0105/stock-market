import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private stocks: Stock[] = [
    new Stock('Test Stock Company', 'TSC', 85, 80, 'HOSE'),
    new Stock('Google', 'GOOGL', 2750, 2725, 'NASDAQ'),
    new Stock('Apple', 'AAPL', 150, 145, 'NASDAQ'),
    new Stock('Microsoft', 'MSFT', 310, 300, 'NASDAQ')
  ];

  constructor() {}

  getStocks(): Stock[] {
    return this.stocks;
  }

  addStock(stock: Stock): void {
    this.stocks.push(stock);
    console.log(`Đã thêm cổ phiếu: ${stock.name} (${stock.code})`);
  }

  deleteStockByCode(code: string): boolean {
    const index = this.stocks.findIndex(stock => stock.code === code);

    if (index !== -1) {
      const deletedStock = this.stocks.splice(index, 1)[0];
      console.log(`Đã xoá cổ phiếu: ${deletedStock.name} (${deletedStock.code})`);
      return true;
    }

    console.warn(`Không tìm thấy cổ phiếu có mã: ${code} để xoá`);
    return false;
  }

  updateStockByCode(stock: Stock): boolean {
    const existingStock = this.stocks.find(s => s.code === stock.code);
  
    if (existingStock) {
      Object.assign(existingStock, stock);
      console.log(`Đã cập nhật cổ phiếu: ${existingStock.name} (${existingStock.code})`, stock);
      return true;
    }
  
    console.warn(`Không tìm thấy cổ phiếu có mã: ${stock.code} để cập nhật`);
    return false;
  }

  searchStocks(keyword: string): Stock[] {
    const lowerKeyword = keyword.toLowerCase();
    return this.stocks.filter(stock =>
      stock.name.toLowerCase().includes(lowerKeyword) ||
      stock.code.toLowerCase().includes(lowerKeyword)
    );
  }
  
  
}

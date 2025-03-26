import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';
import { Observable, of } from 'rxjs';

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

  getStocks(): Observable<Stock[]> {
    return of(this.stocks);
  }

  getStockByCode(code: string): Observable<Stock | undefined> { 
    const stock = this.stocks.find(s => s.code === code);
    return of(stock);
  }

  addStock(stock: Stock): Observable<Stock> {
    this.stocks.push(stock);
    console.log(`Đã thêm cổ phiếu: ${stock.name} (${stock.code})`);
    return of(stock);
  }

  deleteStockByCode(code: string): Observable<boolean> {
    this.stocks = this.stocks.filter(stock => stock.code !== code);
    // console.log(`Đã xóa cổ phiếu có mã: ${code}`);
    return of(true);
  }

  updateStockByCode(stock: Stock): Observable<boolean> {
    const existingStock = this.stocks.find(s => s.code === stock.code);
  
    if (existingStock) {
      Object.assign(existingStock, {
        ...stock,
        isPositiveChange: stock.price >= stock.previousPrice
      });
  
      console.log(`Đã cập nhật cổ phiếu: ${existingStock.name} (${existingStock.code})`, existingStock);
      return of(true);
    }
  
    console.warn(`Không tìm thấy cổ phiếu có mã: ${stock.code} để cập nhật`);
    return of(false);
  }  

  searchStocks(keyword: string): Observable<Stock[]> {
    const lowerKeyword = keyword.toLowerCase();
    const filteredStocks = this.stocks.filter(stock =>
      stock.name.toLowerCase().includes(lowerKeyword) ||
      stock.code.toLowerCase().includes(lowerKeyword)
    );
    return of(filteredStocks);
  }
  
  
}

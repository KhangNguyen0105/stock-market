import { Component, Input, SimpleChanges } from '@angular/core';
import { Stock } from '../../model/stock';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { StockDetailDialogComponent } from '../stock-detail-dialog/stock-detail-dialog.component';
import { StockEditDialogComponent } from '../stock-edit-dialog/stock-edit-dialog.component';
import { HttpService } from '../../services/http.service';
import { StockSearchComponent } from '../stock-search/stock-search.component';

@Component({
  selector: 'app-stock-list-2',
  imports: [CommonModule, StockSearchComponent],
  templateUrl: './stock-list-2.component.html',
  styleUrl: './stock-list-2.component.css'
})
export class StockList2Component {
  @Input() newStock: Stock | null = null;
  stocks: Stock[] = [];
  user: any;
  searchKeyword: string = '';

  

  constructor(private httpService: HttpService, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }

    this.refreshStocks();

    if (this.newStock) {
      this.addStock(this.newStock);
    }
  }

  onSearchStock(keyword: string) {  
    console.log("Keyword:", keyword);
    this.searchKeyword = keyword.trim();
    this.onSearch();
  }

  refreshStocks() {
    this.httpService.getStocks().subscribe((stocks: Stock[]) => {
      this.stocks = [...stocks];
    });
  }

  toggleFavorite(stock: Stock) {
    stock.favorite = !stock.favorite;
  }

  addStock(stock: Stock): void {
    this.httpService.postStock(stock).subscribe(() => {
      this.refreshStocks();
    });
  }

  deleteStock(id?: string): void {
    if (id === undefined) {
      console.error('ID cổ phiếu không hợp lệ!');
      return;
    }

    const stock = this.stocks.find(s => s.id === id);
    if (!stock) return;

    const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa cổ phiếu: ${stock.name} (${stock.code})?`);
    if (confirmDelete) {
      this.httpService.deleteStockById(id).subscribe((deleted: boolean) => {
        // Sau khi xóa, reload danh sách stocks
        if (deleted) this.refreshStocks();
      });
    }
  }
  
  
  editStock(stock: Stock): void {
    const dialogRef = this.dialog.open(StockEditDialogComponent, {
      width: '400px',
      data: stock
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed with result:", result);
      if (result) {
        this.httpService.updateStock(result).subscribe(() => {
          console.log("Stock updated successfully");
          this.refreshStocks();
        }, error => {
          console.error("Error updating stock:", error);
        });
      } else {
        console.log("No result received");
      }
    });
  }

  onSearch(): void {
    const keyword = this.searchKeyword.trim();
    this.httpService.searchStocks(keyword).subscribe({
      next: (stocks: Stock[]) => {
        console.log("Kết quả tìm kiếm (raw):", stocks);
        this.stocks = stocks;
      },
      error: (error) => {
        console.error("Lỗi tìm kiếm cổ phiếu:", error);
      }
    });
    
  }
  

  viewDetails(stock: Stock) {
    if (stock.id === undefined) {
      console.error('ID cổ phiếu không hợp lệ!');
      return;
    }

    this.httpService.getStockByID(stock.id).subscribe(stock => {
      if (stock) {
        this.dialog.open(StockDetailDialogComponent, {
          width: '400px',
          data: stock
        });
      } else {
        alert(`Không tìm thấy cổ phiếu`);
      }
    });
  }
}


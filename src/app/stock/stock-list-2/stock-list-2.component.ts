import { Component, Input, SimpleChanges } from '@angular/core';
import { Stock } from '../../model/stock';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { StockDetailDialogComponent } from '../stock-detail-dialog/stock-detail-dialog.component';
import { StockEditDialogComponent } from '../stock-edit-dialog/stock-edit-dialog.component';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-stock-list-2',
  imports: [CommonModule],
  templateUrl: './stock-list-2.component.html',
  styleUrl: './stock-list-2.component.css'
})
export class StockList2Component {
  @Input() searchKeyword: string = '';
  @Input() newStock: Stock | null = null;
  stocks: Stock[] = [];

  constructor(private httpService: HttpService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshStocks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchKeyword']) {
      this.onSearch();
    }

    if (changes['newStock'] && this.newStock) {
      this.addStock(this.newStock);
    }
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

    if (!keyword) {
      this.refreshStocks();
      return;
    }

    this.httpService.searchStocks(keyword).subscribe((stocks: Stock[]) => {
      console.log("Kết quả tìm kiếm:", stocks);
      this.stocks = [...stocks];
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


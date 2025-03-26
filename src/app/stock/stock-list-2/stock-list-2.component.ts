import { Component, Input, SimpleChanges } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { StockDetailDialogComponent } from '../stock-detail-dialog/stock-detail-dialog.component';

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

  constructor(private stockService: StockService, private dialog: MatDialog) {}

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
    this.stockService.getStocks().subscribe((stocks: Stock[]) => {
      this.stocks = [...stocks];
    });
  }

  toggleFavorite(stock: Stock) {
    stock.favorite = !stock.favorite;
  }

  addStock(stock: Stock): void {
    this.stockService.addStock(stock).subscribe(() => {
      this.refreshStocks();
    });
  }

  deleteStock(code: string): void {
    const stock = this.stocks.find(s => s.code === code);
    if (!stock) return;

    const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa cổ phiếu: ${stock.name} (${stock.code})?`);
    if (confirmDelete) {
      this.stockService.deleteStockByCode(code).subscribe((deleted: boolean) => {
        // Sau khi xóa, reload danh sách stocks
        if (deleted) this.refreshStocks();
      });
    }
  }
  
  editStock(stock: Stock): void {
    this.stockService.updateStockByCode(stock).subscribe((updated: boolean) => {
      // Sau khi cập nhật, reload danh sách stocks
      if (updated) this.refreshStocks();
    });
  }

  onSearch(): void {
    const keyword = this.searchKeyword.trim();

    if (!keyword) {
      this.refreshStocks();
      return;
    }

    this.stockService.searchStocks(keyword).subscribe((stocks: Stock[]) => {
      console.log("🔍 Kết quả tìm kiếm:", stocks); // ✅ Debug
      this.stocks = [...stocks]; // ✅ Spread Operator kích hoạt UI update
    });
  }

  viewDetails(stock: Stock) {
    this.stockService.getStockByCode(stock.code).subscribe(stock => {
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


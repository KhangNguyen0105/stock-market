import { Component } from '@angular/core';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { CreateStock2Component } from './stock/create-stock-2/create-stock-2.component';

@Component({
  selector: 'app-root',
  imports: [StockListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stock-market';
}
 
import { Component } from '@angular/core';
import { StockListComponent } from './stock/stock-list/stock-list.component';

@Component({
  selector: 'app-root',
  imports: [StockListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stock-market';
}
 
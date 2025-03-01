import { Component } from '@angular/core';
// import { LoginComponent } from './login/login.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
// import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StockItemComponent, StockListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stock-market';
}
 
import { Routes } from '@angular/router';
import { StockList2Component } from './stock/stock-list-2/stock-list-2.component';
import { LoginComponent } from './login/login.component';
import { CreateStock2Component } from './stock/create-stock-2/create-stock-2.component';

export const routes: Routes = [
    { path: '', component: StockList2Component },
    { path: 'login', component: LoginComponent },
    { path: 'stock-list', component: StockList2Component },
    { path: 'create-stock', component: CreateStock2Component },
];

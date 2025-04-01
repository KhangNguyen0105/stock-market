import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private REST_API_SERVER = 'http://localhost:3000/stocks';
  private httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient) { }

  getStocks(): Observable<any> {
    return this.http.get<Stock[]>(this.REST_API_SERVER, this.httpOptions);
  }

  postStock(stock: any): Observable<any> {
    return this.http.post<Stock>(this.REST_API_SERVER, stock, this.httpOptions);
  }

  deleteStockById(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.REST_API_SERVER}/${id}`, this.httpOptions);
  }
  
  updateStock(stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.REST_API_SERVER}/${stock.id}`, stock, this.httpOptions);
  }

  searchStocks(keyword: string): Observable<any> {
    const lowerKeyword = keyword.toLowerCase();
    return this.http.get<Stock[]>(`${this.REST_API_SERVER}?q=${lowerKeyword}`, this.httpOptions);
  }

  getStockByID(id: string): Observable<any> {
    return this.http.get<Stock>(`${this.REST_API_SERVER}/${id}`, this.httpOptions);
  }

}

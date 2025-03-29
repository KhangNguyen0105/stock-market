import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-post-data',
  imports: [],
  templateUrl: './post-data.component.html',
  styleUrl: './post-data.component.css'
})
export class PostDataComponent {
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    const stock = {
      "name": 'Last Stock',
      "code": 'LST',
      "price": 'Vinamilk',
      "previousPrice": "100000",
      "exchange": "HNX",
      "favorite": "false"
    };

    this.httpService.postStock(stock).subscribe((data) => {
      console.log('Thêm stock thành công:', data);
      this.httpService.getStocks().subscribe((data) => {
        console.log('Lấy danh sách stocks sau khi thêm:', data);
      }, error => {
        console.error('Lỗi khi lấy danh sách stocks:', error);
      });
    }, error => {
      console.error('Lỗi khi thêm stock:', error);
    });
  }
}

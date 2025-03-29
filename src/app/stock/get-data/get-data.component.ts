import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { error } from 'console';

@Component({
  selector: 'app-get-data',
  imports: [],
  templateUrl: './get-data.component.html',
  styleUrl: './get-data.component.css'
})
export class GetDataComponent {
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getStocks().subscribe((data) => {
      console.log('Lấy danh sách stocks:', data);
    }, error => {
      console.error('Lỗi khi lấy stocks:', error);
    });
  }
}

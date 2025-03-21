import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.css']
})
export class StockSearchComponent {
  @Output() searchKeyword = new EventEmitter<string>();

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const keyword = input.value;
    this.searchKeyword.emit(keyword);
  }
  
}

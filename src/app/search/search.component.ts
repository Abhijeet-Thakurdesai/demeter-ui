import { Component, OnInit } from '@angular/core';
import {FoodService} from "../services/food.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchString: string;
  searchResult = []
  constructor(private foodSvc: FoodService) { }

  ngOnInit() {
  }

  search() {
    this.foodSvc.getAvailableFoodsGivenPinCode(this.searchString).subscribe(data => {
      this.searchResult = data as any[];
      console.log(this.searchResult);
    });
  }

}

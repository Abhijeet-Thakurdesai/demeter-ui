import { Component, OnInit } from '@angular/core';
import {FoodService} from "../services/food.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchString: string;
  searchResult = []
  constructor(private foodSvc: FoodService, private router: Router, private authSvc: AuthService) { }

  ngOnInit() {
  }

  search() {
    this.foodSvc.getAvailableFoodsGivenPinCode(this.searchString).subscribe(data => {
      this.searchResult = data as any[];
      console.log(this.searchResult);
    });
  }

  logout() {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }

  goToPost() {
    this.router.navigate(['/post']);
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {FoodService} from "../services/food.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  foodForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private foodSvc: FoodService) { }

  ngOnInit() {
    this.foodForm = this.formBuilder.group({
      name: [''],
      location: [''],
      zipcode: ['']
    });
  }

  get f() { return this.foodForm.controls; }

  post() {
    this.foodSvc.addFoodItem
    ({ name: this.f.name.value, location: this.f.location.value, zipcode: this.f.zipcode.value })
      .subscribe(success => {
        alert("Posted your donation")
        this.router.navigate(['/search']);
    });
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import { config } from './../config';
import {catchError, mapTo, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient, private router: Router, private authSvc: AuthService) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('x-access-token', this.authSvc.getJwtToken());
    headers.append('Content-Type', 'application/json');
  }

  getAvailableFoodsGivenPinCode(pincode) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-access-token': this.authSvc.getJwtToken()
    }

    const requestOptions = {headers: new HttpHeaders (headerDict),};
    return this.http.get(`${config.apiUrl}/food/` + pincode, requestOptions);
  }

  addFoodItem(foodObject: { name: string, location: string, zipcode: string }) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-access-token': this.authSvc.getJwtToken()
    }

    const requestOptions = {headers: new HttpHeaders (headerDict),};
    return this.http.post<any>(`${config.apiUrl}/food`, foodObject, requestOptions);

  }
}

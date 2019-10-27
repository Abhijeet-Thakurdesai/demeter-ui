import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authSvc: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    console.log(this.f.password.value)
    this.authSvc.login({
        username: this.f.username.value,
        password: this.f.password.value
      }).subscribe(success => {
      if (success) {
        this.router.navigate(['/search']);
      }
    });
  }

}

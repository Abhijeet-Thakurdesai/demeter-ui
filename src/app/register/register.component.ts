import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authSvc: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  get f() { return this.registerForm.controls; }

  register() {
    this.authSvc.register({
        username: this.f.username.value,
        password: this.f.password.value
      }).subscribe(success => {
      if (success) {
       console.log("succ");
      }
    });
  }

}

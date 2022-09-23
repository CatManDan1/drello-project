import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginform!: FormGroup;
  username!: AbstractControl;
  password!: AbstractControl;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.username = this.fd('username');
    this.password = this.fd('password');
  }

  public buildForm(): void {
    this.loginform = this.formBuilder.group({
      username: [``, [Validators.required]],
      password: [``, [Validators.required]],
    })
  }

  //Get "form data"
  fd(key: string): AbstractControl{
    return this.loginform.controls[key];
  }

  onSubmit() {
  }
}

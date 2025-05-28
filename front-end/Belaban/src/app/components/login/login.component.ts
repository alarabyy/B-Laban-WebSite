import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      this.http
        .post('https://localhost:7183/api/AuthJwt/Login', this.loginForm.value)
        .subscribe({
          next: (res: any) => {
            console.log('Login successful', res);
            alert('Login successful!');
            localStorage.setItem('authorized', 'true'); // مهم جداً جداً

            window.location.href = '/Home';
            // هنا ممكن تخزن التوكن أو تنتقل لصفحة تانية
          },
          error: (err) => {
            console.error('Login failed', err);
            this.errorMessage =
              err.error?.message ||
              'Login failed. Please check your credentials.';
          },
        });
    }
  }
}

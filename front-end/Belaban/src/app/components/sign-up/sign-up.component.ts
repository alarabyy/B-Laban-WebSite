import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
    imports: [ReactiveFormsModule, CommonModule],

})
export class SignUpComponent {

  registerForm: FormGroup;
  showPassword = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  register() {
    this.errorMessage = '';

    if (this.registerForm.valid) {
      // خذ بيانات الفورم وحولها حسب شكل الـ API
      const payload = {
        userName: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      // نرسل طلب POST إلى API
      this.http.post('https://localhost:7183/api/AuthJwt/Register', payload, { responseType: 'text' })
        .subscribe({
          next: (res) => {
            alert('Registration Successful!');
            window.location.href = '/Login';

            this.registerForm.reset();
          },
          error: (err) => {
            console.log('Error response:', err.error);

            // إذا كانت رسالة الخطأ نص عادي
            if (typeof err.error === 'string') {
              this.errorMessage = err.error;
            } else if (err.error && err.error.message) {
              // لو الرد JSON وعنده خاصية message
              this.errorMessage = err.error.message;
            } else {
              this.errorMessage = 'Registration failed. Please try again.';
            }
          }
        });
    }
  }
}

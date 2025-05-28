import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feed-back.component.html',
  styleUrls: ['./add-feed-back.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddFeedBackComponent {
  feedbackForm: FormGroup;
  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.feedbackForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      comment: ['', [Validators.required, Validators.minLength(10)]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      date: [new Date()]
    });
  }

  get f() {
    return this.feedbackForm.controls;
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const feedbackData = this.feedbackForm.value;

    this.http.post('https://localhost:7183/api/Feedbacks', feedbackData).subscribe({
      next: () => {
        this.successMessage = '✅ Feedback sent successfully!';
        this.feedbackForm.reset({ rating: 5, date: new Date() });
        this.submitting = false;
      },
      error: (err) => {
        this.errorMessage = '❌ An error occurred while sending feedback. Please try again.';
        console.error('Feedback sending error:', err);
        this.submitting = false;
      }
    });
  }
}

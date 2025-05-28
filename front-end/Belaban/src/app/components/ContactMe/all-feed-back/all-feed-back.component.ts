
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Feedback {
  id: number;
  comment: string;
  email: string;
  fullname: string;
  rating: number;
  date: string;
}

@Component({
  selector: 'app-feedback-list',
  templateUrl: './all-feed-back.component.html',
  styleUrls: ['./all-feed-back.component.css'],
  imports: [ReactiveFormsModule, CommonModule],

})
export class AllFeedBackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks() {
    this.http.get<Feedback[]>('https://localhost:7183/api/Feedbacks').subscribe({
      next: (res) => {
        this.feedbacks = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching feedbacks:', err);
        this.loading = false;
      }
    });
  }

  deleteFeedback(id: number) {
    if (confirm('Are you sure you want to delete this feedback?')) {
      this.http.delete(`https://localhost:7183/api/Feedbacks/${id}`).subscribe({
        next: () => {
          this.feedbacks = this.feedbacks.filter(fb => fb.id !== id);
        },
        error: (err) => {
          console.error('Delete error:', err);
        }
      });
    }
  }
}
